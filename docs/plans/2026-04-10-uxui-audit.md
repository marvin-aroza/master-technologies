# UI/UX Topic Audit

## Current Shape
- `data/topics/uxui.json` is still in the legacy 8-tab format.
- The current tabs are:
  - `ux-gestalt`
  - `ux-principles`
  - `ux-designsys`
  - `ux-patterns`
  - `ux-comp`
  - `ux-ui-mastery`
  - `ux-cs`
  - `ux-iq`
- The topic mixes psychology, accessibility, systems, patterns, motion, architecture, and interview prep without a clean learning progression.
- The topic still depends on legacy `cards` instead of the richer `blocks` format used by the rewritten technical topics.

## Main Gaps
1. The topic starts with cheat-sheet and interview-heavy material instead of product and design fundamentals.
2. Research, problem framing, flows, and critique are underrepresented compared with tokens and recall material.
3. Accessibility, responsive thinking, and collaboration are present, but they are not taught as part of a coherent design workflow.
4. The legacy interview bank is useful, but it is too centralized and does not reinforce the chapters learners study first.
5. The current structure behaves more like a design-notes collection than a mastery curriculum.

## Migration Map

### Keep In Core UI/UX
- Gestalt principles
- Hick's Law, Fitts's Law, Jakob's Law, and cognitive-load framing
- heuristics and usability principles
- navigation and interaction patterns
- state design and feedback guidance
- hierarchy, spacing, typography, color, and iconography decisions

### Move To Later UI/UX Chapters
- accessibility and inclusive-design workflows
- forms and conversion-focused UX
- design tokens and system governance
- micro-interactions and perceived-performance reasoning
- critique frameworks and quality-measurement methods
- collaboration, handoff, and production workflow content

### Merge Into Recap, Reference, and Interview Material
- the `ux-cs` cheat-sheet concepts
- repeated Gestalt and heuristic summaries
- quick-recall architecture notes
- existing interview prompts from `ux-iq`

## Legacy Section Reframing

### `ux-gestalt`
- Keep as the basis for perception and cognitive-load chapters.
- Expand beyond Gestalt into attention, mental models, memory, and scanning.

### `ux-principles`
- Split across product thinking, interaction design, and inclusive UX.
- Preserve heuristic language, but stop letting it stand alone without scenarios.

### `ux-designsys`
- Move into design-system and governance chapters.
- Preserve token hierarchy, component API thinking, and theming examples.

### `ux-patterns`
- Redistribute into IA, forms, responsive design, and conversion-critical flows.
- Keep the strongest examples on navigation, validation, empty states, and error states.

### `ux-comp`
- Move into state design, visual language, and motion chapters.
- Preserve the state-machine framing for interactive components.

### `ux-ui-mastery`
- Split across design systems, inclusive design, collaboration, and architecture chapters.
- Keep the large-scale system thinking, but place it later in the topic.

### `ux-cs`
- Preserve as recap material spread across chapters and the final capstone.
- Do not keep it as a standalone tab in the new mastery flow.

### `ux-iq`
- Preserve and expand into distributed chapter-level Q&A plus a larger final capstone bank.

## 2026 Framing Corrections
- Keep the topic design-first, not tool-first.
- Treat accessibility as a first-class design constraint, not a cleanup pass.
- Treat tokens as part of governance and system scale, not just color variables.
- Treat motion as feedback and perceived-performance design, not decoration.
- Treat critique as structured reasoning tied to evidence, heuristics, and task outcomes.
- Treat collaboration and handoff as production design work, not optional process overhead.

## Rewrite Priorities
1. Replace the 8-tab mixed layout with the approved 14-chapter mastery structure.
2. Move from legacy cards to block-based teaching content.
3. Add chapter-level interview reinforcement across chapters 1-13.
4. Preserve the strongest legacy material by relocating it intentionally.
5. End with a large architecture and interview capstone instead of a small isolated bank.
