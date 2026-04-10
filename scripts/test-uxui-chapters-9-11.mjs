import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "uxui.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));
const chapters = [
  sectionById.get("forms-input-ux-conversion-critical-interfaces"),
  sectionById.get("design-systems-tokens-components-governance"),
  sectionById.get("motion-micro-interactions-perceived-performance"),
];

for (const [index, chapter] of chapters.entries()) {
  assert.ok(chapter, `chapter ${index + 9} should exist`);
  assert.ok(chapter.blocks.length >= 6, `chapter ${index + 9} should contain a substantial block set`);
  assert.ok(Array.isArray(chapter.qa) && chapter.qa.length >= 4, `chapter ${index + 9} should include chapter-level Q&A`);
}

const batchText = chapters
  .flatMap((chapter) => chapter.blocks)
  .map((block) => block.title ?? block.html ?? "")
  .join(" ");

assert.match(batchText, /forms|validation|error recovery|conversion|field/i);
assert.match(batchText, /design systems|tokens|governance|components|variant/i);
assert.match(batchText, /motion|micro-interactions|perceived performance|animation|duration/i);

assert.ok(chapters.some((chapter) => chapter.blocks.some((block) => block.type === "code")));
assert.ok(chapters.some((chapter) => chapter.blocks.some((block) => block.type === "drill")));
assert.ok(chapters.some((chapter) => chapter.blocks.some((block) => block.type === "trap")));
