# System Design Encyclopedia Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the System Design topic into a 2026 frontend-first then distributed-systems mastery track with preserved legacy knowledge, stronger tradeoff reasoning, distributed interview preparation, and a robust final architecture/interview capstone.

**Architecture:** Reuse the existing block-based topic system already proven by the JavaScript, React, Next.js, Angular, HTML, CSS, and UI/UX rewrites. Keep renderer and schema changes minimal, focus the branch on rewriting `data/topics/system-design.json`, add System Design-specific regression tests, and document a formal migration map so strong existing architecture content is intentionally relocated instead of lost.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript, JSON topic data, node-based regression scripts, ESLint

---

### Task 1: Write the System Design Gap Audit and Content Migration Map

**Files:**
- Create: `docs/plans/2026-04-10-system-design-audit.md`
- Read: `data/topics/system-design.json`
- Reference: `docs/plans/2026-04-10-system-design-design.md`
- Reference: `docs/plans/2026-04-10-uxui-audit.md`
- Reference: `docs/plans/2026-04-10-css-audit.md`

**Step 1: Audit the current topic structure**

Review the current tabs, legacy sections, centralized interview bank, and overlap across:
- `fsd-core`
- `sd-arch`
- `sd-data`
- `fsd-examples`
- `sd-mastery`
- `sd-cs`
- `fsd-iq`

Record what should be kept, rewritten, merged, or relocated.

**Step 2: Build the content migration map**

Write a map that labels each major content cluster as:
- keep in core application system design
- move to later distributed-systems chapters
- merge into recap/reference/interview sections

Make sure the map explicitly includes the existing cheat-sheet and interview-bank material so it is preserved, not discarded.

**Step 3: Record 2026 architectural framing corrections**

Capture specific corrections and framing for:
- frontend/application-first system design
- caching and edge layering
- real-time transport comparisons
- async workflow and queue terminology
- resilience and observability positioning
- global scale and consistency tradeoffs

**Step 4: Save the audit and commit**

Run:
```bash
git add docs/plans/2026-04-10-system-design-audit.md
git commit -m "docs: add system design audit"
```

### Task 2: Add the System Design Topic Regression Harness

**Files:**
- Create: `scripts/test-system-design-topic-structure.mjs`
- Create: `scripts/test-system-design-topic.mjs`
- Modify: `package.json`

**Step 1: Write the failing structure test**

Add assertions for:
- 14 tabs
- stable chapter ids
- topic hero stats
- a frontend/application-first chapter flow
- a final architecture/interview capstone chapter
- no legacy cheat-sheet/interview tabs left in the core flow

**Step 2: Run the structure test to confirm it fails**

Run:
```bash
node scripts/test-system-design-topic-structure.mjs
```

Expected: FAIL because the current `system-design.json` still uses the mixed legacy layout.

**Step 3: Add the package entrypoint**

Create `scripts/test-system-design-topic.mjs` and wire `package.json` with:
```json
"test:system-design-topic": "node scripts/test-system-design-topic.mjs"
```

**Step 4: Commit the red-test harness**

Run:
```bash
git add scripts/test-system-design-topic-structure.mjs scripts/test-system-design-topic.mjs package.json
git commit -m "test: add system design topic harness"
```

### Task 3: Restructure `system-design.json` Into the New 14-Chapter Skeleton

**Files:**
- Modify: `data/topics/system-design.json`

**Step 1: Replace the current tab layout**

Rewrite the topic to use the approved 14-chapter System Design blueprint.

**Step 2: Add topic-level hero stats**

Add a consistent hero block that advertises:
- 14 chapters
- application-to-distributed-systems coverage
- tradeoff depth
- interview readiness

**Step 3: Collapse the legacy mixed structure**

Remove the old cheat-sheet-heavy layout and replace it with one coherent System Design progression. Preserve displaced material per the migration map instead of losing it.

**Step 4: Keep later chapters scaffolded**

Populate the new chapter ids, labels, and empty block arrays so the topic is navigable before the writing batches begin.

**Step 5: Run the structure test and make it pass**

Run:
```bash
npm run test:system-design-topic
```

Expected: PASS for the structure harness, with later chapter content still skeletal.

**Step 6: Commit the skeleton rewrite**

Run:
```bash
git add data/topics/system-design.json
git commit -m "docs: restructure system design topic skeleton"
```

### Task 4: Rewrite Chapters 1-4

**Files:**
- Create: `scripts/test-system-design-chapters-1-4.mjs`
- Modify: `scripts/test-system-design-topic.mjs`
- Modify: `data/topics/system-design.json`

**Target chapters:**
1. System Design Foundations, Requirements, and Tradeoffs
2. Client-Server Architecture and Request Lifecycles
3. Application Architecture, State, and Data Flow
4. API Design, Contracts, and Integration Patterns

**Step 1: Write the failing chapter-batch test**

Add assertions that chapters 1-4 include:
- meaningful block counts
- at least one `compare`, `mechanics`, `drill`, and `recap` across the batch
- requirement/tradeoff coverage
- request flow and API coverage
- chapter-specific Q&A

**Step 2: Run the new test to confirm it fails**

Run:
```bash
npm run test:system-design-topic
```

Expected: FAIL because chapters 1-4 are still scaffolded.

**Step 3: Write the content for chapters 1-4**

Use:
- `richText` for architecture mental models
- `compare` for architectural approach tradeoffs
- `mechanics` for request and data flow breakdowns
- `trap` for common system-design reasoning mistakes
- `drill` for architecture and interview scenarios
- `recap` for high-signal revision

**Step 4: Re-run the tests**

Run:
```bash
npm run test:system-design-topic
npm run test:renderer
```

Expected: PASS for the first chapter batch and renderer compatibility.

**Step 5: Commit**

Run:
```bash
git add scripts/test-system-design-chapters-1-4.mjs scripts/test-system-design-topic.mjs data/topics/system-design.json
git commit -m "docs: rewrite system design foundations"
```

### Task 5: Rewrite Chapters 5-8

**Files:**
- Create: `scripts/test-system-design-chapters-5-8.mjs`
- Modify: `scripts/test-system-design-topic.mjs`
- Modify: `data/topics/system-design.json`

**Target chapters:**
5. Caching, CDN, Edge, and Performance Layers
6. Scalable Frontend and Full-Stack Product Architecture
7. Real-Time Systems, Collaboration, and Event-Driven UX
8. Authentication, Authorization, Security, and Multi-Tenancy

**Step 1: Write the failing chapter-batch test**

Add assertions for:
- cache and edge coverage
- large-app architecture coverage
- real-time transport and collaboration coverage
- auth and security coverage

**Step 2: Run the new test to confirm it fails**

Run:
```bash
npm run test:system-design-topic
```

Expected: FAIL until the batch is written.

**Step 3: Write chapters 5-8**

Make sure the content explains:
- how cache layers interact and fail
- how large product architectures are split and maintained
- when to use polling, SSE, or WebSockets
- how auth/authz boundaries shape architecture

**Step 4: Re-run the tests**

Run:
```bash
npm run test:system-design-topic
npm run test:renderer
npx tsc --noEmit --pretty false
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-system-design-chapters-5-8.mjs scripts/test-system-design-topic.mjs data/topics/system-design.json
git commit -m "docs: rewrite system design product architecture chapters"
```

### Task 6: Rewrite Chapters 9-11

**Files:**
- Create: `scripts/test-system-design-chapters-9-11.mjs`
- Modify: `scripts/test-system-design-topic.mjs`
- Modify: `data/topics/system-design.json`

**Target chapters:**
9. Databases, Storage Models, Indexing, and Search
10. Asynchronous Work, Queues, Jobs, and Workflow Design
11. Reliability, Resilience, and Failure Management

**Step 1: Write the failing chapter-batch test**

Add assertions for:
- SQL/NoSQL and indexing coverage
- queue, job, and workflow coverage
- resilience and failure-mode coverage

**Step 2: Run the new test to confirm it fails**

Run:
```bash
npm run test:system-design-topic
```

Expected: FAIL until the batch is written.

**Step 3: Write chapters 9-11**

Make sure the content explains:
- how storage choices follow access patterns
- when work should leave the request path
- how systems fail under pressure and how to contain that failure

**Step 4: Re-run the tests**

Run:
```bash
npm run test:system-design-topic
npm run test:renderer
npx tsc --noEmit --pretty false
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-system-design-chapters-9-11.mjs scripts/test-system-design-topic.mjs data/topics/system-design.json
git commit -m "docs: rewrite system design data and resilience chapters"
```

### Task 7: Rewrite Chapters 12-14 and Expand Interview Coverage

**Files:**
- Create: `scripts/test-system-design-chapters-12-14.mjs`
- Create: `scripts/test-system-design-qa-coverage.mjs`
- Modify: `scripts/test-system-design-topic.mjs`
- Modify: `data/topics/system-design.json`

**Target chapters:**
12. Observability, Testing, Rollouts, and Operations
13. Global Scale, Consistency, and Distributed Systems Tradeoffs
14. Architecture Case Studies and Interview Mastery

**Step 1: Write the failing coverage tests**

Add assertions for:
- observability and rollout coverage
- consistency and global-scale coverage
- case-study and interview capstone coverage
- chapter-level interview questions across chapters 1-13
- a large final capstone bank in chapter 14

**Step 2: Run the new tests to confirm they fail**

Run:
```bash
npm run test:system-design-topic
```

Expected: FAIL until the final chapters and interview distribution are written.

**Step 3: Write the final chapters**

Make sure the content explains:
- how to observe and operate systems safely
- how global systems choose consistency and availability tradeoffs
- how to structure case-study and whiteboard interview answers

Preserve and expand the existing interview material so the final topic is stronger than the current `fsd-iq` bank, not smaller.

**Step 4: Re-run the tests**

Run:
```bash
npm run test:system-design-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-system-design-chapters-12-14.mjs scripts/test-system-design-qa-coverage.mjs scripts/test-system-design-topic.mjs data/topics/system-design.json
git commit -m "docs: complete system design mastery rewrite"
```

### Task 8: Final Verification and Browser Review

**Files:**
- Verify: `data/topics/system-design.json`
- Verify: `scripts/test-system-design-topic.mjs`
- Verify: `package.json`

**Step 1: Run the full verification suite**

Run:
```bash
npm run test:system-design-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

Expected: PASS. If `npm run build` hits the known Windows worktree `.next` EPERM issue inside the sandbox, re-run outside the sandbox and record that result explicitly.

**Step 2: Review the topic in the browser**

Run the local app and verify the `/system-design` route for:
- chapter order and labels
- hero stats
- block rendering quality
- distributed interview coverage
- navigation behavior
- visual stability of compare, drill, and recap blocks

**Step 3: Record final rewrite lessons**

Document the key rewrite patterns, interview-distribution lessons, and any renderer gaps discovered so the encyclopedia closes with a reusable final pattern set.

**Step 4: Commit any final verification or doc touch-ups**

Run:
```bash
git add docs/plans/2026-04-10-system-design-audit.md data/topics/system-design.json scripts/test-system-design-topic.mjs scripts/test-system-design-topic-structure.mjs scripts/test-system-design-chapters-1-4.mjs scripts/test-system-design-chapters-5-8.mjs scripts/test-system-design-chapters-9-11.mjs scripts/test-system-design-chapters-12-14.mjs scripts/test-system-design-qa-coverage.mjs package.json
git commit -m "test: finalize system design topic verification"
```
