import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "javascript.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const expectedTabs = [
  { id: "origins-ecmascript-runtimes", label: "Origins & Runtimes" },
  { id: "values-types-identity", label: "Values, Types & Identity" },
  { id: "variables-scope-closures", label: "Scope & Closures" },
  { id: "functions-invocation-mechanics", label: "Functions & Invocation" },
  { id: "objects-prototypes-classes", label: "Objects, Prototypes & Classes" },
  { id: "arrays-collections-iteration", label: "Collections & Iteration" },
  { id: "modules-tooling-project-structure", label: "Modules & Tooling" },
  { id: "asynchrony-event-loop", label: "Asynchrony & Event Loop" },
  { id: "browser-apis-dom-platform", label: "Browser APIs & DOM" },
  { id: "error-handling-defensive-coding", label: "Errors & Defensive Coding" },
  { id: "performance-memory", label: "Performance & Memory" },
  { id: "security-reliability", label: "Security & Reliability" },
  { id: "architecture-large-scale-javascript", label: "Architecture at Scale" },
  { id: "mastery-interview-readiness", label: "Mastery & Interviews" },
];

assert.equal(topic.id, "javascript");
assert.deepEqual(topic.tabs, expectedTabs);
assert.equal(topic.sections.length, expectedTabs.length);
assert.deepEqual(
  topic.sections.map((section) => section.id),
  expectedTabs.map((tab) => tab.id)
);

assert.ok(Array.isArray(topic.heroStats), "heroStats should be defined");
assert.equal(topic.heroStats.length, 4, "heroStats should expose the 4-card hero summary");
assert.deepEqual(
  topic.heroStats.find((stat) => stat.label === "Chapters"),
  { label: "Chapters", value: "14" }
);
assert.deepEqual(
  topic.heroStats.find((stat) => stat.label === "Core Q&A"),
  { label: "Core Q&A", value: "194" }
);
assert.deepEqual(
  topic.heroStats.find((stat) => stat.label === "Updated"),
  { label: "Updated", value: "2026" }
);

assert.ok(
  topic.sections.every((section) => Array.isArray(section.blocks) && section.blocks.length === 0),
  "Task 5 should leave each section with an explicitly empty blocks array"
);
assert.ok(
  topic.sections.every((section) => !section.cards || section.cards.length === 0),
  "Task 5 should not carry forward legacy cards into the new skeleton"
);

const sectionsWithQA = topic.sections.filter((section) => (section.qa?.length ?? 0) > 0);

assert.deepEqual(
  sectionsWithQA.map((section) => section.id),
  ["mastery-interview-readiness"]
);
assert.equal(sectionsWithQA[0].qa.length, 194);

assert.ok(topic.tabs.every((tab) => !/TypeScript/i.test(tab.label)));
assert.ok(topic.tabs.every((tab) => !/Cheat Sheet/i.test(tab.label)));
