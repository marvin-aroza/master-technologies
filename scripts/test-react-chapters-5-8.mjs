import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "react.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter5 = sectionById.get("state-ownership-preserving-resetting");
const chapter6 = sectionById.get("events-effects-escape-hatches");
const chapter7 = sectionById.get("refs-dom-imperative-apis");
const chapter8 = sectionById.get("context-reducers-external-stores");

for (const [index, chapter] of [chapter5, chapter6, chapter7, chapter8].entries()) {
  assert.ok(chapter, `chapter ${index + 5} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 5} should contain a substantial block set`
  );
}

const chapter5Titles = chapter5.blocks.map((block) => block.title ?? "");
assert.ok(chapter5Titles.includes("State ownership and identity"));
assert.ok(chapter5Titles.includes("Same position preserves state, new identity resets it"));
assert.ok(chapter5Titles.includes("Drill: when should this form reset?"));

const chapter6Titles = chapter6.blocks.map((block) => block.title ?? "");
assert.ok(chapter6Titles.includes("Events are not Effects"));
assert.ok(chapter6Titles.includes("You might not need an Effect"));
assert.ok(chapter6Titles.includes("Trap: fixing event logic with an Effect"));

const chapter7Titles = chapter7.blocks.map((block) => block.title ?? "");
assert.ok(chapter7Titles.includes("Refs are mutable cells, not reactive state"));
assert.ok(chapter7Titles.includes("useRef vs state"));
assert.ok(chapter7Titles.includes("Drill: should this value live in a ref or state?"));

const chapter8Titles = chapter8.blocks.map((block) => block.title ?? "");
assert.ok(chapter8Titles.includes("Context, reducers, and external-store boundaries"));
assert.ok(chapter8Titles.includes("Context vs reducer vs external store"));
assert.ok(chapter8Titles.includes("useSyncExternalStore"));

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
