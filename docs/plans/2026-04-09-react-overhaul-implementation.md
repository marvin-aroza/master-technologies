# React Encyclopedia Overhaul Implementation Plan

**Goal:** Convert the React topic into a 2026 mastery track using the JavaScript rewrite pattern: clearer chapter flow, richer block-based teaching content, fewer duplicated sections, and source-aligned modern React guidance.

**Architecture:** Reuse the existing block-based topic system proven in the JavaScript topic. Keep the renderer and schema stable, rewrite only the React topic data plus React-specific regression scripts.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript, JSON topic data, CSS, ESLint, node-based regression scripts

---

### Task 1: Write the React Gap Audit

**Files:**
- Create: `docs/plans/2026-04-09-react-audit.md`
- Read: `data/topics/react.json`
- Reference: `docs/plans/2026-04-09-javascript-audit.md`

**Expected result:** a keep/rewrite/add map for React core, async UI, server boundaries, testing, and ecosystem layers.

### Task 2: Add React Topic Regression Entry Points

**Files:**
- Create: `scripts/test-react-topic-structure.mjs`
- Create: `scripts/test-react-chapters-1-4.mjs`
- Create: `scripts/test-react-topic.mjs`
- Modify: `package.json`

**Work:**
- Add a React structure test for:
  - 14 tabs
  - stable chapter ids
  - topic hero stats
  - a mastery/interview capstone section
- Add a first-batch chapter test for chapters 1-4.
- Add a package script:
  - `test:react-topic`

### Task 3: Restructure `react.json` Into the New 14-Chapter Skeleton

**Files:**
- Modify: `data/topics/react.json`

**Work:**
- Replace the duplicated tab layout with the approved 14-chapter React blueprint.
- Add topic-level hero stats.
- Remove duplicate `state`, `patterns`, `testing`, and `React 19` sections.
- Move framework and ecosystem content into the right later chapters instead of mixing it into React fundamentals.

### Task 4: Rewrite Chapters 1-4

**Files:**
- Modify: `data/topics/react.json`

**Target chapters:**
1. React Origins, Versions, and Mental Model
2. JSX, Elements, and the Render Tree
3. Components, Props, and Composition
4. Rendering, Commit, and State as Snapshot

**Quality bar:**
- Each chapter gets a strong intro plus a meaningful set of blocks.
- Use `richText`, `code`, `compare`, `mechanics`, `trap`, `drill`, and `recap`.
- Align explanations with official React docs, not community folklore.

### Task 5: Rewrite Chapters 5-8

**Target chapters:**
5. State Ownership, Identity, and Preserving/Resetting State
6. Events, Effects, and Escape Hatches
7. Refs, DOM Integration, and Imperative APIs
8. Context, Reducers, and External Stores

### Task 6: Rewrite Chapters 9-11

**Target chapters:**
9. Async UI, Suspense, and Data Fetching Boundaries
10. Forms, Actions, and Optimistic Mutations
11. Performance, Compiler, and Rendering Tradeoffs

### Task 7: Rewrite Chapters 12-14 and Capstone Q&A

**Target chapters:**
12. Server Components, Directives, and Framework Boundaries
13. Testing, Accessibility, and Reliability
14. Architecture, Ecosystem Choices, and Interview Mastery

**Work:**
- Keep the final chapter as a capstone layer, not a giant duplicate Q&A dump.
- Prune the current interview bank into a smaller, more useful set of layered questions.

### Task 8: Verify the React Topic End to End

**Run:**
- `npm run test:react-topic`
- `npm run test:renderer`
- `npm run lint`
- `npx tsc --noEmit --pretty false`
- `npm run build`

**Expected result:** React rewrite stays compatible with the current renderer and app build.

## First Execution Slice

- Finish the React audit
- Add React regression scripts
- Restructure `react.json`
- Fully rewrite chapters 1-4
- Keep the later chapters scaffolded but navigable
