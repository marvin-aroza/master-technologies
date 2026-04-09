# JavaScript Gap Audit

Source files reviewed:
- `data/topics/javascript.json`
- `docs/plans/2026-04-09-javascript-design.md`

## Cross-cutting findings

- The current topic is not organized as a mastery path yet. It is mostly a broad interview bank with a few high-signal concept cards.
- Two sections are TypeScript-only: `js-ts` and `ts-expert`. They do not map to the JavaScript blueprint and should be moved to a separate TypeScript topic or removed from this file.
- There is heavy overlap between `js-modern`, `js-memory`, `jcs`, and `js-iq` around ECMAScript features, engine/runtime behavior, the event loop, garbage collection, closures, and prototypes.
- The strongest current material is around V8, GC, async behavior, and interview Q&A. The weakest areas are security, modules/tooling, browser/platform architecture, and production defensive coding.
- The current interview bank repeats a lot of the same ideas in different wording instead of moving the learner through increasing depth.
- Several learner-facing strings contain encoding noise and malformed markup in the current source text. Reuse should include source-text hygiene cleanup so mojibake, broken tags, and accidental HTML artifacts do not survive into the rewritten topic.

## Duplicate Content Clusters

- V8 / engine internals: `js-memory`, `jcs`, `js-iq` all repeat parsing, JIT, hidden-class, and deoptimization material.
- Garbage collection and memory leaks: `js-memory`, `jcs`, `js-iq` overlap on generational GC, weak references, and leak patterns.
- Event loop and async scheduling: `jcs`, `js-iq`, and some `js-memory` content repeat microtasks, macrotasks, and concurrency explanations.
- TDZ / hoisting / scope behavior: `js-iq` and `jcs` repeat scope, hoisting, closure, and `let`/`const` material without a stronger progression.
- Modules and loading: `js-iq` and `js-modern` both touch ESM/CJS, but without a structured separation between module semantics and tooling.
- Prototype and object model: `js-modern`, `jcs`, and `js-iq` all revisit prototype-chain behavior, `new`, and `Object.defineProperty` from different angles.
- Interview-style duplicates: `jcs` and `js-iq` often ask the same concept with only wording changes, so they should be consolidated into a single graded drill path.

## 2026-Sensitive Claims To Revalidate

- The current subtitle in `javascript.json` says `ES2025`, which is already a moving target and should be refreshed when the rewrite is published.
- `js-modern` includes `Temporal API (Draft)`, which must be rechecked before reuse because proposal status and browser/runtime support move quickly.
- `jcs` includes `Type Annotations (Proposal):` and describes native engines ignoring TS-like syntax as `Stage 3`; that status needs explicit revalidation before anything is copied forward.
- `js-iq` answers about Temporal also describe it as `Stage 3`, so the runtime and proposal status must be rechecked across both content sources.
- Any ES2024/ES2025 feature callouts, browser API support claims, and Node version gating should be verified again before the learner-facing rewrite ships.

## Gap Map

| Target chapter | Existing section ids | Keep | Rewrite | Missing |
|---|---|---|---|---|
| JavaScript Origins, ECMAScript, and Runtimes | `js-modern`, `js-memory`, `jcs`, `js-iq` | Basic ECMAScript feature snapshots; runtime/engine references already present in cards and Q&A | Update ES2024+ claims for 2026; add TC39, spec process, browser vs Node vs edge runtimes, parse/compile/load/execution model | TC39 lifecycle, runtime comparison, language vs platform boundaries, module loading entry points, how JS starts and runs |
| Values, Types, and Identity | `js-iq`, `jcs` | Primitive type list; `==` vs `===`; shallow vs deep equality hints | Rebuild around identity, reference semantics, coercion, boxed primitives, `Object.is`, `NaN`, `-0`, and copy semantics | Equality matrix, identity diagrams, primitive wrappers, truthiness vs nullishness, value/reference mental model |
| Variables, Scope, and Closures | `js-iq`, `jcs` | `var`/`let`/`const`; closure definition; IIFE as a historical scope tool | Expand hoisting, TDZ, lexical environments, scope chains, module scope, closure capture costs, private state patterns | Scope diagrams, block/function/module comparisons, closure memory behavior, interview traps on hoisting |
| Functions and Invocation Mechanics | `js-iq`, `jcs`, `js-modern` | `this`, `bind/call/apply`, currying, debounce/throttle, EventEmitter-style callbacks | Reframe function forms, invocation patterns, constructors, arrow semantics, `new` internals, higher-order functions, argument handling | `arguments`, rest/spread, generators, partial application, method vs free-function invocation, strict-mode `this` rules |
| Objects, Prototypes, and Classes | `jcs`, `js-iq`, `js-modern` | Prototype chain recall; `new`; `Object.defineProperty`; Proxy/Reflect | Add property descriptors, class/prototype equivalence, inheritance vs composition, private fields, static members, `Object.create` | Own vs inherited properties, prototype mutation, descriptor semantics, class field initialization order, object model diagrams |
| Arrays, Collections, and Iteration | `js-iq`, `jcs` | `map`, `filter`, iterable/iterator basics, async iteration, `WeakMap`/`WeakSet` references | Expand array method taxonomy, collection tradeoffs, iteration protocols, sync vs async iteration, and performance considerations | `reduce`, `find`, `some/every`, `sort`, holes, typed arrays, `Map`/`Set` depth, iterator protocol visuals |
| Modules, Tooling, and Project Structure | `js-iq`, `js-modern` | ESM vs CJS basics; dynamic import mention | Add module resolution, package boundaries, `package.json` fields, bundler role, tree shaking, code splitting, build-time vs runtime behavior | Project structure guidance, imports/exports semantics, `type: module`, `exports/imports`, bundler and transpiler workflow |
| Asynchrony and the Event Loop | `jcs`, `js-iq`, `js-memory` | Event loop, microtasks vs macrotasks, async/await, Promise chains, AbortController | Tighten runtime scheduling model, task queues, race conditions, cancellation, error propagation, browser vs Node differences | Promise combinators, fetch lifecycle, timers, `process.nextTick`, backpressure, concurrency diagrams |
| Browser APIs and the DOM Platform | `js-modern`, `js-memory`, `js-iq` | IntersectionObserver, ResizeObserver, MutationObserver, Web Workers, structured cloning, AbortController | Rebuild around DOM events, propagation, delegation, forms, storage, URL/history, rendering pipeline, and worker communication | Fetch/streams depth, rendering model, event delegation, shadow DOM, browser API taxonomy, main-thread responsiveness |
| Error Handling, Validation, and Defensive Coding | `js-iq` | `try/catch` familiarity, same-origin/CORS references, `innerHTML` vs `textContent` safety, `Map` vs object guidance, and `SharedArrayBuffer` cross-origin isolation notes | Add explicit error taxonomy, validation patterns, safe parsing, fallback design, custom errors, and boundary design | Result objects, guard clauses, retry strategy, input normalization, fail-fast vs recoverable behavior, threat-model framing |
| Performance and Memory | `js-memory`, `jcs`, `js-iq` | V8 pipeline, GC internals, memory leak patterns, WeakRef, FinalizationRegistry, workers | Refresh hidden classes, inline caches, profiling, memory diagnostics, data-structure tradeoffs, and practical optimization workflow | Performance methodology, heap snapshot workflow, rendering vs JS cost, lazy loading, caching, algorithmic tradeoffs |
| Security and Reliability | `js-iq` | SOP/CORS, `innerHTML` vs `textContent`, `Map` vs object guidance, and `SharedArrayBuffer` cross-origin isolation notes | Reframe the salvageable material into explicit security taxonomy, safe DOM insertion, sanitization, and secure storage guidance | Threat model, CSP, secure API usage, supply-chain concerns, origin/security boundaries, defense-in-depth guidance |
| Architecture and Large-Scale JavaScript | `js-modern`, `js-iq` | JS design patterns, EventEmitter, pipe/compose, debounce/throttle, proxy-based patterns | Reframe around state modeling, side-effect isolation, modular boundaries, observability, testing strategy, and maintainable system design | Domain boundaries, pub/sub tradeoffs, functional architecture, reusable module patterns, large-app design heuristics |
| Mastery and Interview Readiness | `jcs`, `js-iq` | Cheat-sheet format; large question bank; some advanced implementation prompts | Turn the current bank into layered drills with increasing difficulty, code reading, scenario questions, and debugging prompts | Topic-aligned flashcards, timed drills, compare/contrast sets, architecture interviews, red-flag answers, revision blocks |

## Must Add

- ECMAScript and TC39 context, including how proposals move from idea to standard.
- Runtime differences across browser, Node.js, and edge/serverless environments.
- Identity vs equality, including `Object.is`, `NaN`, `-0`, coercion, and reference semantics.
- Engine and event loop mechanics, including parse/compile/execute flow, task queues, and microtask priority.
- Modules and tooling, including ESM, CommonJS, resolution, bundling, tree shaking, and code splitting.
- Security coverage, including XSS, CSRF, prototype pollution, safe DOM insertion, and storage risks.
- Performance and memory, including hidden classes, inline caches, GC behavior, profiling, and leak diagnosis.
- Architecture patterns, including state modeling, side-effect isolation, composition, and module boundaries.
- Stronger interview drills, including compare/contrast prompts, debugging exercises, and scenario-based questions.
- Browser platform coverage, including the DOM, events, forms, storage, fetch, streams, and rendering behavior.
- Source-text hygiene cleanup, including broken HTML fragments, accidental encoding artifacts, and other reuse-time text defects.

## Scope Decision

- `js-ts` and `ts-expert` are not part of the JavaScript mastery blueprint.
- They should be relocated to a future TypeScript topic so the JavaScript topic stays focused and easier to master.

## Reusable Rewrite Patterns

- Use one chapter-batch regression file per writing pass.
  - `scripts/test-javascript-chapters-1-4.mjs`
  - `scripts/test-javascript-chapters-5-8.mjs`
  - `scripts/test-javascript-chapters-9-11.mjs`
  - `scripts/test-javascript-chapters-12-14.mjs`
- Keep a single package-level topic runner.
  - `scripts/test-javascript-topic.mjs` became the stable entrypoint that chains structure checks and chapter-batch checks together.
- Treat `compare`, `mechanics`, `drill`, and `recap` as the core teaching rhythm.
  - `compare` blocks are best for tradeoffs, terminology collisions, and interview shorthand corrections.
  - `mechanics` blocks are best when the learner needs a sequence or runtime model.
  - `drill` blocks are what keep a chapter from becoming reference-only prose.
  - `recap` blocks make revision and interview prep noticeably faster in the UI.
- Use `richText` for precise mental models and platform/security nuance.
  - It worked especially well for browser APIs, defensive coding, security boundaries, and architecture guidance where code alone would under-teach the concept.
- Prefer a chapter intro plus 6-9 high-signal blocks over many shallow cards.
  - The page felt more coherent in Playwright once the content read like a guided chapter instead of a mixed pile of old cards and Q&A.
- Keep the mastery chapter as a capstone layer, not just a question dump.
  - Blocks for recall, vague-interview translation, debugging, and recap made the existing Q&A bank much more usable.

## Blocks Not Worth Repeating Blindly

- Giant inherited interview banks with duplicate beginner prompts.
  - They inflate the `Core Q&A` number without improving revision quality.
- Proposal-status-sensitive questions copied forward without revalidation.
  - They create maintenance work and can make the topic feel dated faster than foundational content.
- Text copied from legacy content without hygiene cleanup.
  - Mojibake and malformed HTML are easy to miss in JSON files and should be treated as rewrite-time bugs, not cosmetic afterthoughts.
- Long implementation-answer blobs in Q&A.
  - They are harder to scan than focused drills or code blocks and work better when converted into dedicated challenge sections.

## Follow-up Ideas For Other Topics

- React
  - Reuse the block rhythm, but bias harder toward rendering mental models, state ownership, server/client boundaries, and performance tradeoffs.
- Next.js
  - Apply the same chapter-batch test strategy, but make routing, data fetching, caching, server actions, rendering modes, and deployment/runtime boundaries first-class.
- Angular
  - Keep the mastery structure, but tailor drills around DI, signals, forms, routing, SSR, and testing instead of porting JavaScript-style internals drills directly.
- Shared renderer
  - The current block palette is still sufficient. Add new block types only when a future topic reveals a genuine teaching need that cannot be expressed by `richText`, `code`, `compare`, `mechanics`, `trap`, `drill`, or `recap`.
