import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "javascript.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter5 = sectionById.get("objects-prototypes-classes");
const chapter6 = sectionById.get("arrays-collections-iteration");
const chapter7 = sectionById.get("modules-tooling-project-structure");
const chapter8 = sectionById.get("asynchrony-event-loop");

assert.ok(chapter5, "chapter 5 should exist");
assert.ok(chapter6, "chapter 6 should exist");
assert.ok(chapter7, "chapter 7 should exist");
assert.ok(chapter8, "chapter 8 should exist");

for (const [index, chapter] of [chapter5, chapter6, chapter7, chapter8].entries()) {
  assert.ok(
    chapter.blocks.length >= 5,
    `chapter ${index + 5} should contain a substantial set of learning blocks`
  );
}

const chapter5Titles = chapter5.blocks.map((block) => block.title ?? "");
assert.ok(chapter5Titles.includes("Property Lookup and Object Identity"));
assert.ok(chapter5Titles.includes("How prototype lookup works"));
assert.ok(chapter5Titles.includes("Classes are syntax over prototypes"));
assert.ok(chapter5Titles.includes("Composition vs inheritance"));

const chapter6Titles = chapter6.blocks.map((block) => block.title ?? "");
assert.ok(chapter6Titles.includes("Array methods and iteration style"));
assert.ok(chapter6Titles.includes("Iterables vs iterators"));
assert.ok(chapter6Titles.includes("Object vs Map vs Set"));
assert.ok(chapter6Titles.includes("Drill: pick the right collection"));

const chapter7Titles = chapter7.blocks.map((block) => block.title ?? "");
assert.ok(chapter7Titles.includes("ES modules vs CommonJS"));
assert.ok(chapter7Titles.includes("How module resolution feels in practice"));
assert.ok(chapter7Titles.includes("Bundling, tree shaking, and code splitting"));

const chapter8Titles = chapter8.blocks.map((block) => block.title ?? "");
assert.ok(chapter8Titles.includes("Promises, async functions, and sequencing"));
assert.ok(chapter8Titles.includes("Microtasks vs tasks"));
assert.ok(chapter8Titles.includes("Cancellation and race conditions"));
assert.ok(chapter8Titles.includes("Drill: event loop ordering"));

assert.ok(
  chapter5.blocks.some((block) => block.type === "mechanics"),
  "chapter 5 should include prototype lookup mechanics"
);
assert.ok(
  chapter8.blocks.some((block) => block.type === "mechanics"),
  "chapter 8 should include event loop mechanics"
);
assert.ok(
  chapter8.blocks.some((block) => block.type === "drill"),
  "chapter 8 should include an event loop drill"
);
