import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "uxui.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter12 = sectionById.get("critique-heuristics-measuring-design-quality");
const chapter13 = sectionById.get("collaboration-handoff-tooling-production-workflows");
const chapter14 = sectionById.get("ui-ux-architecture-system-thinking-interview-mastery");

for (const [index, chapter] of [chapter12, chapter13, chapter14].entries()) {
  assert.ok(chapter, `chapter ${index + 12} should exist`);
  assert.ok(chapter.blocks.length >= 6, `chapter ${index + 12} should contain a substantial block set`);
}

assert.ok(Array.isArray(chapter12.qa) && chapter12.qa.length >= 4);
assert.ok(Array.isArray(chapter13.qa) && chapter13.qa.length >= 4);
assert.ok(Array.isArray(chapter14.qa) && chapter14.qa.length >= 60);

const chapter12Text = chapter12.blocks.map((block) => block.title ?? block.html ?? "").join(" ");
const chapter13Text = chapter13.blocks.map((block) => block.title ?? block.html ?? "").join(" ");
const chapter14Text = chapter14.blocks.map((block) => block.title ?? block.html ?? "").join(" ");

assert.match(chapter12Text, /critique|heuristics|measure|quality|usability|evidence/i);
assert.match(chapter13Text, /collaboration|handoff|figma|story|developer|workflow|delivery/i);
assert.match(chapter14Text, /architecture|system thinking|tradeoff|portfolio|interview|whiteboard/i);

assert.ok(chapter12.blocks.some((block) => block.type === "drill"));
assert.ok(chapter13.blocks.some((block) => block.type === "drill"));
assert.ok(chapter14.blocks.some((block) => block.type === "drill"));

assert.ok(chapter12.blocks.some((block) => block.type === "trap"));
assert.ok(chapter13.blocks.some((block) => block.type === "trap"));
assert.ok(chapter14.blocks.some((block) => block.type === "trap"));
