import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "javascript.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter1 = sectionById.get("origins-ecmascript-runtimes");
const chapter2 = sectionById.get("values-types-identity");
const chapter3 = sectionById.get("variables-scope-closures");
const chapter4 = sectionById.get("functions-invocation-mechanics");

assert.ok(chapter1, "chapter 1 should exist");
assert.ok(chapter2, "chapter 2 should exist");
assert.ok(chapter3, "chapter 3 should exist");
assert.ok(chapter4, "chapter 4 should exist");

for (const [index, chapter] of [chapter1, chapter2, chapter3, chapter4].entries()) {
  assert.ok(
    chapter.blocks.length >= 5,
    `chapter ${index + 1} should contain a substantial set of learning blocks`
  );
}

const chapter1Titles = chapter1.blocks.map((block) => block.title ?? "");
assert.ok(chapter1Titles.includes("What JavaScript Actually Is"));
assert.ok(chapter1Titles.includes("JavaScript vs ECMAScript vs Host Runtime"));
assert.ok(chapter1Titles.includes("How JavaScript Starts Running"));

const chapter2Titles = chapter2.blocks.map((block) => block.title ?? "");
assert.ok(chapter2Titles.includes("Primitives, Objects, and Identity"));
assert.ok(chapter2Titles.includes("Loose Equality vs Strict Equality vs Object.is()"));
assert.ok(chapter2Titles.includes("Coercion trap: [] == ![]"));
assert.ok(chapter2Titles.includes("Drill: predict the comparisons"));

const chapter3Titles = chapter3.blocks.map((block) => block.title ?? "");
assert.ok(chapter3Titles.includes("Lexical Scope and Environment Records"));
assert.ok(chapter3Titles.includes("Closure loop trap"));
assert.ok(chapter3Titles.includes("Drill: why do all callbacks log 3?"));

const chapter4Titles = chapter4.blocks.map((block) => block.title ?? "");
assert.ok(chapter4Titles.includes("Function Forms and Invocation Patterns"));
assert.ok(chapter4Titles.includes("call() vs apply() vs bind()"));
assert.ok(chapter4Titles.includes("`this` binding confusion"));
assert.ok(chapter4Titles.includes("Drill: what does this log?"));

assert.ok(
  chapter2.blocks.some((block) => block.type === "trap"),
  "chapter 2 should include a coercion trap block"
);
assert.ok(
  chapter3.blocks.some((block) => block.type === "trap"),
  "chapter 3 should include a closure trap block"
);
assert.ok(
  chapter4.blocks.some((block) => block.type === "trap"),
  "chapter 4 should include a this-binding trap block"
);

assert.ok(
  [chapter2, chapter3, chapter4].every((chapter) =>
    chapter.blocks.some((block) => block.type === "drill")
  ),
  "chapters 2 through 4 should each include a drill block"
);
