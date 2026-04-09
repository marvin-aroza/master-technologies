import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "angular.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter1 = sectionById.get("origins-versions-platform-model");
const chapter2 = sectionById.get("bootstrapping-standalone-project-structure");
const chapter3 = sectionById.get("components-templates-built-in-control-flow");
const chapter4 = sectionById.get("signals-reactivity-change-detection");

for (const [index, chapter] of [chapter1, chapter2, chapter3, chapter4].entries()) {
  assert.ok(chapter, `chapter ${index + 1} should exist`);
  assert.ok(
    chapter.blocks.length >= 7,
    `chapter ${index + 1} should contain a substantial block set`
  );
  assert.ok(
    Array.isArray(chapter.qa) && chapter.qa.length >= 4,
    `chapter ${index + 1} should include chapter-level interview questions`
  );
}

const chapter1Titles = chapter1.blocks.map((block) => block.title ?? "");
assert.ok(chapter1Titles.includes("Angular is a platform, not only a UI library"));
assert.ok(chapter1Titles.includes("How Angular should be evaluated in 2026"));
assert.ok(chapter1Titles.includes("Drill: explain Angular to a hiring panel"));

const chapter2Titles = chapter2.blocks.map((block) => block.title ?? "");
assert.ok(chapter2Titles.includes("bootstrapApplication is the modern starting point"));
assert.ok(chapter2Titles.includes("Standalone bootstrap vs NgModule-era bootstrap"));
assert.ok(chapter2Titles.includes("Drill: place the provider at the right level"));

const chapter3Titles = chapter3.blocks.map((block) => block.title ?? "");
assert.ok(chapter3Titles.includes("Templates are a compiled view language"));
assert.ok(chapter3Titles.includes("Interpolation vs property binding vs event binding"));
assert.ok(chapter3Titles.includes("Drill: diagnose the unstable list"));

const chapter4Titles = chapter4.blocks.map((block) => block.title ?? "");
assert.ok(chapter4Titles.includes("Signals give Angular a fine-grained reactive graph"));
assert.ok(chapter4Titles.includes("signal vs computed vs effect vs linkedSignal"));
assert.ok(chapter4Titles.includes("What happens when a signal changes"));
assert.ok(chapter4Titles.includes("Zoneless in Angular 21 and what still triggers updates"));
assert.ok(chapter4Titles.includes("Drill: fix the reactive design"));

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

assert.ok(
  [chapter1, chapter2, chapter3, chapter4].every((chapter) =>
    chapter.blocks.some((block) => block.type === "compare")
  ),
  "chapters 1 through 4 should each include a compare block"
);

assert.ok(
  [chapter1, chapter2, chapter3, chapter4].every((chapter) =>
    chapter.blocks.some((block) => block.type === "mechanics")
  ),
  "chapters 1 through 4 should each include a mechanics block"
);

assert.ok(
  [chapter1, chapter2, chapter3, chapter4].every((chapter) =>
    chapter.blocks.some((block) => block.type === "recap")
  ),
  "chapters 1 through 4 should each include a recap block"
);

assert.ok(
  [chapter2, chapter3, chapter4].every((chapter) =>
    chapter.blocks.some((block) => block.type === "code")
  ),
  "chapters 2 through 4 should each include a concrete code example"
);

assert.ok(
  chapter4.blocks.some(
    (block) =>
      block.type === "richText" &&
      block.title === "Zoneless in Angular 21 and what still triggers updates"
  ),
  "chapter 4 should explicitly teach the Angular 21 zoneless model"
);
