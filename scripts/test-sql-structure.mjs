import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "sql.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const tabs = [
  ["what-sql-is-relational-data-works", "SQL Foundations"],
  ["select-filtering-sorting-shaping-results", "SELECT & Filtering"],
  ["joins-multi-table-reasoning", "Joins"],
  ["aggregation-grouping-reporting-queries", "Aggregation & Reporting"],
  ["subqueries-ctes-query-composition", "Subqueries & CTEs"],
  ["window-functions-analytical-sql", "Window Functions"],
  ["insert-update-delete-data-modification-patterns", "Data Modification"],
  ["transactions-consistency-concurrency-basics", "Transactions"],
  ["schema-design-constraints-data-integrity", "Schema & Integrity"],
  ["indexes-query-performance-execution-behavior", "Indexes & Performance"],
  ["real-world-query-patterns-business-systems", "Business Query Patterns"],
  ["sql-across-engines-dialect-differences", "Dialects"],
  ["debugging-refactoring-safe-production-sql", "Debugging & Safety"],
  ["interview-mastery-query-problem-solving", "Interview Mastery"]
];

assert.equal(topic.id, "sql", "topic id should match the route slug");
assert.equal(topic.tabs.length, 14, "SQL should expose 14 mastery chapters");
assert.equal(topic.sections.length, 14, "SQL should expose 14 mastery sections");
assert.deepEqual(
  topic.tabs.map((tab) => [tab.id, tab.label]),
  tabs,
  "SQL should follow the approved chapter sequence"
);
assert.deepEqual(
  topic.sections.map((section) => section.id),
  tabs.map(([id]) => id),
  "section ids should match the tab order"
);
assert.ok(Array.isArray(topic.heroStats) && topic.heroStats.length === 4, "SQL should define 4 hero stats");

for (const section of topic.sections) {
  assert.ok(typeof section.intro === "string" && section.intro.trim().length > 0, `${section.id} should include an intro`);
  assert.ok(Array.isArray(section.blocks), `${section.id} should define blocks`);
  assert.ok(section.blocks.length >= 1, `${section.id} should have at least one content block`);
  assert.ok(!section.cards || section.cards.length === 0, `${section.id} should not use legacy cards`);
  assert.ok(Array.isArray(section.qa), `${section.id} should include Q&A`);
}

assert.ok(Array.isArray(topic.sections.at(-1).qa), "final SQL chapter should include capstone Q&A");
