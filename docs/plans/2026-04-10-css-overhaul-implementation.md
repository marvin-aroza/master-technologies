# CSS Encyclopedia Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the CSS topic into a 2026 standards-first mastery track with distributed interview preparation, modern platform coverage, preserved legacy knowledge, and a strong final ecosystem tradeoff capstone.

**Architecture:** Reuse the existing block-based topic system already proven by the JavaScript, React, Next.js, Angular, and HTML rewrites. Keep renderer and schema changes minimal, focus the branch on rewriting `data/topics/css.json`, add CSS-specific regression tests, and document a formal migration map so overlapping legacy sections and preserved HTML-side CSS material are intentionally relocated instead of lost.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript, JSON topic data, node-based regression scripts, ESLint

---

### Task 1: Write the CSS Gap Audit and Content Migration Map

**Files:**
- Create: `docs/plans/2026-04-10-css-audit.md`
- Read: `data/topics/css.json`
- Reference: `docs/plans/2026-04-10-css-design.md`
- Reference: `docs/plans/2026-04-09-html-audit.md`
- Reference: `docs/plans/2026-04-09-javascript-audit.md`
- Reference: `docs/plans/2026-04-09-nextjs-audit.md`

**Step 1: Audit the current topic structure**

Review the current tabs, legacy sections, centralized interview bank, and overlap across:
- `css-modern`
- `css-2025`
- `hc-modern`
- `css-tricks`
- `css-arch`
- `hc-a11y`
- `web-perf`
- `css-cs`
- `css-iq`

Record what should be kept, rewritten, merged, or relocated.

**Step 2: Build the content migration map**

Write a map that labels each major content cluster as:
- keep in core CSS
- move to later CSS chapters
- reserve for final ecosystem tradeoff material
- merge into recap/reference/interview sections

Make sure the map explicitly includes the CSS-only interview material that was preserved during the HTML rewrite.

**Step 3: Record 2026 platform corrections**

Capture specific corrections and framing for:
- `@layer`
- `@scope`
- `:has()`
- container queries and container units
- scroll-driven animations
- view transitions
- anchor positioning
- rendering-cost guidance around layout, paint, and composite

**Step 4: Save the audit and commit**

Run:
```bash
git add docs/plans/2026-04-10-css-audit.md
git commit -m "docs: add css audit"
```

### Task 2: Add the CSS Topic Regression Harness

**Files:**
- Create: `scripts/test-css-topic-structure.mjs`
- Create: `scripts/test-css-topic.mjs`
- Modify: `package.json`

**Step 1: Write the failing structure test**

Add assertions for:
- 14 tabs
- stable chapter ids
- topic hero stats
- a standards-first chapter flow
- a final ecosystem/interview capstone chapter
- no legacy duplicate modern-CSS tabs left in the core flow

**Step 2: Run the structure test to confirm it fails**

Run:
```bash
node scripts/test-css-topic-structure.mjs
```

Expected: FAIL because the current `css.json` still uses the mixed legacy layout.

**Step 3: Add the package entrypoint**

Create `scripts/test-css-topic.mjs` and wire `package.json` with:
```json
"test:css-topic": "node scripts/test-css-topic.mjs"
```

**Step 4: Commit the red-test harness**

Run:
```bash
git add scripts/test-css-topic-structure.mjs scripts/test-css-topic.mjs package.json
git commit -m "test: add css topic harness"
```

### Task 3: Restructure `css.json` Into the New 14-Chapter Skeleton

**Files:**
- Modify: `data/topics/css.json`

**Step 1: Replace the current tab layout**

Rewrite the topic to use the approved 14-chapter CSS blueprint.

**Step 2: Add topic-level hero stats**

Add a consistent hero block that advertises:
- 14 chapters
- standards-first coverage
- modern 2026 platform scope
- interview depth

**Step 3: Collapse duplicated modern-CSS sections**

Remove the legacy fragmented layout and replace it with one coherent CSS progression. Preserve displaced material per the migration map instead of losing it.

**Step 4: Keep later chapters scaffolded**

Populate the new chapter ids, labels, and empty block arrays so the topic is navigable before the writing batches begin.

**Step 5: Run the structure test and make it pass**

Run:
```bash
npm run test:css-topic
```

Expected: PASS for the structure harness, with later chapter content still skeletal.

**Step 6: Commit the skeleton rewrite**

Run:
```bash
git add data/topics/css.json
git commit -m "docs: restructure css topic skeleton"
```

### Task 4: Rewrite Chapters 1-4

**Files:**
- Create: `scripts/test-css-chapters-1-4.mjs`
- Modify: `scripts/test-css-topic.mjs`
- Modify: `data/topics/css.json`

**Target chapters:**
1. CSS Origins, Cascade, and the Browser Styling Pipeline
2. Selectors, Combinators, Pseudo-Classes, and Pseudo-Elements
3. Specificity, Inheritance, Custom Properties, Layers, and Scope
4. Box Model, Sizing, Overflow, and Positioning

**Step 1: Write the failing chapter-batch test**

Add assertions that chapters 1-4 include:
- meaningful block counts
- at least one `compare`, `mechanics`, `drill`, and `recap` across the batch
- cascade and specificity coverage
- browser styling pipeline coverage
- chapter-specific Q&A

**Step 2: Run the new test to confirm it fails**

Run:
```bash
npm run test:css-topic
```

Expected: FAIL because chapters 1-4 are still scaffolded.

**Step 3: Write the content for chapters 1-4**

Use:
- `richText` for CSS mental models
- `code` for selector and cascade examples
- `compare` for selector and specificity tradeoffs
- `mechanics` for style resolution and value computation
- `trap` for specificity wars, stacking bugs, and overflow mistakes
- `drill` for "which rule wins and why?" debugging
- `recap` for high-signal revision

**Step 4: Re-run the tests**

Run:
```bash
npm run test:css-topic
npm run test:renderer
```

Expected: PASS for the first chapter batch and renderer compatibility.

**Step 5: Commit**

Run:
```bash
git add scripts/test-css-chapters-1-4.mjs scripts/test-css-topic.mjs data/topics/css.json
git commit -m "docs: rewrite css foundation chapters"
```

### Task 5: Rewrite Chapters 5-8

**Files:**
- Create: `scripts/test-css-chapters-5-8.mjs`
- Modify: `scripts/test-css-topic.mjs`
- Modify: `data/topics/css.json`

**Target chapters:**
5. Flexbox and One-Dimensional Layout
6. Grid, Subgrid, and Two-Dimensional Layout
7. Responsive CSS, Media Queries, Logical Properties, and Container Queries
8. Typography, Color, Backgrounds, Effects, and Visual Styling

**Step 1: Write the failing chapter-batch test**

Add assertions for:
- flex sizing and alignment mechanics
- grid track sizing and placement
- responsive and container-query coverage
- typography, color, and visual-system coverage

**Step 2: Run the new test to confirm it fails**

Run:
```bash
npm run test:css-topic
```

Expected: FAIL until the batch is written.

**Step 3: Write chapters 5-8**

Make sure the content explains:
- how flex sizing actually resolves
- how grid tracks size and auto-place content
- when media queries vs container queries are appropriate
- how modern visual styling works with typography, color spaces, gradients, and effects

**Step 4: Re-run the tests**

Run:
```bash
npm run test:css-topic
npm run test:renderer
npx tsc --noEmit --pretty false
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-css-chapters-5-8.mjs scripts/test-css-topic.mjs data/topics/css.json
git commit -m "docs: rewrite css layout and styling chapters"
```

### Task 6: Rewrite Chapters 9-11

**Files:**
- Create: `scripts/test-css-chapters-9-11.mjs`
- Modify: `scripts/test-css-topic.mjs`
- Modify: `data/topics/css.json`

**Target chapters:**
9. Transforms, Transitions, Animations, and Motion Systems
10. Modern CSS Architecture, Resets, Tokens, and Scalable Design Systems
11. Performance, Rendering Cost, and Browser Optimization

**Step 1: Write the failing chapter-batch test**

Add assertions for:
- motion-system coverage
- design-system and architecture coverage
- rendering-cost and optimization coverage
- chapter-level interview reinforcement

**Step 2: Run the test to confirm it fails**

Run:
```bash
npm run test:css-topic
```

Expected: FAIL until chapters 9-11 are populated.

**Step 3: Write chapters 9-11**

Make sure the content includes:
- transforms, transitions, keyframes, view transitions, and scroll-driven animations
- resets, tokens, naming, composition, and large-scale CSS architecture
- style, layout, paint, and composite cost plus containment and `content-visibility`

**Step 4: Re-run verification**

Run:
```bash
npm run test:css-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-css-chapters-9-11.mjs scripts/test-css-topic.mjs data/topics/css.json
git commit -m "docs: rewrite css motion architecture chapters"
```

### Task 7: Rewrite Chapters 12-14 and Expand Interview Coverage

**Files:**
- Create: `scripts/test-css-chapters-12-14.mjs`
- Create: `scripts/test-css-qa-coverage.mjs`
- Modify: `scripts/test-css-topic.mjs`
- Modify: `data/topics/css.json`

**Target chapters:**
12. Accessibility, User Preferences, and Resilient Styling
13. Advanced Platform CSS and Native UI Integration
14. CSS Ecosystem Tradeoffs, Debugging, Architecture Scenarios, and Interview Mastery

**Step 1: Write the failing final-batch and Q&A coverage tests**

Add assertions for:
- resilient styling and preference media query coverage
- advanced platform CSS coverage such as anchor positioning and native UI integration
- ecosystem tradeoff coverage for Tailwind, CSS Modules, and CSS-in-JS
- minimum total Q&A count
- minimum final-capstone Q&A count
- chapter-level Q&A distribution

**Step 2: Run the tests to confirm they fail**

Run:
```bash
npm run test:css-topic
```

Expected: FAIL until the last chapters and Q&A redistribution are complete.

**Step 3: Write chapters 12-14 and restore interview coverage**

Make sure the final pass:
- restores strong legacy CSS interview material
- reintroduces the CSS-only interview cluster preserved during the HTML rewrite
- distributes targeted Q&A through chapters 1-13
- keeps a large capstone interview bank in chapter 14

**Step 4: Re-run full verification**

Run:
```bash
npm run test:css-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

Expected: PASS, with build rerun outside the sandbox if the Windows `.next` EPERM issue appears again.

**Step 5: Commit**

Run:
```bash
git add scripts/test-css-chapters-12-14.mjs scripts/test-css-qa-coverage.mjs scripts/test-css-topic.mjs data/topics/css.json
git commit -m "docs: finish css mastery chapters"
```

### Task 8: Final Verification, Browser Review, and Handoff Notes

**Files:**
- Modify: `docs/plans/2026-04-10-css-audit.md`

**Step 1: Re-run the full verification suite**

Run:
```bash
npm run test:css-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

Expected: PASS.

**Step 2: Review the finished topic in the browser**

Open the local `/css` route and verify:
- hero stats render correctly
- the 14-chapter flow is readable
- block types render cleanly
- chapter navigation works
- the interview layer is visible throughout the topic

**Step 3: Capture reusable rewrite notes**

Extend `docs/plans/2026-04-10-css-audit.md` with:
- what transferred cleanly from earlier rewrites
- CSS-specific patterns that worked best
- what should carry into design, UI/UX, and system-design topic rewrites
- any remaining risks or non-blocking issues

**Step 4: Commit the handoff**

Run:
```bash
git add docs/plans/2026-04-10-css-audit.md
git commit -m "feat: complete css mastery overhaul"
```
