/**
 * parse-to-data.mjs
 * Parses standalone HTML-in-JSON files → structured JSON data files
 * Output: app/data/topics/{topic}.json
 */

import { JSDOM } from 'jsdom';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const TOPICS = [
  { id: 'angular',       file: 'standalone-angular.json' },
  { id: 'react',         file: 'standalone-react.json' },
  { id: 'nextjs',        file: 'standalone-nextjs.json' },
  { id: 'javascript',    file: 'standalone-javascript.json' },
  { id: 'html',          file: 'standalone-html.json' },
  { id: 'css',           file: 'standalone-css.json' },
  { id: 'system-design', file: 'standalone-system-design.json' },
  { id: 'uxui',          file: 'standalone-uxui.json' },
];

// Special nav-ID → section-element-ID mappings where IDs don't match
const SPECIAL_MAPPINGS = {
  'a-v19':       'v21',             // Angular nav "v19" → section "v21"
  'r-core':      'r-fundamentals',  // React nav "r-core" → section "r-fundamentals"
  'r-iq':        'iq-react',        // React nav "r-iq" → section "iq-react"
  'r-ecosystem': null,              // React "ecosystem" — no section, skip
  'n-iq':        'iq-next',         // Next.js nav "n-iq" → section "iq-next"
  'n-auth':      null,              // Next.js "n-auth" — no section, skip
};

/**
 * Escape HTML tags that would confuse JSDOM's HTML5 parser:
 * 1. Tags inside <pre><code> blocks (except syntax-highlighting spans)
 * 2. Tags inside backtick inline-code references in text (e.g. `<article>`)
 * 3. Block-level tags (table, input, select, form) that appear in text content
 */
function preprocessBody(body) {
  // 1. Escape inside <pre><code> blocks (preserve syntax highlighting spans)
  let result = body.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (_match, code) => {
    const safe = code.replace(
      /<(\/?)((?!(?:span|b|i|strong|em|br)\b)[a-zA-Z][^>]*)>/g,
      (_m, slash, rest) => `&lt;${slash}${rest}&gt;`
    );
    return `<pre><code>${safe}</code></pre>`;
  });

  // 2. Escape HTML tags inside backtick inline-code on the same line: `<tag>` → `&lt;tag&gt;`
  //    Use \n boundary to prevent consuming across multiple lines/elements
  result = result.replace(/`([^`\n]*?)<([^`>\n]+)>([^`\n]*?)`/g, (_m, pre, tag, post) =>
    `\`${pre}&lt;${tag}&gt;${post}\``
  );

  return result;
}

function normalizeLevel(raw) {
  const map = { b: 'basic', i: 'intermediate', a: 'advanced', e: 'expert' };
  return map[raw] || raw || 'basic';
}

function formatIdAsLabel(id) {
  return id
    .replace(/^[a-z]+-/, '')           // strip leading topic prefix (js-, n-, r-)
    .replace(/-/g, ' ')                // dashes → spaces
    .replace(/\b\w/g, c => c.toUpperCase()); // Title Case
}

/**
 * Given a nav button's data-s value, resolve it to an actual section element ID.
 */
function resolveNavIdToSectionId(navId, sectionIds) {
  // 1. Direct match
  if (sectionIds.includes(navId)) return navId;

  // 2. Hardcoded special cases
  if (Object.prototype.hasOwnProperty.call(SPECIAL_MAPPINGS, navId)) {
    const mapped = SPECIAL_MAPPINGS[navId];
    return mapped && sectionIds.includes(mapped) ? mapped : null;
  }

  // 3. Strip single-letter prefix: "a-core" → "core", "r-hooks" → stays "r-hooks"
  //    (only strips when result exists in sectionIds)
  const singlePrefixMatch = navId.match(/^[a-z]-(.+)$/);
  if (singlePrefixMatch) {
    const stripped = singlePrefixMatch[1];
    if (sectionIds.includes(stripped)) return stripped;
  }

  return null;
}

/**
 * Extract card content from a .card or .cd element. Returns { title, contentHtml }.
 */
function extractCard(cardEl) {
  const clone = cardEl.cloneNode(true);

  // Variant A: .card-title + .card-content  (content-additions format)
  const cardTitleEl = clone.querySelector('.card-title');
  const cardContentEl = clone.querySelector('.card-content');
  if (cardTitleEl && cardContentEl) {
    return {
      title: cardTitleEl.textContent?.trim() ?? '',
      contentHtml: cardContentEl.innerHTML.trim(),
    };
  }

  // Variant B: .c-header (with h3 + optional badge) + rest
  const cHeader = clone.querySelector('.c-header');
  if (cHeader) {
    const title = cHeader.querySelector('h3, h2')?.textContent?.trim() ?? '';
    cHeader.remove();
    return { title, contentHtml: clone.innerHTML.trim() };
  }

  // Variant C: direct h2 as title, rest is content
  const h2 = clone.querySelector(':scope > h2, h2');
  if (h2) {
    const title = h2.textContent?.trim() ?? '';
    h2.remove();
    return { title, contentHtml: clone.innerHTML.trim() };
  }

  // Variant D: direct h3 as title
  const h3 = clone.querySelector(':scope > h3, h3');
  if (h3) {
    const title = h3.textContent?.trim() ?? '';
    h3.remove();
    return { title, contentHtml: clone.innerHTML.trim() };
  }

  // Fallback: no title
  return { title: '', contentHtml: clone.innerHTML.trim() };
}

/**
 * Extract all Q&A items directly from a raw HTML string using string matching.
 * Avoids JSDOM re-parsing issues caused by block-level HTML in Q&A answers.
 */
function extractQAFromRaw(sectionHtml) {
  const items = [];
  // Match each <div class="qa" data-l="..."> opening tag
  const qaOpenRegex = /<div\s[^>]*class="qa"[^>]*data-l="([^"]+)"[^>]*>/g;
  let m;

  while ((m = qaOpenRegex.exec(sectionHtml)) !== null) {
    const level = normalizeLevel(m[1]);
    const start = m.index;

    // Find the matching closing </div> using balanced counting
    let depth = 1, pos = start;
    let qaHtml = null;
    while (pos < sectionHtml.length) {
      const openDiv = sectionHtml.indexOf('<div', pos + 1);
      const closeDiv = sectionHtml.indexOf('</div>', pos + 1);
      if (closeDiv === -1) break;
      if (openDiv !== -1 && openDiv < closeDiv) { depth++; pos = openDiv; }
      else {
        depth--;
        if (depth === 0) { qaHtml = sectionHtml.slice(start, closeDiv + 6); break; }
        pos = closeDiv;
      }
    }
    if (!qaHtml) continue;

    // Extract question text (Variant A: .qt | Variant B: .qq)
    const qtMatch = qaHtml.match(/class="qt"[^>]*>([\s\S]*?)<\/span>/);
    const qqMatch = qaHtml.match(/class="qq"[^>]*>([\s\S]*?)<\/span>/);
    const questionRaw = (qtMatch || qqMatch)?.[1] ?? '';
    const question = questionRaw.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
    if (!question) continue;

    // Extract answer HTML (Variant A: .qi | Variant B: .qa-ai)
    const qiMatch = qaHtml.match(/class="qi"[^>]*>([\s\S]*?)<\/div>/);
    const qaAiMatch = qaHtml.match(/class="qa-ai"[^>]*>([\s\S]*?)<\/div>/);
    const answerHtml = ((qiMatch || qaAiMatch)?.[1] ?? '').trim();

    items.push({ level, question, answerHtml });
  }
  return items;
}

/**
 * Extract all card elements from a section.
 * Handles: direct .card/.cd children, and .card/.cd inside .grid containers.
 */
function extractCards(sectionEl) {
  const cards = [];
  const seen = new WeakSet();

  const process = (cardEl) => {
    if (seen.has(cardEl)) return;
    seen.add(cardEl);
    const extracted = extractCard(cardEl);
    if (extracted.title || extracted.contentHtml.length > 20) {
      cards.push(extracted);
    }
  };

  // Direct .card and .cd children
  sectionEl.querySelectorAll(':scope > .card, :scope > .cd').forEach(process);

  // Cards inside .grid or .grid2 wrappers
  sectionEl.querySelectorAll(':scope > .grid > .card, :scope > .grid2 > .card, :scope > .grid > .cd, :scope > .grid2 > .cd').forEach(process);

  return cards;
}

/**
 * Parse the hero section from raw HTML string.
 */
function parseHero(body) {
  const heroMatch = body.match(/<div class="hero">([\s\S]*?)<\/div>/);
  if (!heroMatch) return { title: '', subtitle: '' };
  const heroHtml = heroMatch[0];
  const titleMatch = heroHtml.match(/<h1>([\s\S]*?)<\/h1>/);
  const subMatch = heroHtml.match(/<p class="sub">([\s\S]*?)<\/p>/);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  const subtitle = subMatch ? subMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  return { title, subtitle };
}

/**
 * Extract all nav tabs from raw HTML string.
 * Returns [{ navId, label }] in document order.
 */
function parseNavTabs(body) {
  const tabs = [];
  const regex = /class="sn[^"]*"\s+data-s="([^"]+)"[^>]*>([\s\S]*?)<\/button>/g;
  let m;
  while ((m = regex.exec(body)) !== null) {
    const navId = m[1];
    const label = m[2].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
    if (navId && label) tabs.push({ navId, label });
  }
  return tabs;
}

/**
 * Extract section HTML chunks from a body string.
 * Returns [{ id, html }] — raw HTML of each section element.
 */
function extractSectionChunks(body) {
  const openTagRegex = /<div\s[^>]*class="(?:[^"]*\s)?(?:section|sc)(?:\s[^"]*)?"[^>]*id="([^"]+)"[^>]*>/g;

  // First pass: collect all start positions
  const starts = [];
  let m;
  while ((m = openTagRegex.exec(body)) !== null) {
    starts.push({ id: m[1], start: m.index });
  }

  const chunks = [];
  for (let i = 0; i < starts.length; i++) {
    const { id, start } = starts[i];

    // Walk forward with balanced div counting (depth=1 for the opening tag)
    let depth = 1;
    let pos = start;
    let found = false;

    while (pos < body.length) {
      const openDiv = body.indexOf('<div', pos + 1);
      const closeDiv = body.indexOf('</div>', pos + 1);
      if (closeDiv === -1) break;
      if (openDiv !== -1 && openDiv < closeDiv) {
        depth++;
        pos = openDiv;
      } else {
        depth--;
        if (depth === 0) {
          chunks.push({ id, html: body.slice(start, closeDiv + 6) });
          found = true;
          break;
        }
        pos = closeDiv;
      }
    }

    // Fallback for malformed HTML: use next section start (or end of body)
    if (!found) {
      const end = i + 1 < starts.length ? starts[i + 1].start : body.length;
      chunks.push({ id, html: body.slice(start, end) });
    }
  }
  return chunks;
}

/**
 * Parse a single section's HTML chunk into structured data.
 * Q&A items are extracted via raw string parsing (avoids JSDOM re-parsing issues).
 * Cards are extracted via JSDOM on the preprocessed HTML.
 */
function parseSection(id, html) {
  // Extract Q&A from raw string — avoids JSDOM misparse of HTML in answers
  const qa = extractQAFromRaw(html);
  const hasFilterBar = html.includes('class="fbar"') || html.includes('class="fb"');

  // Use JSDOM for card extraction (preprocessed to fix code-block issues)
  const dom = new JSDOM(
    `<!DOCTYPE html><html><body>${preprocessBody(html)}</body></html>`
  );
  const el = dom.window.document.querySelector('[id]') ?? dom.window.document.body;

  const introEl = el.querySelector(
    '.section-intro, .section-desc, p.si, .si, .s-header p'
  );
  const intro = introEl?.textContent?.trim() || undefined;
  const cards = extractCards(el);

  return {
    id,
    ...(intro ? { intro } : {}),
    cards,
    ...(qa.length > 0 ? { qa } : {}),
    ...(hasFilterBar ? { hasFilterBar: true } : {}),
  };
}

/**
 * Parse a single topic's HTML body into structured data.
 */
function parseTopic(topicId, body) {
  // ── Hero ──────────────────────────────────────────────────────────────────
  const { title, subtitle } = parseHero(body);

  // ── Nav tabs ──────────────────────────────────────────────────────────────
  const rawTabs = parseNavTabs(body);

  // ── Section chunks ────────────────────────────────────────────────────────
  const chunks = extractSectionChunks(body);
  const allSectionIds = chunks.map(c => c.id);

  // ── Map nav tabs → section IDs ────────────────────────────────────────────
  const tabEntries = [];
  const mappedSectionIds = new Set();

  rawTabs.forEach(({ navId, label }) => {
    const sectionId = resolveNavIdToSectionId(navId, allSectionIds);
    if (sectionId && !mappedSectionIds.has(sectionId)) {
      tabEntries.push({ sectionId, label });
      mappedSectionIds.add(sectionId);
    }
  });

  const tabOrderMap = new Map(tabEntries.map((t, i) => [t.sectionId, i]));
  const tabs = tabEntries.map(t => ({ id: t.sectionId, label: t.label }));

  // Derive tabs for orphan sections (sections with no matching nav button)
  chunks.forEach(({ id, html }) => {
    if (!mappedSectionIds.has(id)) {
      const h2Match = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
      const derived = h2Match
        ? h2Match[1].replace(/<[^>]+>/g, '').trim()
        : formatIdAsLabel(id);
      tabOrderMap.set(id, 1000 + tabs.length);
      tabs.push({ id, label: derived });
    }
  });

  // ── Parse sections ────────────────────────────────────────────────────────
  const sections = chunks.map(({ id, html }) => parseSection(id, html));

  // Sort by tab order
  sections.sort((a, b) => (tabOrderMap.get(a.id) ?? 9999) - (tabOrderMap.get(b.id) ?? 9999));

  return { id: topicId, title, subtitle, tabs, sections };
}

// ── Main ────────────────────────────────────────────────────────────────────

const outDir = join(ROOT, 'data', 'topics');
mkdirSync(outDir, { recursive: true });

let totalCards = 0;
let totalQA = 0;

for (const { id, file } of TOPICS) {
  process.stdout.write(`Parsing ${id}...`);
  const raw = JSON.parse(readFileSync(join(ROOT, 'content', file), 'utf-8'));
  const data = parseTopic(id, raw.body);

  const cards = data.sections.reduce((s, sec) => s + sec.cards.length, 0);
  const qa = data.sections.reduce((s, sec) => s + (sec.qa?.length ?? 0), 0);
  totalCards += cards;
  totalQA += qa;

  console.log(` ${data.sections.length} sections | ${cards} cards | ${qa} Q&A | ${data.tabs.length} tabs`);

  writeFileSync(join(outDir, `${id}.json`), JSON.stringify(data, null, 2), 'utf-8');
}

console.log(`\nTotal: ${totalCards} cards, ${totalQA} Q&A items`);
console.log(`Output: app/data/topics/`);
