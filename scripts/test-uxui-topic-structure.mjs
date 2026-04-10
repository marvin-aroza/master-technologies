import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "uxui.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const expectedTabs = [
  { id: "origins-product-thinking-role-design", label: "Origins & Product Thinking" },
  { id: "human-perception-attention-cognitive-load", label: "Perception & Cognitive Load" },
  { id: "user-research-discovery-problem-framing", label: "Research & Problem Framing" },
  { id: "information-architecture-navigation-user-flows", label: "IA & User Flows" },
  { id: "interaction-design-feedback-state-design", label: "Interaction & State Design" },
  { id: "visual-hierarchy-layout-composition", label: "Hierarchy & Composition" },
  { id: "typography-color-iconography-visual-language", label: "Typography, Color & Icons" },
  { id: "responsive-design-accessibility-inclusive-ux", label: "Responsive & Inclusive UX" },
  { id: "forms-input-ux-conversion-critical-interfaces", label: "Forms & Conversion UX" },
  { id: "design-systems-tokens-components-governance", label: "Design Systems & Tokens" },
  { id: "motion-micro-interactions-perceived-performance", label: "Motion & Perceived Performance" },
  { id: "critique-heuristics-measuring-design-quality", label: "Critique & Quality" },
  { id: "collaboration-handoff-tooling-production-workflows", label: "Collaboration & Handoff" },
  { id: "ui-ux-architecture-system-thinking-interview-mastery", label: "Architecture & Interviews" },
];

assert.equal(topic.id, "uxui");
assert.equal(topic.tabs.length, expectedTabs.length, "uxui topic should expose 14 mastery chapters");
assert.deepEqual(
  topic.tabs.map((tab) => tab.id),
  expectedTabs.map((tab) => tab.id),
  "tab ids should follow the approved UI/UX mastery flow"
);
assert.deepEqual(
  topic.tabs.map((tab) => tab.label),
  expectedTabs.map((tab) => tab.label),
  "tab labels should match the approved UI/UX mastery flow"
);
assert.equal(topic.sections.length, expectedTabs.length);
assert.deepEqual(
  topic.sections.map((section) => section.id),
  expectedTabs.map((tab) => tab.id),
  "section ids should match the approved UI/UX mastery flow"
);

assert.deepEqual(
  topic.heroStats,
  [
    { label: "Chapters", value: "14" },
    { label: "Interview", value: "Critique + Capstone" },
    { label: "Coverage", value: "Research to Systems" },
    { label: "Updated", value: "2026" },
  ],
  "hero stats should reflect the new UI/UX topic framing"
);

const forbiddenLegacyIds = [
  "ux-gestalt",
  "ux-principles",
  "ux-designsys",
  "ux-patterns",
  "ux-comp",
  "ux-ui-mastery",
  "ux-cs",
  "ux-iq",
];

const tabIds = topic.tabs.map((tab) => tab.id);
const sectionIds = topic.sections.map((section) => section.id);

for (const id of forbiddenLegacyIds) {
  assert.ok(!tabIds.includes(id), `legacy tab ${id} should be removed`);
  assert.ok(!sectionIds.includes(id), `legacy section ${id} should be removed`);
}

const finalSection = topic.sections.at(-1);
assert.equal(finalSection.id, "ui-ux-architecture-system-thinking-interview-mastery");
assert.ok(Array.isArray(finalSection.qa), "final chapter should include a capstone interview bank");
assert.ok(finalSection.qa.length >= 40, "final chapter should keep a meaningful capstone Q&A bank");

for (const section of topic.sections) {
  assert.ok(
    typeof section.intro === "string" && section.intro.trim().length > 0,
    `${section.id} should remain navigable with a visible intro`
  );
  assert.ok(Array.isArray(section.blocks), `${section.id} should define a blocks array`);
  assert.ok(section.blocks.length >= 1, `${section.id} should expose at least one scaffold block`);
}

assert.ok(
  topic.sections.every((section) => !section.cards || section.cards.length === 0),
  "the restructured UI/UX topic should not keep legacy cards"
);
