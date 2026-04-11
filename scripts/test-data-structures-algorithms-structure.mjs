import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "data-structures-algorithms.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const tabs = [
  ["algorithmic-thinking-foundations", "Algorithmic Thinking"],
  ["memory-models-arrays-strings", "Arrays & Strings"],
  ["linked-structures-stacks-queues", "Linked Structures"],
  ["hashing-sets-maps", "Hashing & Maps"],
  ["recursion-backtracking-divide-conquer", "Recursion & Backtracking"],
  ["sorting-searching", "Sorting & Searching"],
  ["trees-binary-search-trees", "Trees & BSTs"],
  ["heaps-priority-queues-selection", "Heaps & Selection"],
  ["graphs-traversal", "Graphs & Traversal"],
  ["greedy-algorithms-interval-reasoning", "Greedy & Intervals"],
  ["dynamic-programming", "Dynamic Programming"],
  ["advanced-structures-algorithm-design-tradeoffs", "Advanced Structures"],
  ["implementation-debugging-real-world-performance", "Implementation & Debugging"],
  ["interview-mastery-pattern-synthesis", "Interview Mastery"],
];

assert.equal(topic.id, "data-structures-algorithms", "topic id should match the route slug");
assert.equal(topic.tabs.length, 14, "DSA should expose 14 mastery chapters");
assert.equal(topic.sections.length, 14, "DSA should expose 14 mastery sections");
assert.deepEqual(
  topic.tabs.map((tab) => [tab.id, tab.label]),
  tabs,
  "DSA should follow the approved chapter sequence"
);
assert.deepEqual(
  topic.sections.map((section) => section.id),
  tabs.map(([id]) => id),
  "section ids should match the tab order"
);
assert.ok(Array.isArray(topic.heroStats) && topic.heroStats.length === 4, "DSA should define 4 hero stats");

for (const section of topic.sections) {
  assert.ok(typeof section.intro === "string" && section.intro.trim().length > 0, `${section.id} should include an intro`);
  assert.ok(Array.isArray(section.blocks), `${section.id} should define blocks`);
  assert.ok(section.blocks.length >= 1, `${section.id} should have at least one content block`);
  assert.ok(!section.cards || section.cards.length === 0, `${section.id} should not use legacy cards`);
  assert.ok(Array.isArray(section.qa), `${section.id} should include Q&A`);
}

assert.ok(Array.isArray(topic.sections.at(-1).qa), "final DSA chapter should include capstone Q&A");
