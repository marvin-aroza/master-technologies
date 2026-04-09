import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "html.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter12 = sectionById.get("accessibility-semantics-aria-form-accessibility");
const chapter13 = sectionById.get("performance-resource-loading");
const chapter14 = sectionById.get("native-browser-apis-platform-features-interview-mastery");

for (const [index, chapter] of [chapter12, chapter13, chapter14].entries()) {
  assert.ok(chapter, `chapter ${index + 12} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 12} should contain a substantial block set`
  );
}

assert.ok(Array.isArray(chapter12.qa) && chapter12.qa.length >= 3, "chapter 12 should include chapter-level Q&A");
assert.ok(Array.isArray(chapter13.qa) && chapter13.qa.length >= 3, "chapter 13 should include chapter-level Q&A");
assert.ok(Array.isArray(chapter14.qa) && chapter14.qa.length >= 100, "chapter 14 should keep a large capstone interview bank");

const chapter12Titles = chapter12.blocks.map((block) => block.title ?? "");
assert.ok(chapter12Titles.includes("Accessibility starts with semantics"));
assert.ok(chapter12Titles.includes("`aria-label` vs `aria-labelledby` vs `aria-describedby`"));
assert.ok(chapter12Titles.includes("How accessible names and descriptions are formed"));
assert.ok(chapter12Titles.includes("Drill: repair the accessible form"));

const chapter13Titles = chapter13.blocks.map((block) => block.title ?? "");
assert.ok(chapter13Titles.includes("Performance starts in the markup"));
assert.ok(chapter13Titles.includes("`preload` vs `prefetch` vs `preconnect` vs `fetchpriority`"));
assert.ok(chapter13Titles.includes("How HTML affects LCP, CLS, and loading order"));
assert.ok(chapter13Titles.includes("Drill: reduce markup-driven performance cost"));

const chapter14Titles = chapter14.blocks.map((block) => block.title ?? "");
assert.ok(chapter14Titles.includes("Native browser APIs extend HTML"));
assert.ok(chapter14Titles.includes("`template` vs Web Components vs observers"));
assert.ok(chapter14Titles.includes("When HTML stops and the platform begins"));
assert.ok(chapter14Titles.includes("Drill: choose the right native API"));

assert.ok(
  [chapter12, chapter13, chapter14].every((chapter) =>
    chapter.blocks.some((block) => block.type === "drill")
  ),
  "chapters 12 through 14 should each include a drill block"
);

assert.ok(
  [chapter12, chapter13, chapter14].every((chapter) =>
    chapter.blocks.some((block) => block.type === "trap")
  ),
  "chapters 12 through 14 should each include a trap block"
);
