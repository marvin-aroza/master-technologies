# HTML Mastery Encyclopedia Overhaul Design

## Context
This project is a content-driven learning encyclopedia built with Next.js 16.2.2 and React 19.2.4. JavaScript, React, Next.js, and Angular have already been rewritten into a block-based mastery format, and HTML is the next foundational topic that should inherit that standard.

The current `data/topics/html.json` is useful, but it is not yet a clean HTML mastery curriculum. It mixes pure HTML with CSS architecture, modern CSS features, general web performance, accessibility, and browser API material in a way that makes the learner jump between domains instead of building understanding progressively.

The goal of this design is to define a 2026-ready HTML mastery track that teaches HTML first as a document language and browser contract, then layers SEO, accessibility, performance, and native platform features on top without losing any useful existing knowledge.

## Objectives
- Turn the HTML topic into a true mastery path rather than a mixed HTML/CSS/web platform reference dump.
- Keep the topic HTML-first and pure in its main learning path.
- Preserve useful existing content by relocating it into later HTML chapters or reserving it for the future CSS rewrite instead of deleting it.
- Teach HTML as something the browser parses, interprets, validates, and exposes to assistive technology, not just a list of tags.
- Distribute interview preparation across the topic instead of hiding it in a single final section.
- Reuse the proven block-based teaching system from the JavaScript, React, Next.js, and Angular rewrites.

## Why HTML Now
HTML is still the base layer under everything else in this encyclopedia:
- JavaScript teaches behavior and runtime logic.
- React teaches rendering and state abstractions.
- Next.js teaches full-stack architecture.
- Angular teaches framework systems.
- HTML teaches document meaning, native browser behavior, semantics, forms, media, accessibility hooks, and the platform contract those higher layers rely on.

If the HTML topic is shallow or mixed up, the learner will carry that weakness into every other technology.

## Learning Philosophy
The HTML topic should read like a browser-aware field guide to document authoring.

Each major concept must answer:
1. What is this element, attribute, or document concept?
2. Why does it exist?
3. How does the browser parse or interpret it?
4. What native behavior, semantics, or accessibility support does it unlock?
5. How should it be used in modern production HTML?
6. How is it commonly misused?
7. What are the SEO, accessibility, performance, or maintainability consequences?
8. How would you explain it in an interview?

Any content that is HTML-adjacent but not actually core HTML should either be:
- moved into later applied HTML chapters, or
- reserved for the CSS rewrite and documented in a migration map

## HTML Mastery Track
The topic will be organized as a progression through six layers:

1. What HTML is and how browsers parse documents
2. Document structure and meaning
3. Native document systems such as forms, media, and interactive elements
4. HTML architecture, anti-patterns, and browser quirks
5. Applied HTML layers: SEO, accessibility, and performance
6. Native platform APIs, interview mastery, and production reasoning

This keeps the learner grounded in pure HTML before branching into the higher-order layers that depend on it.

## Chapter Blueprint
The HTML topic will use a 14-part structure:

1. HTML Origins, Standards, and Browser Parsing
2. Document Structure, Doctype, Head, Body, and Metadata Foundations
3. Text Semantics, Links, URLs, and Document Meaning
4. Sectioning Content, Landmarks, Outlines, and Page Architecture
5. Lists, Tables, and Data Markup
6. Media, Embeds, Images, Audio, Video, and Responsive Asset Markup
7. Forms, Controls, Validation, and Submission Mechanics
8. Interactive HTML: `details`, `dialog`, `popover`, Disclosure, and Templates
9. Custom Data, Attributes, DOM Hooks, and Integration Points
10. HTML Architecture, Anti-Patterns, Browser Quirks, and Interview Traps
11. SEO and Search-Facing Markup
12. Accessibility, Semantics, ARIA Boundaries, and Form Accessibility
13. Performance-Focused HTML and Resource Loading
14. Native Browser APIs, Platform Features, and Interview Mastery

This sequence intentionally teaches pure HTML first, then later adds applied layers that many teams incorrectly mix into fundamentals from the start.

## What The Rewrite Must Fix
The current HTML topic has real value, but the structure makes mastery harder:
- It mixes HTML and CSS content in one topic, including sections such as modern CSS architecture and CSS feature coverage.
- The section order is not progressive. Learners bounce between semantics, advanced APIs, performance, accessibility, CSS, tag references, and interview content.
- The content often behaves like reference notes instead of a browser-centered teaching path.
- The topic does not yet use the richer block-based format that works in the upgraded JavaScript, React, Next.js, and Angular topics.
- Interview preparation is concentrated into the final `html-iq` section instead of reinforcing chapters throughout the topic.

The rewrite should solve those issues through structure, not by shrinking the knowledge base.

## Teaching Format Per Chapter
Every chapter should use the same high-value structure:

1. Core mental model
2. How the browser interprets it
3. Correct modern usage
4. Practical examples and code snippets
5. Common misuse and anti-patterns
6. Accessibility, SEO, or performance implications when relevant
7. Interview drill section
8. Mastery recap

Each chapter should mix three content styles:
- Explain
- Show
- Challenge

That keeps the topic rigorous without turning it into a tag glossary or a specification dump.

## Learning Experience Design
HTML can become dry very quickly unless the invisible browser behavior is made visible. The rewrite should lean on a small set of reusable elements:
- Browser interpretation blocks
- Compare blocks
- Native behavior callouts
- Anti-pattern cards
- Debugging drills
- Fast-recall recap blocks

These elements should stay purposeful. The goal is clarity and retention, not decoration.

## Preservation And Content Migration Rules
The rewrite must follow a strict preservation rule: useful knowledge should be reorganized, not casually deleted.

### Keep In Core HTML
- Document structure
- semantics
- links and URL behavior
- lists and tables
- media markup
- forms and validation
- native interactive HTML
- attributes and DOM hooks

### Move To Later HTML Chapters
- SEO material
- accessibility and ARIA guidance
- HTML-related performance guidance
- native browser APIs that depend on HTML structures

### Reserve For CSS Rewrite
- Modern CSS architecture
- CSS feature deep-dives
- CSS layout and styling topics that are currently embedded in the HTML topic

### Preserve As Reference Or Capstone Material
- Fast recall notes
- tag reference content
- interview prompts
- practical browser/platform comparisons

Implementation should document this migration map clearly so future CSS work can reclaim the reserved material instead of rebuilding it from memory.

## Content Quality Bar
Every retained or newly written section must meet the mastery quality bar:
- Precise definition
- clear browser-handling explanation
- modern 2026 framing
- practical production relevance
- misuse and consequence analysis
- applied SEO, accessibility, or performance reasoning where appropriate
- interview readiness

This is not a "bigger HTML topic" rewrite. It is a "cleaner, deeper, and more accurate" rewrite.

## Implementation Direction
The current architecture is worth preserving:
- topic
- tabs
- sections
- block-based content primitives

The HTML rewrite should use the same block system already proven in other upgraded topics:
- `richText`
- `code`
- `compare`
- `mechanics`
- `trap`
- `drill`
- `recap`
- chapter-level Q&A

No renderer rewrite should be attempted unless HTML content exposes a real missing teaching need.

## Content Strategy
The rewrite should not blindly discard the existing topic. Instead:

1. Audit the current `html.json`
2. Build a content migration map that labels each major content area as:
   - keep in core HTML
   - move to later HTML chapters
   - reserve for CSS rewrite
   - merge into recap/reference/interview sections
3. Restructure the topic into the new 14-chapter blueprint
4. Rewrite the content in chapter batches
5. Distribute interview practice across the chapters while keeping a stronger capstone section in the final chapter
6. Preserve the strongest existing examples, notes, and interview prompts by relocating them into the new structure

## Accuracy And 2026 Standard
All substantive HTML claims should be reviewed against current primary sources during implementation. Priority areas include:
- HTML parsing and document rules from the HTML Living Standard
- `dialog`, `popover`, and template behavior
- responsive images and resource-loading attributes
- form validation and submission mechanics
- accessibility guidance tied to native semantics
- modern resource loading and fetch priority behavior

Primary references for the rewrite should stay anchored to:
- the HTML Living Standard
- MDN reference and guides
- WAI guidance for accessible patterns tied to HTML semantics

## Verification Strategy
Implementation should include both content verification and product verification.

### Content Verification
- Verify the chapter ordering for pedagogy
- Check that CSS-specific material is preserved in the migration map instead of being silently dropped
- Ensure HTML-first chapters stay focused on document language, not styling systems
- Confirm each chapter satisfies the mastery quality bar
- Confirm interview coverage is distributed throughout the topic

### Product Verification
- Validate the updated JSON structure
- Add HTML-specific topic regression tests
- Run renderer regression, lint, type-check, and build verification
- Verify the finished `/html` page in the browser before closing the branch

## Rollout Plan
The HTML rewrite should be implemented in this order:

1. Audit the current HTML topic and create the content migration map
2. Add the HTML topic regression harness
3. Restructure `html.json` into the new 14-chapter skeleton
4. Rewrite the content in chapter batches
5. Expand and distribute interview coverage
6. Verify accuracy, preservation, rendering, and build health
7. Capture reusable rewrite lessons for the CSS topic

## Risks And Controls
### Risk: Accidentally deleting useful CSS-adjacent knowledge
Control: Maintain an explicit migration map and preserve displaced material for the CSS rewrite.

### Risk: Turning HTML into a tag glossary
Control: Center each chapter on browser interpretation, native behavior, and misuse consequences.

### Risk: Letting applied layers dominate fundamentals too early
Control: Keep the early chapters purely HTML-first and move SEO, accessibility, performance, and browser APIs into later chapters.

### Risk: Keeping too much legacy structure out of fear of deleting content
Control: Preserve the knowledge, but reorganize it aggressively into the new blueprint.

## Success Criteria
The HTML topic will be considered successful when:
- it reads as a complete HTML-first mastery path
- it clearly explains parsing, semantics, forms, media, and interactive HTML
- it preserves valuable existing knowledge without leaving CSS topics tangled in the fundamentals
- it prepares learners for both modern frontend work and strong interview reasoning
- its structure can serve as the template for the CSS rewrite and other foundational web-platform topics
