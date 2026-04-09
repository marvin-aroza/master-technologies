# Angular Encyclopedia Overhaul Implementation Plan

**Goal:** Convert the Angular topic into a 2026 standalone-first mastery track with distributed interview preparation, accurate stable-vs-experimental guidance, and a clean 14-chapter block-based curriculum.

**Architecture:** Reuse the existing block-based topic system already proven by the JavaScript, React, and Next.js rewrites. Keep renderer and schema changes minimal, and focus the branch on rewriting `data/topics/angular.json`, adding Angular-specific regression tests, and documenting a reusable audit for future topic overhauls.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript, JSON topic data, node-based regression scripts, ESLint

---

### Task 1: Write the Angular Gap Audit

**Files:**
- Create: `docs/plans/2026-04-09-angular-audit.md`
- Read: `data/topics/angular.json`
- Reference: `docs/plans/2026-04-09-angular-design.md`
- Reference: `docs/plans/2026-04-09-react-audit.md`
- Reference: `docs/plans/2026-04-09-nextjs-audit.md`

**Step 1: Audit the current topic structure**

Review the current tabs, legacy card sections, centralized interview bank, and duplicated modern-Angular coverage across `core`, `signals`, and `v21`.

**Step 2: Map the topic against the approved 14-chapter blueprint**

Write a gap map covering:
- standalone architecture
- signals and change detection
- DI/provider architecture
- routing and route data
- HttpClient, resources, and interceptors
- forms and Signal Forms
- RxJS interop and state patterns
- testing, SSR/hydration, tooling, security, and migration

**Step 3: Record 2026 terminology corrections**

Capture specific terminology updates such as:
- Angular `21.x` being the active stable line on `April 9, 2026`
- standalone authoring being the modern default
- zoneless being the Angular `v21+` default, with `v20` using `provideZonelessChangeDetection()`
- Vitest being the default testing setup for new CLI projects
- `httpResource` remaining experimental

**Step 4: Save the audit**

---

### Task 2: Add the Angular Topic Regression Harness

**Files:**
- Create: `scripts/test-angular-topic-structure.mjs`
- Create: `scripts/test-angular-topic-content-shape.mjs`
- Create: `scripts/test-angular-topic.mjs`
- Modify: `package.json`

**Step 1: Write the failing structure test**

Add assertions for:
- 14 tabs
- stable chapter ids
- topic hero stats
- a final migration/interview capstone section
- no dedicated legacy `v21`, `signals`, or giant raw interview tabs

**Step 2: Run the structure test to confirm it fails**

Run:
```bash
node scripts/test-angular-topic-structure.mjs
```

Expected: FAIL because the old `angular.json` still uses the legacy 23-tab layout.

**Step 3: Add the package entrypoint**

Create `scripts/test-angular-topic.mjs` and wire `package.json` with:
```json
"test:angular-topic": "node scripts/test-angular-topic.mjs"
```

**Step 4: Commit the red-test harness**

Run:
```bash
git add scripts/test-angular-topic-structure.mjs scripts/test-angular-topic-content-shape.mjs scripts/test-angular-topic.mjs package.json
git commit -m "test: add angular topic harness"
```

---

### Task 3: Restructure `angular.json` Into The New 14-Chapter Skeleton

**Files:**
- Modify: `data/topics/angular.json`

**Step 1: Replace the current tab layout**

Rewrite the topic to use the approved 14-chapter Angular blueprint.

**Step 2: Add topic-level hero stats**

Add a consistent hero block that advertises:
- 14 chapters
- standalone-first coverage
- updated 2026 scope
- interview depth

**Step 3: Remove duplicated sections**

Eliminate the current fragmented coverage across:
- `core`
- `signals`
- `v21`
- `cs`
- `iq`

**Step 4: Keep later chapters scaffolded**

Populate the new chapter ids, labels, and initial block arrays so the topic is navigable before the writing batches begin.

**Step 5: Run the structure test and make it pass**

Run:
```bash
npm run test:angular-topic
```

Expected: PASS for the structure harness, with later chapter content still skeletal.

**Step 6: Commit the skeleton rewrite**

Run:
```bash
git add data/topics/angular.json
git commit -m "docs: restructure angular topic skeleton"
```

---

### Task 4: Rewrite Chapters 1-4

**Files:**
- Create: `scripts/test-angular-chapters-1-4.mjs`
- Modify: `scripts/test-angular-topic.mjs`
- Modify: `data/topics/angular.json`

**Target chapters:**
1. Angular Origins, Versions, and Platform Model
2. Bootstrapping, Standalone Architecture, and Project Structure
3. Components, Templates, and Built-in Control Flow
4. Signals, Reactivity, and Change Detection

**Step 1: Write the failing chapter-batch test**

Add assertions that chapters 1-4 include:
- meaningful block counts
- at least one `compare`, `mechanics`, `drill`, and `recap`
- chapter-specific Q&A
- stable-vs-experimental accuracy where needed

**Step 2: Run the new test to confirm it fails**

Run:
```bash
npm run test:angular-topic
```

Expected: FAIL because chapters 1-4 are still scaffolded.

**Step 3: Write the content for chapters 1-4**

Use:
- `richText` for framework mental models
- `code` for bootstrapping and template examples
- `compare` for standalone vs NgModule-era thinking and zoned vs zoneless
- `mechanics` for bootstrap and change detection flow
- `trap` for common misconceptions
- `drill` for runtime and reactivity debugging
- `recap` for high-signal revision

**Step 4: Re-run the tests**

Run:
```bash
npm run test:angular-topic
npm run test:renderer
```

Expected: PASS for the first chapter batch and renderer compatibility.

**Step 5: Commit**

Run:
```bash
git add scripts/test-angular-chapters-1-4.mjs scripts/test-angular-topic.mjs data/topics/angular.json
git commit -m "docs: rewrite angular foundation chapters"
```

---

### Task 5: Rewrite Chapters 5-8

**Files:**
- Create: `scripts/test-angular-chapters-5-8.mjs`
- Modify: `scripts/test-angular-topic.mjs`
- Modify: `data/topics/angular.json`

**Target chapters:**
5. Dependency Injection, Providers, and Application Architecture
6. Component Composition, Directives, Pipes, and View Queries
7. Routing, Route Data, Guards, and Navigation
8. HTTP, Resources, Interceptors, and Data Access

**Step 1: Write the failing chapter-batch test**

Add assertions for:
- injector hierarchy and provider scope
- component composition and directive/query behavior
- modern routing and route data
- HttpClient, interceptors, and `httpResource` coverage

**Step 2: Run the new test to confirm it fails**

Run:
```bash
npm run test:angular-topic
```

Expected: FAIL until the batch is written.

**Step 3: Write chapters 5-8**

Make sure the content explains:
- provider placement and injector scope
- component API design and template extension patterns
- routing data ownership and guard strategy
- stable HttpClient patterns versus experimental resource APIs

**Step 4: Re-run the tests**

Run:
```bash
npm run test:angular-topic
npm run test:renderer
npx tsc --noEmit --pretty false
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-angular-chapters-5-8.mjs scripts/test-angular-topic.mjs data/topics/angular.json
git commit -m "docs: rewrite angular architecture chapters"
```

---

### Task 6: Rewrite Chapters 9-11

**Files:**
- Create: `scripts/test-angular-chapters-9-11.mjs`
- Modify: `scripts/test-angular-topic.mjs`
- Modify: `data/topics/angular.json`

**Target chapters:**
9. Forms, Validation, and Submission Flows
10. RxJS Interop, State Management, and Async Architecture
11. Testing, Debugging, and Reliability

**Step 1: Write the failing chapter-batch test**

Add assertions for:
- reactive forms and Signal Forms coverage
- signals/RxJS interop and state tradeoffs
- Vitest-first testing and debugging guidance

**Step 2: Run the test to confirm it fails**

Run:
```bash
npm run test:angular-topic
```

Expected: FAIL until chapters 9-11 are populated.

**Step 3: Write chapters 9-11**

Make sure the content includes:
- stable and emerging forms guidance
- RxJS as async/interoperability layer
- current testing defaults and reliability patterns

**Step 4: Re-run verification**

Run:
```bash
npm run test:angular-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-angular-chapters-9-11.mjs scripts/test-angular-topic.mjs data/topics/angular.json
git commit -m "docs: rewrite angular async chapters"
```

---

### Task 7: Rewrite Chapters 12-14 And Expand Interview Coverage

**Files:**
- Create: `scripts/test-angular-chapters-12-14.mjs`
- Create: `scripts/test-angular-qa-coverage.mjs`
- Modify: `scripts/test-angular-topic.mjs`
- Modify: `data/topics/angular.json`

**Target chapters:**
12. SSR, Hydration, Hybrid Rendering, and Performance
13. Build Tooling, Security, Accessibility, Internationalization, and Deployment
14. Ecosystem, Migration, and Interview Mastery

**Step 1: Write the failing final-batch tests**

Add assertions for:
- SSR, hydration, and hybrid rendering coverage
- tooling, security, accessibility, and i18n coverage
- migration coverage for NgModules, zoneless, and Karma/Vitest
- chapter-level Q&A across chapters 1-13
- a strong final capstone interview bank

**Step 2: Run the tests to confirm they fail**

Run:
```bash
npm run test:angular-topic
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
npm run test:angular-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add scripts/test-angular-chapters-12-14.mjs scripts/test-angular-qa-coverage.mjs scripts/test-angular-topic.mjs data/topics/angular.json
git commit -m "docs: finish angular mastery chapters"
```

---

### Task 8: Verify The Angular Topic End To End And Capture Handoff Notes

**Files:**
- Modify: `docs/plans/2026-04-09-angular-audit.md`

**Step 1: Run the full verification suite**

Run:
```bash
npm run test:angular-topic
npm run test:renderer
npx tsc --noEmit --pretty false
npm run lint
npm run build
```

**Step 2: Smoke-test the topic page**

Verify the `/angular` page in the browser:
- chapter navigation works
- blocks render correctly
- Q&A filters and counts behave correctly
- no malformed HTML or layout breaks

**Step 3: Update the audit with closeout notes**

Record:
- what changed
- what verification passed
- any remaining non-blocking warnings

**Step 4: Push or hand off**

After verification, the branch is ready for push, PR, or the next topic.
