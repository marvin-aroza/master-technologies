# Git, Terraform, AWS, and Docker Starter Topics Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Git, Terraform, AWS, and Docker as first-class starter topics with real mastery-track pages, navigation, metadata, and regression coverage.

**Architecture:** Reuse the existing block-based topic renderer and route map. Add four new topic JSON files, wire them into route generation and the home page, update cross-topic navigation order, and add shared starter-topic regression tests so the expansion stays stable.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript, JSON topic content, Node-based regression scripts.

---

### Task 1: Add the starter-topic regression harness

**Files:**
- Create: `scripts/test-starter-topics-structure.mjs`
- Create: `scripts/test-starter-topics-coverage.mjs`
- Create: `scripts/test-starter-topics.mjs`
- Modify: `package.json`

**Work:**
- Add a shared structure test for `git.json`, `terraform.json`, `aws.json`, and `docker.json`.
- Assert that each topic:
  - exists
  - has `id`, `title`, `subtitle`, and `heroStats`
  - has 14 tabs and 14 sections
  - uses `blocks`
  - includes chapter-level `qa`
  - includes final capstone `qa`
- Add a coverage test that checks minimum Q&A counts and verifies the new topics participate in the route map expectations.
- Add a new script:
  - `test:starter-topics`

**Verification:**
- Run: `npm run test:starter-topics`

### Task 2: Create the four new topic files with full 14-chapter skeletons

**Files:**
- Create: `data/topics/git.json`
- Create: `data/topics/terraform.json`
- Create: `data/topics/aws.json`
- Create: `data/topics/docker.json`

**Work:**
- Build each topic in the existing `TopicData` shape.
- Add:
  - title
  - subtitle
  - hero stats
  - 14 tabs
  - 14 sections
- Ensure every section has:
  - `intro`
  - starter `blocks`
  - chapter-level `qa`
- Ensure the final section includes a stronger capstone `qa` bank.

**Verification:**
- Run: `npm run test:starter-topics`

### Task 3: Deepen chapters 1-4 for Git

**Files:**
- Modify: `data/topics/git.json`

**Work:**
- Replace light scaffolding in chapters 1-4 with stronger starter content:
  - repositories and object model
  - working tree, staging, commits
  - branching/merging/rebasing
  - remotes and collaboration
- Include meaningful:
  - `compare`
  - `mechanics`
  - `trap`
  - `drill`
  - `recap`
  - chapter-level `qa`

**Verification:**
- Run: `npm run test:starter-topics`

### Task 4: Deepen chapters 1-4 for Terraform

**Files:**
- Modify: `data/topics/terraform.json`

**Work:**
- Replace light scaffolding in chapters 1-4 with stronger starter content:
  - IaC foundations
  - providers/resources/data sources/variables
  - state/plan/apply/lifecycle
  - modules and reuse
- Include meaningful block and Q&A coverage aligned to the shared standard.

**Verification:**
- Run: `npm run test:starter-topics`

### Task 5: Deepen chapters 1-4 for AWS

**Files:**
- Modify: `data/topics/aws.json`

**Work:**
- Replace light scaffolding in chapters 1-4 with stronger starter content:
  - cloud foundations and AWS geography
  - IAM and account boundaries
  - compute services
  - networking foundations
- Include meaningful block and Q&A coverage aligned to the shared standard.

**Verification:**
- Run: `npm run test:starter-topics`

### Task 6: Deepen chapters 1-4 for Docker

**Files:**
- Modify: `data/topics/docker.json`

**Work:**
- Replace light scaffolding in chapters 1-4 with stronger starter content:
  - containers and images
  - Dockerfiles and layers
  - container runtime behavior
  - volumes and persistence
- Include meaningful block and Q&A coverage aligned to the shared standard.

**Verification:**
- Run: `npm run test:starter-topics`

### Task 7: Fill chapters 5-14 with meaningful lighter starter coverage

**Files:**
- Modify: `data/topics/git.json`
- Modify: `data/topics/terraform.json`
- Modify: `data/topics/aws.json`
- Modify: `data/topics/docker.json`

**Work:**
- Expand chapters 5-14 so they are instructional rather than placeholder-like.
- Keep these lighter than the mature encyclopedia rewrites, but make sure each chapter still has:
  - meaningful intro
  - multiple real blocks
  - chapter-level Q&A
- Make the final capstone interview banks stronger than the chapter-level sets.

**Verification:**
- Run: `npm run test:starter-topics`

### Task 8: Wire the topics into route generation and metadata

**Files:**
- Modify: `app/[topic]/page.tsx`

**Work:**
- Import the four new topic JSON files.
- Add route configs, accent colors, titles, and descriptions.
- Ensure `generateStaticParams()` includes:
  - `git`
  - `terraform`
  - `aws`
  - `docker`

**Verification:**
- Run: `npm run test:starter-topics`

### Task 9: Update the home page catalog and counts

**Files:**
- Modify: `app/page.tsx`

**Work:**
- Add topic cards for the four new topics.
- Update top-level catalog counts and summary copy so the home page reflects the expanded encyclopedia.
- Keep descriptions and tags aligned with starter-topic reality, not exaggerated claims.

**Verification:**
- Run: `npm run lint`

### Task 10: Update cross-topic navigation order

**Files:**
- Modify: `components/renderer/TopicPage.tsx`

**Work:**
- Insert Git, Docker, AWS, and Terraform into the `TOPIC_ORDER`.
- Keep the order:
  - HTML
  - CSS
  - JavaScript
  - Git
  - React
  - Next.js
  - Angular
  - Docker
  - AWS
  - Terraform
  - System Design
  - UI/UX

**Verification:**
- Run: `npm run test:renderer`

### Task 11: Final verification

**Files:**
- Verify existing touched files only

**Work:**
- Run the new starter-topic tests.
- Run renderer regression.
- Run type-check.
- Run lint.
- Run build.
- If useful, browser-check the new routes:
  - `/git`
  - `/terraform`
  - `/aws`
  - `/docker`

**Verification:**
- Run: `npm run test:starter-topics`
- Run: `npm run test:renderer`
- Run: `npx tsc --noEmit --pretty false`
- Run: `npm run lint`
- Run: `npm run build`
