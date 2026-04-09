# HTML Encyclopedia Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the HTML topic into a 2026 HTML-first mastery track with preserved legacy knowledge, later applied SEO/accessibility/performance/platform chapters, and distributed interview preparation.

**Architecture:** Reuse the existing block-based topic system already proven by the JavaScript, React, Next.js, and Angular rewrites. Keep renderer and schema changes minimal, focus the branch on rewriting `data/topics/html.json`, add HTML-specific regression tests, and document a formal migration map so CSS-adjacent material is preserved for later use instead of deleted.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript, JSON topic data, node-based regression scripts, ESLint

---

### Task 1: Write the HTML Gap Audit and Content Migration Map

**Files:**
- Create: `docs/plans/2026-04-09-html-audit.md`
- Read: `data/topics/html.json`
- Reference: `docs/plans/2026-04-09-html-design.md`
- Reference: `docs/plans/2026-04-09-javascript-audit.md`
- Reference: `docs/plans/2026-04-09-react-audit.md`
- Reference: `docs/plans/2026-04-09-nextjs-audit.md`
- Reference: `docs/plans/2026-04-09-angular-audit.md`

**Step 1: Audit the current topic structure**

Review the current tabs, legacy sections, CSS overlap, tag-reference material, and the centralized interview bank. Record what should be kept, rewritten, merged, or relocated.

**Step 2: Build the content migration map**

Write a map that labels each major content cluster as:
- keep in core HTML
- move to later HTML chapters
- reserve for CSS rewrite
- merge into recap/reference/interview sections

**Step 3: Record 2026 terminology and platform corrections**

Capture specific corrections for:
- `dialog`
- `popover`
- `fetchpriority`
- responsive image selection
- form validation APIs
- landmark and ARIA guidance tied to native semantics

**Step 4: Save the audit and commit**

Run:
```bash
git add docs/plans/2026-04-09-html-audit.md
git commit -m "docs: add html audit"
```

### Task 2: Add the HTML Topic Regression Harness

**Files:**
- Create: `scripts/test-html-topic-structure.mjs`
- Create: `scripts/test-html-topic.mjs`
- Modify: `package.json`

**Step 1: Write the failing structure test**

Add assertions for:
- 14 tabs
- stable chapter ids
- topic hero stats
- an HTML-first chapter flow
- a final mastery/interview capstone chapter
- no CSS-first tabs left in the HTML fundamentals

**Step 2: Run the structure test to confirm it fails**

Run:
```bash
node scripts/test-html-topic-structure.mjs
```

Expected: FAIL because the current `html.json` still uses the mixed legacy layout.

**Step 3: Add the package entrypoint**

Create `scripts/test-html-topic.mjs` and wire `package.json` with:
```json
"test:html-topic": "node scripts/test-html-topic.mjs"
```

**Step 4: Commit the red-test harness**

Run:
```bash
git add scripts/test-html-topic-structure.mjs scripts/test-html-topic.mjs package.json
git commit -m "test: add html topic harness"
```

### Task 3: Restructure `html.json` Into the New 14-Chapter Skeleton

**Files:**
- Modify: `data/topics/html.json`

**Step 1: Replace the current tab layout**

Rewrite the topic to use the approved 14-chapter HTML blueprint.

**Step 2: Add topic-level hero stats**

Add a consistent hero block that advertises:
- 14 chapters
- HTML-first structure
- preserved applied chapters
- interview depth

**Step 3: Remove CSS tabs from the core flow without deleting their knowledge**

Collapse the mixed layout into the new HTML progression. Preserve displaced CSS-adjacent knowledge by relocating it per the migration map instead of losing it.

**Step 4: Keep later chapters scaffolded**

Populate the new chapter ids, labels, and empty block arrays so the topic is navigable before the writing batches begin.

**Step 5: Run the structure test and make it pass**

Run:
```bash
npm run test:html-topic
```

Expected: PASS for the structure harness, with later chapter content still skeletal.

**Step 6: Commit the skeleton rewrite**

Run:
```bash
git add data/topics/html.json
git commit -m "docs: restructure html topic skeleton"
```

### Task 4: Rewrite Chapters 1-4

**Files:**
- Create: `scripts/test-html-chapters-1-4.mjs`
- Modify: `scripts/test-html-topic.mjs`
- Modify: `data/topics/html.json`

**Target chapters:**
1. HTML Origins, Standards, and Browser Parsing
2. Document Structure, Doctype, Head, Body, and Metadata Foundations
3. Text Semantics, Links, URLs, and Document Meaning
4. Sectioning Content, Landmarks, Outlines, and Page Architecture

**Step 1: Write the failing chapter-batch test**

Add assertions that chapters 1-4 include:
- meaningful block counts
- at least one `compare`, `mechanics`, `drill`, and `recap` across the batch
- browser parsing coverage
- chapter-specific Q&A

**Step 2: Run the new test to confirm it fails**

Run:
```bash
npm run test:html-topic
```

Expected: FAIL because chapters 1-4 are still scaffolded.

**Step 3: Write the content for chapters 1-4**

Use:
- `richText` for document mental models
- `code` for document structure and semantic examples
- `compare` for semantic element choices
- `mechanics` for browser parsing and landmark interpretation
- `trap` for outline myths and semantic misuse
- `drill` for document-structure debugging
- `recap` for high-signal revision

**Step 4: Re-run the tests**

Run:
```bash
npm run test:html-topic
npm run test:renderer
```

Expected: PASS for the first chapter batch and renderer compatibility.

**Step 5: Commit**

Run:
```bash
git add scripts/test-html-chapters-1-4.mjs scripts/test-html-topic.mjs data/topics/html.json
git commit -m "docs: rewrite html foundation chapters"
```

### Task 5: Rewrite Chapters 5-8

**Files:**
- Create: `scripts/test-html-chapters-5-8.mjs`
- Modify: `scripts/test-html-topic.mjs`
- Modify: `data/topics/html.json`

**Target chapters:**
5. Lists, Tables, and Data Markup
6. Media, Embeds, Images, Audio, Video, and Responsive Asset Markup
7. Forms, Controls, Validation, and Submission Mechanics
8. Interactive HTML: `details`, `dialog`, `popover`, Disclosure, and Templates

**Step 1: Write the failing chapter-batch test**

Add assertions for:
- table semantics and header relationships
- responsive images and media behavior
- form submission and validation mechanics
- native interactive element coverage

**Step 2: Run the new test to confirm it fails**

Run:
```bash
npm run test:html-topic
```

Expected: FAIL until the batch is written.

**Step 3: Write chapters 5-8**

Make sure the content explains:
- when lists and tables should or should not be used
- how `srcset`, `sizes`, and `picture` selection works
- how form controls participate in submission and constraint validation
- what native interactive elements give you before JavaScript enhancement

**Step 4: Re-run the tests**

Run:
```bash
npm run test:html-topic
npm run test:renderer
npx tsc --noEmit --pretty false
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-html-chapters-5-8.mjs scripts/test-html-topic.mjs data/topics/html.json
git commit -m "docs: rewrite html content system chapters"
```

### Task 6: Rewrite Chapters 9-11

**Files:**
- Create: `scripts/test-html-chapters-9-11.mjs`
- Modify: `scripts/test-html-topic.mjs`
- Modify: `data/topics/html.json`

**Target chapters:**
9. Custom Data, Attributes, DOM Hooks, and Integration Points
10. HTML Architecture, Anti-Patterns, Browser Quirks, and Interview Traps
11. SEO and Search-Facing Markup

**Step 1: Write the failing chapter-batch test**

Add assertions for:
- data attributes and DOM integration points
- anti-pattern and browser quirk coverage
- SEO markup and metadata coverage
- chapter-level interview reinforcement

**Step 2: Run the test to confirm it fails**

Run:
```bash
npm run test:html-topic
```

Expected: FAIL until chapters 9-11 are populated.

**Step 3: Write chapters 9-11**

Make sure the content includes:
- safe DOM hooks and integration boundaries
- common semantic and structural mistakes
- metadata, canonical, robots, structured-data, and search-facing markup reasoning

**Step 4: Re-run verification**

Run:
```bash
npm run test:html-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-html-chapters-9-11.mjs scripts/test-html-topic.mjs data/topics/html.json
git commit -m "docs: rewrite html architecture and seo chapters"
```

### Task 7: Rewrite Chapters 12-14 and Expand Interview Coverage

**Files:**
- Create: `scripts/test-html-chapters-12-14.mjs`
- Create: `scripts/test-html-qa-coverage.mjs`
- Modify: `scripts/test-html-topic.mjs`
- Modify: `data/topics/html.json`

**Target chapters:**
12. Accessibility, Semantics, ARIA Boundaries, and Form Accessibility
13. Performance-Focused HTML and Resource Loading
14. Native Browser APIs, Platform Features, and Interview Mastery

**Step 1: Write the failing final-batch tests**

Add assertions for:
- accessibility and ARIA-boundary coverage
- HTML-centered performance and loading guidance
- native browser API material tied back to HTML structures
- distributed Q&A across chapters 1-13
- a strong final capstone interview bank

**Step 2: Run the tests to confirm they fail**

Run:
```bash
npm run test:html-topic
```

Expected: FAIL until the final batch and Q&A expansion are complete.

**Step 3: Write the final chapters and interview layers**

Requirements:
- distribute interview questions throughout chapters 1-13
- keep a larger expert-level bank in chapter 14
- preserve valuable legacy interview questions by relocating them where they fit
- include debugging and architecture questions, not only definition prompts

**Step 4: Re-run full verification**

Run:
```bash
npm run test:html-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-html-chapters-12-14.mjs scripts/test-html-qa-coverage.mjs scripts/test-html-topic.mjs data/topics/html.json
git commit -m "docs: finish html mastery chapters"
```

### Task 8: Verify the HTML Topic End to End and Capture Handoff Notes

**Files:**
- Modify: `docs/plans/2026-04-09-html-audit.md`

**Step 1: Run the full verification suite**

Run:
```bash
npm run test:html-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

Expected: PASS.

**Step 2: Review the finished topic in the browser**

Serve the app locally and inspect `/html` to verify:
- hero stats
- chapter navigation
- block order and pacing
- Q&A distribution
- rendering of comparisons, drills, and recap blocks

**Step 3: Record reusable lessons**

Update `docs/plans/2026-04-09-html-audit.md` with:
- what transferred cleanly from the previous topic rewrites
- which HTML-specific patterns were most effective
- what content was reserved for the CSS rewrite
- anti-patterns to avoid in future foundational platform topics

**Step 4: Commit the final handoff**

Run:
```bash
git add docs/plans/2026-04-09-html-audit.md
git commit -m "feat: complete html mastery overhaul"
```

## First Execution Slice

- Finish the HTML audit and content migration map
- Add the HTML structure harness
- Restructure `html.json` into the 14-chapter skeleton
- Fully rewrite chapters 1-4
- Keep later chapters scaffolded but navigable
