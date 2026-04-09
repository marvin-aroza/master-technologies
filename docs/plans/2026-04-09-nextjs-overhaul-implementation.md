# Next.js Encyclopedia Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the Next.js topic into a 2026 App Router-first mastery track with distributed interview preparation, modern runtime/caching guidance, and a clean 14-chapter block-based curriculum.

**Architecture:** Reuse the existing block-based topic system already proven by the JavaScript and React rewrites. Keep renderer and schema changes minimal, and focus the branch on rewriting `data/topics/nextjs.json`, adding Next.js-specific regression tests, and documenting a reusable audit for future topic overhauls.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript, JSON topic data, node-based regression scripts, ESLint

---

### Task 1: Write the Next.js Gap Audit

**Files:**
- Create: `docs/plans/2026-04-09-nextjs-audit.md`
- Read: `data/topics/nextjs.json`
- Reference: `docs/plans/2026-04-09-nextjs-design.md`
- Reference: `docs/plans/2026-04-09-javascript-audit.md`
- Reference: `docs/plans/2026-04-09-react-audit.md`

**Step 1: Audit the current topic structure**

Review the current tabs, sections, duplicated App Router coverage, and centralized Q&A bank. Record what should be kept, rewritten, merged, or removed.

**Step 2: Map the topic against the approved 14-chapter blueprint**

Write a gap map covering:
- App Router architecture
- Server and Client Component boundaries
- modern caching and revalidation
- Partial Prerendering and streaming
- `proxy.ts`
- Server Functions and forms
- deployment and runtime tradeoffs
- migration and interview coverage

**Step 3: Record 2026 terminology corrections**

Capture specific terminology updates such as:
- `proxy.ts` replacing `middleware` naming
- App Router-first framing
- Next.js 16 caching language

**Step 4: Save the audit and commit**

Run:
```bash
git add docs/plans/2026-04-09-nextjs-audit.md
git commit -m "docs: add nextjs audit"
```

### Task 2: Add the Next.js Topic Regression Harness

**Files:**
- Create: `scripts/test-nextjs-topic-structure.mjs`
- Create: `scripts/test-nextjs-topic.mjs`
- Modify: `package.json`

**Step 1: Write the failing structure test**

Add assertions for:
- 14 tabs
- stable chapter ids
- topic hero stats
- a final mastery/interview capstone section
- no duplicated App Router chapters

**Step 2: Run the structure test to confirm it fails**

Run:
```bash
node scripts/test-nextjs-topic-structure.mjs
```

Expected: FAIL because the old `nextjs.json` still uses the legacy layout.

**Step 3: Add the package entrypoint**

Create `scripts/test-nextjs-topic.mjs` and wire `package.json` with:
```json
"test:nextjs-topic": "node scripts/test-nextjs-topic.mjs"
```

**Step 4: Commit the red-test harness**

Run:
```bash
git add scripts/test-nextjs-topic-structure.mjs scripts/test-nextjs-topic.mjs package.json
git commit -m "test: add nextjs topic harness"
```

### Task 3: Restructure `nextjs.json` Into the New 14-Chapter Skeleton

**Files:**
- Modify: `data/topics/nextjs.json`

**Step 1: Replace the current tab layout**

Rewrite the topic to use the approved 14-chapter Next.js blueprint.

**Step 2: Add topic-level hero stats**

Add a consistent hero block that advertises:
- 14 chapters
- modern App Router coverage
- updated 2026 scope
- interview depth

**Step 3: Remove duplicated sections**

Eliminate the current duplicated App Router coverage and collapse old overlapping sections into one coherent progression.

**Step 4: Keep later chapters scaffolded**

Populate the new chapter ids, labels, and empty block arrays so the topic is navigable before the writing batches begin.

**Step 5: Run the structure test and make it pass**

Run:
```bash
npm run test:nextjs-topic
```

Expected: PASS for the structure harness, with later chapter content still skeletal.

**Step 6: Commit the skeleton rewrite**

Run:
```bash
git add data/topics/nextjs.json
git commit -m "docs: restructure nextjs topic skeleton"
```

### Task 4: Rewrite Chapters 1-4

**Files:**
- Create: `scripts/test-nextjs-chapters-1-4.mjs`
- Modify: `scripts/test-nextjs-topic.mjs`
- Modify: `data/topics/nextjs.json`

**Target chapters:**
1. Next.js Origins, Philosophy, and Runtime Model
2. App Router File-System Architecture
3. Server Components, Client Components, and Boundaries
4. Navigation, Layout Persistence, and Metadata

**Step 1: Write the failing chapter-batch test**

Add assertions that chapters 1-4 include:
- meaningful block counts
- at least one `compare`, `mechanics`, `drill`, and `recap` across the batch
- chapter-specific Q&A

**Step 2: Run the new test to confirm it fails**

Run:
```bash
npm run test:nextjs-topic
```

Expected: FAIL because chapters 1-4 are still scaffolded.

**Step 3: Write the content for chapters 1-4**

Use:
- `richText` for mental models
- `code` for file conventions and navigation examples
- `compare` for Server vs Client and layout vs template
- `mechanics` for route resolution and metadata flow
- `trap` for common boundary mistakes
- `drill` for routing and boundary debugging
- `recap` for high-signal revision

**Step 4: Re-run the tests**

Run:
```bash
npm run test:nextjs-topic
npm run test:renderer
```

Expected: PASS for the first chapter batch and renderer compatibility.

**Step 5: Commit**

Run:
```bash
git add scripts/test-nextjs-chapters-1-4.mjs scripts/test-nextjs-topic.mjs data/topics/nextjs.json
git commit -m "docs: rewrite nextjs foundation chapters"
```

### Task 5: Rewrite Chapters 5-8

**Files:**
- Create: `scripts/test-nextjs-chapters-5-8.mjs`
- Modify: `scripts/test-nextjs-topic.mjs`
- Modify: `data/topics/nextjs.json`

**Target chapters:**
5. Data Fetching and Server-Side Data Ownership
6. Cache Components, `use cache`, and Revalidation
7. Rendering Strategies, Streaming, and Partial Prerendering
8. Server Functions, Forms, and Mutations

**Step 1: Write the failing chapter-batch test**

Add assertions for:
- server-side data ownership coverage
- `use cache` and revalidation concepts
- streaming and PPR mechanics
- mutation flow, validation, redirects, and invalidation

**Step 2: Run the new test to confirm it fails**

Run:
```bash
npm run test:nextjs-topic
```

Expected: FAIL until the batch is written.

**Step 3: Write chapters 5-8**

Make sure the content explains:
- request waterfalls and parallelization
- stale vs fresh data reasoning
- static shell vs dynamic holes
- Server Function write paths and safety

**Step 4: Re-run the tests**

Run:
```bash
npm run test:nextjs-topic
npm run test:renderer
npx tsc --noEmit --pretty false
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-nextjs-chapters-5-8.mjs scripts/test-nextjs-topic.mjs data/topics/nextjs.json
git commit -m "docs: rewrite nextjs data and rendering chapters"
```

### Task 6: Rewrite Chapters 9-11

**Files:**
- Create: `scripts/test-nextjs-chapters-9-11.mjs`
- Modify: `scripts/test-nextjs-topic.mjs`
- Modify: `data/topics/nextjs.json`

**Target chapters:**
9. Request Lifecycle, `proxy.ts`, Cookies, Headers, and Auth Gates
10. APIs, Databases, and Full-Stack Integration
11. Performance, Assets, and Build Tooling

**Step 1: Write the failing chapter-batch test**

Add assertions for:
- `proxy.ts` and request-time logic
- auth gate patterns
- Route Handlers vs Server Functions
- DB/runtime choices
- build and asset optimization coverage

**Step 2: Run the test to confirm it fails**

Run:
```bash
npm run test:nextjs-topic
```

Expected: FAIL until chapters 9-11 are populated.

**Step 3: Write chapters 9-11**

Make sure the content includes:
- cookie/header boundaries
- runtime tradeoffs
- asset optimization and bundle reasoning
- Turbopack and performance diagnostics

**Step 4: Re-run verification**

Run:
```bash
npm run test:nextjs-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-nextjs-chapters-9-11.mjs scripts/test-nextjs-topic.mjs data/topics/nextjs.json
git commit -m "docs: rewrite nextjs full-stack chapters"
```

### Task 7: Rewrite Chapters 12-14 and Expand Interview Coverage

**Files:**
- Create: `scripts/test-nextjs-chapters-12-14.mjs`
- Create: `scripts/test-nextjs-qa-coverage.mjs`
- Modify: `scripts/test-nextjs-topic.mjs`
- Modify: `data/topics/nextjs.json`

**Target chapters:**
12. Security, Reliability, and Production Hardening
13. Deployment, Runtimes, Self-Hosting, and Scale
14. Migration, Architecture, and Interview Mastery

**Step 1: Write the failing final-batch tests**

Add assertions for:
- security and reliability coverage
- deployment and runtime tradeoffs
- Pages Router migration coverage
- chapter-level Q&A across chapters 1-13
- a strong final capstone interview bank

**Step 2: Run the tests to confirm they fail**

Run:
```bash
npm run test:nextjs-topic
```

Expected: FAIL until the final batch and Q&A expansion are complete.

**Step 3: Write the final chapters and interview layers**

Requirements:
- distribute interview questions throughout chapters 1-13
- keep a larger expert-level bank in chapter 14
- include debugging and architecture questions, not only definition prompts

**Step 4: Re-run full verification**

Run:
```bash
npm run test:nextjs-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-nextjs-chapters-12-14.mjs scripts/test-nextjs-qa-coverage.mjs scripts/test-nextjs-topic.mjs data/topics/nextjs.json
git commit -m "docs: finish nextjs mastery chapters"
```

### Task 8: Verify the Next.js Topic End to End and Capture Handoff Notes

**Files:**
- Modify: `docs/plans/2026-04-09-nextjs-audit.md`

**Step 1: Run the full verification suite**

Run:
```bash
npm run test:nextjs-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

Expected: PASS.

**Step 2: Review the finished topic in the browser**

Serve the app locally and inspect `/nextjs` to verify:
- hero stats
- chapter navigation
- block order and pacing
- Q&A distribution
- rendering of diagrams, comparisons, drills, and recap blocks

**Step 3: Record reusable lessons**

Update `docs/plans/2026-04-09-nextjs-audit.md` with:
- what transferred cleanly from JavaScript/React
- which Next.js-specific patterns were most effective
- anti-patterns to avoid in future framework topics

**Step 4: Commit the final handoff**

Run:
```bash
git add docs/plans/2026-04-09-nextjs-audit.md
git commit -m "feat: complete nextjs mastery overhaul"
```

## First Execution Slice

- Finish the Next.js audit
- Add the Next.js structure harness
- Restructure `nextjs.json` into the 14-chapter skeleton
- Fully rewrite chapters 1-4
- Keep later chapters scaffolded but navigable
