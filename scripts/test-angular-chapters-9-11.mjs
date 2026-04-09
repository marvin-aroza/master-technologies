import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "angular.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter9 = sectionById.get("forms-validation-submission-flows");
const chapter10 = sectionById.get("rxjs-interop-state-management-async-architecture");
const chapter11 = sectionById.get("testing-debugging-reliability");

for (const [index, chapter] of [chapter9, chapter10, chapter11].entries()) {
  assert.ok(chapter, `chapter ${index + 9} should exist`);
  assert.ok(
    chapter.blocks.length >= 7,
    `chapter ${index + 9} should contain a substantial block set`
  );
  assert.ok(
    Array.isArray(chapter.qa) && chapter.qa.length >= 4,
    `chapter ${index + 9} should include chapter-level interview questions`
  );
}

const chapter9Titles = chapter9.blocks.map((block) => block.title ?? "");
assert.ok(chapter9Titles.includes("Reactive Forms remain the stable production default"));
assert.ok(chapter9Titles.includes("Reactive Forms vs template-driven forms vs Signal Forms"));
assert.ok(chapter9Titles.includes("Signal Forms are real, but still experimental"));
assert.ok(chapter9Titles.includes("Drill: choose the form system"));

const chapter10Titles = chapter10.blocks.map((block) => block.title ?? "");
assert.ok(chapter10Titles.includes("Signals did not replace RxJS"));
assert.ok(chapter10Titles.includes("Signals vs RxJS Observables"));
assert.ok(chapter10Titles.includes("How signal and RxJS interop should work"));
assert.ok(chapter10Titles.includes("Drill: pick the right reactive tool"));

const chapter11Titles = chapter11.blocks.map((block) => block.title ?? "");
assert.ok(chapter11Titles.includes("Angular testing is Vitest-first now"));
assert.ok(
  chapter11Titles.includes(
    "Pure logic tests vs TestBed component tests vs broader integration tests"
  )
);
assert.ok(chapter11Titles.includes("Vitest migration changes some old Angular testing habits"));
assert.ok(chapter11Titles.includes("Drill: choose the right test scope"));

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

assert.ok(
  [chapter9, chapter10, chapter11].every((chapter) =>
    chapter.blocks.some((block) => block.type === "compare")
  ),
  "chapters 9 through 11 should each include a compare block"
);

assert.ok(
  [chapter9, chapter10, chapter11].every((chapter) =>
    chapter.blocks.some((block) => block.type === "mechanics")
  ),
  "chapters 9 through 11 should each include a mechanics block"
);

assert.ok(
  [chapter9, chapter10, chapter11].every((chapter) =>
    chapter.blocks.some((block) => block.type === "recap")
  ),
  "chapters 9 through 11 should each include a recap block"
);

assert.ok(
  [chapter9, chapter10, chapter11].every((chapter) =>
    chapter.blocks.some((block) => block.type === "code")
  ),
  "chapters 9 through 11 should each include a concrete code example"
);

assert.ok(
  chapter9.blocks.some(
    (block) =>
      block.type === "richText" &&
      block.title === "Signal Forms are real, but still experimental"
  ),
  "chapter 9 should explicitly frame Signal Forms as experimental"
);

assert.ok(
  chapter11.blocks.some(
    (block) =>
      block.type === "richText" &&
      block.title === "Vitest migration changes some old Angular testing habits"
  ),
  "chapter 11 should explicitly cover the Vitest migration shift"
);
