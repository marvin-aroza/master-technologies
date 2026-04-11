# Git, Terraform, AWS, and Docker Starter Topics Design

## Context
This project is a content-driven learning encyclopedia built with Next.js 16.2.2 and React 19.2.4. The current topic catalog already includes HTML, CSS, JavaScript, React, Next.js, Angular, System Design, and UI/UX in a richer block-based mastery format.

The next expansion is to add four new first-class topics:
- Git
- Terraform
- AWS
- Docker

The user wants these topics added as real starter topics now, not placeholders. That means they must ship with real pages, real navigation, real chapter structures, and real learning value on day one.

## Objectives
- Add `git`, `terraform`, `aws`, and `docker` as first-class encyclopedia topics with real routes and navigation.
- Keep the rollout honest: these should be meaningful starter topics now, but not pretend to be fully gold-standard rewrites on day one.
- Reuse the existing block-based topic architecture so the new topics fit the current renderer cleanly.
- Give each topic a full mastery-track structure, early strong content, distributed chapter Q&A, and a final capstone interview bank.
- Update the home page, route map, topic order, and tests so the catalog expansion feels native to the app.

## Rollout Approach
The rollout should use a balanced starter-topic model.

That means:
- all four topics launch now
- all four have real 14-chapter mastery tracks
- chapters 1-4 for each topic should be meaningfully stronger and more detailed
- chapters 5-14 should still contain real instructional content and Q&A, but can be lighter than the mature rewritten topics
- every topic should still feel legitimate for learning and revision from the first release

This is the fastest path that preserves quality without delaying the expansion until every new topic is at full encyclopedia depth.

## Shared Topic Standard
Each new topic should include:
- real route page
- real home-page card
- real metadata and hero stats
- real chapter navigation
- real block-based sections
- chapter-level interview reinforcement across chapters 1-13
- a final capstone interview bank in chapter 14

Each topic should follow the same `TopicData` shape already used by the upgraded topics:
- `heroStats`
- `tabs`
- `sections`
- `blocks`
- `qa`

Legacy `cards` should not be introduced for these new topics.

## Topic Blueprints

### Git
1. Origins, repositories, and the object model
2. Working tree, staging, and commits
3. Branching, merging, rebasing, and history shaping
4. Remotes, fetch/pull/push, and collaboration
5. Conflict resolution and recovery
6. Tags, releases, and versioning
7. Advanced history tools and inspection
8. Cherry-pick, revert, reset, restore, reflog
9. Team workflows and branching strategies
10. Monorepos, submodules, and large-repo concerns
11. Hooks, automation, and CI integration
12. Security, signing, and safe collaboration
13. Git internals and performance
14. Interview mastery and real-world debugging

### Terraform
1. Infrastructure as code foundations
2. Providers, resources, data sources, and variables
3. State, plans, applies, and lifecycle
4. Modules, composition, and reuse
5. Dependency graph and execution model
6. Workspaces, environments, and repo structure
7. Remote state, locking, and team workflows
8. Drift, imports, refactors, and migrations
9. Secrets, policy, and governance
10. Testing, validation, and automation
11. Multi-account and multi-region design
12. Performance, scale, and operational risk
13. Terraform ecosystem and OpenTofu context
14. Interview mastery and architecture drills

### AWS
1. Cloud foundations and AWS global infrastructure
2. IAM, identities, accounts, and security boundaries
3. Compute: EC2, Lambda, containers, and runtimes
4. Networking: VPC, subnets, routing, gateways, DNS
5. Storage: S3, EBS, EFS, Glacier
6. Databases: RDS, DynamoDB, ElastiCache, Redshift
7. Messaging and integration: SQS, SNS, EventBridge, Step Functions
8. Observability and operations: CloudWatch, CloudTrail, Config
9. Deployment and delivery: CloudFormation, CDK, CI/CD
10. High availability, scaling, and resilience
11. Cost, performance, and architecture tradeoffs
12. Multi-account governance and enterprise patterns
13. Real-world AWS architecture case studies
14. Interview mastery and troubleshooting

### Docker
1. Containers, images, and why Docker exists
2. Images, layers, Dockerfiles, and build mechanics
3. Containers, processes, and runtime behavior
4. Volumes, bind mounts, and data persistence
5. Networking and service communication
6. Compose and local multi-service systems
7. Registries, tagging, and image distribution
8. Security, secrets, and least-privilege containers
9. Performance, caching, and image optimization
10. Debugging and introspection
11. CI/CD and production image workflows
12. Orchestration context: Swarm vs Kubernetes mental model
13. Container architecture patterns and anti-patterns
14. Interview mastery and production troubleshooting

## First-Pass Quality Bar
The first release of these topics should meet these standards:
- each topic has a full 14-chapter structure
- chapters 1-4 contain strong foundational teaching
- chapters 5-14 contain meaningful instructional blocks, not filler
- each chapter includes at least a small Q&A set
- the final chapter contains a stronger capstone interview bank
- the topic page feels complete enough to study from immediately

These topics may start lighter than the mature rewritten topics, but they should still feel credible and useful.

## App Integration Design
Adding these topics requires coordinated app changes.

### New Topic Files
Create:
- `data/topics/git.json`
- `data/topics/terraform.json`
- `data/topics/aws.json`
- `data/topics/docker.json`

### Dynamic Route Map
Update `app/[topic]/page.tsx` to:
- import the new topic files
- add route configs for all four topics
- add metadata titles and descriptions
- add accent colors
- ensure `generateStaticParams` includes the new routes

### Home Page
Update `app/page.tsx` to:
- add real topic cards for the four new topics
- update catalog counts and hero stats
- keep the card descriptions and tags aligned with the starter-topic quality bar

### Cross-Topic Navigation
Update `components/renderer/TopicPage.tsx` so the topic order becomes:
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

This ordering keeps Git close to the coding foundations and places Docker/AWS before Terraform so Terraform lands after learners already understand deployment targets and cloud resources.

## Teaching Strategy
The four topics should share the same content style:
- `richText` for concepts and mental models
- `compare` for tradeoffs
- `mechanics` for flows and under-the-hood behavior
- `code` where syntax or configuration matters
- `trap` for anti-patterns and interview mistakes
- `drill` for applied thinking
- `recap` for revision

The starter rollout should emphasize:
- mental models
- command/config meaning
- safe real-world workflows
- production tradeoffs
- interview readiness

## Verification Strategy
Implementation should add a starter-topic verification layer that checks:
- the four new topic files exist
- each topic has 14 tabs and 14 matching sections
- each topic uses `blocks`
- each topic has chapter-level Q&A
- each topic has a final capstone Q&A section
- the route map includes the new topics
- the home page and cross-topic order reflect the expanded catalog

Verification should still include:
- `npm run test:renderer`
- lint
- type-check
- build

## Risks And Controls

### Risk: Four topics launch with inconsistent quality
Control: Use one shared starter-topic standard and shared regression tests.

### Risk: The first pass becomes filler-heavy
Control: Require strong chapters 1-4 and meaningful block content in chapters 5-14.

### Risk: App integration drifts from content files
Control: Update route map, home page, and topic order in the same implementation plan.

### Risk: Topic counts or descriptions go stale immediately
Control: Set starter-topic hero stats and home-page metadata intentionally during implementation instead of leaving guessed placeholders.

## Outcome
This design will expand the encyclopedia from 8 topics to 12 topics while keeping the app coherent. The result should be four real new starter topics that are immediately usable and structurally ready for future deep rewrites without another reorganization pass.
