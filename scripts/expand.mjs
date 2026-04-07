import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CONTENT_DIR = resolve(ROOT, 'content');
const ADDITIONS_DIR = resolve(ROOT, 'content-additions');

import { angularQA } from '../content-additions/angular/qa/questions.js';
import { reactQA } from '../content-additions/react/qa/questions.js';
import { nextQA } from '../content-additions/next/qa/questions.js';
import { jsQA } from '../content-additions/js/qa/questions.js';
import { htmlCssQA } from '../content-additions/htmlcss/qa/questions.js';
import { sysDesignQA, uxUiQA } from '../content-additions/uxui/qa/questions.js';

// ---- ANGULAR ----
function expandAngular() {
  const jsonPath = resolve(CONTENT_DIR, 'standalone-angular.json');
  if (!existsSync(jsonPath)) return;
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
        const navHtml = `<button class="nav-btn" data-s="${id}">${title}</button>\n  `;
        if (!body.includes(`data-s="${id}"`)) {
           // Insert just before end of nav
           if (body.includes('</div>\n    <div class="main-content">')) {
             body = body.replace('</div>\n    <div class="main-content">', `  ${navHtml}</div>\n    <div class="main-content">`);
           } else {
             body = body.replace('</div></nav>', `  ${navHtml}</div></nav>`);
           }
        }
        const sectionTarget = '<div class="section" id="v21">';
          if (body.includes(sectionTarget) && !body.includes(`id="${id}"`)) {
             body = body.replace(sectionTarget, html + '\n' + sectionTarget);
          }
        }
    }
  }
 
  if (angularQA && angularQA.length > 0) {
    let qaHtml = '';
    for (const item of angularQA) {
      if (!body.includes(item.q)) {
        qaHtml += `
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
      }
    }
    if (qaHtml.length > 0) {
      const fbarMatch = body.match(/(<div class="(?:section|sc)" id="iq">[\s\S]*?<div class="(?:fbar|fb)">[\s\S]*?<\/div>)/);
      if (fbarMatch) {
          body = body.replace(fbarMatch[1], fbarMatch[1] + '\n' + qaHtml);
      }
    }
  }
  data.body = body;
  writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

// ---- REACT ----
function expandReact() {
  const jsonPath = resolve(CONTENT_DIR, 'standalone-react.json');
  if (!existsSync(jsonPath)) return;
  const data = JSON.parse(readFileSync(jsonPath, 'utf-8'));
  let body = data.body;

  const sectionsDir = resolve(ADDITIONS_DIR, 'react', 'sections');
  if (existsSync(sectionsDir)) {
    const files = readdirSync(sectionsDir).filter(f => f.endsWith('.html'));
    for (const file of files) {
      const html = readFileSync(resolve(sectionsDir, file), 'utf-8');
      const sections = html.split('<div class="section"').filter(Boolean);
      for (const sect of sections) {
        const fullSect = '<div class="section"' + sect;
        const idMatch = fullSect.match(/id="([^"]+)"/i);
        const titleMatch = fullSect.match(/<h2>([^<]+)<\/h2>/i);
        if (idMatch && titleMatch) {
          const id = idMatch[1];
          const title = titleMatch[1];
          if (!body.includes(`id="${id}"`)) {
            const navHtml = `<button class="nav-btn" data-s="${id}">${title}</button>\n  `;
            if (!body.includes(`data-s="${id}"`)) {
                // Find React tech section specifically to add sub-nav and section
                const reactNavTarget = 'data-s="r-perf"';
                if (body.includes(reactNavTarget)) {
                    body = body.replace(reactNavTarget, `data-s="${id}">...</button>\n  <button class="nav-btn" ` + reactNavTarget);
                    // That replacement is a bit risky due to existing buttons. 
                    // Let's just find the end of the nav bar.
                } 
                if (body.includes('</div></nav>')) {
                    body = body.replace('</div></nav>', `  ${navHtml}</div></nav>`);
                }
            }
            const sectionTarget = 'id="r-perf"'; 
            if (body.includes(sectionTarget)) {
                const targetMatch = body.match(new RegExp(`(<div class="(?:section|sc)" ${sectionTarget}>)`));
                if (targetMatch) {
                    body = body.replace(targetMatch[1], fullSect + '\n' + targetMatch[1]);
                }
            }
          }
        }
      }
    }
  }

  if (reactQA && reactQA.length > 0) {
    let qaHtml = '';
    for (const item of reactQA) {
      if (!body.includes(item.q)) { 
        qaHtml += `
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
      }
    }
    const iqTarget = body.match(/id="iq-react">/);
    if (qaHtml.length > 0 && iqTarget) {
        const tagMatch = body.match(/(<div class="(?:section|sc)" id="iq-react">)/);
        if (tagMatch) body = body.replace(tagMatch[1], tagMatch[1] + '\n' + qaHtml);
    }
  }
  data.body = body;
  writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

// ---- NEXT JS ----
function expandNext() {
  const jsonPath = resolve(CONTENT_DIR, 'standalone-nextjs.json');
  if (!existsSync(jsonPath)) return;
  const data = JSON.parse(readFileSync(jsonPath, 'utf-8'));
  let body = data.body;

  const sectionsDir = resolve(ADDITIONS_DIR, 'next', 'sections');
  if (existsSync(sectionsDir)) {
    const files = readdirSync(sectionsDir).filter(f => f.endsWith('.html'));
    for (const file of files) {
      const html = readFileSync(resolve(sectionsDir, file), 'utf-8');
      const sections = html.split(/<div class="(?:section|sc)"/).filter(Boolean);
      for (const sect of sections) {
        const fullSect = '<div class="section"' + sect;
        const idMatch = fullSect.match(/id="([^"]+)"/i);
        const titleMatch = fullSect.match(/<h2>([^<]+)<\/h2>/i);
        if (idMatch && titleMatch) {
          const id = idMatch[1];
          const title = titleMatch[1];
          if (!body.includes(`id="${id}"`)) {
            const navHtml = `<button class="nav-btn" data-s="${id}">${title}</button>\n  `;
            if (!body.includes(`data-s="${id}"`)) {
               if (body.includes('</div></nav>')) {
                   body = body.replace('</div></nav>', `  ${navHtml}</div></nav>`);
               }
            }
            const sectionTarget = 'id="n-16"';
            const targetMatch = body.match(new RegExp(`(<div class="(?:section|sc)" ${sectionTarget}>)`));
            if (targetMatch) {
                body = body.replace(targetMatch[1], fullSect + '\n' + targetMatch[1]);
            }
          }
        }
      }
    }
  }

  if (nextQA && nextQA.length > 0) {
    let qaHtml = '';
    for (const item of nextQA) {
      if (!body.includes(item.q)) {
        qaHtml += `
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
      }
    }
    const iqTarget = body.match(/id="iq-next">/);
    if (qaHtml.length > 0 && iqTarget) {
        const tagMatch = body.match(/(<div class="(?:section|sc)" id="iq-next">)/);
        if (tagMatch) body = body.replace(tagMatch[1], tagMatch[1] + '\n' + qaHtml);
    }
  }
  data.body = body;
  writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

// ---- JAVASCRIPT ----
function expandJs() {
  const jsonPath = resolve(CONTENT_DIR, 'standalone-javascript.json');
  if (!existsSync(jsonPath)) return;
  const data = JSON.parse(readFileSync(jsonPath, 'utf-8'));
  let body = data.body;

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
        if (idMatch && titleMatch && !body.includes(`id="${idMatch[1]}"`)) {
            const navHtml = `<button class="nav-btn" data-s="${idMatch[1]}">${titleMatch[1]}</button>\n  `;
            if (!body.includes(`data-s="${idMatch[1]}"`)) {
                body = body.replace('</div></nav>', `  ${navHtml}</div></nav>`);
            }
            const targetMatch = body.match(/(<div class="(?:sc|section)" id="js-iq">)/);
            if (targetMatch) {
                body = body.replace(targetMatch[1], fullSect + '\n' + targetMatch[1]);
            }
        }
      }
    }
  }

  if (jsQA && jsQA.length > 0) {
    let qaHtml = '';
    for (const item of jsQA) {
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
    if (qaHtml.length > 0 && body.includes('id="js-iq"')) {
        body = body.replace(/(id="js-iq"[^>]*>[^<]*<h2[^>]*>[^<]*<\/h2>)/, '$1\n' + qaHtml);
    }
  }
  data.body = body;
  writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

// ---- GENERAL TAB INJECTION (HTML/CSS/SD/UX) ----
function injectIntoRawFile(jsonName, sectionsDir, qaArray) {
    const jsonPath = resolve(CONTENT_DIR, jsonName);
    if (!existsSync(jsonPath)) return;
    const data = JSON.parse(readFileSync(jsonPath, 'utf-8'));
    let body = data.body;

    let fbIdx = body.indexOf('<div class="fb">');
    if (fbIdx === -1) {
       fbIdx = body.indexOf('<div class="fbar">'); 
    }
    if (fbIdx !== -1) {
       const endTag = body.substring(fbIdx).indexOf('</div>');
       if (endTag !== -1) {
           let fbEnd = fbIdx + endTag + 6;
           let beforeFb = body.substring(0, fbIdx);
           let theFb = body.substring(fbIdx, fbEnd);
           let afterFb = body.substring(fbEnd);

           let sectionsHtml = '';
           if (sectionsDir && existsSync(sectionsDir)) {
             const files = readdirSync(sectionsDir).filter(f => f.endsWith('.html'));
             for (const file of files) {
               let html = readFileSync(resolve(sectionsDir, file), 'utf-8');
               const sections = html.split(/<div class="s[ec]+"|id="/).filter(Boolean); // some safety
               // Instead of complex split, just inject the entire file if we don't already have its main header
               const idMatch = html.match(/id="([^"]+)"/i);
               if (idMatch && !body.includes(`id="${idMatch[1]}"`)) {
                   sectionsHtml += html + '\n';
               }
             }
           }

           let qaHtml = '';
           if (qaArray) {
              for (const item of qaArray) {
                if (!body.includes(item.q)) {
                   // Some modules use b/i/a others use basic/intermediate/advanced classes. We will supply both or the mapped.
                   const cl = item.level === 'basic' ? 'b basic' : item.level === 'intermediate' ? 'i intermediate' : 'a advanced';
                   const lbl = item.level.length > 1 ? item.level.toUpperCase() : (item.level === 'b' ? 'BASIC' : item.level === 'i' ? 'INTERMEDIATE' : 'ADVANCED');
                   qaHtml += `
                   <div class="qa" data-l="${item.level}">
                     <div class="qh">
                       <span class="badg lv ${cl}">${lbl}</span>
                       <span class="qt">${item.q}</span>
                       <span class="to tg">+</span>
                     </div>
                     <div class="qa-b qb">
                       <div class="qi">
                         <p>${item.a}</p>
                       </div>
                     </div>
                   </div>\n`;
                }
              }
           }
           
           body = beforeFb + sectionsHtml + theFb + '\n' + qaHtml + afterFb;
           data.body = body;
           writeFileSync(jsonPath, JSON.stringify(data, null, 2));
           console.log(`[Phase4] Updated ${jsonName}`);
       }
    }
}

expandAngular();
expandReact();
expandNext();
expandJs();

injectIntoRawFile('standalone-html.json', resolve(ADDITIONS_DIR, 'htmlcss', 'sections'), htmlCssQA);
injectIntoRawFile('standalone-css.json', resolve(ADDITIONS_DIR, 'htmlcss', 'sections'), htmlCssQA); // html and css shared the qa file? Actually htmlCssQa has both, we inject all for now or we filter
injectIntoRawFile('standalone-system-design.json', resolve(ADDITIONS_DIR, 'sysdesign', 'sections'), sysDesignQA);
injectIntoRawFile('standalone-uxui.json', resolve(ADDITIONS_DIR, 'uxui', 'sections'), uxUiQA);

console.log("Done merging extensions into standalone files.");
