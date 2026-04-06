/**
 * Extract content from HTML encyclopedia files.
 * Pulls out CSS, body HTML, and JS from each source file.
 * Outputs JSON to content/ directory.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SOURCE = resolve(ROOT, '..');  // parent dir with HTML files
const OUT = resolve(ROOT, 'content');

mkdirSync(OUT, { recursive: true });

// Files to extract (unique/superset only)
const sources = [
  { file: 'angular-mastery-encyclopedia.html', slug: 'angular' },
  { file: 'react-nextjs-mastery-encyclopedia.html', slug: 'react-nextjs' },
  { file: 'frontend-mastery-bible.html', slug: 'frontend-concepts' },
  { file: 'frontend-mastery-bible (1).html', slug: 'frontend-qa' },
  { file: 'html-css-systemdesign-bible.html', slug: 'html-css-sd-small' },
  { file: 'html-css-systemdesign-bible (1).html', slug: 'html-css-sd-full' },
];

for (const { file, slug } of sources) {
  const filePath = resolve(SOURCE, file);
  console.log(`Extracting: ${file} → ${slug}.json`);
  
  const html = readFileSync(filePath, 'utf-8');
  
  // Extract CSS from all <style> tags
  const cssMatches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
  const css = cssMatches.map(m => m[1]).join('\n');
  
  // Extract body content
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : '';
  
  // Remove <script> tags from body (we extract them separately)
  const scriptMatches = [...body.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
  const scripts = scriptMatches.map(m => m[1]).join('\n');
  body = body.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').trim();
  
  // Extract title
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : slug;
  
  // Extract Google Fonts links
  const fontMatches = [...html.matchAll(/<link[^>]*href="(https:\/\/fonts\.googleapis\.com[^"]+)"[^>]*>/gi)];
  const fonts = fontMatches.map(m => m[1]);
  
  const result = { slug, title, css, body, scripts, fonts };
  
  writeFileSync(resolve(OUT, `${slug}.json`), JSON.stringify(result, null, 2));
  console.log(`  ✓ CSS: ${css.length} chars, Body: ${body.length} chars, Scripts: ${scripts.length} chars`);
}

console.log('\nDone! Content extracted to content/ directory.');
