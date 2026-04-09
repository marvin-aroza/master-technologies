# React Gap Audit

Source files reviewed:
- `data/topics/react.json`
- `docs/plans/2026-04-09-javascript-audit.md`

Official React references checked for 2026-sensitive guidance:
- `https://react.dev/learn/render-and-commit`
- `https://react.dev/learn/state-as-a-snapshot`
- `https://react.dev/learn/preserving-and-resetting-state`
- `https://react.dev/learn/you-might-not-need-an-effect`
- `https://react.dev/learn/lifecycle-of-reactive-effects`
- `https://react.dev/learn/referencing-values-with-refs`
- `https://react.dev/learn/react-compiler/introduction`
- `https://react.dev/reference/react/useActionState`
- `https://react.dev/reference/react/useEffectEvent`
- `https://react.dev/reference/react/useOptimistic`
- `https://react.dev/reference/react/useSyncExternalStore`
- `https://react.dev/reference/react/use`
- `https://react.dev/reference/rsc/directives`

## Cross-cutting findings

- The current topic is broad, ambitious, and useful in spots, but it is not yet a mastery path. It behaves more like a mixed card dump plus a large interview bank than a guided React encyclopedia.
- The topic currently has 15 tabs and 15 sections, but several ideas are duplicated under different ids and labels:
  - `r-state` and `react-state`
  - `r-patterns` and `react-patterns`
  - `react-testing` and `react-testing-routing`
  - `r-19` and `react-19`
- The strongest reusable material is around:
  - `useEffect` misuse and effect mental models
  - state ownership and lifting state
  - rendering/re-render performance intuition
  - reconciliation and Fiber interview material
  - the broad shape of React Compiler, Server Components, and modern hooks
- The weakest areas are:
  - React mental model and execution order
  - state identity and preservation/reset rules
  - purity and Rules of React
  - refs and imperative escape hatches
  - accessibility and reliability
  - testing depth
  - framework boundaries between React core and Next.js-specific behavior
- The current topic repeatedly blends three different layers without making the boundary clear:
  - React core APIs
  - React platform/runtime concepts
  - ecosystem/framework choices like Next.js, React Router, Zustand, TanStack Query, and React Hook Form
- The current `iq-react` bank has 127 Q&A items, but many of them repeat the same ideas in slightly different wording. It needs consolidation into layered drills rather than raw volume.
- The source text is cleaner than the original JavaScript file, but it still has issues that should be treated as rewrite-time bugs:
  - duplicated labels and overlapping sections
  - opinionated claims presented as universal best practice
  - framework-specific examples inside a supposedly React-general topic
  - some outdated naming like `React Forget` as if it were still the main label

## Duplicate Content Clusters

- React 19 / Compiler / modern hook overlap:
  - `r-hooks`, `r-19`, `react-19`, `rcs`, and `iq-react` all revisit compiler, `use()`, `useActionState`, and `useOptimistic`
- State management overlap:
  - `r-state`, `react-state`, `rcs`, and `iq-react` all cover Context vs Zustand vs Redux vs server-state tools
- Patterns overlap:
  - `r-patterns`, `react-patterns`, and `react-testing` all repeat compound components, render props, IoC, and composition ideas
- Testing and routing overlap:
  - `react-testing` and `react-testing-routing` both cover testing patterns, with routing mixed into the same layer
- Forms overlap:
  - `react-forms`, `react-styling-forms`, and parts of `iq-react` repeat React Hook Form and validation guidance
- Performance overlap:
  - `r-perf`, `rcs`, and `iq-react` all repeat re-render causes, memoization, and compiler positioning

## Framework Bleed To Fix

- `r-19` includes Next.js-only APIs like `next/cache` and `next/navigation` in a React topic. Those belong in the Next.js topic, not the core React encyclopedia.
- `r-19` and `react-19` treat Server Actions/Server Components as if they are plain React runtime features you can use everywhere. The official React docs frame these under React Server Components and directives that depend on compatible bundlers/frameworks.
- `r-patterns` uses a Next.js App Router folder structure as if it were the default React project shape.
- `react-forms` and `react-testing-routing` lean into router/framework recommendations that should be taught as ecosystem choices, not React fundamentals.

## 2026-Sensitive Claims To Revalidate

- The official docs currently identify the stable docs as `react@19.2`, so learner-facing "latest React" framing should be updated to React 19.2 rather than vague `React 19` language.
- `React Forget` should be treated as a historical nickname. The official docs now position this as `React Compiler`.
- The current file says or implies:
  - the compiler makes manual memoization mostly unnecessary
  - `use()` can be called conditionally
  - `useActionState` and `useOptimistic` are central to Action flows
  These ideas are directionally right, but the rewrite should match the official caveats instead of oversimplifying them.
- The current file often presents Server Actions as universal React behavior. The official docs scope `'use client'` / `'use server'` under React Server Components directives and compatible tooling.
- Any recommendation that "Zustand + TanStack Query covers 95% of apps" should be reframed as opinionated ecosystem guidance, not a standards-level truth.
- Canary-only APIs visible in the official reference, such as `<ViewTransition>` and some experimental APIs, should not be presented as stable mastery requirements unless explicitly labeled as canary or experimental.

## Gap Map

| Target chapter | Existing section ids | Keep | Rewrite | Missing |
|---|---|---|---|---|
| React Origins, Versions, and Mental Model | `r-fundamentals`, `rcs`, `iq-react` | Basic "what React is" material and some reconciliation references | Reframe around React as a UI runtime/library, official versioning, component purity, render tree, and framework boundaries | React's core mental model, React vs framework distinction, purity, version/current-doc context |
| JSX, Elements, and the Render Tree | `r-fundamentals` | JSX rules, list rendering, conditional rendering basics | Add React elements, render tree identity, keys, and how JSX maps to elements/components | Element vs component vs DOM node, tree identity, keys as identity not just list syntax |
| Components, Props, and Composition | `r-fundamentals`, `r-patterns`, `react-patterns` | Good props/children/composition examples; compound component basics | Tighten composition patterns and remove duplicated pattern material | Slot APIs, controlled composition, composition tradeoffs, API design heuristics |
| Rendering, Commit, and State as Snapshot | `r-fundamentals`, `r-hooks`, `rcs`, `iq-react` | State basics and some reconciliation/Fiber interview notes | Rebuild around render triggers, render phase, commit phase, batching, snapshots, and queueing updates | Render/commit pipeline, state snapshot model, queueing state updates, strict-mode mental model |
| State Ownership, Identity, and Preserving/Resetting State | `r-state`, `r-fundamentals`, `iq-react` | Lifting state and state spectrum guidance | Ground the chapter in state placement, identity, keys, same-position preservation, and reset rules | Preserving/resetting state, same position vs new position, keys for reset, ownership heuristics |
| Events, Effects, and Escape Hatches | `r-fundamentals`, `r-hooks`, `iq-react` | Event handling, strong `useEffect` warning material | Rebuild around events vs effects, synchronization, dependency reasoning, and `useEffectEvent` | Event/effect separation, dependency reasoning, external sync patterns, effect-event guidance |
| Refs, DOM Integration, and Imperative APIs | `r-hooks`, `r-patterns`, `iq-react` | `useRef` basics and class-based error boundary recall | Expand refs, imperative handles, DOM integration, focus/measurement, and error boundaries as escape hatches | Ref vs state, DOM measurement, imperative bridges, `forwardRef` historical context, `ref`-as-prop positioning |
| Context, Reducers, and External Stores | `r-hooks`, `r-state`, `react-state`, `iq-react` | Context, reducer, and external-store ecosystem discussion | Reframe around when Context works, when it hurts, reducer flows, and `useSyncExternalStore` | Official external store subscription model, context split strategies, store boundaries, tearing/concurrency framing |
| Async UI, Suspense, and Data Fetching Boundaries | `r-hooks`, `r-19`, `react-19`, `iq-react` | `use()`, transitions, and optimistic updates are salvageable | Separate React async UI primitives from framework data-fetching strategies | Suspense mental model, transitions, deferred work, Promise reading, client vs framework data fetching |
| Forms, Actions, and Optimistic Mutations | `react-forms`, `react-styling-forms`, `r-hooks`, `r-19`, `iq-react` | Useful RHF examples and form action ideas | Split native React form/action APIs from RHF/Zod ecosystem choices | `useActionState`, `useFormStatus`, optimistic mutations, progressive enhancement, controlled vs uncontrolled form design |
| Performance, Compiler, and Rendering Tradeoffs | `r-perf`, `r-19`, `react-19`, `rcs`, `iq-react` | Re-render causes, compiler basics, reconciliation/Fiber notes | Refresh with official compiler guidance and avoid "memoization is dead" oversimplification | Profiling, compiler caveats, when manual memoization still matters, context blast radius, list/render cost patterns |
| Server Components, Directives, and Framework Boundaries | `r-19`, `react-19`, `iq-react` | High-level server/client boundary intent | Rewrite heavily to distinguish React capabilities from framework implementations and remove Next.js-only APIs from core explanations | `'use client'`, `'use server'`, serializability boundaries, server/client composition, framework compatibility notes |
| Testing, Accessibility, and Reliability | `react-testing`, `react-testing-routing`, `iq-react` | RTL direction is useful | Add accessibility-first testing, error boundaries, form reliability, hydration/debugging guidance, and resilient test strategy | Accessibility, behavior-first testing, MSW/network boundaries, reliability and error recovery |
| Architecture, Ecosystem Choices, and Interview Mastery | `r-patterns`, `react-patterns`, `react-state`, `react-forms`, `react-testing-routing`, `rcs`, `iq-react` | There is enough raw material for a strong capstone and ecosystem appendix | Consolidate routers, state tools, forms, architecture, and interview drills into one capstone layer | Decision frameworks, tool tradeoffs, anti-patterns, debugging drills, red-flag interview answers, architecture scenarios |

## Must Add

- React's render and commit pipeline, not just "re-render" as a vague concept.
- State as snapshot, queueing updates, and the difference between reading state now vs scheduling the next render.
- State preservation and reset rules tied to render-tree position and keys.
- Component purity and the Rules of React.
- Event handlers vs Effects, plus official `useEffectEvent` guidance.
- Refs as non-render state, imperative escape hatches, and DOM integration.
- `useSyncExternalStore` as the concurrency-safe external-store subscription primitive.
- Suspense, transitions, `use()`, and async UI mental models.
- Modern form/action flows with `useActionState`, `useFormStatus`, and `useOptimistic`.
- React Compiler guidance that matches the official docs: powerful, stable, but still an optional build-time tool with caveats.
- Clear separation between React core and framework-specific features like Next.js routing/cache helpers.
- Testing plus accessibility plus reliability as a first-class chapter, not an afterthought.

## Scope Decisions

- Keep React core as the spine of the topic.
- Keep ecosystem tools like React Router, TanStack Query, Zustand, Redux Toolkit, React Hook Form, and Zod, but move them into architecture/ecosystem chapters instead of teaching them as if they are React fundamentals.
- Remove Next.js-only code from the React topic.
- Keep Server Components and directives in React, but teach them with explicit framework/bundler boundaries instead of as universally available APIs.

## Proposed React Blueprint

1. React Origins, Versions, and Mental Model
2. JSX, Elements, and the Render Tree
3. Components, Props, and Composition
4. Rendering, Commit, and State as Snapshot
5. State Ownership, Identity, and Preserving/Resetting State
6. Events, Effects, and Escape Hatches
7. Refs, DOM Integration, and Imperative APIs
8. Context, Reducers, and External Stores
9. Async UI, Suspense, and Data Fetching Boundaries
10. Forms, Actions, and Optimistic Mutations
11. Performance, Compiler, and Rendering Tradeoffs
12. Server Components, Directives, and Framework Boundaries
13. Testing, Accessibility, and Reliability
14. Architecture, Ecosystem Choices, and Interview Mastery

## Reusable Rewrite Patterns From JavaScript

- Keep one chapter-batch test file per writing pass.
- Use `richText`, `code`, `compare`, `mechanics`, `trap`, `drill`, and `recap` as the default teaching rhythm before inventing new blocks.
- Prefer 6-9 dense blocks per chapter over many shallow legacy cards.
- Keep the final mastery chapter as a capstone layer with debugging drills and architecture tradeoff prompts rather than a giant repeated Q&A dump.
- Reuse the stronger Q&A material only after mapping it to a chapter and difficulty level.

## Blocks Not Worth Repeating Blindly

- Framework-specific code in the core React topic.
- Big ecosystem recommendations presented as one-size-fits-all truth.
- Duplicate React 19 material spread across multiple sections.
- Giant interview banks where the same idea is repeated with slightly different wording.
- Claims that the compiler makes every manual optimization obsolete.

## Immediate Follow-up

- Create a React implementation plan mirroring the JavaScript batch approach.
- Restructure `react.json` into the new 14-chapter skeleton before rewriting content.
- Rewrite chapters 1-4 first so the React topic quickly gains a coherent mental-model foundation.
