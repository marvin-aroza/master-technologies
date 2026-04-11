# Data Structures and Algorithms Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add `Data Structures & Algorithms` as a gold-standard encyclopedia topic with a full 14-chapter mastery track, integrated routing/navigation, and dedicated regression coverage.

**Architecture:** Reuse the existing block-based `TopicData` renderer and the same topic-file integration model used by the current encyclopedia. Add one new topic JSON file, wire it into route generation and catalog/navigation surfaces, then enforce its existence and minimum quality with topic-specific regression scripts.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript, JSON topic content, Node-based regression scripts.

---

### Task 1: Add the regression harness for the DSA topic

**Files:**
- Create: `scripts/test-data-structures-algorithms-structure.mjs`
- Create: `scripts/test-data-structures-algorithms-coverage.mjs`
- Create: `scripts/test-data-structures-algorithms.mjs`
- Modify: `package.json`

**Work:**
- Add a structure test that checks:
  - `data/topics/data-structures-algorithms.json` exists
  - the topic has 14 tabs and 14 matching sections
  - the topic uses block-based content
  - hero stats exist
  - chapter-level Q&A exists
  - the final capstone Q&A bank exists
- Add a coverage test that enforces strong minimum content and interview thresholds.
- Add a package script:
  - `test:data-structures-algorithms`

**Verification:**
- Run: `npm run test:data-structures-algorithms`

### Task 2: Create the DSA topic file with the full mastery skeleton

**Files:**
- Create: `data/topics/data-structures-algorithms.json`

**Work:**
- Build the topic in the existing `TopicData` shape with:
  - `id`
  - `title`
  - `subtitle`
  - `heroStats`
  - 14 tabs
  - 14 sections
  - initial intros
  - initial block structure
  - chapter-level Q&A scaffolding
  - final capstone Q&A scaffolding

**Verification:**
- Run: `npm run test:data-structures-algorithms`

### Task 3: Write chapters 1-4 to gold-standard depth

**Files:**
- Modify: `data/topics/data-structures-algorithms.json`

**Work:**
- Replace the initial scaffolding in chapters 1-4 with deep content covering:
  - algorithmic thinking and complexity
  - memory intuition, arrays, and strings
  - linked structures, stacks, and queues
  - hashing, sets, and maps
- Include meaningful:
  - `compare`
  - `mechanics`
  - `code`
  - `trap`
  - `drill`
  - `recap`
  - chapter-level `qa`

**Verification:**
- Run: `npm run test:data-structures-algorithms`

### Task 4: Write chapters 5-8 with core algorithm-family depth

**Files:**
- Modify: `data/topics/data-structures-algorithms.json`

**Work:**
- Deepen chapters 5-8 to cover:
  - recursion, backtracking, and divide & conquer
  - sorting and searching
  - trees and binary search trees
  - heaps, priority queues, and selection problems
- Keep the teaching practical and traceable, not outline-like.
- Maintain strong chapter-level interview reinforcement.

**Verification:**
- Run: `npm run test:data-structures-algorithms`

### Task 5: Write chapters 9-11 with graph, greedy, and DP reasoning

**Files:**
- Modify: `data/topics/data-structures-algorithms.json`

**Work:**
- Deepen chapters 9-11 to cover:
  - graph representations, BFS, DFS, and traversal reasoning
  - greedy algorithms and interval patterns
  - dynamic programming with memoization, tabulation, state design, and transition logic
- Make complexity tradeoffs and failure modes explicit.

**Verification:**
- Run: `npm run test:data-structures-algorithms`

### Task 6: Finish chapters 12-14 and expand the capstone interview bank

**Files:**
- Modify: `data/topics/data-structures-algorithms.json`

**Work:**
- Deepen chapters 12-14 to cover:
  - advanced structures and tool-choice tradeoffs
  - implementation bugs, edge cases, and real-world performance costs
  - final interview mastery and pattern synthesis
- Expand the final chapter into a serious capstone Q&A bank with:
  - pattern recognition questions
  - complexity analysis prompts
  - debugging prompts
  - verbal explanation drills

**Verification:**
- Run: `npm run test:data-structures-algorithms`

### Task 7: Wire the new topic into route generation and metadata

**Files:**
- Modify: `app/[topic]/page.tsx`

**Work:**
- Import the new topic JSON file.
- Add route config for:
  - `data-structures-algorithms`
- Add accent color, title, and description.
- Ensure `generateStaticParams()` includes the new slug.

**Verification:**
- Run: `npm run test:data-structures-algorithms`

### Task 8: Update the home page, top navigation, sidebar, and study order

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/TopNav.tsx`
- Modify: `components/Sidebar.tsx`
- Modify: `components/renderer/TopicPage.tsx`

**Work:**
- Add a `Computer Science` catalog group on the home page.
- Add the DSA topic card with real metadata and counts.
- Update displayed topic, chapter, and Q&A totals.
- Insert DSA into the approved study order between `npm` and `python`.
- Ensure the top navigation and sidebar expose the new topic clearly.

**Verification:**
- Run: `npm run lint`

### Task 9: Final verification

**Files:**
- Verify existing touched files only

**Work:**
- Run the DSA regression harness.
- Run the renderer regression.
- Run type-check.
- Run lint.
- Run build.
- If useful, browser-check:
  - `/data-structures-algorithms`

**Verification:**
- Run: `npm run test:data-structures-algorithms`
- Run: `npm run test:renderer`
- Run: `npx tsc --noEmit --pretty false`
- Run: `npm run lint`
- Run: `npm run build`
