import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "css.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const chapters = topic.sections.slice(4, 8);

assert.equal(chapters.length, 4, "css mastery batch should include chapters 5-8");

assert.deepEqual(
  chapters.map((section) => section.id),
  [
    "flexbox-one-dimensional-layout",
    "grid-subgrid-two-dimensional-layout",
    "responsive-css-media-queries-logical-properties-container-queries",
    "typography-color-backgrounds-effects-visual-styling",
  ],
  "chapters 5-8 should stay in the approved CSS mastery order"
);

for (const section of chapters) {
  assert.ok(section.blocks.length >= 4, `${section.id} should be expanded beyond a scaffold`);
  assert.ok(Array.isArray(section.qa), `${section.id} should include chapter-specific Q&A`);
  assert.ok(section.qa.length >= 4, `${section.id} should include a useful Q&A bank`);
  assert.ok(
    section.blocks.every((block) => block.type !== "scaffold"),
    `${section.id} should no longer be scaffolded`
  );
}

const chapter5Text = chapters[0].blocks.map((block) => block.title ?? block.html ?? block.body ?? "").join(" ");
const chapter6Text = chapters[1].blocks.map((block) => block.title ?? block.html ?? block.body ?? "").join(" ");
const chapter7Text = chapters[2].blocks.map((block) => block.title ?? block.html ?? block.body ?? "").join(" ");
const chapter8Text = chapters[3].blocks.map((block) => block.title ?? block.html ?? block.body ?? "").join(" ");

assert.match(
  chapter5Text,
  /flex|main axis|cross axis|flex-basis|grow|shrink|align/i,
  "chapter 5 should explain flex sizing and alignment mechanics"
);
assert.match(
  chapter6Text,
  /grid|track|auto-fill|auto-fit|subgrid|auto-place|placement/i,
  "chapter 6 should explain grid track sizing, placement, and subgrid"
);
assert.match(
  chapter7Text,
  /media query|container query|logical property|writing mode|responsive/i,
  "chapter 7 should explain responsive CSS, logical properties, and container queries"
);
assert.match(
  chapter8Text,
  /typography|color|oklch|gradient|shadow|background|effect|visual/i,
  "chapter 8 should cover typography, color, backgrounds, effects, and visual styling"
);
