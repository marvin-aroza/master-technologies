import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "css.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const chapters = topic.sections.slice(0, 4);

assert.equal(chapters.length, 4, "css foundation batch should include chapters 1-4");

const requiredChapterIds = [
  "origins-cascade-browser-styling-pipeline",
  "selectors-combinators-pseudo-classes-pseudo-elements",
  "specificity-inheritance-custom-properties-layers-scope",
  "box-model-sizing-overflow-positioning",
];

assert.deepEqual(
  chapters.map((section) => section.id),
  requiredChapterIds,
  "chapters 1-4 should stay in the approved CSS foundation order"
);

for (const section of chapters) {
  assert.ok(section.blocks.length >= 4, `${section.id} should have a meaningful block count`);
  assert.ok(Array.isArray(section.qa), `${section.id} should include chapter-specific Q&A`);
  assert.ok(section.qa.length >= 4, `${section.id} should include a useful Q&A bank`);
  assert.ok(
    section.blocks.every((block) => block.type !== "scaffold"),
    `${section.id} should no longer be scaffolded`
  );
}

const batchTypes = new Set(chapters.flatMap((section) => section.blocks.map((block) => block.type)));
for (const type of ["compare", "mechanics", "drill", "recap"]) {
  assert.ok(batchTypes.has(type), `chapters 1-4 should include at least one ${type} block`);
}

const chapter1Text = chapters[0].blocks.map((block) => block.title ?? block.html ?? block.body ?? "").join(" ");
const chapter2Text = chapters[1].blocks.map((block) => block.title ?? block.html ?? block.body ?? "").join(" ");
const chapter3Text = chapters[2].blocks.map((block) => block.title ?? block.html ?? block.body ?? "").join(" ");
const chapter4Text = chapters[3].blocks.map((block) => block.title ?? block.html ?? block.body ?? "").join(" ");

assert.match(
  chapter1Text,
  /browser styling pipeline|cascade/i,
  "chapter 1 should cover the browser styling pipeline and cascade"
);
assert.match(
  chapter2Text,
  /selectors|pseudo/i,
  "chapter 2 should cover selectors, combinators, and pseudo selectors"
);
assert.match(
  chapter3Text,
  /specificity|inheritance|custom properties|layers|scope/i,
  "chapter 3 should cover specificity, inheritance, custom properties, layers, and scope"
);
assert.match(
  chapter4Text,
  /box model|sizing|overflow|positioning/i,
  "chapter 4 should cover the box model, sizing, overflow, and positioning"
);
