import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CONTENT_DIR = resolve(ROOT, 'content');
const ADDITIONS_DIR = resolve(ROOT, 'content-additions');

import { angularQA } from '../content-additions/angular/qa/questions.js';
import { reactQA } from '../content-additions/react/qa/questions.js';

// ---- ANGULAR ----
function expandAngular() {
  const jsonPath = resolve(CONTENT_DIR, 'angular.json');
  const data = JSON.parse(readFileSync(jsonPath, 'utf-8'));
  let body = data.body;

  const sectionsDir = resolve(ADDITIONS_DIR, 'angular', 'sections');
  if (existsSync(sectionsDir)) {
    const files = readdirSync(sectionsDir).filter(f => f.endsWith('.html'));
    for (const file of files) {
      const html = readFileSync(resolve(sectionsDir, file), 'utf-8');
      const idMatch = html.match(/<div class="section"[^>]*id="([^"]+)"/i);
      const titleMatch = html.match(/<h2>([^<]+)<\/h2>/i);
      
      if (idMatch && titleMatch) {
        const id = idMatch[1];
        const title = titleMatch[1];
        
        const navTarget = '<button class="nav-btn" data-s="v21">';
        const navHtml = `<button class="nav-btn" data-s="${id}">${title}</button>\n  `;
        if (body.includes(navTarget)) {
            if (!body.includes(`data-s="${id}"`)) {
                body = body.replace(navTarget, navHtml + navTarget);
            }
        } else {
            // Backup... if v21 is not found, we don't duplicate injection 
            // if we run the script twice. Assume the script only runs ONCE.
            if (!body.includes(`data-s="${id}"`)) {
              body = body.replace('</div></nav>', `  ${navHtml}</div></nav>`);
            }
        }

        const sectionTarget = '<div class="section" id="v21">';
        if (body.includes(sectionTarget) && !body.includes(`id="${id}"`)) {
            body = body.replace(sectionTarget, html + '\n' + sectionTarget);
        }
        
        console.log(`[Angular] Injected section: ${title}`);
      }
    }
  }

  // Inject Q&A
  if (angularQA && angularQA.length > 0) {
    let qaHtml = '';
    for (const item of angularQA) {
      if (!body.includes(item.q)) {
        qaHtml += `
        <div class="qa" data-l="${item.level}">
          <div class="qh">
            <span class="badg ${item.level}">${item.level.toUpperCase()}</span>
            ${item.q}
            <span class="to">+</span>
          </div>
          <div class="qa-b">
            <p>${item.a}</p>
          </div>
        </div>\n`;
      }
    }
    
    if (qaHtml.length > 0) {
      const fbarMatch = body.match(/(<div class="section" id="iq">[\s\S]*?<div class="fbar">[\s\S]*?<\/div>)/);
      if (fbarMatch) {
          body = body.replace(fbarMatch[1], fbarMatch[1] + '\n' + qaHtml);
          console.log(`[Angular] Injected ${angularQA.length} Q&A.`);
      }
    }
  }

  data.body = body;
  writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

// ---- REACT ----
function expandReact() {
  const jsonPath = resolve(CONTENT_DIR, 'react-nextjs.json');
  const data = JSON.parse(readFileSync(jsonPath, 'utf-8'));
  let body = data.body;

  const sectionsDir = resolve(ADDITIONS_DIR, 'react', 'sections');
  if (existsSync(sectionsDir)) {
    const files = readdirSync(sectionsDir).filter(f => f.endsWith('.html'));
    for (const file of files) {
      const html = readFileSync(resolve(sectionsDir, file), 'utf-8');
      
      // Handle multiple sections per file (like react-advanced.html)
      const sections = html.split('<div class="section"').filter(Boolean);
      
      for (const sect of sections) {
        const fullSect = '<div class="section"' + sect;
        const idMatch = fullSect.match(/id="([^"]+)"/i);
        const titleMatch = fullSect.match(/<h2>([^<]+)<\/h2>/i);
        
        if (idMatch && titleMatch) {
          const id = idMatch[1];
          const title = titleMatch[1];
          
          if (!body.includes(`id="${id}"`)) {
            // Find React tech section specifically to add sub-nav and section
            const reactNavTarget = '<button class="snav" data-s="r-perf">';
            const navHtml = `<button class="snav" data-s="${id}">${title}</button>\n  `;
            if (body.includes(reactNavTarget)) {
                body = body.replace(reactNavTarget, navHtml + reactNavTarget);
            }

            const sectionTarget = '<div class="sc" id="r-perf">'; // Notice class is sc for react sections
            // Need to change the injection class from "section" to "sc"
            const finalHtml = fullSect.replace(/class="section"/, 'class="sc"');
            
            if (body.includes(sectionTarget)) {
                body = body.replace(sectionTarget, finalHtml + '\n' + sectionTarget);
            }
            console.log(`[React] Injected section: ${title}`);
          }
        }
      }
    }
  }

  // Inject Q&A into React (iq-react)
  if (reactQA && reactQA.length > 0) {
    let qaHtml = '';
    for (const item of reactQA) {
      if (!body.includes(item.q)) { // Idempotent check
        qaHtml += `
        <div class="qa" data-l="${item.level}">
          <div class="qh">
            <span class="badg ${item.level}">${item.level.toUpperCase()}</span>
            ${item.q}
            <span class="to">+</span>
          </div>
          <div class="qa-b">
            <p>${item.a}</p>
          </div>
        </div>\n`;
      }
    }
    
    if (qaHtml.length > 0) {
      if (body.includes('<div class="section" id="iq-react">')) {
          body = body.replace('<div class="section" id="iq-react">', '<div class="section" id="iq-react">\n' + qaHtml);
          console.log(`[React] Injected ${reactQA.length} Q&A.`);
      }
    }
  }

  data.body = body;
  writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

// ---- NEXT JS ----
import { nextQA } from '../content-additions/next/qa/questions.js';

function expandNext() {
  const jsonPath = resolve(CONTENT_DIR, 'react-nextjs.json');
  const data = JSON.parse(readFileSync(jsonPath, 'utf-8'));
  let body = data.body;

  const sectionsDir = resolve(ADDITIONS_DIR, 'next', 'sections');
  if (existsSync(sectionsDir)) {
    const files = readdirSync(sectionsDir).filter(f => f.endsWith('.html'));
    for (const file of files) {
      const html = readFileSync(resolve(sectionsDir, file), 'utf-8');
      const sections = html.split('<div class="sc"').filter(Boolean);
      
      for (const sect of sections) {
        const fullSect = '<div class="sc"' + sect;
        const idMatch = fullSect.match(/id="([^"]+)"/i);
        const titleMatch = fullSect.match(/<h2>([^<]+)<\/h2>/i);
        
        if (idMatch && titleMatch) {
          const id = idMatch[1];
          const title = titleMatch[1];
          
          if (!body.includes(`id="${id}"`)) {
            // Find Next.js tech section specifically to add sub-nav and section
            const nextNavTarget = '<button class="snav" data-s="n-16">';
            const navHtml = `<button class="snav" data-s="${id}">${title}</button>\n  `;
            if (body.includes(nextNavTarget)) {
                body = body.replace(nextNavTarget, navHtml + nextNavTarget);
            }

            const sectionTarget = '<div class="sc" id="n-16">';
            if (body.includes(sectionTarget)) {
                body = body.replace(sectionTarget, fullSect + '\n' + sectionTarget);
            }
            console.log(`[Next.js] Injected section: ${title}`);
          }
        }
      }
    }
  }

  // Inject Q&A into Next.js (iq-next)
  if (nextQA && nextQA.length > 0) {
    let qaHtml = '';
    for (const item of nextQA) {
      if (!body.includes(item.q)) { // Idempotent check
        qaHtml += `
        <div class="qa" data-l="${item.level}">
          <div class="qh">
            <span class="badg ${item.level}">${item.level.toUpperCase()}</span>
            ${item.q}
            <span class="to">+</span>
          </div>
          <div class="qa-b">
            <p>${item.a}</p>
          </div>
        </div>\n`;
      }
    }
    
    if (qaHtml.length > 0) {
      if (body.includes('<div class="section" id="iq-next">')) {
          body = body.replace('<div class="section" id="iq-next">', '<div class="section" id="iq-next">\n' + qaHtml);
          console.log(`[Next.js] Injected ${nextQA.length} Q&A.`);
      }
    }
  }

  data.body = body;
  writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

// ---- JAVASCRIPT & FRONTEND ----
import { jsQA } from '../content-additions/js/qa/questions.js';

function expandJs() {
  const jsonPathConcepts = resolve(CONTENT_DIR, 'frontend-concepts.json');
  if (!existsSync(jsonPathConcepts)) return;
  
  const dataConcepts = JSON.parse(readFileSync(jsonPathConcepts, 'utf-8'));
  let bodyConcepts = dataConcepts.body;

  // 1. Inject Sections
  const sectionsDir = resolve(ADDITIONS_DIR, 'js', 'sections');
  if (existsSync(sectionsDir)) {
    const files = readdirSync(sectionsDir).filter(f => f.endsWith('.html'));
    for (const file of files) {
      const html = readFileSync(resolve(sectionsDir, file), 'utf-8');
      const sections = html.split('<div class="sc"').filter(Boolean);
      
      for (const sect of sections) {
        const fullSect = '<div class="sc"' + sect;
        const idMatch = fullSect.match(/id="([^"]+)"/i);
        const titleMatch = fullSect.match(/<h2>([^<]+)<\/h2>/i);
        
        if (idMatch && titleMatch) {
          const id = idMatch[1];
          const title = titleMatch[1];
          
          if (!bodyConcepts.includes(`id="${id}"`)) {
            // Append to nav-inner
            const navHtml = `<button class="nav-btn" data-s="${id}">${title}</button>\n  `;
            if (!bodyConcepts.includes(`data-s="${id}"`)) {
                bodyConcepts = bodyConcepts.replace('</div></nav>', `  ${navHtml}</div></nav>`);
            }

            // Target the Interview Questions section using either class
            const sectionTargetRegex = /(<div class="(?:sc|section)" id="js-iq">)/;
            const targetMatch = bodyConcepts.match(sectionTargetRegex);
            if (targetMatch) {
                bodyConcepts = bodyConcepts.replace(targetMatch[1], fullSect + '\n' + targetMatch[1]);
                console.log(`[JS] Injected section: ${title}`);
            }
          }
        }
      }
    }
  }

  // 2. Inject Q&A directly into js-iq area
  if (jsQA && jsQA.length > 0) {
    let qaHtml = '';
    for (const item of jsQA) {
      if (!bodyConcepts.includes(item.q)) {
        qaHtml += `
        <div class="qa" data-l="${item.level}">
          <div class="qh">
            <span class="badg ${item.level}">${item.level.toUpperCase()}</span>
            ${item.q}
            <span class="to">+</span>
          </div>
          <div class="qa-b">
            <p>${item.a}</p>
          </div>
        </div>\n`;
      }
    }
    
    if (qaHtml.length > 0) {
      if (bodyConcepts.includes('id="js-iq">')) {
          bodyConcepts = bodyConcepts.replace(/(id="js-iq">[^<]*<h2[^>]*>[^<]*<\/h2>)/, '$1\n' + qaHtml);
          console.log(`[JS] Injected ${jsQA.length} Q&A.`);
      }
    }
  }

  dataConcepts.body = bodyConcepts;
  writeFileSync(jsonPathConcepts, JSON.stringify(dataConcepts, null, 2));
}

// ---- Phase 3: SD & UX/UI ----
import { htmlCssQA } from '../content-additions/htmlcss/qa/questions.js';
import { sysDesignQA, uxUiQA } from '../content-additions/uxui/qa/questions.js';

function injectIntoTab(body, tabId, sectionsDir, qaArray) {
    let tabStart = body.indexOf(`id="${tabId}"`);
    if (tabStart === -1) {
        // Fallback: the tab might be 't-uxui' or 't-ux' or 't-fsd'
        const possibleTabs = {
           't-sd': ['t-system-design', 't-systemdesign', 't-fsd'],
           't-ux': ['t-uxui', 't-ux-ui', 't-uiux', 't-ux']
        };
        const alts = possibleTabs[tabId] || [];
        for (const alt of alts) {
            tabStart = body.indexOf(`id="${alt}"`);
            if (tabStart !== -1) break;
        }
        if (tabStart === -1) return body;
    }
    
    // Find the '.fb' (filter bar) within this tab
    let fbIdx = body.indexOf('<div class="fb">', tabStart);
    if (fbIdx === -1) return body;
    
    let fbEnd = body.indexOf('</div>', fbIdx) + 6;

    let beforeFb = body.substring(0, fbIdx);
    let theFb = body.substring(fbIdx, fbEnd);
    let afterFb = body.substring(fbEnd);

    // 1. Sections
    let sectionsHtml = '';
    if (existsSync(sectionsDir)) {
      const files = readdirSync(sectionsDir).filter(f => f.endsWith('.html'));
      for (const file of files) {
        let html = readFileSync(resolve(sectionsDir, file), 'utf-8');
        const sections = html.split('<div class="sc"').filter(Boolean);
        for (const sect of sections) {
          const fullSect = '<div class="sc"' + sect;
          const idMatch = fullSect.match(/id="([^"]+)"/i);
          const tMatch = fullSect.match(/<h2>([^<]+)<\/h2>/i);
          if (idMatch && !body.includes(`id="${idMatch[1]}"`)) {
             sectionsHtml += fullSect + '\n';
             if (tMatch) console.log(`[Phase3] Injected section: ${tMatch[1]}`);
          }
        }
      }
    }

    // 2. QAs
    let qaHtml = '';
    let qaCount = 0;
    if (qaArray) {
       for (const item of qaArray) {
         if (!body.includes(item.q)) {
            const lvClass = item.level === 'basic' ? 'b' : item.level === 'intermediate' ? 'i' : 'a';
            qaHtml += `
            <div class="qa" data-l="${lvClass}">
              <div class="qh">
                <span class="lv ${lvClass}">${item.level.substring(0,1).toUpperCase()}</span>
                <span class="qt">${item.q}</span>
                <span class="tg">+</span>
              </div>
              <div class="qb">
                <div class="qi">
                  <p>${item.a}</p>
                </div>
              </div>
            </div>\n`;
            qaCount++;
         }
       }
    }
    
    if (qaCount > 0) console.log(`[Phase3] Injected ${qaCount} Q&A into ${tabId}`);

    return beforeFb + sectionsHtml + theFb + '\n' + qaHtml + afterFb;
}

function expandHtmlCssSdUxui() {
  const jsonPath = resolve(CONTENT_DIR, 'html-css-sd-full.json');
  if (!existsSync(jsonPath)) return;
  const data = JSON.parse(readFileSync(jsonPath, 'utf-8'));
  let body = data.body;

  // HTML/CSS (t-html or just first matched fb)
  // We rewrite our HTML block using the new resilient method
  body = injectIntoTab(body, 't-html', resolve(ADDITIONS_DIR, 'htmlcss', 'sections'), htmlCssQA);
  
  // Phase 3: System Design
  body = injectIntoTab(body, 't-sd', resolve(ADDITIONS_DIR, 'sysdesign', 'sections'), sysDesignQA);

  // Phase 3: UX/UI
  body = injectIntoTab(body, 't-ux', resolve(ADDITIONS_DIR, 'uxui', 'sections'), uxUiQA);

  data.body = body;
  writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

expandAngular();
expandReact();
expandNext();
expandJs();
expandHtmlCssSdUxui();
console.log("Done merging extensions.");
