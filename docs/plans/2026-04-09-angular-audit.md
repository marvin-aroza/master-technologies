# Angular Gap Audit

Source files reviewed:
- `data/topics/angular.json`
- `docs/plans/2026-04-09-javascript-audit.md`
- `docs/plans/2026-04-09-react-audit.md`
- `docs/plans/2026-04-09-nextjs-audit.md`

Official Angular references checked for 2026-sensitive guidance:
- `https://angular.dev/overview`
- `https://angular.dev/reference/releases`
- `https://v18.angular.dev/roadmap/`
- `https://angular.dev/essentials/signals`
- `https://angular.dev/api/core/provideZonelessChangeDetection`
- `https://angular.dev/guide/forms/signals/models`
- `https://angular.dev/guide/http/http-resource`
- `https://angular.dev/guide/testing`
- `https://angular.dev/guide/testing/migrating-to-vitest`
- `https://angular.dev/best-practices/performance/ssr`
- `https://angular.dev/guide/hydration`
- `https://angular.dev/events/v21`

## Cross-cutting findings

- The current topic is extremely broad, but it is not yet a mastery path. It behaves like a large legacy Angular note dump plus one giant interview bank rather than a progressive 2026 curriculum.
- The topic currently has `23` tabs and `23` sections, and every instructional section still uses legacy `cards` instead of the block-based teaching system already proven in JavaScript, React, and Next.js.
- Interview reinforcement is heavily centralized:
  - `22` sections have zero Q&A
  - the final `iq` section contains `222` questions by itself
- The strongest reusable material is around:
  - standalone bootstrapping
  - DI and providers
  - routing and guards
  - signals fundamentals
  - HTTP interceptors
  - SSR and hydration awareness
- The weakest areas are:
  - Angular platform/runtime mental model
  - clear separation between stable, experimental, and future-facing APIs
  - modern change detection reasoning
  - component API design and composition
  - testing and reliability strategy
  - security, accessibility, and i18n as first-class topics
  - migration and architecture tradeoff reasoning
- The current file repeatedly mixes four different layers without drawing boundaries clearly:
  - Angular platform fundamentals
  - stable modern Angular guidance
  - experimental or emerging APIs
  - ecosystem and architecture choices like NgRx, Material, CDK, micro-frontends, and PWAs

## Duplicate And Overlapping Clusters

- Core platform overlap:
  - `core`, `signals`, and `v21` all revisit standalone, signals, bootstrapping, and change detection from different angles.
- Async and state overlap:
  - `data`, `rxjs`, `signals`, and `state-management` all discuss reactivity, async flows, and state ownership, but without one coherent mental model.
- Form overlap:
  - `forms` and `v21` both cover forms, with newer signal-form ideas bolted onto older reactive-form framing.
- Performance and tooling overlap:
  - `perf`, `testing`, `ssr`, `build-security-a11y`, and `v21` all touch change detection, build tooling, testing, hydration, and performance.
- Ecosystem overlap:
  - `material-cdk`, `angular-animations`, `i18n-l10n`, `pwa-sw`, and `micro-frontends` are important, but currently feel like isolated appendices rather than part of one architecture story.
- Interview duplication:
  - `cs` and `iq` overlap heavily, with many questions restating the same ideas in slightly different wording.

## 2026-Sensitive Claims To Revalidate

- The official Angular release table currently shows:
  - `^21.0.0` active, released `2025-11-19`
  - `^20.0.0` in LTS
  - `^22.0` planned for the week of `2026-05-18`
  This means the live stable Angular line on `April 9, 2026` is still Angular `21.x`, not `22`.
- The current topic says standalone is the default "since Angular 14". That is too loose. Standalone APIs arrived earlier, but the official roadmap says new application authoring switched to standalone in `v17`.
- The current topic says zoneless is the default in v21. The current official zoneless guide now agrees with that for Angular `v21+`, while also clarifying that `provideZonelessChangeDetection()` was the stable opt-in path in Angular `v20`.
- The current topic still teaches `provideExperimentalZonelessChangeDetection()` in some places. That is outdated relative to the stable `provideZonelessChangeDetection()` API.
- The current topic often frames Signal Forms as both central and already settled. The official docs now include a dedicated Signal Forms guide, but learner-facing wording should avoid stronger stability claims than the docs themselves make.
- `httpResource` is still explicitly labeled experimental since `v19.2`, so it should be taught as an important modern option, not as a universally stable default.
- The current file presents several future-looking claims as facts:
  - selectorless components
  - OnPush becoming default
  - Signal Forms stabilizing in v22
  - detailed AI/MCP workflows as standard interview material
  These should be clearly labeled as roadmap or emerging direction, not current bedrock.
- The current file claims a specific zoneless bundle-size win and several CVE summaries. These should not be repeated unless backed by official Angular security or release material.

## Gap Map

| Target chapter | Existing section ids | Keep | Rewrite | Missing |
|---|---|---|---|---|
| Angular Origins, Versions, and Platform Model | `core`, `v21`, `iq` | High-level "what Angular is" framing | Rebuild around Angular as a full framework/platform, versioning, release policy, and what runs where | Version/current-doc context, stable vs experimental framing, platform/runtime mental model |
| Bootstrapping, Standalone Architecture, and Project Structure | `core`, `v21` | `bootstrapApplication`, `app.config`, project structure ideas | Reframe around standalone-first bootstrapping and environment injectors | Clear standalone-first architecture path, application config, environment providers |
| Components, Templates, and Built-in Control Flow | `comp`, `tmpl`, `pipes` | Component anatomy, template syntax, built-in control flow | Modernize around 2026 template mental model and component API design | Template compilation model, modern control-flow reasoning, signal-friendly templates |
| Signals, Reactivity, and Change Detection | `signals`, `perf`, `v21`, `iq` | Signals basics, computed/effect, some change detection notes | Rebuild around reactive graph mental model, OnPush vs default checks, Zone vs zoneless, render scheduling | What triggers updates, signal graph mechanics, stable zoneless framing |
| Dependency Injection, Providers, and Application Architecture | `di`, `core` | DI tree, `inject()`, provider basics | Expand into environment injectors, provider scope, tokens, and architectural boundaries | Injector hierarchy reasoning, provider placement heuristics, root vs route vs component scope |
| Component Composition, Directives, Pipes, and View Queries | `comp`, `tmpl`, `pipes` | Content projection, queries, host bindings, directives | Consolidate into one chapter about reusable component APIs and DOM extension | Composition patterns, host directives, directive tradeoffs, query timing and safety |
| Routing, Route Data, Guards, and Navigation | `routing` | Guards, params, lazy loading | Refresh for modern functional routing, route inputs, route data, and navigation strategy | Resolver patterns, route data ownership, routing architecture |
| HTTP, Resources, Interceptors, and Data Access | `data`, `rxjs`, `v21` | HttpClient, interceptors, service examples | Separate stable HttpClient patterns from experimental `resource` / `httpResource` APIs | Data access boundaries, `httpResource` positioning, request orchestration |
| Forms, Validation, and Submission Flows | `forms`, `v21` | Reactive forms, validators, some signal-form awareness | Rebuild around today's stable forms plus modern signal-form direction | Form architecture, submission flows, async validation, Signal Forms comparison |
| RxJS Interop, State Management, and Async Architecture | `rxjs`, `state-management`, `signals` | Core RxJS operators, state-tool mentions | Reframe RxJS as complement to signals, not an alternative religion | Signals/RxJS interop, async architecture, local vs global state heuristics |
| Testing, Debugging, and Reliability | `testing`, `perf`, `ssr`, `iq` | Some test examples and lifecycle error awareness | Rebuild around current Vitest-first testing and debugging strategy | Reliability, hydration mismatch debugging, testing services/components/HTTP/router cleanly |
| SSR, Hydration, Hybrid Rendering, and Performance | `ssr`, `perf`, `build-security-a11y` | SSR, hydration, defer/perf fragments | Organize into one rendering and performance chapter | Hybrid rendering, incremental hydration, defer, hydration constraints |
| Build Tooling, Security, Accessibility, Internationalization, and Deployment | `build-security-a11y`, `i18n-l10n`, `pwa-sw`, `v21` | Tooling and a11y/i18n awareness | Rebuild into a production hardening chapter | Angular build system, security boundaries, a11y patterns, i18n strategy, deployment concerns |
| Ecosystem, Migration, and Interview Mastery | `material-cdk`, `angular-animations`, `micro-frontends`, `cs`, `iq`, `v21` | Useful ecosystem references and raw interview volume | Consolidate into a capstone with migration, ecosystem choices, and harder interview drills | NgModule migration, zoneless migration, Karma-to-Vitest migration, architecture scenarios |

## Must Add

- Angular's platform/runtime model: compile-time templates, component tree, change detection, DI graph, and router integration.
- A stable-vs-experimental layer across the topic so learners know what is bedrock, what is modern but optional, and what is still evolving.
- A clear signals-first but not RxJS-denying reactivity chapter.
- Modern change detection reasoning that matches current docs:
  - `ChangeDetectionStrategy.OnPush`
  - `ChangeDetectionStrategy.Eager`
  - zoneless as the Angular `v21+` default, with explicit update-notification expectations
- Standalone-first bootstrapping and environment providers.
- A proper chapter on testing, debugging, and reliability with current Vitest guidance.
- A production chapter that treats security, a11y, i18n, and deployment as real engineering topics.
- Migration guidance for:
  - NgModules to standalone
  - Zone.js to zoneless
  - Karma to Vitest
- Chapter-level Q&A across the topic, not only one giant terminal bank.

## Scope Decisions

- Keep Angular modern-first:
  - standalone-first
  - signals-first
  - built-in control flow
  - modern CLI/tooling
- Keep RxJS as essential, but reposition it as Angular's async/interoperability layer rather than the only state model.
- Keep NgModules, Karma, and older patterns in the topic only as migration and legacy context, not as the main path for new learners.
- Keep ecosystem topics like Material, CDK, PWA, animations, micro-frontends, and Native Federation, but move them into late-stage architecture/economics chapters rather than early fundamentals.
- Keep one final capstone chapter for migration, tool choice, and interview mastery.

## Proposed Angular Blueprint

1. Angular Origins, Versions, and Platform Model
2. Bootstrapping, Standalone Architecture, and Project Structure
3. Components, Templates, and Built-in Control Flow
4. Signals, Reactivity, and Change Detection
5. Dependency Injection, Providers, and Application Architecture
6. Component Composition, Directives, Pipes, and View Queries
7. Routing, Route Data, Guards, and Navigation
8. HTTP, Resources, Interceptors, and Data Access
9. Forms, Validation, and Submission Flows
10. RxJS Interop, State Management, and Async Architecture
11. Testing, Debugging, and Reliability
12. SSR, Hydration, Hybrid Rendering, and Performance
13. Build Tooling, Security, Accessibility, Internationalization, and Deployment
14. Ecosystem, Migration, and Interview Mastery

## Reusable Rewrite Patterns From JavaScript, React, and Next.js

- Start with a structure test before reshaping the topic.
- Use one chapter-batch regression file per writing pass.
- Prefer the existing block palette:
  - `richText`
  - `code`
  - `compare`
  - `mechanics`
  - `trap`
  - `drill`
  - `recap`
- Keep 6-9 dense blocks per chapter instead of many shallow cards.
- Distribute interview practice through the chapters and leave the capstone bank for harder debugging and architecture prompts.

## Blocks Not Worth Repeating Blindly

- A dedicated `signals` tab plus a dedicated `v21` tab plus signals questions in the interview bank.
- "Latest Angular" feature dumps disconnected from the rest of the curriculum.
- Giant RxJS operator lists without architectural context.
- Repeating the same standalone or zoneless explanation in multiple sections with slightly different wording.
- Centralizing all interview prep in one tab.
- Treating roadmap claims as current engineering facts.

## Immediate Follow-up

- Save the Angular design doc and implementation plan.
- Add the Angular topic regression harness.
- Restructure `angular.json` into the approved 14-chapter skeleton before rewriting content.
