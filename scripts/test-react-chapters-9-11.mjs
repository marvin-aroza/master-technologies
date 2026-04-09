import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "react.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter9 = sectionById.get("async-ui-suspense-data-boundaries");
const chapter10 = sectionById.get("forms-actions-optimistic-mutations");
const chapter11 = sectionById.get("performance-compiler-render-tradeoffs");

for (const [index, chapter] of [chapter9, chapter10, chapter11].entries()) {
  assert.ok(chapter, `chapter ${index + 9} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 9} should contain a substantial block set`
  );
}

const chapter9Titles = chapter9.blocks.map((block) => block.title ?? "");
assert.ok(chapter9Titles.includes("Suspense is a display boundary, not a fetch library"));
assert.ok(chapter9Titles.includes("useTransition vs useDeferredValue"));
assert.ok(chapter9Titles.includes("Trap: wrapping a text input update in a Transition"));

const chapter10Titles = chapter10.blocks.map((block) => block.title ?? "");
assert.ok(chapter10Titles.includes("Controlled vs uncontrolled vs action-driven forms"));
assert.ok(chapter10Titles.includes("useActionState vs useFormStatus vs useOptimistic"));
assert.ok(chapter10Titles.includes("Trap: calling useFormStatus beside the form it should track"));

const chapter11Titles = chapter11.blocks.map((block) => block.title ?? "");
assert.ok(chapter11Titles.includes("Performance is mostly about render shape"));
assert.ok(chapter11Titles.includes("Manual memoization vs compiler optimization"));
assert.ok(chapter11Titles.includes("React Compiler is a build-time optimizer"));

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
