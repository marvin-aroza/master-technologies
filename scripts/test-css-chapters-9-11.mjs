import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "css.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const chapters = topic.sections.slice(8, 11);

assert.equal(chapters.length, 3, "css mastery batch should include chapters 9-11");
assert.deepEqual(
  chapters.map((section) => section.id),
  [
    "transforms-transitions-animations-motion-systems",
    "modern-css-architecture-resets-tokens-scalable-design-systems",
    "performance-rendering-cost-browser-optimization",
  ],
  "chapters 9-11 should stay in the approved CSS mastery order"
);

for (const section of chapters) {
  assert.ok(section.blocks.length >= 6, `${section.id} should contain a substantial block set`);
  assert.ok(Array.isArray(section.qa), `${section.id} should include chapter-specific Q&A`);
  assert.ok(section.qa.length >= 4, `${section.id} should include a useful Q&A bank`);
  assert.ok(
    section.blocks.every((block) => block.type !== "scaffold"),
    `${section.id} should no longer be scaffolded`
  );
}

const chapter9Text = chapters[0].blocks.map((block) => block.title ?? block.html ?? block.body ?? "").join(" ");
const chapter10Text = chapters[1].blocks.map((block) => block.title ?? block.html ?? block.body ?? "").join(" ");
const chapter11Text = chapters[2].blocks.map((block) => block.title ?? block.html ?? block.body ?? "").join(" ");

assert.match(
  chapter9Text,
  /transform|transition|keyframe|view transition|scroll-driven animation/i,
  "chapter 9 should cover motion primitives and modern animation systems"
);
assert.match(
  chapter10Text,
  /reset|token|naming|composition|architecture|scalable/i,
  "chapter 10 should cover scalable CSS architecture"
);
assert.match(
  chapter11Text,
  /style|layout|paint|composite|containment|content-visibility|optimization/i,
  "chapter 11 should cover rendering cost and optimization"
);

for (const chapter of chapters) {
  const qas = chapter.qa.map((item) => item.question).join(" ");
  assert.match(qas, /what|why|how/i, `${chapter.id} should have chapter-level Q&A`);
}
