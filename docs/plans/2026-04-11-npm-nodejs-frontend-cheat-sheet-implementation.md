# npm, Node.js, and Frontend Cheat Sheet Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add npm and Node.js as full mastery topics and Frontend Cheat Sheet as a compact first-class reference topic with real routes, navigation, metadata, and regression coverage.

**Architecture:** Reuse the current block-based `TopicData` renderer. Add three new topic JSON files, wire them into `app/[topic]/page.tsx`, `app/page.tsx`, and `components/renderer/TopicPage.tsx`, then add regression scripts that enforce the different expectations for mastery topics versus the compact cheat-sheet topic.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript, JSON topic content, Node-based regression scripts.

---

### Task 1: Add regression harness for the new catalog expansion

**Files:**
- Create: `scripts/test-npm-nodejs-cheatsheet-structure.mjs`
- Create: `scripts/test-npm-nodejs-cheatsheet-coverage.mjs`
- Create: `scripts/test-npm-nodejs-cheatsheet.mjs`
- Modify: `package.json`

**Work:**
- Add a structure test that checks:
  - `data/topics/npm.json` exists
  - `data/topics/nodejs.json` exists
  - `data/topics/frontend-cheat-sheet.json` exists
  - `npm` and `nodejs` each have 14 tabs and 14 sections
  - `frontend-cheat-sheet` has the compact expected section count
  - all three use `blocks`
  - interview coverage exists
- Add a coverage test that enforces minimum Q&A counts and ensures the new slugs are expected in app routing.
- Add a package script:
  - `test:npm-nodejs-cheatsheet`

**Verification:**
- Run: `npm run test:npm-nodejs-cheatsheet`

### Task 2: Create the three new topic files with skeleton content

**Files:**
- Create: `data/topics/npm.json`
- Create: `data/topics/nodejs.json`
- Create: `data/topics/frontend-cheat-sheet.json`

**Work:**
- Build `npm.json` and `nodejs.json` in the existing `TopicData` mastery shape with:
  - id
  - title
  - subtitle
  - hero stats
  - 14 tabs
  - 14 sections
  - starter block content
  - chapter-level Q&A
  - final capstone Q&A
- Build `frontend-cheat-sheet.json` as a compact block-based reference topic with:
  - id
  - title
  - subtitle
  - hero stats
  - compact section list
  - short dense blocks
  - rapid-fire interview/trap coverage

**Verification:**
- Run: `npm run test:npm-nodejs-cheatsheet`

### Task 3: Deepen npm chapters 1-4

**Files:**
- Modify: `data/topics/npm.json`

**Work:**
- Replace any light scaffolding in chapters 1-4 with stronger content covering:
  - registries and the npm ecosystem
  - `package.json`, metadata, and scripts
  - dependency types
  - semver, version ranges, and lockfiles
- Include meaningful:
  - `compare`
  - `mechanics`
  - `trap`
  - `drill`
  - `recap`
  - chapter-level `qa`

**Verification:**
- Run: `npm run test:npm-nodejs-cheatsheet`

### Task 4: Deepen Node.js chapters 1-4

**Files:**
- Modify: `data/topics/nodejs.json`

**Work:**
- Replace any light scaffolding in chapters 1-4 with stronger content covering:
  - Node.js architecture, V8, and libuv
  - CommonJS and ESM
  - event loop behavior
  - process lifecycle and runtime configuration
- Include meaningful:
  - `compare`
  - `mechanics`
  - `trap`
  - `drill`
  - `recap`
  - chapter-level `qa`

**Verification:**
- Run: `npm run test:npm-nodejs-cheatsheet`

### Task 5: Fill npm and Node.js chapters 5-14 with meaningful starter coverage

**Files:**
- Modify: `data/topics/npm.json`
- Modify: `data/topics/nodejs.json`

**Work:**
- Expand chapters 5-14 so they are instructional rather than placeholder-like.
- Ensure each chapter still has:
  - a real intro
  - multiple blocks
  - chapter-level `qa`
- Make the final chapter interview banks stronger than the chapter-level sets.

**Verification:**
- Run: `npm run test:npm-nodejs-cheatsheet`

### Task 6: Build the compact Frontend Cheat Sheet content

**Files:**
- Modify: `data/topics/frontend-cheat-sheet.json`

**Work:**
- Fill the cheat-sheet sections with dense, scan-friendly content for:
  - HTML essentials
  - CSS layout/selectors
  - JavaScript essentials
  - browser APIs and DOM events
  - accessibility rules
  - performance quick wins
  - React reference
  - Next.js reference
  - Git/frontend workflow reminders
  - rapid-fire interview traps
- Keep sections concise and practical.
- Prefer short snippets, compare blocks, trap cards, and recap lists over long narrative teaching.

**Verification:**
- Run: `npm run test:npm-nodejs-cheatsheet`

### Task 7: Wire the new topics into route generation and metadata

**Files:**
- Modify: `app/[topic]/page.tsx`

**Work:**
- Import the three new topic JSON files.
- Add route configs for:
  - `npm`
  - `nodejs`
  - `frontend-cheat-sheet`
- Add accent colors, titles, and descriptions.
- Ensure `generateStaticParams()` includes the new slugs.

**Verification:**
- Run: `npm run test:npm-nodejs-cheatsheet`

### Task 8: Update the home page catalog and totals

**Files:**
- Modify: `app/page.tsx`

**Work:**
- Add topic cards for npm, Node.js, and Frontend Cheat Sheet.
- Update top-level topic counts, interview-question counts, and chapter counts.
- Label the cheat-sheet card clearly so users understand it is a fast-reference topic.

**Verification:**
- Run: `npm run lint`

### Task 9: Update cross-topic navigation order

**Files:**
- Modify: `components/renderer/TopicPage.tsx`

**Work:**
- Insert the new topics into `TOPIC_ORDER`.
- Keep the order:
  - HTML
  - CSS
  - JavaScript
  - Git
  - npm
  - Node.js
  - React
  - Next.js
  - Angular
  - Docker
  - AWS
  - Terraform
  - System Design
  - UX/UI
  - Frontend Cheat Sheet

**Verification:**
- Run: `npm run test:renderer`

### Task 10: Final verification

**Files:**
- Verify existing touched files only

**Work:**
- Run the new topic regression tests.
- Run the renderer regression.
- Run type-check.
- Run lint.
- Run build.
- If useful, browser-check:
  - `/npm`
  - `/nodejs`
  - `/frontend-cheat-sheet`

**Verification:**
- Run: `npm run test:npm-nodejs-cheatsheet`
- Run: `npm run test:renderer`
- Run: `npx tsc --noEmit --pretty false`
- Run: `npm run lint`
- Run: `npm run build`
