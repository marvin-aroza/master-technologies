# SQL Design

## Context
This project is a content-driven learning encyclopedia built with Next.js 16.2.2 and React 19.2.4. The catalog already includes language topics, frontend frameworks, cloud and tooling topics, databases, computer science foundations, and revision-oriented references.

The next expansion is to add a true gold-standard `SQL` topic. The user wants a topic specifically about SQL itself, from beginner to advanced, with strong real-world query writing for domains like shopping, banking, subscriptions, and analytics. It should also include strong interview preparation instead of relying on the PostgreSQL topic to cover the language indirectly.

## Objectives
- Add `sql` as a first-class route with a full mastery-track topic page.
- Teach SQL as a database-agnostic query language first, with engine-specific differences handled later.
- Cover query writing from basics to advanced analytical SQL.
- Use real-world examples throughout, especially shopping, banking, reporting, and operational business systems.
- Integrate the topic into routing, home-page cataloging, cross-topic navigation, and regression coverage.
- Preserve the encyclopedia quality bar: mental models, correctness, readability, performance intuition, failure modes, and interview readiness.

## Direction
This topic should be built as a `database-agnostic SQL first` track.

That means the learner first masters:
- relational thinking
- selecting, filtering, sorting, and shaping results
- joins and multi-table reasoning
- grouping and aggregation
- subqueries, CTEs, and window functions
- safe data modification and transactions
- schema constraints and indexing fundamentals

Then the later chapters convert that knowledge into:
- real-world business-query patterns
- engine and dialect differences
- debugging and safe production SQL
- interview problem solving

This keeps the SQL topic focused on the language and query design, while PostgreSQL remains the deeper engine-specific topic for MVCC, locks, planner behavior, replication, and operations.

## Rollout Approach
This should ship as a real gold-standard topic, not a starter-depth topic.

### Gold-standard quality requirements
The topic should ship with:
- 14 chapters
- strong block-based teaching content throughout
- chapter-level interview Q&A across the full track
- a larger final capstone interview bank
- real schema, query, and result-shaping reasoning
- integrated routing, home-page visibility, metadata, and tests

### Teaching bar
Every major concept should answer:
1. What problem does this SQL construct solve?
2. How does it change the shape of the data returned?
3. What correctness risks are nearby?
4. How would this appear in a real business system?
5. What makes the query readable or unreadable?
6. What are the performance implications?
7. How would you explain it in an interview?

## Chapter Blueprint
1. What SQL Is and How Relational Data Works
2. SELECT, Filtering, Sorting, and Shaping Results
3. Joins and Multi-Table Reasoning
4. Aggregation, Grouping, and Reporting Queries
5. Subqueries, CTEs, and Query Composition
6. Window Functions and Analytical SQL
7. INSERT, UPDATE, DELETE, and Data Modification Patterns
8. Transactions, Consistency, and Concurrency Basics
9. Schema Design, Constraints, and Data Integrity
10. Indexes, Query Performance, and Reading Execution Behavior
11. Real-World Query Patterns for Business Systems
12. SQL Across Engines and Dialect Differences
13. Debugging, Refactoring, and Safe Production SQL
14. Interview Mastery and Query Problem Solving

## Topic Positioning
This topic should sit in the `Backend & Data` lane before PostgreSQL and MongoDB. SQL gives learners the shared relational query foundation first. PostgreSQL can then stay focused on engine internals and operational database behavior, while MongoDB can be contrasted against relational modeling more clearly.

Recommended study order:
- HTML
- CSS
- JavaScript
- Git
- npm
- Data Structures & Algorithms
- OOPS
- Python
- Node.js
- React
- Next.js
- Angular
- SQL
- PostgreSQL
- MongoDB
- Docker
- AWS
- Terraform
- System Design
- UX/UI
- Frontend Cheat Sheet

## Home Page Integration
The home page should expose SQL as a first-class catalog entry.

Recommended catalog approach:
- keep the existing `Backend & Data` group
- add `SQL` before `PostgreSQL` and `MongoDB`

This preserves a clean data-learning progression:
- SQL for the language
- PostgreSQL for the relational engine
- MongoDB for document-database and NoSQL tradeoffs

## App Integration Design

### New topic file
Create:
- `data/topics/sql.json`

### Dynamic route map
Update `app/[topic]/page.tsx` to:
- import the new topic file
- add route config for `sql`
- set title, description, and accent color
- include the slug in `generateStaticParams()`

### Home page
Update `app/page.tsx` to:
- add the SQL topic card to `Backend & Data`
- update topic, chapter, and interview totals

### Cross-topic navigation
Update `components/renderer/TopicPage.tsx` so the study order includes SQL after `angular` and before `postgresql`.

### Navigation surfaces
Update:
- `components/TopNav.tsx`
- `components/Sidebar.tsx`

So the topic is visible anywhere users browse the encyclopedia.

## Teaching Strategy
The topic should use the richer block system consistently:
- `richText`
- `code`
- `compare`
- `mechanics`
- `trap`
- `drill`
- `recap`

### Core teaching rule
Each chapter should repeat this pattern:
1. Explain the query or schema concept
2. Show the mental model for how rows are being shaped
3. Use a realistic schema or business example
4. Surface common correctness mistakes
5. Explain readability and performance tradeoffs
6. Translate the idea into interview reasoning

### SQL-specific emphasis
This topic should explicitly teach `correct SQL` versus `dangerous SQL`, not just syntax:
- wrong joins that duplicate rows
- filtering after the wrong join shape
- `NULL` traps
- unsafe updates and deletes
- unreadable nested queries
- overusing subqueries where CTEs or window functions are clearer
- confusing aggregate queries with detail-row queries

It should repeatedly teach learners to ask:
- what rows am I starting with?
- what rows will this join add or remove?
- what grain is this result set supposed to have?
- am I returning detail rows or grouped rows?
- is this query correct before I try to optimize it?

## Real-World Scenario Strategy
This topic should repeatedly ground lessons in familiar system domains:
- shopping carts, orders, refunds, and inventory
- account balances, ledgers, and transfers
- subscriptions, renewals, and churn
- support queues, agent performance, and SLAs
- dashboards, reporting, and operational analytics

The goal is to make SQL feel like a real production skill, not a toy query language.

## Verification Strategy
Implementation should add regression coverage that checks:
- the new topic file exists
- it has 14 tabs and matching sections
- it uses block-based content
- chapter-level Q&A exists throughout the topic
- the final capstone Q&A bank is present and large enough
- the route map includes the new slug
- the home page, top nav, sidebar, and topic-order navigation include the new topic

Verification should include:
- a topic-specific regression script
- `npm run test:renderer`
- lint
- type-check
- build

## Risks And Controls

### Risk: the topic overlaps too heavily with PostgreSQL
Control: keep the focus on portable SQL language mastery and query-writing reasoning, not engine internals.

### Risk: the topic becomes a syntax dump
Control: use real schemas, business scenarios, and query walkthroughs in every major chapter.

### Risk: the topic teaches tricks instead of correctness
Control: emphasize result-set grain, join correctness, data integrity, and safe mutation patterns before optimization.

### Risk: the topic becomes interview-only and loses practical value
Control: distribute interview Q&A across the chapters, but keep the main body grounded in realistic business queries and production-safe reasoning.

## Outcome
This design adds a true `SQL` mastery track to the encyclopedia. It gives learners a dedicated path for learning relational query writing from beginner to advanced, grounded in real systems and strong interview preparation, while keeping the existing PostgreSQL topic focused on the database engine itself.
