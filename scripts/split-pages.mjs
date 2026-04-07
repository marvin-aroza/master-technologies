import fs from "fs";
import { JSDOM } from "jsdom";
import path from "path";

const rootDir = path.resolve(process.cwd(), "..");
const contentDir = path.resolve(process.cwd(), "content");
fs.mkdirSync(contentDir, { recursive: true });

function extractCss(rawHtml) {
  return [...rawHtml.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]).join('\n');
}

function extractBody(rawHtml) {
  const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyText = bodyMatch ? bodyMatch[1] : rawHtml;
  return bodyText.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').trim();
}

function writePayload(filename, title, subtitle, bodyHtml, css) {
  const heroHtml = `<div class="hero"><h1>${title}</h1><p class="sub">${subtitle}</p></div>\n`;
  const payload = { css, scripts: "", body: heroHtml + bodyHtml };
  const outPath = path.resolve(contentDir, filename);
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));
  
  // Quick sanity check using broader selectors
  const dom = new JSDOM(bodyHtml);
  const doc = dom.window.document;
  const secs = doc.querySelectorAll('.section, .sc, .tech, .ts').length;
  const navs = doc.querySelectorAll('.sn, .nav-btn, .snav, .tab, .top-tab').length;
  const qas = doc.querySelectorAll('.qa').length;
  console.log(`  ✓ ${filename} — ${secs} sections, ${navs} nav buttons, ${qas} QAs, ${bodyHtml.length} chars`);
}

// ══════════════════════════════════════════════════════
// 1. REACT & NEXT.JS  
// ══════════════════════════════════════════════════════
console.log("\n─── React & Next.js ───");
const reactRaw = fs.readFileSync(path.resolve(rootDir, "react-nextjs-mastery-encyclopedia.html"), "utf8");
const reactCss = extractCss(reactRaw);
const reactBody = extractBody(reactRaw);

{
  // REACT PAYLOAD
  const dom = new JSDOM(reactBody);
  const doc = dom.window.document;
  
  // Remove Next.js nav buttons (classes: sn, snav, nav-btn)
  doc.querySelectorAll('.sn, .snav, .nav-btn').forEach(btn => {
    const s = btn.getAttribute('data-s') || '';
    if (s.startsWith('n-') || s === 'iq-next') btn.remove();
  });
  
  // Remove Next.js sections (classes: section, sc)
  doc.querySelectorAll('.section, .sc').forEach(sec => {
    const id = sec.id || '';
    if (id.startsWith('n-') || id === 'iq-next') sec.remove();
  });
  
  // Ensure the first React section is active
  doc.querySelectorAll('.section, .sc').forEach(s => s.classList.remove('active'));
  doc.querySelectorAll('.sn, .snav, .nav-btn').forEach(b => b.classList.remove('active'));
  
  const firstNav = doc.querySelector('.sn, .snav, .nav-btn');
  if (firstNav) {
    firstNav.classList.add('active');
    const sid = firstNav.getAttribute('data-s');
    if (sid) {
      const firstSec = doc.getElementById(sid);
      if (firstSec) firstSec.classList.add('active');
    }
  }
  
  const hero = doc.querySelector('.hero');
  if (hero) hero.remove();
  
  writePayload("standalone-react.json", "React Mastery Bible", "React 19 — every hook, pattern, and concept", doc.body.innerHTML, reactCss);
}

{
  // NEXT.JS PAYLOAD
  const dom = new JSDOM(reactBody);
  const doc = dom.window.document;
  
  // Remove React nav buttons
  doc.querySelectorAll('.sn, .snav, .nav-btn').forEach(btn => {
    const s = btn.getAttribute('data-s') || '';
    if (s.startsWith('r-') || s === 'iq-react') btn.remove();
  });
  
  // Remove React sections
  doc.querySelectorAll('.section, .sc').forEach(sec => {
    const id = sec.id || '';
    if (id.startsWith('r-') || id === 'iq-react') sec.remove();
  });
  
  // Activate first Next.js section
  doc.querySelectorAll('.section, .sc').forEach(s => s.classList.remove('active'));
  doc.querySelectorAll('.sn, .snav, .nav-btn').forEach(b => b.classList.remove('active'));
  
  const firstNav = doc.querySelector('.sn, .snav, .nav-btn');
  if (firstNav) {
    firstNav.classList.add('active');
    const sid = firstNav.getAttribute('data-s');
    if (sid) {
      const firstSec = doc.getElementById(sid);
      if (firstSec) firstSec.classList.add('active');
    }
  }
  
  const hero = doc.querySelector('.hero');
  if (hero) hero.remove();
  
  writePayload("standalone-nextjs.json", "Next.js Mastery Bible", "App Router, RSC, server actions & v16", doc.body.innerHTML, reactCss);
}

// ══════════════════════════════════════════════════════
// 2. ANGULAR
// ══════════════════════════════════════════════════════
console.log("\n─── Angular ───");
const angRaw = fs.readFileSync(path.resolve(rootDir, "angular-mastery-encyclopedia (1).html"), "utf8");
const angCss = extractCss(angRaw);
const angBody = extractBody(angRaw);

{
  const dom = new JSDOM(angBody);
  const doc = dom.window.document;
  
  // Standardize activate first section
  doc.querySelectorAll('.section, .sc').forEach(s => s.classList.remove('active'));
  doc.querySelectorAll('.sn, .nav-btn, .snav').forEach(b => b.classList.remove('active'));
  
  const firstNav = doc.querySelector('.sn, .nav-btn, .snav');
  if (firstNav) {
    firstNav.classList.add('active');
    const sid = firstNav.getAttribute('data-s');
    if (sid) {
      const firstSec = doc.getElementById(sid);
      if (firstSec) firstSec.classList.add('active');
    }
  }
  
  const hero = doc.querySelector('.hero');
  if (hero) hero.remove();
  
  writePayload("standalone-angular.json", "Angular Mastery Bible", "Signals, state, SSR & 15 deep chapters", doc.body.innerHTML, angCss);
}

// ══════════════════════════════════════════════════════
// 3. HTML, CSS, SYSTEM DESIGN, UX/UI
// ══════════════════════════════════════════════════════
console.log("\n─── HTML / CSS / System Design / UX-UI ───");
const htmlRaw = fs.readFileSync(path.resolve(rootDir, "html-css-systemdesign-bible (1).html"), "utf8");
const htmlCss = extractCss(htmlRaw);
const htmlBody = extractBody(htmlRaw);

const tabMappings = [
  { id: "t-html", title: "HTML Mastery Bible", desc: "Semantic tags, SEO, forms & native APIs", out: "standalone-html.json" },
  { id: "t-css", title: "CSS Mastery Bible", desc: "Grid, Flexbox, animations & modern CSS", out: "standalone-css.json" },
  { id: "t-fsd", title: "System Design Mastery Bible", desc: "Scalable architectures & frontend patterns", out: "standalone-system-design.json" },
  { id: "t-ux", title: "UX & UI Design Bible", desc: "Gestalt principles, accessibility & design tokens", out: "standalone-uxui.json" },
];

for (const m of tabMappings) {
  const dom = new JSDOM(htmlBody);
  const doc = dom.window.document;
  
  const techSection = doc.getElementById(m.id);
  if (!techSection) {
    console.error(`  ✗ Could not find #${m.id}`);
    continue;
  }
  
  // Make this tech section active and extract it as standalone
  techSection.classList.add('active');
  
  // Normalize sub-sections in this tech area
  techSection.querySelectorAll('.section, .sc').forEach(s => s.classList.remove('active'));
  techSection.querySelectorAll('.sn, .snav, .nav-btn, .tab').forEach(b => b.classList.remove('active'));

  const firstNav = techSection.querySelector('.sn, .snav, .nav-btn, .tab');
  if (firstNav) {
    firstNav.classList.add('active');
    const sid = firstNav.getAttribute('data-s');
    if (sid) {
      const sec = techSection.querySelector(`#${sid}`);
      if (sec) sec.classList.add('active');
    }
  }
  
  writePayload(m.out, m.title, m.desc, techSection.outerHTML, htmlCss);
}

// ══════════════════════════════════════════════════════
// 4. JAVASCRIPT
// ══════════════════════════════════════════════════════
console.log("\n─── JavaScript ───");
const jsRaw = fs.readFileSync(path.resolve(rootDir, "frontend-mastery-bible (1).html"), "utf8");
const jsCss = extractCss(jsRaw);
const jsBody = extractBody(jsRaw);

{
  const dom = new JSDOM(jsBody);
  const doc = dom.window.document;
  
  const jsTech = doc.getElementById('t-javascript');
  if (jsTech) {
    jsTech.classList.add('active');
    writePayload("standalone-javascript.json", "JavaScript Mastery Bible", "ES2025, async patterns & core foundations", jsTech.outerHTML, jsCss);
  } else {
    console.error("  ✗ Could not find #t-javascript");
  }
}

console.log("\n✅ All standalone files generated with robust selectors!");
