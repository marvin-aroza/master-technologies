# OOPS Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add `OOPS` as a gold-standard encyclopedia topic with a full 14-chapter mastery track, integrated routing/navigation, and dedicated regression coverage.

**Architecture:** Reuse the existing block-based `TopicData` renderer and the same topic-file integration model used by the current encyclopedia. Add one new topic JSON file, wire it into route generation and catalog/navigation surfaces, then enforce its existence and minimum quality with topic-specific regression scripts.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript, JSON topic content, Node-based regression scripts.

---

### Task 1: Add the regression harness for the OOPS topic

**Files:**
- Create: `scripts/test-oops-structure.mjs`
- Create: `scripts/test-oops-coverage.mjs`
- Create: `scripts/test-oops-topic.mjs`
- Modify: `package.json`

**Work:**
- Add a structure test that checks:
  - `data/topics/oops.json` exists
  - the topic has 14 tabs and 14 matching sections
  - the topic uses block-based content
  - hero stats exist
  - chapter-level Q&A exists
  - the final capstone Q&A bank exists
- Add a coverage test that enforces strong minimum content and interview thresholds.
- Add a package script:
  - `test:oops-topic`

**Verification:**
- Run: `npm run test:oops-topic`

### Task 2: Create the OOPS topic file with the full mastery skeleton

**Files:**
- Create: `data/topics/oops.json`

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
- Run: `npm run test:oops-topic`

### Task 3: Write chapters 1-4 to gold-standard depth

**Files:**
- Modify: `data/topics/oops.json`

**Work:**
- Replace the initial scaffolding in chapters 1-4 with deep content covering:
  - what OOP is and why it exists
  - objects, classes, identity, state, and behavior
  - encapsulation and abstraction
  - inheritance, polymorphism, and subtyping
- Include meaningful:
  - `compare`
  - `mechanics`
  - `code`
  - `trap`
  - `drill`
  - `recap`
  - chapter-level `qa`

**Verification:**
- Run: `npm run test:oops-topic`

### Task 4: Write chapters 5-8 with core design depth

**Files:**
- Modify: `data/topics/oops.json`

**Work:**
- Deepen chapters 5-8 to cover:
  - composition over inheritance
  - interfaces, contracts, and API design
  - cohesion, coupling, and responsibility design
  - SOLID principles with real tradeoffs
- Keep the teaching design-first and anti-pattern aware rather than definition-heavy.
- Maintain strong chapter-level interview reinforcement.

**Verification:**
- Run: `npm run test:oops-topic`

### Task 5: Write chapters 9-11 with modeling, patterns, and testing depth

**Files:**
- Modify: `data/topics/oops.json`

**Work:**
- Deepen chapters 9-11 to cover:
  - object relationships and domain modeling
  - object-oriented patterns and reusable design moves
  - testing, refactoring, and debugging OOP systems
- Make responsibility placement, collaboration boundaries, and over-engineering risks explicit.

**Verification:**
- Run: `npm run test:oops-topic`

### Task 6: Finish chapters 12-14 and expand the capstone interview bank

**Files:**
- Modify: `data/topics/oops.json`

**Work:**
- Deepen chapters 12-14 to cover:
  - performance, memory, and runtime tradeoffs
  - OOP across languages
  - final interview mastery and system-design-with-OOP drills
- Expand the final chapter into a serious capstone Q&A bank with:
  - principle explanations
  - anti-pattern diagnosis
  - refactoring prompts
  - design-modeling questions
  - language comparison questions

**Verification:**
- Run: `npm run test:oops-topic`

### Task 7: Wire the new topic into route generation and metadata

**Files:**
- Modify: `app/[topic]/page.tsx`

**Work:**
- Import the new topic JSON file.
- Add route config for:
  - `oops`
- Add accent color, title, and description.
- Ensure `generateStaticParams()` includes the new slug.

**Verification:**
- Run: `npm run test:oops-topic`

### Task 8: Update the home page, top navigation, sidebar, and study order

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/TopNav.tsx`
- Modify: `components/Sidebar.tsx`
- Modify: `components/renderer/TopicPage.tsx`

**Work:**
- Add OOPS to the `Computer Science` catalog group on the home page.
- Add the OOPS topic card with real metadata and counts.
- Update displayed topic, chapter, and Q&A totals.
- Insert OOPS into the approved study order after `data-structures-algorithms` and before `python`.
- Ensure the top navigation and sidebar expose the new topic clearly.

**Verification:**
- Run: `npm run lint`

### Task 9: Final verification

**Files:**
- Verify existing touched files only

**Work:**
- Run the OOPS regression harness.
- Run the renderer regression.
- Run type-check.
- Run lint.
- Run build.
- If useful, browser-check:
  - `/oops`

**Verification:**
- Run: `npm run test:oops-topic`
- Run: `npm run test:renderer`
- Run: `npx tsc --noEmit --pretty false`
- Run: `npm run lint`
- Run: `npm run build`
