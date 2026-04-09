import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "html.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter5 = sectionById.get("lists-tables-data-markup");
const chapter6 = sectionById.get("media-embeds-responsive-asset-markup");
const chapter7 = sectionById.get("forms-controls-validation-submission");
const chapter8 = sectionById.get("interactive-html-dialog-popover-templates");

for (const [index, chapter] of [chapter5, chapter6, chapter7, chapter8].entries()) {
  assert.ok(chapter, `chapter ${index + 5} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 5} should contain a substantial block set`
  );
  assert.ok(Array.isArray(chapter.qa) && chapter.qa.length >= 3, `chapter ${index + 5} should include chapter-level Q&A`);
}

const chapter5Titles = chapter5.blocks.map((block) => block.title ?? "");
assert.ok(chapter5Titles.includes("Lists and tables express relationships"));
assert.ok(chapter5Titles.includes("When a table is correct and when it is abuse"));
assert.ok(chapter5Titles.includes("Drill: audit the table markup"));

const chapter6Titles = chapter6.blocks.map((block) => block.title ?? "");
assert.ok(chapter6Titles.includes("Media markup is a loading strategy"));
assert.ok(chapter6Titles.includes("`img` vs `picture` vs `figure`"));
assert.ok(chapter6Titles.includes("How the browser chooses an image candidate"));
assert.ok(chapter6Titles.includes("Drill: pick the responsive image strategy"));

const chapter7Titles = chapter7.blocks.map((block) => block.title ?? "");
assert.ok(chapter7Titles.includes("Forms are a native browser system"));
assert.ok(chapter7Titles.includes("How form submission and constraint validation work"));
assert.ok(chapter7Titles.includes("Trap: custom UI that breaks native semantics"));
assert.ok(chapter7Titles.includes("Drill: fix the broken form"));

const chapter8Titles = chapter8.blocks.map((block) => block.title ?? "");
assert.ok(chapter8Titles.includes("Native interactive HTML is worth using"));
assert.ok(chapter8Titles.includes("`details` vs `dialog` vs `popover`"));
assert.ok(chapter8Titles.includes("Top layer, focus, and dismissal behavior"));
assert.ok(chapter8Titles.includes("Drill: choose the right primitive"));

assert.ok(
  [chapter5, chapter6, chapter7, chapter8].every((chapter) =>
    chapter.blocks.some((block) => block.type === "drill")
  ),
  "chapters 5 through 8 should each include a drill block"
);

assert.ok(
  [chapter5, chapter6, chapter7, chapter8].every((chapter) =>
    chapter.blocks.some((block) => block.type === "trap")
  ),
  "chapters 5 through 8 should each include a trap block"
);
