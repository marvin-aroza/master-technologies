# Next.js Gap Audit

Source files reviewed:
- `data/topics/nextjs.json`
- `docs/plans/2026-04-09-nextjs-design.md`
- `docs/plans/2026-04-09-javascript-audit.md`
- `docs/plans/2026-04-09-react-audit.md`

Official Next.js references checked for 2026-sensitive guidance:
- `https://nextjs.org/blog/next-16`
- `https://nextjs.org/docs/app/getting-started/layouts-and-pages`
- `https://nextjs.org/docs/app/building-your-application/rendering/server-components`
- `https://nextjs.org/docs/app/api-reference/file-conventions/middleware`
- `https://nextjs.org/docs/app/api-reference/directives/use-server`
- `https://nextjs.org/docs/app/guides/upgrading`

Repo/version context checked locally:
- `package.json` in this worktree currently pins `next@16.2.2`

## Cross-cutting findings

- The current Next.js topic is broad and useful in spots, but it is not yet a mastery path. It behaves more like a large note dump with a terminal interview bank than a guided App Router-first encyclopedia.
- The current topic has 13 tabs and 13 sections, but only one actual `qa` bank: `iq-next` with 77 questions. The rest of the topic is card-based, with `ncs` acting as a cheat-sheet section rather than chapter-level interview practice.
- The tab label `Next.js Q&A (53)` is stale. The current `iq-next` section actually contains 77 questions, which is a signal that the interview layer has grown without structure or maintenance.
- The strongest reusable material is around:
  - App Router file conventions
  - rendering strategy terminology
  - `use cache` / caching direction
  - Partial Prerendering intuition
  - metadata and SEO basics
  - runtime tradeoffs like Edge vs Node
  - deployment output types
- The weakest areas are:
  - one coherent request lifecycle mental model
  - Server vs Client Component boundaries taught as a system
  - the relationship between data ownership, caching, streaming, and mutations
  - modern `proxy.ts` framing
  - debugging stale data, hydration, and runtime mismatch bugs
  - distributed interview training across the chapters
- The current topic repeatedly mixes five different layers without making the boundary clear:
  - Next.js framework mental model
  - App Router file conventions
  - React Server Component boundaries
  - backend/full-stack integration choices
  - deployment and infrastructure concerns
- The current topic still reflects a transition-era structure:
  - App Router appears in multiple overlapping sections
  - `middleware` is still treated as the dominant framing in several places even though the official file convention has been renamed to `proxy`
  - modern Next 16 features are present, but not integrated into one architecture story
- The topic is still using the old `cards + qa` shape only. That is not a blocker because the renderer already supports richer block types from the JavaScript and React rewrites, but it means this file has not yet adopted the mastery-grade teaching format.
- Some legacy cards contain malformed raw HTML. That is another reason to prefer a block-first rewrite over trying to preserve the old App Router card markup verbatim.

## Duplicate Content Clusters

- App Router overlap:
  - `n-core`
  - `n-app`
  - `next-app-router`
  These all cover file conventions, routing architecture, layouts, and dynamic segments with overlapping intent.

- Middleware / auth overlap:
  - `n-data` includes `Middleware — Complete Guide`
  - `n-mid-auth` includes `Next.js Middleware`
  - `n-advanced` includes an `Authentication Pattern`
  - `next-auth-db` also covers auth integration
  These should become one coherent request-lifecycle/auth chapter plus one full-stack integration chapter.

- Rendering / caching overlap:
  - `n-render`
  - `next-app-router`
  - `next-optimization`
  - `ncs`
  All revisit rendering strategy, caching, PPR, and runtime choices in slightly different wording.

- Deployment / optimization overlap:
  - `n-deploy`
  - `next-optimization`
  - `n-16`
  - `ncs`
  These all touch hosting, runtimes, Turbopack, and scale, but without a stable progression.

- Interview overlap:
  - `iq-next` contains a giant 77-question bank
  - `ncs` behaves like a compressed second interview appendix
  This creates volume without enough paced reinforcement because the core chapters do not carry their own interview layer yet.

## Strong Material Worth Preserving

Preserve the concepts and example intent from these sections, not their existing raw HTML wholesale. Some of the current card markup is malformed or encoding-damaged, so "preserve" here means rewrite into the new block format using the good underlying idea.

- `n-core`:
  - `App Router — Complete File Conventions`
  - `Layouts — Persistent, Nested UI`
  - `Dynamic Routes, Params & Search Params`
  These are strong raw materials for the foundation chapters.

- `n-render`:
  - `Rendering Strategies — Complete Guide`
  - `Caching in Next.js 16 — 'use cache'`
  Both are directionally valuable and should be rewritten into the new cache/rendering chapters.

- `n-data`:
  - `Data Fetching — Server Components`
  This is a solid starting point for the data ownership chapter.

- `n-advanced`:
  - `Metadata & SEO`
  Useful for the navigation/metadata chapter.

- `next-optimization`:
  - `Partial Prerendering (PPR)`
  - `Turbopack & Build Optimization`
  - `Edge Runtime vs Node.js`
  These belong in rendering, performance, and deployment chapters after cleanup.

- `n-deploy`:
  - `Vercel & Output Types`
  Good raw material for the deployment chapter.

- `next-auth-db`:
  - `Next-Auth / Auth.js (v5)`
  - `Modern ORMs: Prisma & Drizzle`
  Useful for the full-stack integration chapter, though they need cleaner boundaries and more neutral framing.

## Sections That Need Heavy Rewrite

- `n-app` and `next-app-router`
  These duplicate one another and should not survive as separate sections.
  They also contain malformed raw HTML, so they are better treated as rewrite material than salvage candidates.

- `n-data`
  It currently mixes server-side data fetching, middleware, and asset optimization in one section, which is an architectural mismatch.

- `n-mid-auth`
  This section must be reframed around `proxy.ts`, request-time policy, cookies, headers, and auth gating. The current middleware-heavy framing is no longer the right top-level explanation.

- `n-16`
  This section contains useful release awareness, but it should not remain a standalone feature dump. Its material should be absorbed into the relevant chapters: caching, performance, tooling, security, and deployment.

- `ncs`
  The cheat sheet duplicates later content and should be replaced by chapter recaps plus a stronger final mastery chapter.

- `iq-next`
  The question count is useful, but the bank needs redistribution, consolidation, and upgrading toward debugging and architecture reasoning.

## 2026-Sensitive Claims To Revalidate

- The current topic says "Next.js 16.2 is the latest (March 2026)." The installed dependency in this repo is `16.2.2`, so learner-facing "latest" wording should be tied either to the actual installed version or to an official release source, not left as a vague date claim.
- The current interview tab label says `(53)` while the actual `iq-next` question count is 77. That mismatch should be treated as a maintenance bug, not just a cosmetic issue.
- The official file-convention page explicitly says `middleware` is deprecated and renamed to `proxy`. The rewrite should teach `proxy.ts` as the modern concept and treat `middleware` as legacy terminology.
- The current topic presents Partial Prerendering as a major modern concept. That is directionally useful, but any production-readiness claims should be phrased carefully and checked against the current official docs and release guidance at implementation time.
- The section `n-16` includes performance multipliers and a security CVE summary. Those claims should be revalidated against official release notes and official security/advisory sources before being taught as facts.
- Any statement that Next.js is "the recommended way to build production React apps" should be softened into a more precise ecosystem framing unless backed by an official source. It is widely adopted, but that phrasing risks sounding like marketing rather than instruction.
- The `iq-next` bank includes version-sensitive or legacy-leaning items that should be explicitly triaged before reuse, including `useFormState`-specific wording and middleware-first interview phrasing.

## Gap Map

| Target chapter | Existing section ids | Keep | Rewrite | Missing |
|---|---|---|---|---|
| Next.js Origins, Philosophy, and Runtime Model | `n-core`, `n-render`, `iq-next` | High-level "what Next.js is" material and some SSR/SSG framing | Rebuild around React framework role, build/request/runtime phases, and Node vs Edge vs browser mental model | Clear runtime model, framework boundaries, build/request/server/client/CDN mental map |
| App Router File-System Architecture | `n-core`, `n-app`, `next-app-router`, `n-advanced` | File conventions, layouts, dynamic segments, route groups, parallel/intercepting routes | Collapse duplicated App Router sections into one coherent route-architecture chapter | One progressive routing chapter instead of duplicates |
| Server Components, Client Components, and Boundaries | `n-app`, `next-app-router`, `iq-next` | Some mention of RSC/App Router | Rebuild around default server-first rendering, `"use client"`, serialization, and boundary cost | What crosses the boundary, what stays server-only, how to avoid client bundle bloat |
| Navigation, Layout Persistence, and Metadata | `n-core`, `n-advanced` | Layout persistence and metadata/SEO material | Integrate navigation, nested layout persistence, metadata, sitemap/robots into one chapter | Programmatic navigation, route transitions, metadata as part of app architecture |
| Data Fetching and Server-Side Data Ownership | `n-data`, `next-app-router` | Server-side data fetching examples | Reframe around direct server fetching, parallelization, request waterfalls, and data ownership | Data ownership heuristics, request-scoped APIs, server-first decision framework |
| Cache Components, `use cache`, and Revalidation | `n-render`, `ncs`, `iq-next` | `use cache` direction and some cache language | Rewrite into the Next 16 cache model with explicit freshness and invalidation reasoning | Cache lifetimes, tag/path revalidation, stale data debugging, cache boundaries |
| Rendering Strategies, Streaming, and Partial Prerendering | `n-render`, `next-optimization`, `ncs` | Rendering strategy comparisons and PPR intuition | Rebuild around static vs dynamic vs streaming vs PPR as one system | Shell vs dynamic holes, Suspense-driven streaming, route-level strategy selection |
| Server Functions, Forms, and Mutations | `n-data`, `iq-next`, `ncs` | A few server-action/server-function ideas in scattered places | Build a clear write-path chapter with validation, redirects, optimistic coordination, and invalidation | Form actions, mutation lifecycle, validation, safe write architecture |
| Request Lifecycle, `proxy.ts`, Cookies, Headers, and Auth Gates | `n-data`, `n-mid-auth`, `n-advanced`, `next-auth-db` | Auth patterns and middleware/proxy-like examples | Rewrite around modern `proxy.ts`, request-time redirects, cookies/headers, and gate placement | One consistent request pipeline chapter, proxy vs in-render auth checks |
| APIs, Databases, and Full-Stack Integration | `next-auth-db`, `n-deploy`, `iq-next` | Auth.js, Prisma/Drizzle, Route Handler concepts | Add clearer boundaries between Route Handlers, Server Functions, uploads, webhooks, and background concerns | Route Handler vs Server Function decision-making, file uploads, webhooks, queue boundaries |
| Performance, Assets, and Build Tooling | `n-data`, `next-optimization`, `n-16`, `ncs` | Image/font optimization, Turbopack, runtime tradeoffs | Reframe around asset loading, prefetching, bundle cost, hydration cost, build tooling, and diagnostics | Prefetch tradeoffs, bundle reasoning, hydration cost, compiler/tooling positioning |
| Security, Reliability, and Production Hardening | `n-16`, `ncs`, `iq-next` | Some server-action/server-only security reminders and one CVE note | Expand into a real hardening chapter | Secret boundaries, input validation, SSR attack surface, cache poisoning, auth/authz, failure-safe patterns |
| Deployment, Runtimes, Self-Hosting, and Scale | `n-deploy`, `next-optimization`, `n-16`, `iq-next` | Vercel/output types, runtime choices, adapter hints | Consolidate into one production chapter | Self-hosting, observability, env strategy, adapter story, scale tradeoffs |
| Migration, Architecture, and Interview Mastery | `ncs`, `iq-next` | Raw interview volume and some fast-recall points | Convert into chapter-distributed Q&A plus a final capstone | Pages Router migration framing, architecture drills, debugging drills, red-flag interview answers |

## Must Add

- A full "what runs where?" layer across the topic.
- A true request lifecycle explanation:
  browser request -> `proxy.ts` -> route match -> server render/data work -> streaming -> hydration.
- Clear Server Component vs Client Component boundary rules.
- A modern Next 16 cache model chapter built around `use cache`, freshness, and invalidation.
- A write-path chapter for Server Functions, forms, redirects, validation, and optimistic coordination.
- A full chapter on production security and reliability instead of only scattered warnings.
- A migration chapter that explains Pages Router history without letting it dominate the topic.
- Chapter-level interview Q&A across the whole topic, not just a terminal bank.
- Debugging drills for stale data, hydration mismatch, runtime mismatch, auth bugs, and route/render confusion.

## Scope Decisions

- Keep Next.js as a modern App Router-first topic.
- Keep one focused chapter on migration and legacy patterns so learners can still handle older codebases and interviews.
- Keep framework-specific integrations like Auth.js, Prisma, and Drizzle, but move them into a dedicated full-stack integration chapter rather than scattering them through routing or auth sections.
- Remove standalone cheat-sheet duplication and absorb its best material into recap blocks and the final mastery chapter.
- Replace old `middleware`-first framing with `proxy.ts`-first framing while still mentioning `middleware` as legacy terminology learners may encounter.

## Implementation Constraints From The Current Shape

- `QAItem` is flat in the current schema, so chapter-specific interview training needs to be organized by section rather than richer metadata.
- The renderer still shows the Q&A filter bar regardless of `hasFilterBar`, so we should not plan any chapter UX that depends on toggling that prop alone.
- Hero summaries need explicit `heroStats` in a block-first rewrite because the default hero totals are derived from `cards` and `qa` counts, not from richer `blocks`.
- The current block palette is enough for this rewrite:
  - `richText`
  - `code`
  - `compare`
  - `trap`
  - `mechanics`
  - `drill`
  - `recap`
  We do not need a new renderer feature just to start the Next.js overhaul.

## Proposed Next.js Blueprint

1. Next.js Origins, Philosophy, and Runtime Model
2. App Router File-System Architecture
3. Server Components, Client Components, and Boundaries
4. Navigation, Layout Persistence, and Metadata
5. Data Fetching and Server-Side Data Ownership
6. Cache Components, `use cache`, and Revalidation
7. Rendering Strategies, Streaming, and Partial Prerendering
8. Server Functions, Forms, and Mutations
9. Request Lifecycle, `proxy.ts`, Cookies, Headers, and Auth Gates
10. APIs, Databases, and Full-Stack Integration
11. Performance, Assets, and Build Tooling
12. Security, Reliability, and Production Hardening
13. Deployment, Runtimes, Self-Hosting, and Scale
14. Migration, Architecture, and Interview Mastery

## Reusable Rewrite Patterns From JavaScript and React

- Add one topic-level structure test before changing the JSON shape.
- Write one chapter-batch regression per content slice before filling the content.
- Use the existing block palette first:
  - `richText`
  - `code`
  - `compare`
  - `mechanics`
  - `trap`
  - `drill`
  - `recap`
- Keep each chapter dense and layered rather than splitting the same concept across multiple tabs.
- Use the final chapter as a capstone, not a dumping ground.

## Blocks Not Worth Repeating Blindly

- Duplicate App Router sections under different ids.
- Big "latest features" dumps that sit outside the rest of the curriculum.
- Giant interview banks with weak chapter-level reinforcement.
- Middleware-first explanations that ignore the `proxy.ts` rename.
- Mixing data fetching, auth, image optimization, and runtime choices in one section because they all happen "on the server."
- Reusing legacy raw HTML directly when the underlying concept is useful but the markup or wording is already corrupted.

## Immediate Follow-up

- Add the Next.js structure harness.
- Restructure `nextjs.json` into the approved 14-chapter skeleton.
- Rewrite chapters 1-4 first so the topic quickly gains a clean modern foundation.

## Execution Closeout

- The topic was fully rewritten into the approved 14-chapter App Router-first mastery track.
- Chapters 1-13 now each include chapter-level interview Q&A, and the capstone chapter was expanded into a larger architecture and debugging bank.
- Verification passed with:
  - `npm run test:nextjs-topic`
  - `npm run test:renderer`
  - `npx tsc --noEmit --pretty false`
  - `npm run lint`
  - `npm run build`
- The final `build` verification needed to run outside the sandbox because Windows worktrees intermittently hit `.next` rename `EPERM` errors inside the sandbox.
- One non-blocking warning remains in builds: Next.js infers the workspace root from the main app `package-lock.json` because the worktree also has a `package-lock.json`. This did not block compilation or static generation.
