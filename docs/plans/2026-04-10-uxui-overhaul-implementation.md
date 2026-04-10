# UI/UX Encyclopedia Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the UI/UX topic into a 2026 design-first mastery track with preserved legacy knowledge, stronger research and interaction-design coverage, distributed interview preparation, and a robust final architecture/interview capstone.

**Architecture:** Reuse the existing block-based topic system already proven by the JavaScript, React, Next.js, Angular, HTML, and CSS rewrites. Keep renderer and schema changes minimal, focus the branch on rewriting `data/topics/uxui.json`, add UI/UX-specific regression tests, and document a formal migration map so strong existing design material is intentionally relocated instead of lost.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript, JSON topic data, node-based regression scripts, ESLint

---

### Task 1: Write the UI/UX Gap Audit and Content Migration Map

**Files:**
- Create: `docs/plans/2026-04-10-uxui-audit.md`
- Read: `data/topics/uxui.json`
- Reference: `docs/plans/2026-04-10-uxui-design.md`
- Reference: `docs/plans/2026-04-10-css-audit.md`
- Reference: `docs/plans/2026-04-09-html-audit.md`

**Step 1: Audit the current topic structure**

Review the current tabs, legacy sections, centralized interview bank, and overlap across:
- `ux-gestalt`
- `ux-principles`
- `ux-designsys`
- `ux-patterns`
- `ux-comp`
- `ux-ui-mastery`
- `ux-cs`
- `ux-iq`

Record what should be kept, rewritten, merged, or relocated.

**Step 2: Build the content migration map**

Write a map that labels each major content cluster as:
- keep in core UI/UX
- move to later UI/UX chapters
- merge into recap/reference/interview sections

Make sure the map explicitly includes the existing cheat-sheet and interview-bank material so it is preserved, not discarded.

**Step 3: Record 2026 design framing corrections**

Capture specific corrections and framing for:
- design-first versus tool-first teaching
- state design and feedback systems
- accessibility and inclusive design positioning
- tokens and system governance
- critique and measurement workflows
- collaboration and handoff terminology

**Step 4: Save the audit and commit**

Run:
```bash
git add docs/plans/2026-04-10-uxui-audit.md
git commit -m "docs: add uxui audit"
```

### Task 2: Add the UI/UX Topic Regression Harness

**Files:**
- Create: `scripts/test-uxui-topic-structure.mjs`
- Create: `scripts/test-uxui-topic.mjs`
- Modify: `package.json`

**Step 1: Write the failing structure test**

Add assertions for:
- 14 tabs
- stable chapter ids
- topic hero stats
- a design-first chapter flow
- a final architecture/interview capstone chapter
- no legacy cheat-sheet/interview tabs left in the core flow

**Step 2: Run the structure test to confirm it fails**

Run:
```bash
node scripts/test-uxui-topic-structure.mjs
```

Expected: FAIL because the current `uxui.json` still uses the mixed legacy layout.

**Step 3: Add the package entrypoint**

Create `scripts/test-uxui-topic.mjs` and wire `package.json` with:
```json
"test:uxui-topic": "node scripts/test-uxui-topic.mjs"
```

**Step 4: Commit the red-test harness**

Run:
```bash
git add scripts/test-uxui-topic-structure.mjs scripts/test-uxui-topic.mjs package.json
git commit -m "test: add uxui topic harness"
```

### Task 3: Restructure `uxui.json` Into the New 14-Chapter Skeleton

**Files:**
- Modify: `data/topics/uxui.json`

**Step 1: Replace the current tab layout**

Rewrite the topic to use the approved 14-chapter UI/UX blueprint.

**Step 2: Add topic-level hero stats**

Add a consistent hero block that advertises:
- 14 chapters
- design-first coverage
- preserved interview depth
- systems and critique coverage

**Step 3: Collapse the legacy mixed structure**

Remove the old cheat-sheet-first layout and replace it with one coherent UI/UX progression. Preserve displaced material per the migration map instead of losing it.

**Step 4: Keep later chapters scaffolded**

Populate the new chapter ids, labels, and empty block arrays so the topic is navigable before the writing batches begin.

**Step 5: Run the structure test and make it pass**

Run:
```bash
npm run test:uxui-topic
```

Expected: PASS for the structure harness, with later chapter content still skeletal.

**Step 6: Commit the skeleton rewrite**

Run:
```bash
git add data/topics/uxui.json
git commit -m "docs: restructure uxui topic skeleton"
```

### Task 4: Rewrite Chapters 1-4

**Files:**
- Create: `scripts/test-uxui-chapters-1-4.mjs`
- Modify: `scripts/test-uxui-topic.mjs`
- Modify: `data/topics/uxui.json`

**Target chapters:**
1. UX/UI Origins, Product Thinking, and the Role of Design
2. Human Perception, Attention, and Cognitive Load
3. User Research, Discovery, and Problem Framing
4. Information Architecture, Navigation, and User Flows

**Step 1: Write the failing chapter-batch test**

Add assertions that chapters 1-4 include:
- meaningful block counts
- at least one `compare`, `mechanics`, `drill`, and `recap` across the batch
- product-thinking and research coverage
- flow and IA coverage
- chapter-specific Q&A

**Step 2: Run the new test to confirm it fails**

Run:
```bash
npm run test:uxui-topic
```

Expected: FAIL because chapters 1-4 are still scaffolded.

**Step 3: Write the content for chapters 1-4**

Use:
- `richText` for design mental models
- `compare` for principle and approach tradeoffs
- `mechanics` for flow and decision-system breakdowns
- `trap` for common research and IA mistakes
- `drill` for critique and navigation reasoning
- `recap` for high-signal revision

**Step 4: Re-run the tests**

Run:
```bash
npm run test:uxui-topic
npm run test:renderer
```

Expected: PASS for the first chapter batch and renderer compatibility.

**Step 5: Commit**

Run:
```bash
git add scripts/test-uxui-chapters-1-4.mjs scripts/test-uxui-topic.mjs data/topics/uxui.json
git commit -m "docs: rewrite uxui foundation chapters"
```

### Task 5: Rewrite Chapters 5-8

**Files:**
- Create: `scripts/test-uxui-chapters-5-8.mjs`
- Modify: `scripts/test-uxui-topic.mjs`
- Modify: `data/topics/uxui.json`

**Target chapters:**
5. Interaction Design, Feedback, and State Design
6. Visual Hierarchy, Layout, and Composition
7. Typography, Color, Iconography, and Visual Language
8. Responsive Design, Accessibility, and Inclusive UX

**Step 1: Write the failing chapter-batch test**

Add assertions for:
- state and feedback coverage
- hierarchy and composition coverage
- typography/color/iconography coverage
- accessibility and inclusive-design coverage

**Step 2: Run the new test to confirm it fails**

Run:
```bash
npm run test:uxui-topic
```

Expected: FAIL until the batch is written.

**Step 3: Write chapters 5-8**

Make sure the content explains:
- how interaction states shape user trust and task completion
- how hierarchy and layout guide attention
- how visual language choices affect comprehension
- how responsive and accessible decisions change interface design

**Step 4: Re-run the tests**

Run:
```bash
npm run test:uxui-topic
npm run test:renderer
npx tsc --noEmit --pretty false
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-uxui-chapters-5-8.mjs scripts/test-uxui-topic.mjs data/topics/uxui.json
git commit -m "docs: rewrite uxui interaction chapters"
```

### Task 6: Rewrite Chapters 9-11

**Files:**
- Create: `scripts/test-uxui-chapters-9-11.mjs`
- Modify: `scripts/test-uxui-topic.mjs`
- Modify: `data/topics/uxui.json`

**Target chapters:**
9. Forms, Input UX, and Conversion-Critical Interfaces
10. Design Systems, Tokens, Components, and Governance
11. Motion, Micro-Interactions, and Perceived Performance

**Step 1: Write the failing chapter-batch test**

Add assertions for:
- form-flow and validation UX coverage
- token and component-system coverage
- motion and perceived-performance coverage

**Step 2: Run the new test to confirm it fails**

Run:
```bash
npm run test:uxui-topic
```

Expected: FAIL until the batch is written.

**Step 3: Write chapters 9-11**

Make sure the content explains:
- how forms reduce or increase friction
- how systems scale from tokens to governance
- how motion helps feedback without hurting performance or accessibility

**Step 4: Re-run the tests**

Run:
```bash
npm run test:uxui-topic
npm run test:renderer
npx tsc --noEmit --pretty false
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-uxui-chapters-9-11.mjs scripts/test-uxui-topic.mjs data/topics/uxui.json
git commit -m "docs: rewrite uxui systems chapters"
```

### Task 7: Rewrite Chapters 12-14 and Expand Interview Coverage

**Files:**
- Create: `scripts/test-uxui-chapters-12-14.mjs`
- Create: `scripts/test-uxui-qa-coverage.mjs`
- Modify: `scripts/test-uxui-topic.mjs`
- Modify: `data/topics/uxui.json`

**Target chapters:**
12. Critique, Heuristics, and Measuring Design Quality
13. Collaboration, Handoff, Tooling, and Production Workflows
14. UI/UX Architecture, System Thinking, and Interview Mastery

**Step 1: Write the failing coverage tests**

Add assertions for:
- critique and heuristic coverage
- collaboration and handoff coverage
- architecture and interview capstone coverage
- chapter-level interview questions across chapters 1-13
- a large final capstone bank in chapter 14

**Step 2: Run the new tests to confirm they fail**

Run:
```bash
npm run test:uxui-topic
```

Expected: FAIL until the final chapters and interview distribution are written.

**Step 3: Write the final chapters**

Make sure the content explains:
- how to critique interfaces with structure and evidence
- how design handoff and collaboration work in production teams
- how to discuss systems, tradeoffs, and portfolio-level reasoning in interviews

Preserve and expand the existing interview material so the final topic is stronger than the current `ux-iq` bank, not smaller.

**Step 4: Re-run the tests**

Run:
```bash
npm run test:uxui-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-uxui-chapters-12-14.mjs scripts/test-uxui-qa-coverage.mjs scripts/test-uxui-topic.mjs data/topics/uxui.json
git commit -m "docs: complete uxui mastery rewrite"
```

### Task 8: Final Verification and Browser Review

**Files:**
- Verify: `data/topics/uxui.json`
- Verify: `scripts/test-uxui-topic.mjs`
- Verify: `package.json`

**Step 1: Run the full verification suite**

Run:
```bash
npm run test:uxui-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

Expected: PASS. If `npm run build` hits the known Windows worktree `.next` EPERM issue inside the sandbox, re-run outside the sandbox and record that result explicitly.

**Step 2: Review the topic in the browser**

Run the local app and verify the `/ui-ux` route for:
- chapter order and labels
- hero stats
- block rendering quality
- distributed interview coverage
- navigation behavior
- visual stability of compare, drill, and recap blocks

**Step 3: Record reusable lessons**

Document the key rewrite patterns, interview-distribution lessons, and any renderer gaps discovered so the final `system-design` rewrite can reuse them.

**Step 4: Commit any final verification or doc touch-ups**

Run:
```bash
git add docs/plans/2026-04-10-uxui-audit.md data/topics/uxui.json scripts/test-uxui-topic.mjs scripts/test-uxui-topic-structure.mjs scripts/test-uxui-chapters-1-4.mjs scripts/test-uxui-chapters-5-8.mjs scripts/test-uxui-chapters-9-11.mjs scripts/test-uxui-chapters-12-14.mjs scripts/test-uxui-qa-coverage.mjs package.json
git commit -m "test: finalize uxui topic verification"
```
