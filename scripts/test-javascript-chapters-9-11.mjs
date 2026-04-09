import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "javascript.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter9 = sectionById.get("browser-apis-dom-platform");
const chapter10 = sectionById.get("error-handling-defensive-coding");
const chapter11 = sectionById.get("performance-memory");

assert.ok(chapter9, "chapter 9 should exist");
assert.ok(chapter10, "chapter 10 should exist");
assert.ok(chapter11, "chapter 11 should exist");

for (const [index, chapter] of [chapter9, chapter10, chapter11].entries()) {
  assert.ok(
    chapter.blocks.length >= 5,
    `chapter ${index + 9} should contain a substantial set of learning blocks`
  );
}

const chapter9Titles = chapter9.blocks.map((block) => block.title ?? "");
assert.ok(chapter9Titles.includes("DOM events and delegation"));
assert.ok(chapter9Titles.includes("event.target vs event.currentTarget"));
assert.ok(chapter9Titles.includes("Fetch, storage, and URL state"));
assert.ok(chapter9Titles.includes("Observers and workers"));

const chapter10Titles = chapter10.blocks.map((block) => block.title ?? "");
assert.ok(chapter10Titles.includes("Custom errors and error boundaries"));
assert.ok(chapter10Titles.includes("Recoverable vs unrecoverable errors"));
assert.ok(chapter10Titles.includes("Validation strategy and defensive coding"));
assert.ok(chapter10Titles.includes("Drill: should you catch or rethrow?"));

const chapter11Titles = chapter11.blocks.map((block) => block.title ?? "");
assert.ok(chapter11Titles.includes("Rendering cost awareness"));
assert.ok(chapter11Titles.includes("Debounce vs throttle"));
assert.ok(chapter11Titles.includes("Memory leaks and garbage collection"));
assert.ok(chapter11Titles.includes("Profiling mindset"));

assert.ok(
  chapter9.blocks.some((block) => block.type === "compare"),
  "chapter 9 should include the target/currentTarget compare block"
);
assert.ok(
  chapter10.blocks.some((block) => block.type === "compare"),
  "chapter 10 should include the recoverable/unrecoverable compare block"
);
assert.ok(
  chapter11.blocks.some((block) => block.type === "compare"),
  "chapter 11 should include the debounce/throttle compare block"
);
