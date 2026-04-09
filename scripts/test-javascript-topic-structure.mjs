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
const coreQaStat = topic.heroStats.find((stat) => stat.label === "Core Q&A");

assert.deepEqual(
  sectionsWithQA.map((section) => section.id),
  ["mastery-interview-readiness"]
);
assert.ok(coreQaStat, "heroStats should include the Core Q&A summary");
assert.equal(coreQaStat.value, String(sectionsWithQA[0].qa.length));

const tsHeavyPatterns = [
  /\bTypeScript\b/i,
  /\bTS\b/,
  /\bimplicit and explicit typing\b/i,
  /\b"any" type\b/i,
  /\b"unknown" type\b/i,
  /\b"void" vs "never" type\b/i,
  /\bInterface\b/i,
  /\bType Alias\b/i,
  /\bTuple\b/i,
  /\bEnum\b/i,
  /\bGenerics\b/i,
  /\bType Guard\b/i,
  /\bType Predicate\b/i,
  /\bIntersection vs Union\b/i,
  /\bUtility Types\b/i,
  /\btypeof \(in TS type context\)\b/i,
  /\bDeclaration Merging\b/i,
  /\bRecursive Types\b/i,
  /\bsatisfies\b/i,
  /\bAssertion Functions\b/i,
  /\bCovariance\b.*\bContravariance\b/i,
  /\bMapped Type Remapping\b/i,
  /`private` keyword in TS/i,
];

const tsHeavyQuestions = sectionsWithQA[0].qa.filter((item) =>
  tsHeavyPatterns.some((pattern) => pattern.test(item.question))
);

assert.deepEqual(
  tsHeavyQuestions.map((item) => item.question),
  [],
  "The JavaScript interview bank should not keep the TypeScript-heavy legacy Q&A cluster"
);

assert.ok(topic.tabs.every((tab) => !/TypeScript/i.test(tab.label)));
assert.ok(topic.tabs.every((tab) => !/Cheat Sheet/i.test(tab.label)));
