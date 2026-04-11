import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "oops.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const tabs = [
  ["what-oop-is-why-it-exists", "What OOP Is"],
  ["objects-classes-identity-state-behavior", "Objects & Classes"],
  ["encapsulation-abstraction", "Encapsulation"],
  ["inheritance-polymorphism-subtyping", "Inheritance & Polymorphism"],
  ["composition-over-inheritance", "Composition"],
  ["interfaces-contracts-api-design", "Interfaces & Contracts"],
  ["cohesion-coupling-responsibility-design", "Cohesion & Coupling"],
  ["solid-principles-real-tradeoffs", "SOLID Tradeoffs"],
  ["relationships-domain-modeling", "Domain Modeling"],
  ["patterns-reusable-design-moves", "Patterns"],
  ["testing-refactoring-debugging-oop-systems", "Testing & Refactoring"],
  ["performance-memory-runtime-tradeoffs", "Performance & Runtime"],
  ["oop-across-languages", "Across Languages"],
  ["interview-mastery-system-design-with-oop", "Interview Mastery"]
];

assert.equal(topic.id, "oops", "topic id should match the route slug");
assert.equal(topic.tabs.length, 14, "OOPS should expose 14 mastery chapters");
assert.equal(topic.sections.length, 14, "OOPS should expose 14 mastery sections");
assert.deepEqual(
  topic.tabs.map((tab) => [tab.id, tab.label]),
  tabs,
  "OOPS should follow the approved chapter sequence"
);
assert.deepEqual(
  topic.sections.map((section) => section.id),
  tabs.map(([id]) => id),
  "section ids should match the tab order"
);
assert.ok(Array.isArray(topic.heroStats) && topic.heroStats.length === 4, "OOPS should define 4 hero stats");

for (const section of topic.sections) {
  assert.ok(typeof section.intro === "string" && section.intro.trim().length > 0, `${section.id} should include an intro`);
  assert.ok(Array.isArray(section.blocks), `${section.id} should define blocks`);
  assert.ok(section.blocks.length >= 1, `${section.id} should have at least one content block`);
  assert.ok(!section.cards || section.cards.length === 0, `${section.id} should not use legacy cards`);
  assert.ok(Array.isArray(section.qa), `${section.id} should include Q&A`);
}

assert.ok(Array.isArray(topic.sections.at(-1).qa), "final OOPS chapter should include capstone Q&A");
