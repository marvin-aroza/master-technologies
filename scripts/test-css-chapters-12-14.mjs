import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "css.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter12 = sectionById.get("accessibility-user-preferences-resilient-styling");
const chapter13 = sectionById.get("advanced-platform-css-native-ui-integration");
const chapter14 = sectionById.get("ecosystem-tradeoffs-debugging-architecture-interview-mastery");

for (const [index, chapter] of [chapter12, chapter13, chapter14].entries()) {
  assert.ok(chapter, `chapter ${index + 12} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 12} should contain a substantial block set`
  );
}

assert.ok(
  Array.isArray(chapter12.qa) && chapter12.qa.length >= 5,
  "chapter 12 should include chapter-level Q&A"
);
assert.ok(
  Array.isArray(chapter13.qa) && chapter13.qa.length >= 5,
  "chapter 13 should include chapter-level Q&A"
);
assert.ok(
  Array.isArray(chapter14.qa) && chapter14.qa.length >= 60,
  "chapter 14 should keep a large capstone interview bank"
);

const chapter12Text = chapter12.blocks.map((block) => block.title ?? block.html ?? block.body ?? "").join(" ");
const chapter13Text = chapter13.blocks.map((block) => block.title ?? block.html ?? block.body ?? "").join(" ");
const chapter14Text = chapter14.blocks.map((block) => block.title ?? block.html ?? block.body ?? "").join(" ");

assert.match(
  chapter12Text,
  /accessibility|focus-visible|prefers-color-scheme|prefers-reduced-motion|prefers-contrast|forced-colors|resilient/i,
  "chapter 12 should cover resilient styling and user preference media queries"
);
assert.match(
  chapter13Text,
  /anchor positioning|native ui|popover|dialog|form control|accent-color|color-scheme/i,
  "chapter 13 should cover advanced platform CSS and native UI integration"
);
assert.match(
  chapter14Text,
  /Tailwind|CSS Modules|CSS-in-JS|debugging|architecture|tradeoff|interview/i,
  "chapter 14 should cover ecosystem tradeoffs and debugging scenarios"
);

assert.ok(
  chapter12.blocks.some((block) => block.type === "drill"),
  "chapter 12 should include a drill block"
);
assert.ok(
  chapter13.blocks.some((block) => block.type === "drill"),
  "chapter 13 should include a drill block"
);
assert.ok(
  chapter14.blocks.some((block) => block.type === "drill"),
  "chapter 14 should include a drill block"
);

assert.ok(
  chapter12.blocks.some((block) => block.type === "trap"),
  "chapter 12 should include a trap block"
);
assert.ok(
  chapter13.blocks.some((block) => block.type === "trap"),
  "chapter 13 should include a trap block"
);
assert.ok(
  chapter14.blocks.some((block) => block.type === "trap"),
  "chapter 14 should include a trap block"
);
