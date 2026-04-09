import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "html.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter9 = sectionById.get("custom-data-attributes-dom-hooks-integration");
const chapter10 = sectionById.get("architecture-anti-patterns-browser-quirks-interview-traps");
const chapter11 = sectionById.get("seo-search-facing-markup");

for (const [index, chapter] of [chapter9, chapter10, chapter11].entries()) {
  assert.ok(chapter, `chapter ${index + 9} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 9} should contain a substantial block set`
  );
  assert.ok(Array.isArray(chapter.qa) && chapter.qa.length >= 3, `chapter ${index + 9} should include chapter-level Q&A`);
}

const chapter9Titles = chapter9.blocks.map((block) => block.title ?? "");
assert.ok(chapter9Titles.includes("Data attributes are integration points, not a dumping ground"));
assert.ok(chapter9Titles.includes("`data-*` vs ARIA vs microdata"));
assert.ok(chapter9Titles.includes("How attributes become DOM hooks"));
assert.ok(chapter9Titles.includes("Drill: choose the right attribute strategy"));

const chapter10Titles = chapter10.blocks.map((block) => block.title ?? "");
assert.ok(chapter10Titles.includes("HTML architecture fails quietly"));
assert.ok(chapter10Titles.includes("Common anti-patterns and false semantics"));
assert.ok(chapter10Titles.includes("Editing, embedding, and cross-origin traps"));
assert.ok(chapter10Titles.includes("Drill: audit the markup architecture"));

const chapter11Titles = chapter11.blocks.map((block) => block.title ?? "");
assert.ok(chapter11Titles.includes("SEO starts with crawlable HTML"));
assert.ok(chapter11Titles.includes("Canonical, robots, and metadata signals"));
assert.ok(chapter11Titles.includes("Structured data is a hint, not a cheat code"));
assert.ok(chapter11Titles.includes("Drill: repair the search signals"));

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
