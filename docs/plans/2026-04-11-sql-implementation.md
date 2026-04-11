# SQL Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add `SQL` as a gold-standard encyclopedia topic with a full 14-chapter mastery track, integrated routing/navigation, and dedicated regression coverage.

**Architecture:** Reuse the existing block-based `TopicData` renderer and the same topic-file integration model already used for gold-standard topics like OOPS, Python, and Data Structures & Algorithms. Add one new topic JSON file, wire it into route generation and catalog/navigation surfaces, then enforce structure, interview coverage, and integration with topic-specific regression scripts.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript, JSON topic content, Node-based regression scripts.

---

### Task 1: Add the regression harness for the SQL topic

**Files:**
- Create: `scripts/test-sql-structure.mjs`
- Create: `scripts/test-sql-coverage.mjs`
- Create: `scripts/test-sql-topic.mjs`
- Modify: `package.json`

**Step 1: Write the structure test**

Check that:
- `data/topics/sql.json` exists
- the topic id is `sql`
- the topic has 14 tabs and 14 matching sections
- the topic uses block-based content
- hero stats exist
- chapter-level Q&A exists
- the final capstone Q&A bank exists

**Step 2: Write the coverage test**

Enforce strong minimum thresholds for:
- total Q&A count
- capstone Q&A count
- per-chapter Q&A count
- meaningful block depth in every section

**Step 3: Add the combined runner**

Create `scripts/test-sql-topic.mjs` to run both SQL-specific checks.

**Step 4: Add the package script**

Add:
- `test:sql-topic`

**Step 5: Run the new harness**

Run: `npm run test:sql-topic`
Expected: fail at first because `data/topics/sql.json` does not exist yet

### Task 2: Create the SQL topic file with the full mastery skeleton

**Files:**
- Create: `data/topics/sql.json`

**Step 1: Create the top-level topic shape**

Add:
- `id`
- `title`
- `subtitle`
- `heroStats`
- 14 tabs
- 14 sections

**Step 2: Add initial chapter intros and block scaffolding**

Give each chapter:
- an intro
- initial block placeholders in the established block format
- chapter-level Q&A scaffolding

**Step 3: Add a final capstone section scaffold**

The final chapter should already include a larger interview Q&A placeholder bank so the tests can verify the shape.

**Step 4: Run the harness**

Run: `npm run test:sql-topic`
Expected: fail only on coverage/depth thresholds, not on topic existence or structure

### Task 3: Write chapters 1-4 to gold-standard depth

**Files:**
- Modify: `data/topics/sql.json`

**Step 1: Deepen chapter 1**

Cover:
- what SQL is
- tables, rows, columns, keys
- relational thinking
- row grain and data shape

**Step 2: Deepen chapter 2**

Cover:
- `SELECT`
- `WHERE`
- `ORDER BY`
- aliases
- calculated columns
- result shaping

**Step 3: Deepen chapter 3**

Cover:
- inner/outer joins
- join conditions
- one-to-many and many-to-many reasoning
- avoiding accidental row multiplication

**Step 4: Deepen chapter 4**

Cover:
- aggregation
- grouping
- `HAVING`
- reporting-style business queries

**Step 5: Include strong block variety**

Use meaningful:
- `code`
- `compare`
- `mechanics`
- `trap`
- `drill`
- `recap`
- chapter-level `qa`

**Step 6: Run verification**

Run: `npm run test:sql-topic`

### Task 4: Write chapters 5-8 with composition and correctness depth

**Files:**
- Modify: `data/topics/sql.json`

**Step 1: Deepen chapter 5**

Cover:
- subqueries
- correlated subqueries
- derived tables
- CTEs
- readability tradeoffs

**Step 2: Deepen chapter 6**

Cover:
- window functions
- partitions
- ranks
- running totals
- lag/lead
- analytical SQL patterns

**Step 3: Deepen chapter 7**

Cover:
- inserts
- updates
- deletes
- safe write patterns
- bulk changes
- real-world mutation flows

**Step 4: Deepen chapter 8**

Cover:
- transactions
- commits and rollbacks
- isolation concepts
- race conditions
- correctness in financial and order-processing flows

**Step 5: Run verification**

Run: `npm run test:sql-topic`

### Task 5: Write chapters 9-11 with schema, performance, and business-query depth

**Files:**
- Modify: `data/topics/sql.json`

**Step 1: Deepen chapter 9**

Cover:
- schema design
- primary/foreign keys
- unique/check constraints
- nullability
- data integrity for real systems

**Step 2: Deepen chapter 10**

Cover:
- indexes
- scan vs seek intuition
- query slowness causes
- reading execution behavior conceptually

**Step 3: Deepen chapter 11**

Cover real-world query patterns for:
- shopping and orders
- banking and ledgers
- subscriptions and billing
- inventory
- support/reporting systems

**Step 4: Run verification**

Run: `npm run test:sql-topic`

### Task 6: Finish chapters 12-14 and expand the capstone interview bank

**Files:**
- Modify: `data/topics/sql.json`

**Step 1: Deepen chapter 12**

Cover:
- portable SQL
- PostgreSQL/MySQL/SQL Server/SQLite differences
- where dialect differences matter in practice

**Step 2: Deepen chapter 13**

Cover:
- debugging wrong-result queries
- null traps
- duplicate rows
- accidental cartesian products
- safe production workflows

**Step 3: Deepen chapter 14**

Cover:
- classic SQL interview questions
- real-world schema reasoning
- optimization discussion
- query explanation drills
- business-query problem solving

**Step 4: Expand the capstone Q&A bank**

Make the final chapter a serious interview/revision bank with:
- joins
- grouping
- window functions
- subqueries
- transactions
- debugging
- performance
- business-scenario query prompts

**Step 5: Run verification**

Run: `npm run test:sql-topic`

### Task 7: Wire the new topic into route generation and metadata

**Files:**
- Modify: `app/[topic]/page.tsx`

**Step 1: Import the new topic JSON file**

Add:
- `sqlData`

**Step 2: Add route config**

Add route config for:
- `sql`

Set:
- accent color
- page title
- page description

**Step 3: Ensure static params include the new slug**

Verify `generateStaticParams()` includes `sql`.

**Step 4: Run verification**

Run: `npm run test:sql-topic`

### Task 8: Update the home page, top navigation, sidebar, and study order

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/TopNav.tsx`
- Modify: `components/Sidebar.tsx`
- Modify: `components/renderer/TopicPage.tsx`

**Step 1: Add SQL to the Backend & Data catalog group**

Add a real topic card with:
- title
- icon
- color
- tags
- route

**Step 2: Update global totals**

Refresh:
- topic count
- interview/Q&A count
- chapter count

**Step 3: Update navigation surfaces**

Add SQL to:
- top nav
- sidebar

**Step 4: Update cross-topic study order**

Insert SQL after `angular` and before `postgresql`.

**Step 5: Run verification**

Run: `npm run lint`

### Task 9: Final verification

**Files:**
- Verify touched files only

**Step 1: Run the SQL regression harness**

Run: `npm run test:sql-topic`

**Step 2: Run the renderer regression**

Run: `npm run test:renderer`

**Step 3: Run type-check**

Run: `npx tsc --noEmit --pretty false`

**Step 4: Run lint**

Run: `npm run lint`

**Step 5: Run build**

Run: `npm run build`

**Step 6: Optional browser smoke-check**

Check:
- `/sql`

Expected: the SQL topic page renders, chapter navigation works, and the topic appears in the catalog/navigation surfaces.
