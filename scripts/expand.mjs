import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ADDITIONS_DIR = resolve(ROOT, 'content-additions');

import { angularQA } from '../content-additions/angular/qa/questions.js';
import { reactQA } from '../content-additions/react/qa/questions.js';
import { nextQA } from '../content-additions/next/qa/questions.js';
import { jsQA } from '../content-additions/js/qa/questions.js';
import { htmlCssQA } from '../content-additions/htmlcss/qa/questions.js';
import { sysDesignQA, uxUiQA } from '../content-additions/uxui/qa/questions.js';

/**
 * Robustly injects sections and QA into standalone JSON files.
 * Handles ID mismatches by searching for common patterns if specific IDs fail.
 */
function expandPage({
    jsonName,
    sectionsDir,
    qaArray,
    navTargetId, // e.g. 'iq', 'iq-react', 'html-iq'
    beforeSectionId, // inject new sections before this one (usually the IQ section)
}) {
    const jsonPath = resolve(ROOT, 'content', jsonName);
    if (!existsSync(jsonPath)) {
        console.warn(`[Skip] ${jsonName} not found.`);
        return;
    }

    const data = JSON.parse(readFileSync(jsonPath, 'utf-8'));
    let body = data.body;
    let changed = false;

    // 1. INJECT SECTIONS
    if (sectionsDir && existsSync(sectionsDir)) {
        const files = readdirSync(sectionsDir).filter(f => f.endsWith('.html'));
        for (const file of files) {
            const html = readFileSync(resolve(sectionsDir, file), 'utf-8');
            // Split by section start
            const parts = html.split(/<div class="(?:section|sc)"/).filter(Boolean);
            for (const p of parts) {
                const fullSect = '<div class="sc"' + p;
                const idMatch = fullSect.match(/id="([^"]+)"/i);
                const titleMatch = fullSect.match(/<h2>([^<]+)<\/h2>/i);

                if (idMatch && titleMatch) {
                    const id = idMatch[1];
                    const title = titleMatch[1].trim();

                    if (!body.includes(`id="${id}"`)) {
                        // A. Inject Nav Button into sub-nav - target the .sni or .nav-inner container
                        const navHtml = `<button class="sn" data-s="${id}">${title}</button>`;
                        if (!body.includes(`data-s="${id}"`)) {
                             // Try to find the inner container of the sub-nav
                             const navContainerRegex = /<div class="(?:sni|nav-inner|sub-nav-inner)">/i;
                             if (navContainerRegex.test(body)) {
                                 body = body.replace(navContainerRegex, `$&\n${navHtml}`);
                             } else if (body.includes('</nav>')) {
                                body = body.replace(/<\/div>\s*<\/nav>/, `${navHtml}</div></nav>`);
                             }
                        }

                        // B. Inject Section Content - ensure it's NOT active
                        const cleanSect = fullSect.replace(/\s+active\b/g, ''); 
                        const targetMarker = `id="${navTargetId}"`;
                        if (body.includes(targetMarker)) {
                             const targetRegex = new RegExp(`(<div[^>]+${targetMarker}[^>]*>)`, 'i');
                             body = body.replace(targetRegex, cleanSect + '\n$1');
                        } else if (beforeSectionId && body.includes(`id="${beforeSectionId}"`)) {
                             const targetRegex = new RegExp(`(<div[^>]+id="${beforeSectionId}"[^>]*>)`, 'i');
                             body = body.replace(targetRegex, cleanSect + '\n$1');
                        } else {
                            if (body.includes('</div></main>')) {
                                body = body.replace('</div></main>', `${cleanSect}\n</div></main>`);
                            } else if (body.includes('</div>\n</div>\n</body>')) {
                                body = body.replace('</div>\n</div>\n</body>', `${cleanSect}\n</div>\n</div>\n</body>`);
                            }
                        }
                        changed = true;
                    }
                }
            }
        }
    }

    // 2. INJECT Q&A
    if (qaArray && qaArray.length > 0) {
        let addedCount = 0;
        let qaLines = '';
        for (const item of qaArray) {
            if (!body.includes(item.q)) {
                qaLines += `
                <div class="qa" data-l="${item.level}">
                  <div class="qh">
                    <span class="badg lv ${item.level}">${item.level.toUpperCase()}</span>
                    <span class="qt">${item.q}</span>
                    <span class="to tg">+</span>
                  </div>
                  <div class="qa-b qb">
                    <div class="qi">
                      <p>${item.a}</p>
                    </div>
                  </div>
                </div>\n`;
                addedCount++;
            }
        }

        if (addedCount > 0) {
            const targetMarker = `id="${navTargetId}"`;
            
            if (body.includes(targetMarker)) {
                // Insert after the opening div of the IQ section
                const targetOpenRegex = new RegExp(`(<div[^>]+${targetMarker}[^>]*>)`, 'i');
                body = body.replace(targetOpenRegex, `$1\n${qaLines}`);
                
                // Update the count in the button if it exists
                const countRegex = new RegExp(`(<button[^>]*data-s="${navTargetId}"[^>]*>.*?\\()(\\d+)(\\).*?</button>)`, 'i');
                const match = body.match(countRegex);
                if (match) {
                    const currentCount = parseInt(match[2]);
                    const newCount = currentCount + addedCount;
                    body = body.replace(countRegex, `$1${newCount}$3`);
                }
                changed = true;
            }
        }
    }

    if (changed) {
        data.body = body;
        writeFileSync(jsonPath, JSON.stringify(data, null, 2));
        console.log(`[Success] Expanded ${jsonName}`);
    } else {
        console.log(`[No Change] ${jsonName} already up to date.`);
    }
}

// ---- EXECUTION ----

// Angular
expandPage({
    jsonName: 'standalone-angular.json',
    sectionsDir: resolve(ADDITIONS_DIR, 'angular', 'sections'),
    qaArray: angularQA,
    navTargetId: 'iq',
    beforeSectionId: 'v21'
});

// React
expandPage({
    jsonName: 'standalone-react.json',
    sectionsDir: resolve(ADDITIONS_DIR, 'react', 'sections'),
    qaArray: reactQA,
    navTargetId: 'iq-react',
    beforeSectionId: 'r-perf'
});

// Next.js
expandPage({
    jsonName: 'standalone-nextjs.json',
    sectionsDir: resolve(ADDITIONS_DIR, 'next', 'sections'),
    qaArray: nextQA,
    navTargetId: 'iq-next',
    beforeSectionId: 'n-16'
});

// Javascript
expandPage({
    jsonName: 'standalone-javascript.json',
    sectionsDir: resolve(ADDITIONS_DIR, 'js', 'sections'),
    qaArray: jsQA,
    navTargetId: 'js-iq', // verified in browser recording usually starts with this or similar
    beforeSectionId: 't-javascript'
});

// HTML
expandPage({
    jsonName: 'standalone-html.json',
    sectionsDir: resolve(ADDITIONS_DIR, 'htmlcss', 'sections'),
    qaArray: htmlCssQA.filter(q => q.q.toLowerCase().includes('html') || !q.q.toLowerCase().includes('css')),
    navTargetId: 'html-iq'
});

// CSS
expandPage({
    jsonName: 'standalone-css.json',
    sectionsDir: resolve(ADDITIONS_DIR, 'htmlcss', 'sections'),
    qaArray: htmlCssQA.filter(q => q.q.toLowerCase().includes('css')),
    navTargetId: 'css-iq'
});

// System Design
expandPage({
    jsonName: 'standalone-system-design.json',
    sectionsDir: resolve(ADDITIONS_DIR, 'sysdesign', 'sections'),
    qaArray: sysDesignQA,
    navTargetId: 'fsd-iq'
});

// UX/UI
expandPage({
    jsonName: 'standalone-uxui.json',
    sectionsDir: resolve(ADDITIONS_DIR, 'uxui', 'sections'),
    qaArray: uxUiQA,
    navTargetId: 'ux-iq'
});

console.log("Done merging Phase 2 & 3 extensions.");
