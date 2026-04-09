import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "react.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter1 = sectionById.get("react-origins-mental-model");
const chapter2 = sectionById.get("jsx-elements-render-tree");
const chapter3 = sectionById.get("components-props-composition");
const chapter4 = sectionById.get("rendering-commit-state-snapshot");

for (const [index, chapter] of [chapter1, chapter2, chapter3, chapter4].entries()) {
  assert.ok(chapter, `chapter ${index + 1} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 1} should contain a substantial block set`
  );
}

const chapter1Titles = chapter1.blocks.map((block) => block.title ?? "");
assert.ok(chapter1Titles.includes("What React Actually Is"));
assert.ok(chapter1Titles.includes("React core vs framework vs ecosystem"));
assert.ok(chapter1Titles.includes("How a React screen starts existing"));

const chapter2Titles = chapter2.blocks.map((block) => block.title ?? "");
assert.ok(chapter2Titles.includes("JSX creates React elements, not DOM nodes"));
assert.ok(chapter2Titles.includes("Component vs element vs DOM node"));
assert.ok(chapter2Titles.includes("Index key bugs are state bugs, not just performance bugs"));

const chapter3Titles = chapter3.blocks.map((block) => block.title ?? "");
assert.ok(chapter3Titles.includes("Components are UI functions with explicit inputs"));
assert.ok(chapter3Titles.includes("Composition vs inheritance vs prop soup"));
assert.ok(chapter3Titles.includes("Drill: redesign the API"));

const chapter4Titles = chapter4.blocks.map((block) => block.title ?? "");
assert.ok(chapter4Titles.includes("Render phase, commit phase, and state snapshots"));
assert.ok(chapter4Titles.includes("Render vs commit vs effect"));
assert.ok(chapter4Titles.includes("Trap: logging state right after the setter"));

assert.ok(
  [chapter1, chapter2, chapter3, chapter4].every((chapter) =>
    chapter.blocks.some((block) => block.type === "drill")
  ),
  "chapters 1 through 4 should each include a drill block"
);

assert.ok(
  [chapter1, chapter2, chapter3, chapter4].every((chapter) =>
    chapter.blocks.some((block) => block.type === "trap")
  ),
  "chapters 1 through 4 should each include a trap block"
);
