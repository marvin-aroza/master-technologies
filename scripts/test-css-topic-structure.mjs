import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "css.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const expectedTabs = [
  { id: "origins-cascade-browser-styling-pipeline", label: "Origins & Cascade" },
  {
    id: "selectors-combinators-pseudo-classes-pseudo-elements",
    label: "Selectors & Pseudo-Classes",
  },
  {
    id: "specificity-inheritance-custom-properties-layers-scope",
    label: "Specificity, Inheritance & Scope",
  },
  { id: "box-model-sizing-overflow-positioning", label: "Box Model & Positioning" },
  { id: "flexbox-one-dimensional-layout", label: "Flexbox & 1D Layout" },
  { id: "grid-subgrid-two-dimensional-layout", label: "Grid & 2D Layout" },
  {
    id: "responsive-css-media-queries-logical-properties-container-queries",
    label: "Responsive CSS & Queries",
  },
  {
    id: "typography-color-backgrounds-effects-visual-styling",
    label: "Typography, Color & Visual Styling",
  },
  {
    id: "transforms-transitions-animations-motion-systems",
    label: "Motion & Animations",
  },
  {
    id: "modern-css-architecture-resets-tokens-scalable-design-systems",
    label: "Architecture, Resets & Tokens",
  },
  {
    id: "performance-rendering-cost-browser-optimization",
    label: "Performance & Rendering Cost",
  },
  {
    id: "accessibility-user-preferences-resilient-styling",
    label: "Accessibility & Preferences",
  },
  {
    id: "advanced-platform-css-native-ui-integration",
    label: "Advanced Platform CSS",
  },
  {
    id: "ecosystem-tradeoffs-debugging-architecture-interview-mastery",
    label: "Ecosystem & Interviews",
  },
];

assert.equal(topic.id, "css");
assert.equal(topic.tabs.length, expectedTabs.length, "css topic should expose 14 mastery chapters");
assert.deepEqual(
  topic.tabs.map((tab) => tab.id),
  expectedTabs.map((tab) => tab.id),
  "tab ids should follow the approved CSS mastery flow"
);
assert.deepEqual(
  topic.tabs.map((tab) => tab.label),
  expectedTabs.map((tab) => tab.label),
  "tab labels should match the approved CSS mastery flow"
);
assert.equal(topic.sections.length, expectedTabs.length);
assert.deepEqual(
  topic.sections.map((section) => section.id),
  expectedTabs.map((tab) => tab.id),
  "section ids should match the approved CSS mastery flow"
);

assert.deepEqual(
  topic.heroStats,
  [
    { label: "Chapters", value: "14" },
    { label: "Interview", value: "Capstone Ready" },
    { label: "Coverage", value: "Standards+Modern CSS" },
    { label: "Updated", value: "2026" },
  ],
  "hero stats should reflect the new CSS topic framing"
);

const forbiddenLegacyIds = [
  "css-box",
  "css-selectors",
  "css-modern",
  "css-2025",
  "css-tricks",
  "css-arch",
  "hc-modern",
  "hc-a11y",
  "web-perf",
  "css-props",
  "css-cs",
  "css-iq",
];

const tabIds = topic.tabs.map((tab) => tab.id);
const sectionIds = topic.sections.map((section) => section.id);

for (const id of forbiddenLegacyIds) {
  assert.ok(!tabIds.includes(id), `legacy tab ${id} should be removed`);
  assert.ok(!sectionIds.includes(id), `legacy section ${id} should be removed`);
}

const finalSection = topic.sections.at(-1);
assert.equal(
  finalSection.id,
  "ecosystem-tradeoffs-debugging-architecture-interview-mastery"
);
assert.ok(Array.isArray(finalSection.qa), "final chapter should include a capstone interview bank");
assert.ok(finalSection.qa.length >= 12, "final chapter should keep a meaningful capstone Q&A bank");

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
  "the restructured CSS skeleton should not keep legacy cards"
);
