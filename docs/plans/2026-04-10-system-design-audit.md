# System Design Topic Audit

## Current Shape
- `data/topics/system-design.json` is still in the legacy 7-tab format.
- The current tabs are:
  - `fsd-core`
  - `sd-arch`
  - `sd-data`
  - `fsd-examples`
  - `sd-mastery`
  - `sd-cs`
  - `fsd-iq`
- The topic mixes frontend architecture, distributed-systems theory, storage, performance, and interview prep too early.
- The topic still relies on legacy `cards` instead of the richer `blocks` format used by the rewritten mastery topics.

## Main Gaps
1. The topic jumps between frontend architecture and distributed-systems depth before the learner has a stable application-design mental model.
2. Strong ideas like caching, state ownership, real-time delivery, and resilience are present, but they are taught as isolated facts more often than connected system flows.
3. The interview material is concentrated in `sd-cs` and `fsd-iq` instead of reinforcing the chapters learners study first.
4. Frontend-system-design interview scenarios are useful, but they are not yet integrated into a broader, progressive architecture curriculum.
5. The current structure behaves more like an architecture note dump than a mastery path from requirements to operating systems at scale.

## Migration Map

### Keep In Core System Design
- requirement gathering and non-functional constraints
- client-server lifecycles and request flow
- state ownership, data flow, and frontend/full-stack application architecture
- API contract design and integration patterns
- caching, CDN, edge, and performance-layer reasoning
- real-time architecture, collaboration models, and event-driven UX

### Move To Later System Design Chapters
- databases, indexing, and search design
- queues, background jobs, and workflow orchestration
- reliability, resilience, rollout safety, and observability
- global distribution, consistency models, and replication tradeoffs
- advanced auth, multi-tenancy, and large-scale security boundaries

### Merge Into Recap, Reference, and Interview Material
- the `sd-cs` cheat-sheet concepts
- repeated CAP / caching / scaling summaries
- architecture examples from `fsd-examples`
- the legacy `fsd-iq` interview bank

## Legacy Section Reframing

### `fsd-core`
- Keep as the basis for requirements, architecture decomposition, state strategy, and performance tradeoffs.
- Remove stray CSS/frontend-trivia artifacts that do not belong in system design.

### `sd-arch`
- Split across client-server lifecycles, caching layers, resilience, and global-scale chapters.
- Preserve strong concepts like load balancing, scaling, and CAP, but teach them where they matter in system flows.

### `sd-data`
- Move into database, storage, caching, and search chapters.
- Preserve SQL vs NoSQL, indexing, read replicas, sharding, and cache strategies.

### `fsd-examples`
- Preserve as the seed material for architecture case studies and scenario drills.
- Reframe examples so they teach tradeoffs, failure modes, and system decomposition rather than only final answers.

### `sd-mastery`
- Split across real-time systems, resilience, security, and distributed-systems tradeoffs.
- Preserve advanced topics like CQRS, event sourcing, edge delivery, and availability reasoning.

### `sd-cs`
- Preserve as recap material spread across the relevant chapters and the final capstone.
- Do not keep it as a standalone tab in the new mastery flow.

### `fsd-iq`
- Preserve and expand into chapter-level Q&A plus a larger architecture/interview capstone bank.

## 2026 Framing Corrections
- Keep the main path frontend-system-design first, not generic distributed-systems theory first.
- Teach performance as a layered system: browser, app, network, cache, and backend boundaries.
- Treat resilience, observability, and rollout safety as first-class design concerns, not optional operations detail.
- Treat security as architecture, not only auth-token advice.
- Treat case studies as tradeoff drills, not memorized templates.

## Rewrite Priorities
1. Replace the 7-tab mixed layout with the approved 14-chapter mastery structure.
2. Move from legacy cards to block-based teaching content.
3. Add chapter-level interview reinforcement across chapters 1-13.
4. Preserve the strongest legacy architecture material by relocating it intentionally.
5. End with a larger case-study and interview capstone instead of isolated cheat-sheet tabs.
