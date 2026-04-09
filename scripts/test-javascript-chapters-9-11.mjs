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

function getBlockByTitle(chapter, title) {
  return chapter.blocks.find((block) => block.title === title);
}

function expectBlock(chapter, title, type) {
  const block = getBlockByTitle(chapter, title);
  assert.ok(block, `expected "${title}" block to exist`);
  assert.equal(block.type, type, `"${title}" should be a ${type} block`);
}

assert.ok(chapter9, "chapter 9 should exist");
assert.ok(chapter10, "chapter 10 should exist");
assert.ok(chapter11, "chapter 11 should exist");

for (const [index, chapter] of [chapter9, chapter10, chapter11].entries()) {
  assert.ok(
    chapter.blocks.length >= 5,
    `chapter ${index + 9} should contain a substantial set of learning blocks`
  );
}

expectBlock(chapter9, "DOM events and delegation", "richText");
expectBlock(chapter9, "event.target vs event.currentTarget", "compare");
expectBlock(chapter9, "Fetch, storage, and URL state", "richText");
expectBlock(chapter9, "Streams and rendering lifecycle", "richText");
expectBlock(chapter9, "Observers and workers", "richText");
expectBlock(chapter9, "Drill: pick the right browser primitive", "drill");

expectBlock(chapter10, "Custom errors and error boundaries", "richText");
expectBlock(chapter10, "Recoverable vs unrecoverable errors", "compare");
expectBlock(chapter10, "Validation strategy and defensive coding", "richText");
expectBlock(chapter10, "Drill: should you catch or rethrow?", "drill");

expectBlock(chapter11, "Rendering cost awareness", "richText");
expectBlock(chapter11, "Debounce vs throttle", "compare");
expectBlock(chapter11, "Memory leaks and garbage collection", "richText");
expectBlock(chapter11, "Profiling mindset", "richText");
expectBlock(chapter11, "Drill: find the real bottleneck", "drill");
