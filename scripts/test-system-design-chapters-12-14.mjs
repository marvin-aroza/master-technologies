import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "system-design.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter12 = sectionById.get("observability-testing-rollouts-operations");
const chapter13 = sectionById.get("global-scale-consistency-distributed-systems-tradeoffs");
const chapter14 = sectionById.get("architecture-case-studies-interview-mastery");

for (const [index, chapter] of [chapter12, chapter13, chapter14].entries()) {
  assert.ok(chapter, `chapter ${index + 12} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 12} should contain a substantial block set`
  );
}

assert.ok(Array.isArray(chapter12.qa) && chapter12.qa.length >= 4);
assert.ok(Array.isArray(chapter13.qa) && chapter13.qa.length >= 4);
assert.ok(Array.isArray(chapter14.qa) && chapter14.qa.length >= 50);

const chapter12Titles = chapter12.blocks.map((block) => block.title ?? "");
assert.ok(chapter12Titles.includes("Systems are only as operable as they are observable"));
assert.ok(chapter12Titles.includes("Logs vs metrics vs traces vs profiles"));
assert.ok(chapter12Titles.includes("How a safe rollout works"));
assert.ok(chapter12Titles.includes("Drill: design the rollout plan"));

const chapter13Titles = chapter13.blocks.map((block) => block.title ?? "");
assert.ok(chapter13Titles.includes("Global scale is a latency and consistency negotiation"));
assert.ok(chapter13Titles.includes("Strong consistency vs eventual consistency vs session guarantees"));
assert.ok(chapter13Titles.includes("How a multi-region write travels"));
assert.ok(chapter13Titles.includes("Drill: choose the replication model"));

const chapter14Titles = chapter14.blocks.map((block) => block.title ?? "");
assert.ok(chapter14Titles.includes("Case studies reward tradeoff reasoning"));
assert.ok(chapter14Titles.includes("Feed vs chat vs commerce vs analytics"));
assert.ok(chapter14Titles.includes("How to drive a system design interview"));
assert.ok(chapter14Titles.includes("Drill: decompose the product"));

assert.ok(
  [chapter12, chapter13, chapter14].every((chapter) =>
    chapter.blocks.some((block) => block.type === "drill")
  ),
  "chapters 12 through 14 should each include a drill block"
);

assert.ok(
  [chapter12, chapter13, chapter14].every((chapter) =>
    chapter.blocks.some((block) => block.type === "trap")
  ),
  "chapters 12 through 14 should each include a trap block"
);

assert.ok(
  [chapter12, chapter13, chapter14].every((chapter) =>
    chapter.blocks.some((block) => block.type === "compare")
  ),
  "chapters 12 through 14 should each include a compare block"
);

assert.ok(
  [chapter12, chapter13, chapter14].every((chapter) =>
    chapter.blocks.some((block) => block.type === "mechanics")
  ),
  "chapters 12 through 14 should each include a mechanics block"
);

assert.ok(
  [chapter12, chapter13, chapter14].every((chapter) =>
    chapter.blocks.some((block) => block.type === "recap")
  ),
  "chapters 12 through 14 should each include a recap block"
);

assert.ok(
  [chapter12].every((chapter) => chapter.blocks.some((block) => block.type === "code")),
  "the observability and rollout chapter should include a concrete code example"
);
