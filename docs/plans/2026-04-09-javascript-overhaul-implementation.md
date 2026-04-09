# JavaScript Encyclopedia Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the JavaScript topic into a 2026 mastery track with richer learning blocks, updated curriculum structure, and stronger interview-ready explanations.

**Architecture:** Evolve the existing JSON-driven topic system rather than replacing it. Keep the current topic -> tabs -> sections flow, add an optional block-based section format plus optional data-driven hero stats, and rewrite only the JavaScript topic to validate the new model before reusing it elsewhere.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript, JSON content files, CSS, ESLint

---

### Task 1: Create the JavaScript Gap Audit

**Files:**
- Create: `docs/plans/2026-04-09-javascript-audit.md`
- Read: `data/topics/javascript.json`
- Reference: `docs/plans/2026-04-09-javascript-design.md`

**Step 1: Create the audit document**

Write a markdown table with one row per target chapter:

```md
| Target chapter | Existing section ids | Keep | Rewrite | Missing |
|---|---|---|---|---|
| JavaScript Origins, ECMAScript, and Runtimes | js-? |  |  |  |
```

**Step 2: Map current `javascript.json` content to the 14-chapter blueprint**

Note duplicate sections, outdated explanations, weak interview material, and missing runtime/platform chapters.

**Step 3: Create a “must add” list**

Capture at least:
- ECMAScript and TC39 context
- runtime differences
- identity vs equality
- engine and event loop mechanics
- modules/tooling
- security
- performance and memory
- architecture patterns
- stronger interview drills

**Step 4: Save the audit document**

Expected result: a clear keep/rewrite/add map that will guide the content rewrite instead of editing blindly.

**Step 5: Commit**

```bash
git add docs/plans/2026-04-09-javascript-audit.md
git commit -m "docs: add javascript topic audit"
```

### Task 2: Extend the Content Schema for Block-Based Learning

**Files:**
- Modify: `types/topic.ts`

**Step 1: Add optional topic-level hero stats**

Add a small typed structure such as:

```ts
export interface TopicStat {
  label: string;
  value: string;
}
```

Then extend `TopicData` with:

```ts
heroStats?: TopicStat[];
```

**Step 2: Add a discriminated union for richer content blocks**

Define a `ContentBlock` union with only the block types needed for the JavaScript rewrite:

```ts
type ContentBlock =
  | { type: "richText"; title?: string; html: string }
  | { type: "code"; title?: string; code: string; language: string; caption?: string }
  | { type: "compare"; title: string; items: { label: string; html: string }[] }
  | { type: "trap"; title: string; html: string; tone?: "warning" | "pitfall" | "interview" }
  | { type: "mechanics"; title: string; steps: string[] }
  | { type: "drill"; title: string; prompt: string; answerHtml: string }
  | { type: "recap"; title?: string; items: string[] };
```

**Step 3: Extend `Section` without breaking older topics**

Update `Section` so it supports:

```ts
blocks?: ContentBlock[];
cards?: Card[];
qa?: QAItem[];
```

Keep existing fields valid so non-JavaScript topics continue rendering unchanged.

**Step 4: Run lint**

Run: `npm run lint`

Expected: PASS

**Step 5: Commit**

```bash
git add types/topic.ts
git commit -m "feat: add block-based topic content types"
```

### Task 3: Add the New Renderer Primitives

**Files:**
- Create: `components/renderer/ContentBlockRenderer.tsx`
- Modify: `components/renderer/renderer.css`

**Step 1: Create a single block renderer switch**

Build one renderer component that accepts a `ContentBlock` and returns the correct UI by `type`.

**Step 2: Implement the minimum useful visual primitives**

Support these block types first:
- `richText`
- `code`
- `compare`
- `trap`
- `mechanics`
- `drill`
- `recap`

Keep each block visually distinct but consistent with the current design system.

**Step 3: Style the new block types**

Add class names for:
- readable prose sections
- syntax/code panels
- compare grids
- trap callouts
- step timelines
- drill prompts/answers
- recap lists

**Step 4: Keep the implementation small**

Do not add a `DiagramBlock` yet unless the content rewrite proves that existing blocks cannot express the concept clearly.

**Step 5: Run lint**

Run: `npm run lint`

Expected: PASS

**Step 6: Commit**

```bash
git add components/renderer/ContentBlockRenderer.tsx components/renderer/renderer.css
git commit -m "feat: add mastery content block renderer"
```

### Task 4: Teach the Page Renderer About Block Sections

**Files:**
- Modify: `components/renderer/TopicPage.tsx`
- Modify: `components/renderer/TopicHero.tsx`

**Step 1: Update `TopicHero` to accept optional `heroStats`**

Prefer topic-provided stats when available, otherwise preserve current derived behavior for existing topics.

**Step 2: Update `TopicPage` to render `blocks` when present**

Pseudo-flow:

```ts
if (activeSection.blocks?.length) {
  render block stack
}

if (activeSection.cards?.length) {
  render existing cards grid
}

if (activeSection.qa?.length) {
  render QA section
}
```

**Step 3: Preserve backward compatibility**

Do not break current HTML, CSS, React, Next.js, Angular, system-design, or UX/UI pages.

**Step 4: Run lint and build**

Run:
- `npm run lint`
- `npm run build`

Expected:
- lint PASS
- build PASS

**Step 5: Commit**

```bash
git add components/renderer/TopicPage.tsx components/renderer/TopicHero.tsx
git commit -m "feat: render block-based topic sections"
```

### Task 5: Restructure the JavaScript Topic Skeleton

**Files:**
- Modify: `data/topics/javascript.json`

**Step 1: Replace the current tab structure with the approved 14-chapter blueprint**

Use stable ids and learner-friendly labels.

**Step 2: Add `heroStats`**

Example:

```json
"heroStats": [
  { "label": "Chapters", "value": "14" },
  { "label": "Core Q&A", "value": "..." },
  { "label": "Drills", "value": "..." },
  { "label": "Updated", "value": "2026" }
]
```

**Step 3: For each section, add empty or partial `blocks` arrays first**

Do not try to finish all content in one edit. Create the correct skeleton so later tasks can fill it incrementally.

**Step 4: Keep the existing Q&A only where it still belongs**

Delete duplicated or weak question groups instead of carrying them forward automatically.

**Step 5: Run lint and build**

Run:
- `npm run lint`
- `npm run build`

Expected:
- lint PASS
- build PASS

**Step 6: Commit**

```bash
git add data/topics/javascript.json
git commit -m "refactor: restructure javascript topic skeleton"
```

### Task 6: Rewrite Chapters 1-4

**Files:**
- Modify: `data/topics/javascript.json`

**Scope:**
- JavaScript Origins, ECMAScript, and Runtimes
- Values, Types, and Identity
- Variables, Scope, and Closures
- Functions and Invocation Mechanics

**Step 1: Write chapter 1 blocks**

Include:
- what JavaScript is
- ECMAScript vs JavaScript
- browsers vs Node vs edge runtimes
- loading and execution basics

**Step 2: Write chapters 2-4 blocks**

Include:
- coercion and equality
- value vs reference semantics
- lexical scope and closures
- `this`, call-site rules, and `bind`
- function design patterns

**Step 3: Add traps and drills**

At minimum:
- coercion traps
- closure loop trap
- `this` binding confusion

**Step 4: Run lint and build**

Run:
- `npm run lint`
- `npm run build`

Expected: PASS

**Step 5: Commit**

```bash
git add data/topics/javascript.json
git commit -m "docs: rewrite foundational javascript chapters"
```

### Task 7: Rewrite Chapters 5-8

**Files:**
- Modify: `data/topics/javascript.json`

**Scope:**
- Objects, Prototypes, and Classes
- Arrays, Collections, and Iteration
- Modules, Tooling, and Project Structure
- Asynchrony and the Event Loop

**Step 1: Write the objects and prototypes section**

Cover:
- property lookup
- prototype chain
- `new`
- classes as syntax over prototypes
- composition vs inheritance

**Step 2: Write the collections and iteration section**

Cover:
- array methods
- iterables vs iterators
- choosing `Map`/`Set`/object

**Step 3: Write the modules and tooling section**

Cover:
- ESM
- CommonJS
- module resolution
- bundling/tree shaking/code splitting at a high-signal level

**Step 4: Write the async and event loop section**

Cover:
- promises
- async/await
- microtasks vs macrotasks
- cancellation patterns
- race conditions

**Step 5: Add mechanics and drills**

At minimum:
- prototype lookup steps
- event loop queue ordering drill

**Step 6: Run lint and build**

Run:
- `npm run lint`
- `npm run build`

Expected: PASS

**Step 7: Commit**

```bash
git add data/topics/javascript.json
git commit -m "docs: rewrite core javascript internals chapters"
```

### Task 8: Rewrite Chapters 9-11

**Files:**
- Modify: `data/topics/javascript.json`

**Scope:**
- Browser APIs and the DOM Platform
- Error Handling, Validation, and Defensive Coding
- Performance and Memory

**Step 1: Write the browser platform chapter**

Cover:
- DOM and events
- delegation
- fetch
- storage
- URL/history
- observers
- workers

**Step 2: Write the error handling chapter**

Cover:
- custom errors
- boundary decisions
- validation strategy
- defensive coding patterns

**Step 3: Write the performance and memory chapter**

Cover:
- rendering cost awareness
- event handler performance
- memory leaks
- GC basics
- profiling mindset

**Step 4: Add compare blocks and drills**

At minimum:
- event target vs currentTarget
- debounce vs throttle
- recoverable vs unrecoverable errors

**Step 5: Run lint and build**

Run:
- `npm run lint`
- `npm run build`

Expected: PASS

**Step 6: Commit**

```bash
git add data/topics/javascript.json
git commit -m "docs: rewrite javascript platform and reliability chapters"
```

### Task 9: Rewrite Chapters 12-14

**Files:**
- Modify: `data/topics/javascript.json`

**Scope:**
- Security and Reliability
- Architecture and Large-Scale JavaScript
- Mastery and Interview Readiness

**Step 1: Write the security chapter**

Cover:
- XSS
- unsafe DOM insertion
- prototype pollution awareness
- eval/function constructor hazards
- safer data handling

**Step 2: Write the architecture chapter**

Cover:
- state modeling
- pure functions and side effects
- modularity
- event-driven design
- maintainable file boundaries

**Step 3: Write the mastery chapter**

Add:
- fast-recall recap blocks
- advanced Q&A
- debugging prompts
- “explain it like an interviewer asked badly” answers

**Step 4: Run lint and build**

Run:
- `npm run lint`
- `npm run build`

Expected: PASS

**Step 5: Commit**

```bash
git add data/topics/javascript.json
git commit -m "docs: finish javascript mastery chapters"
```

### Task 10: Polish, Verify, and Leave a Reusable Template

**Files:**
- Modify: `data/topics/javascript.json`
- Modify: `docs/plans/2026-04-09-javascript-audit.md`
- Optional modify: `docs/plans/2026-04-09-javascript-design.md`

**Step 1: Review `/javascript` end-to-end**

Check:
- chapter labels
- visual rhythm
- content density
- readability of code and compare blocks
- drill clarity
- recap usefulness

**Step 2: Record what became reusable**

Update the audit doc with:
- reusable block patterns
- blocks not worth repeating
- follow-up ideas for React/Next.js/Angular

**Step 3: Run final verification**

Run:
- `npm run lint`
- `npm run build`

Expected: PASS

Then manually review the `/javascript` route in the browser or Playwright before declaring success.

**Step 4: Commit**

```bash
git add data/topics/javascript.json docs/plans/2026-04-09-javascript-audit.md docs/plans/2026-04-09-javascript-design.md
git commit -m "feat: complete javascript mastery overhaul"
```

### Execution Notes
- Validate 2026-sensitive content against official or primary sources during the rewrite.
- Leave non-JavaScript topics untouched unless a shared renderer/type change requires compatibility fixes.
- Do not automatically add images; only add diagrams if a concept is genuinely clearer with one.
- Prefer clarity, accuracy, and pedagogy over raw volume.
