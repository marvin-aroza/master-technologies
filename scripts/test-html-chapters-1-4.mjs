import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "html.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter1 = sectionById.get("origins-standards-browser-parsing");
const chapter2 = sectionById.get("document-structure-head-body-metadata");
const chapter3 = sectionById.get("text-semantics-links-urls-meaning");
const chapter4 = sectionById.get("sectioning-landmarks-page-architecture");

for (const [index, chapter] of [chapter1, chapter2, chapter3, chapter4].entries()) {
  assert.ok(chapter, `chapter ${index + 1} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 1} should contain a substantial block set`
  );
  assert.ok(Array.isArray(chapter.qa) && chapter.qa.length >= 3, `chapter ${index + 1} should include chapter-level Q&A`);
}

const chapter1Titles = chapter1.blocks.map((block) => block.title ?? "");
assert.ok(chapter1Titles.includes("What HTML Actually Is"));
assert.ok(chapter1Titles.includes("HTML vs CSS vs JavaScript"));
assert.ok(chapter1Titles.includes("How the HTML parser builds a DOM"));
assert.ok(chapter1Titles.includes("Drill: predict what the parser repairs"));

const chapter2Titles = chapter2.blocks.map((block) => block.title ?? "");
assert.ok(chapter2Titles.includes("Document shell and standards mode"));
assert.ok(chapter2Titles.includes("A modern HTML document scaffold"));
assert.ok(chapter2Titles.includes("Metadata that changes behavior vs metadata that describes"));
assert.ok(chapter2Titles.includes("Drill: audit the head"));

const chapter3Titles = chapter3.blocks.map((block) => block.title ?? "");
assert.ok(chapter3Titles.includes("Text semantics communicate meaning"));
assert.ok(chapter3Titles.includes("`strong` and `em` vs `b` and `i`"));
assert.ok(chapter3Titles.includes("How browsers resolve links"));
assert.ok(chapter3Titles.includes("Drill: choose the right text or link element"));

const chapter4Titles = chapter4.blocks.map((block) => block.title ?? "");
assert.ok(chapter4Titles.includes("Landmarks and page architecture"));
assert.ok(chapter4Titles.includes("`section` vs `article` vs `div`"));
assert.ok(chapter4Titles.includes("How assistive tech navigates a page"));
assert.ok(chapter4Titles.includes("Drill: repair the page architecture"));

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
