# HTML Gap Audit

Source files reviewed:

- `data/topics/html.json`
- `docs/plans/2026-04-09-html-design.md`
- `docs/plans/2026-04-09-javascript-audit.md`
- `docs/plans/2026-04-09-react-audit.md`
- `docs/plans/2026-04-09-nextjs-audit.md`
- `docs/plans/2026-04-09-angular-audit.md`

## Cross-cutting findings

- The current HTML topic has 12 tabs and 12 sections, with all interview content centralized in one bank: `html-iq` contains 160 questions and every other section has zero Q&A.
- Metadata drift note: the `html-iq` tab label still says `160`, while the section intro says `52 interview questions`. The audit should treat `160` as the source-of-truth count until the content is rewritten and the metadata is aligned.
- The topic is useful, but it is not yet a clean HTML mastery curriculum. It behaves like a mixed HTML, CSS, web-platform, and interview reference file instead of a progressive 14-chapter path.
- The strongest raw material is already present. The file has solid coverage of document structure, semantic elements, tables, lists, forms, media, metadata, resource hints, accessibility, browser APIs, and interview prompts.
- The weakest part is structure. HTML fundamentals are mixed with applied layers, CSS-specific material, and platform topics that should be separated into later chapters or reserved for the future CSS rewrite.
- The current file has clear duplication:
  - `hcs` repeats ideas already present in `html-sem`, `html-media`, `html-advanced`, `html-perf`, `hc-a11y`, and `html-tags`
  - `html-tags` is a tag catalog that repeats chapter material without adding much pedagogy
  - `web-perf` overlaps with `html-perf`
  - `hc-modern` and `css-2025` are CSS topics, not HTML topics
- Several current cards already use 2026-relevant HTML concepts, but they are not grouped into one coherent teaching path:
  - `dialog`
  - `popover`
  - `fetchpriority`
  - responsive images
  - `ValidityState`
  - `setCustomValidity()`
  - semantic landmarks and ARIA boundaries
- Some legacy cards contain malformed or noisy raw HTML, so the rewrite should preserve the underlying idea but not copy the source markup verbatim.

## What The Current Topic Gets Right

- `html-sem` is a strong base for the rewrite because it already covers document structure, semantic elements, forms, accessibility, HTML APIs, and SEO in one place.
- `html-tables-lists` gives us a good starting point for lists, tables, and native disclosure patterns.
- `html-media` already includes the important media and asset-loading ideas: responsive images, video, audio, embeds, and native component primitives.
- `html-advanced` contains useful browser-platform material that can be moved into the later HTML chapters without being discarded.
- `html-perf` already has a practical performance foundation, especially around preload, prefetch, preconnect, script loading, metadata, and resource optimization.
- `hc-a11y` already distinguishes semantic elements from ARIA-heavy patterns, which is the right direction for the accessibility chapter.
- `html-iq` has enough volume to support a serious interview layer once it is redistributed and deduplicated by chapter.

## What Is Mixed Or Duplicated

- `html-sem` is overloaded. It mixes document structure, semantics, forms, accessibility, APIs, and SEO in one section.
- `hcs` is a cheat-sheet section, not a chapter. It mixes rendering pipeline notes, resource hints, SEO, validation, a11y, performance, web components, security, storage, and media loading.
- `html-media` includes Web Components, which belongs in a later native platform chapter rather than in the media chapter.
- `html-advanced` is better thought of as browser-platform APIs than advanced HTML.
- `html-perf` blends HTML metadata, script loading, resource hints, and general web performance without a clean boundary.
- `hc-modern` and `css-2025` are CSS learning, not HTML learning, and should be reserved for the CSS rewrite.
- `web-perf` is useful, but it is a performance appendix, not a core HTML chapter.
- `html-tags` is a broad tag reference that duplicates the chapter material instead of improving mastery by itself.
- `html-iq` centralizes interview prep too aggressively instead of reinforcing each chapter.

## 2026-Sensitive Corrections

- `dialog` should be taught as a native top-layer dialog element with `showModal()` and `close()`, not as just another styled modal container.
- `popover` should be taught as a native top-layer overlay pattern, distinct from custom dropdown code and separate from modal dialogs.
- `fetchpriority` should be presented as a resource priority hint, not a guarantee. It belongs with resource-loading and LCP-oriented asset strategy.
- Responsive images should be taught as two separate decisions:
  - `picture` for art direction and format fallback
  - `srcset` plus `sizes` for candidate selection and density switching
- Form validation should be taught through the native constraint validation model:
  - `ValidityState`
  - `checkValidity()`
  - `reportValidity()`
  - `setCustomValidity()`
- Semantics and ARIA should be taught with a strict boundary:
  - native HTML first
  - ARIA only when native semantics cannot express the interaction
  - do not use ARIA to fake a button, link, or landmark that already exists natively

## Formal Migration Map

### Keep in core HTML

- `html-sem`
  - document structure
  - semantic text and page elements
  - forms basics
  - core HTML usage examples
- `html-tables-lists`
  - lists
  - tables
  - disclosure patterns that belong in the HTML fundamentals path

### Move to later HTML chapters

- `html-media`
  - responsive images
  - media embeds
  - video and audio
  - Web Components should move to the later native platform chapter
- `html-advanced`
  - Intersection Observer
  - Resize Observer
  - Mutation Observer
  - drag and drop
  - storage and DOM integration points
- `html-perf`
  - preload, prefetch, preconnect
  - script loading
  - metadata and resource-loading guidance
- `web-perf`
  - Core Web Vitals framing
  - image and asset optimization
  - resource prioritization
  - performance thresholds and diagnostics
- `hc-a11y`
  - semantic boundaries
  - ARIA usage rules
  - accessible naming and relationships

### Reserve for CSS rewrite

- `hc-modern`
  - modern selectors
  - layout responsiveness
- `css-2025`
  - anchor positioning
  - view transitions
  - cascade layers
  - relative color syntax

### Merge into recap/reference/interview sections

- `hcs`
  - the cheat-sheet shape is useful, but the content is too mixed to remain a primary chapter
  - its strongest ideas should be redistributed into the chapter recaps and the final mastery chapter
- `html-tags`
  - the tag map is valuable as a reference appendix, but it should not be the main teaching path
  - split its useful entries into the relevant chapters and keep the rest as fast recall material
- `html-iq`
  - keep the interview content, but redistribute the best questions across the chapters and leave the hardest ones for the final capstone
  - reserve the CSS-only interview cluster for the CSS rewrite, including the existing `box-sizing`, `z-index`, Flexbox alignment, and BEM questions
  - keep the security-adjacent HTML cluster in the HTML rewrite so it lands in a later applied chapter or the final capstone instead of being dropped

### Overloaded Section Clusters

- `html-sem`
  - cluster A: document structure, doctype, `html`, `head`, `body`, and metadata fundamentals
  - cluster B: text semantics, links, URLs, and inline meaning
  - cluster C: forms, labels, controls, submission, and validation
  - cluster D: semantic landmarks, page architecture, and accessibility boundaries
  - cluster E: SEO-facing metadata that belongs in the later applied chapters
- `hcs`
  - cluster A: reference snippets that support the core HTML chapters
  - cluster B: validation and accessibility notes that belong in the forms and a11y chapters
  - cluster C: performance and resource-loading notes that belong in the later HTML performance chapter
  - cluster D: browser-platform and security notes that belong in the later native-platform and capstone chapters
- `html-iq`
  - cluster A: core HTML interview questions to distribute across the chapter-level Q&A
  - cluster B: CSS-only interview questions reserved for the future CSS rewrite
  - cluster C: security-adjacent HTML questions to preserve in the later applied HTML chapters or capstone

## Gap Map

| Target chapter | Current source ids | Decision | What needs to be carried forward |
| --- | --- | --- | --- |
| HTML Origins, Standards, and Browser Parsing | `html-sem`, `hcs`, `html-tags` | Keep in core HTML + merge into recap/reference/interview sections | Doctype, parser behavior, standards mode, document entry points, and a small number of browser-parse drills |
| Document Structure, Doctype, Head, Body, and Metadata Foundations | `html-sem`, `html-perf`, `hcs` | Keep in core HTML + move to later HTML chapters | `doctype`, `html`, `head`, `body`, charset, viewport, title, canonical, metadata and script placement |
| Text Semantics, Links, URLs, and Document Meaning | `html-sem`, `html-tags` | Keep in core HTML + merge into recap/reference/interview sections | Text semantics, link behavior, URL-aware markup, anchors, abbreviations, time, and inline meaning |
| Sectioning Content, Landmarks, Outlines, and Page Architecture | `html-sem`, `hc-a11y`, `hcs` | Keep in core HTML + move to later HTML chapters | `main`, `nav`, `header`, `footer`, `article`, `section`, `aside`, landmark behavior, heading discipline |
| Lists, Tables, and Data Markup | `html-tables-lists`, `html-tags` | Keep in core HTML | Ordered, unordered, description lists, tables, headers, captions, and accessible table relationships |
| Media, Embeds, Images, Audio, Video, and Responsive Asset Markup | `html-media`, `html-perf`, `web-perf`, `hcs` | Move to later HTML chapters | `img`, `picture`, `srcset`, `sizes`, `video`, `audio`, `iframe`, `track`, resource loading, and CLS prevention |
| Forms, Controls, Validation, and Submission Mechanics | `html-sem`, `html-tags`, `hcs` | Keep in core HTML + move to later HTML chapters | Labels, controls, submission, validation, `ValidityState`, `checkValidity()`, `reportValidity()`, and `setCustomValidity()` |
| Interactive HTML: `details`, `dialog`, `popover`, Disclosure, and Templates | `html-tables-lists`, `html-sem`, `html-tags` | Move to later HTML chapters | `details`, `summary`, `dialog`, `popover`, templates, and progressive enhancement patterns |
| Custom Data, Attributes, DOM Hooks, and Integration Points | `html-tags`, `html-sem`, `html-advanced` | Move to later HTML chapters | `data-*`, attributes as hooks, DOM integration, and boundaries between HTML and JavaScript |
| HTML Architecture, Anti-Patterns, Browser Quirks, and Interview Traps | `hcs`, `html-tags`, `html-iq` | Merge into recap/reference/interview sections | Misuse patterns, browser quirks, accessibility traps, and chapter-level debugging prompts |
| SEO and Search-Facing Markup | `html-sem`, `html-perf`, `hcs` | Move to later HTML chapters | Canonical, robots, Open Graph, structured data, metadata strategy, and search-facing document hints |
| Accessibility, Semantics, ARIA Boundaries, and Form Accessibility | `hc-a11y`, `html-sem`, `hcs` | Move to later HTML chapters | Semantic-first accessibility, ARIA boundaries, accessible names, focus, and form accessibility patterns |
| Performance-Focused HTML and Resource Loading | `html-perf`, `web-perf`, `hcs` | Move to later HTML chapters | Resource hints, script strategy, image optimization, loading priorities, and performance diagnostics |
| Native Browser APIs, Platform Features, and Interview Mastery | `html-advanced`, `html-media`, `hcs`, `html-iq` | Move to later HTML chapters + merge into recap/reference/interview sections | Observers, storage, drag and drop, web components, platform APIs, security-adjacent HTML concerns such as `rel="noopener noreferrer"`, `crossorigin`, iframe and cross-origin behavior, and `contenteditable` sanitization risk |

## Blueprint Coverage Notes

- Chapters 1 to 4 are already well supported by the current semantics and structure material, but the rewrite should separate the browser-parsing explanation from applied SEO and a11y content.
- Chapters 5 to 8 have good source coverage, especially from `html-tables-lists`, `html-media`, `html-advanced`, and `html-perf`, but they need to be reorganized into a cleaner progression.
- Chapters 9 to 13 are currently scattered across `hcs`, `html-perf`, `hc-a11y`, `web-perf`, and `html-tags`. They need explicit chapter ownership so the applied layers do not bleed back into the fundamentals.
- Chapter 14 should absorb the strongest interview material from `html-iq` and the best recap material from `hcs` and `html-tags`, then add chapter-level drills across the whole topic.
- The CSS-only interview cluster in `html-iq` should not be moved into the HTML rewrite at all; it should be reserved for the CSS rewrite, while the security-adjacent HTML cluster should be preserved for the later HTML chapters or the capstone.

## What Must Be Preserved

- Useful semantic examples from `html-sem`, especially anything that clarifies document structure, sectioning, links, forms, and native HTML meaning.
- The validation and accessibility material already present in `hcs`, but rewritten into the proper form chapter and accessibility chapter.
- The performance and resource-loading material from `html-perf` and `web-perf`, but moved into the later applied chapters.
- The browser API examples from `html-advanced`, but treated as platform features rather than "advanced HTML" in the narrow sense.
- The strong interview prompts from `html-iq`, but redistributed so learners get interview practice while they study rather than only at the end.

## Summary

The current HTML topic already contains most of the knowledge needed for a strong 2026 HTML encyclopedia. What it does not yet have is a clean teaching shape. The rewrite should preserve the existing knowledge, separate pure HTML from CSS and platform spillover, and reorganize the material into the approved 14-chapter blueprint with distributed interview reinforcement.

## Handoff Notes After Implementation

### What transferred cleanly from earlier rewrites

- The block rhythm used in JavaScript, React, Next.js, and Angular transferred well to HTML:
  - `richText` for mental models
  - `compare` for element and attribute tradeoffs
  - `mechanics` for browser behavior
  - `trap` for anti-patterns
  - `drill` for interview and debugging pressure
  - `recap` for fast revision
- The structure-first approach also transferred cleanly:
  - write the topic structure harness first
  - reshape the topic into the 14-chapter skeleton
  - add chapter-batch tests before each content pass
- Distributed chapter-level Q&A is much better than one giant final interview dump. HTML especially benefits from small, chapter-local reinforcement because so many mistakes are conceptual rather than algorithmic.

### HTML-specific patterns that worked best

- Parser and browser-behavior framing made the early chapters much stronger than a plain tag glossary.
- Compare blocks were especially useful for:
  - `strong/em` vs `b/i`
  - `section` vs `article` vs `div`
  - `img` vs `picture` vs `figure`
  - `data-*` vs ARIA vs structured-data-oriented markup
  - `preload` vs `prefetch` vs `preconnect` vs `fetchpriority`
- HTML needed extra care around “works in the browser” vs “is structurally correct.” Trap blocks were valuable because many HTML bugs render fine while still failing in accessibility, SEO, or maintainability.
- The later applied chapters were the right place for:
  - SEO
  - accessibility and ARIA boundaries
  - performance/resource loading
  - native browser APIs that interact with HTML

### Content reserved for the CSS rewrite

- CSS-specific sections removed from the HTML learning path:
  - `hc-modern`
  - `css-2025`
- CSS-only interview material originally mixed into `html-iq`, including questions about:
  - `box-sizing`
  - `z-index`
  - Flexbox alignment
  - BEM
  - stacking contexts
  - container units and grid-only mechanics
- The HTML rewrite intentionally filtered those questions out of the HTML capstone bank so the topic stayed honest. They should be reintroduced during the CSS overhaul instead of being recreated from scratch.

### Anti-patterns to avoid in future foundational topics

- Do not leave mixed-domain interview banks attached to the wrong topic just because the raw volume looks impressive.
- Do not keep cheat-sheet sections as primary chapters when they are really recap material.
- Do not treat browser rendering success as proof that the markup or content model is correct.
- Do not let a final capstone bank absorb the whole teaching burden; chapter-level Q&A matters more than total question count for learning flow.
- Do not copy legacy source text blindly. HTML content in particular tends to carry malformed tag examples, encoding noise, or mixed semantic claims that should be treated as rewrite-time bugs.
