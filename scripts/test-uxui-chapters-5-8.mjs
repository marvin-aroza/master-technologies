import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "uxui.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));
const chapters = [
  sectionById.get("interaction-design-feedback-state-design"),
  sectionById.get("visual-hierarchy-layout-composition"),
  sectionById.get("typography-color-iconography-visual-language"),
  sectionById.get("responsive-design-accessibility-inclusive-ux"),
];

for (const [index, chapter] of chapters.entries()) {
  assert.ok(chapter, `chapter ${index + 5} should exist`);
  assert.ok(chapter.blocks.length >= 6, `chapter ${index + 5} should contain a substantial block set`);
  assert.ok(Array.isArray(chapter.qa) && chapter.qa.length >= 4, `chapter ${index + 5} should include chapter-level Q&A`);
}

const batchText = chapters
  .flatMap((chapter) => chapter.blocks)
  .map((block) => block.title ?? block.html ?? "")
  .join(" ");

assert.match(batchText, /interaction|feedback|state|loading|empty|error|success/i);
assert.match(batchText, /hierarchy|layout|composition|scan|spacing|balance/i);
assert.match(batchText, /typography|color|iconography|visual language|contrast/i);
assert.match(batchText, /responsive|accessibility|inclusive|wcag|focus|keyboard/i);

assert.ok(chapters.some((chapter) => chapter.blocks.some((block) => block.type === "compare")));
assert.ok(chapters.some((chapter) => chapter.blocks.some((block) => block.type === "trap")));
assert.ok(chapters.some((chapter) => chapter.blocks.some((block) => block.type === "drill")));
assert.ok(chapters.some((chapter) => chapter.blocks.some((block) => block.type === "recap")));
