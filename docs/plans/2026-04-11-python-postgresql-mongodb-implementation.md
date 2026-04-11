# Python, PostgreSQL, and MongoDB Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Python, PostgreSQL, and MongoDB as gold-standard encyclopedia topics with real 14-chapter mastery tracks, routing, navigation, metadata, and regression coverage.

**Architecture:** Reuse the current block-based `TopicData` renderer and the same topic-file integration model used by the existing encyclopedia. Add the three new topic JSON files, wire them into route generation and catalog/navigation surfaces, then enforce their existence and minimum quality with dedicated regression scripts.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript, JSON topic content, Node-based regression scripts.

---

### Task 1: Add the regression harness for the three new gold-standard topics

**Files:**
- Create: `scripts/test-python-postgresql-mongodb-structure.mjs`
- Create: `scripts/test-python-postgresql-mongodb-coverage.mjs`
- Create: `scripts/test-python-postgresql-mongodb.mjs`
- Modify: `package.json`

**Work:**
- Add a structure test that checks:
  - `data/topics/python.json` exists
  - `data/topics/postgresql.json` exists
  - `data/topics/mongodb.json` exists
  - all three have 14 tabs and 14 sections
  - all three are block-based
  - hero stats exist
  - chapter-level Q&A exists
  - capstone Q&A exists
- Add a coverage test that enforces strong minimum interview counts and route expectations.
- Add a package script:
  - `test:python-postgresql-mongodb`

**Verification:**
- Run: `npm run test:python-postgresql-mongodb`

### Task 2: Create the three topic files with full skeleton structure

**Files:**
- Create: `data/topics/python.json`
- Create: `data/topics/postgresql.json`
- Create: `data/topics/mongodb.json`

**Work:**
- Build all three in the existing `TopicData` mastery shape with:
  - id
  - title
  - subtitle
  - hero stats
  - 14 tabs
  - 14 sections
  - initial intros
  - initial block structure
  - chapter-level Q&A scaffolding
  - final capstone Q&A scaffolding

**Verification:**
- Run: `npm run test:python-postgresql-mongodb`

### Task 3: Write Python chapters 1-4 to gold-standard depth

**Files:**
- Modify: `data/topics/python.json`

**Work:**
- Replace the initial scaffolding in Python chapters 1-4 with deep content covering:
  - language philosophy and execution model
  - values, types, mutability, and identity
  - control flow, functions, scope, and closures
  - collections, iterables, comprehensions, and generators
- Include meaningful:
  - `compare`
  - `mechanics`
  - `code`
  - `trap`
  - `drill`
  - `recap`
  - chapter-level `qa`

**Verification:**
- Run: `npm run test:python-postgresql-mongodb`

### Task 4: Write Python chapters 5-10 with real production depth

**Files:**
- Modify: `data/topics/python.json`

**Work:**
- Deepen chapters 5-10 to cover:
  - OOP and dataclasses
  - modules, packages, and environments
  - typing and protocols
  - exceptions and defensive coding
  - files, I/O, and scripting
  - concurrency, async, multiprocessing, and performance
- Keep each chapter instructional rather than outline-like.
- Maintain chapter-level interview reinforcement.

**Verification:**
- Run: `npm run test:python-postgresql-mongodb`

### Task 5: Finish Python chapters 11-14 and capstone interview coverage

**Files:**
- Modify: `data/topics/python.json`

**Work:**
- Deepen chapters 11-14 to cover:
  - testing, tooling, linting, and project structure
  - backend APIs, CLIs, automation, and production patterns
  - internals, memory model, and optimization reasoning
  - final mastery and interview drills
- Expand the final chapter into a serious capstone Q&A bank.

**Verification:**
- Run: `npm run test:python-postgresql-mongodb`

### Task 6: Write PostgreSQL chapters 1-4 to gold-standard depth

**Files:**
- Modify: `data/topics/postgresql.json`

**Work:**
- Replace the initial scaffolding in PostgreSQL chapters 1-4 with deep content covering:
  - relational foundations and PostgreSQL architecture
  - SQL querying fundamentals
  - schema design, constraints, and normalization
  - joins, subqueries, CTEs, and query reasoning
- Include planner-thinking and tradeoff-oriented teaching early.
- Maintain strong chapter-level `qa`.

**Verification:**
- Run: `npm run test:python-postgresql-mongodb`

### Task 7: Write PostgreSQL chapters 5-10 with internals and operations depth

**Files:**
- Modify: `data/topics/postgresql.json`

**Work:**
- Deepen chapters 5-10 to cover:
  - indexes and query planning
  - transactions, MVCC, and isolation
  - locks and concurrency behavior
  - JSONB, arrays, full-text, and extensions
  - functions, procedures, and triggers
  - partitioning, replication, backups, and operational design

**Verification:**
- Run: `npm run test:python-postgresql-mongodb`

### Task 8: Finish PostgreSQL chapters 11-14 and capstone interview coverage

**Files:**
- Modify: `data/topics/postgresql.json`

**Work:**
- Deepen chapters 11-14 to cover:
  - performance tuning and query optimization
  - roles, permissions, and safe production usage
  - architecture patterns and anti-patterns
  - final mastery and troubleshooting drills
- Expand the final chapter into a strong production-and-interview capstone bank.

**Verification:**
- Run: `npm run test:python-postgresql-mongodb`

### Task 9: Write MongoDB chapters 1-4 to gold-standard depth

**Files:**
- Modify: `data/topics/mongodb.json`

**Work:**
- Replace the initial scaffolding in MongoDB chapters 1-4 with deep content covering:
  - NoSQL foundations and MongoDB architecture
  - documents, BSON, and schema strategy
  - CRUD, query semantics, and updates
  - data modeling with embedding versus references
- Make relational comparisons explicit where they help judgment.

**Verification:**
- Run: `npm run test:python-postgresql-mongodb`

### Task 10: Write MongoDB chapters 5-10 with production modeling depth

**Files:**
- Modify: `data/topics/mongodb.json`

**Work:**
- Deepen chapters 5-10 to cover:
  - indexes and performance
  - aggregation pipeline mastery
  - replica sets and failover
  - sharding
  - transactions, consistency, and write concerns
  - schema validation and migration strategy

**Verification:**
- Run: `npm run test:python-postgresql-mongodb`

### Task 11: Finish MongoDB chapters 11-14 and capstone interview coverage

**Files:**
- Modify: `data/topics/mongodb.json`

**Work:**
- Deepen chapters 11-14 to cover:
  - security, backups, and operational reliability
  - performance tuning and production debugging
  - choosing MongoDB versus relational systems
  - final mastery and architecture drills
- Expand the final chapter into a strong capstone interview bank.

**Verification:**
- Run: `npm run test:python-postgresql-mongodb`

### Task 12: Wire the new topics into route generation and metadata

**Files:**
- Modify: `app/[topic]/page.tsx`

**Work:**
- Import the three new topic JSON files.
- Add route configs for:
  - `python`
  - `postgresql`
  - `mongodb`
- Add accent colors, titles, and descriptions.
- Ensure `generateStaticParams()` includes the new slugs.

**Verification:**
- Run: `npm run test:python-postgresql-mongodb`

### Task 13: Update the home page, top navigation, sidebar, and study order

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/TopNav.tsx`
- Modify: `components/Sidebar.tsx`
- Modify: `components/renderer/TopicPage.tsx`
- Modify: `app/layout.tsx`

**Work:**
- Add topic cards for Python, PostgreSQL, and MongoDB.
- Update displayed topic, chapter, and Q&A totals.
- Insert the topics into the approved study order.
- Ensure the top navigation and sidebar expose the new topics in sensible groups.
- Update metadata copy if needed to reflect the wider catalog.

**Verification:**
- Run: `npm run lint`

### Task 14: Final verification

**Files:**
- Verify existing touched files only

**Work:**
- Run the topic regression harness.
- Run the renderer regression.
- Run type-check.
- Run lint.
- Run build.
- If useful, browser-check:
  - `/python`
  - `/postgresql`
  - `/mongodb`

**Verification:**
- Run: `npm run test:python-postgresql-mongodb`
- Run: `npm run test:renderer`
- Run: `npx tsc --noEmit --pretty false`
- Run: `npm run lint`
- Run: `npm run build`
