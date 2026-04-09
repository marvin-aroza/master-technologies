import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "react.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter12 = sectionById.get("server-components-directives-boundaries");
const chapter13 = sectionById.get("testing-accessibility-reliability");
const chapter14 = sectionById.get("architecture-ecosystem-interview-mastery");

for (const [index, chapter] of [chapter12, chapter13, chapter14].entries()) {
  assert.ok(chapter, `chapter ${index + 12} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 12} should contain a substantial block set`
  );
}

const chapter12Titles = chapter12.blocks.map((block) => block.title ?? "");
assert.ok(chapter12Titles.includes("There is no directive for Server Components"));
assert.ok(chapter12Titles.includes("'use client' vs 'use server' vs Server Components"));
assert.ok(chapter12Titles.includes("Trap: calling every server feature a Server Action"));

const chapter13Titles = chapter13.blocks.map((block) => block.title ?? "");
assert.ok(chapter13Titles.includes("Behavior-first testing starts from the user surface"));
assert.ok(chapter13Titles.includes("Hydration mismatches are bugs"));
assert.ok(chapter13Titles.includes("Trap: asserting component internals instead of behavior"));

const chapter14Titles = chapter14.blocks.map((block) => block.title ?? "");
assert.ok(chapter14Titles.includes("Architecture is mostly about boundaries and ownership"));
assert.ok(chapter14Titles.includes("Choosing ecosystem tools by problem shape"));
assert.ok(chapter14Titles.includes("Trap: picking tools before drawing boundaries"));

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

assert.equal(chapter14.qa.length, 178, "the final chapter should expose the restored legacy-plus-modern React interview bank");

const chapter14Questions = chapter14.qa.map((item) => item.question);
assert.ok(chapter14Questions.includes("What is JSX in React?"));
assert.ok(chapter14Questions.includes("What is React?"));
assert.ok(chapter14Questions.includes("What are props?"));
assert.ok(chapter14Questions.includes("What causes a React component to re-render?"));
assert.ok(chapter14Questions.includes("What is the difference between useTransition and useDeferredValue?"));
assert.ok(chapter14Questions.includes("What causes hydration mismatch errors in React?"));
assert.ok(chapter14Questions.includes("What does the 'use client' directive actually mark?"));
assert.ok(chapter14Questions.includes("How do you decide whether data belongs in local state, Context, an external store, or server state?"));
assert.ok(chapter14Questions.includes("How would you debug a stale closure bug in a websocket or interval callback?"));
assert.ok(chapter14Questions.includes("Why doesn't Suspense show a fallback for data fetched inside useEffect?"));
assert.ok(chapter14Questions.includes("How do you fix a hydration mismatch caused by reading localStorage during render?"));
assert.ok(chapter14Questions.includes("What is the difference between server-side rendering, hydration, and React Server Components?"));
