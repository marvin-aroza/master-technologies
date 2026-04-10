import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "uxui.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));
const chapters = [
  sectionById.get("origins-product-thinking-role-design"),
  sectionById.get("human-perception-attention-cognitive-load"),
  sectionById.get("user-research-discovery-problem-framing"),
  sectionById.get("information-architecture-navigation-user-flows"),
];

for (const [index, chapter] of chapters.entries()) {
  assert.ok(chapter, `chapter ${index + 1} should exist`);
  assert.ok(chapter.blocks.length >= 6, `chapter ${index + 1} should contain a substantial block set`);
  assert.ok(Array.isArray(chapter.qa) && chapter.qa.length >= 4, `chapter ${index + 1} should include chapter-level Q&A`);
}

const batchText = chapters
  .flatMap((chapter) => chapter.blocks)
  .map((block) => block.title ?? block.html ?? "")
  .join(" ");

assert.match(batchText, /product thinking|business|outcome|design role/i);
assert.match(batchText, /perception|attention|cognitive load|mental model|gestalt/i);
assert.match(batchText, /research|discovery|problem framing|interview|evidence/i);
assert.match(batchText, /information architecture|navigation|user flow|task flow|taxonomy/i);

assert.ok(chapters.some((chapter) => chapter.blocks.some((block) => block.type === "compare")));
assert.ok(chapters.some((chapter) => chapter.blocks.some((block) => block.type === "mechanics")));
assert.ok(chapters.some((chapter) => chapter.blocks.some((block) => block.type === "drill")));
assert.ok(chapters.some((chapter) => chapter.blocks.some((block) => block.type === "recap")));
