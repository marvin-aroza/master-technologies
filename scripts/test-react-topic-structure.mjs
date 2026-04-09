import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "react.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const expectedTabs = [
  "react-origins-mental-model",
  "jsx-elements-render-tree",
  "components-props-composition",
  "rendering-commit-state-snapshot",
  "state-ownership-preserving-resetting",
  "events-effects-escape-hatches",
  "refs-dom-imperative-apis",
  "context-reducers-external-stores",
  "async-ui-suspense-data-boundaries",
  "forms-actions-optimistic-mutations",
  "performance-compiler-render-tradeoffs",
  "server-components-directives-boundaries",
  "testing-accessibility-reliability",
  "architecture-ecosystem-interview-mastery"
];

assert.equal(topic.id, "react");
assert.equal(topic.tabs.length, 14, "react topic should expose 14 mastery chapters");
assert.deepEqual(
  topic.tabs.map((tab) => tab.id),
  expectedTabs,
  "react tabs should follow the approved mastery flow"
);
assert.deepEqual(
  topic.heroStats,
  [
    { label: "Chapters", value: "14" },
    { label: "Core Q&A", value: "104" },
    { label: "Coverage", value: "Core+Ecosystem" },
    { label: "Updated", value: "2026" }
  ],
  "hero stats should reflect the new React topic"
);

const sectionIds = topic.sections.map((section) => section.id);
assert.deepEqual(sectionIds, expectedTabs, "section ids should match tab ids");

const forbiddenLegacyIds = [
  "r-fundamentals",
  "r-hooks",
  "r-state",
  "react-state",
  "r-perf",
  "r-patterns",
  "react-patterns",
  "react-forms",
  "react-styling-forms",
  "react-testing",
  "react-testing-routing",
  "r-19",
  "react-19",
  "rcs",
  "iq-react"
];

for (const id of forbiddenLegacyIds) {
  assert.ok(!sectionIds.includes(id), `legacy section ${id} should be removed`);
}

const finalSection = topic.sections.at(-1);
assert.equal(finalSection.id, "architecture-ecosystem-interview-mastery");
assert.ok(Array.isArray(finalSection.qa), "final chapter should include interview Q&A");
assert.equal(finalSection.qa.length, 52, "final chapter should ship with a very large mastery Q&A bank");

for (const section of topic.sections) {
  assert.ok(
    Array.isArray(section.blocks) && section.blocks.length >= 1,
    `${section.id} should remain navigable with at least one learning block`
  );
}
