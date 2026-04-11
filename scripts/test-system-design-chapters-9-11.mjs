import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "system-design.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter9 = sectionById.get("databases-storage-models-indexing-search");
const chapter10 = sectionById.get("asynchronous-work-queues-jobs-workflow-design");
const chapter11 = sectionById.get("reliability-resilience-failure-management");

for (const [index, chapter] of [chapter9, chapter10, chapter11].entries()) {
  assert.ok(chapter, `chapter ${index + 9} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 9} should contain a substantial block set`
  );
  assert.ok(
    Array.isArray(chapter.qa) && chapter.qa.length >= 4,
    `chapter ${index + 9} should include chapter-level interview questions`
  );
}

const chapter9Titles = chapter9.blocks.map((block) => block.title ?? "");
assert.ok(chapter9Titles.includes("Storage choices should follow access patterns"));
assert.ok(chapter9Titles.includes("SQL vs document vs key-value vs search index"));
assert.ok(chapter9Titles.includes("How reads and writes scale differently"));
assert.ok(chapter9Titles.includes("Drill: choose the storage model"));

const chapter10Titles = chapter10.blocks.map((block) => block.title ?? "");
assert.ok(chapter10Titles.includes("Async systems protect the request path"));
assert.ok(chapter10Titles.includes("Queue vs stream vs workflow engine"));
assert.ok(chapter10Titles.includes("How a job moves through the system"));
assert.ok(chapter10Titles.includes("Drill: move the right work off the request path"));

const chapter11Titles = chapter11.blocks.map((block) => block.title ?? "");
assert.ok(chapter11Titles.includes("Failure handling is architecture, not cleanup"));
assert.ok(chapter11Titles.includes("Timeouts vs retries vs circuit breakers vs bulkheads"));
assert.ok(chapter11Titles.includes("How cascading failures happen"));
assert.ok(chapter11Titles.includes("Drill: stop the cascade"));

assert.ok(
  [chapter9, chapter10, chapter11].every((chapter) =>
    chapter.blocks.some((block) => block.type === "drill")
  ),
  "chapters 9 through 11 should each include a drill block"
);

assert.ok(
  [chapter9, chapter10, chapter11].every((chapter) =>
    chapter.blocks.some((block) => block.type === "trap")
  ),
  "chapters 9 through 11 should each include a trap block"
);

assert.ok(
  [chapter9, chapter10, chapter11].every((chapter) =>
    chapter.blocks.some((block) => block.type === "compare")
  ),
  "chapters 9 through 11 should each include a compare block"
);

assert.ok(
  [chapter9, chapter10, chapter11].every((chapter) =>
    chapter.blocks.some((block) => block.type === "mechanics")
  ),
  "chapters 9 through 11 should each include a mechanics block"
);

assert.ok(
  [chapter9, chapter10, chapter11].every((chapter) =>
    chapter.blocks.some((block) => block.type === "recap")
  ),
  "chapters 9 through 11 should each include a recap block"
);

assert.ok(
  [chapter10].every((chapter) => chapter.blocks.some((block) => block.type === "code")),
  "the asynchronous workflow chapter should include a concrete code example"
);
