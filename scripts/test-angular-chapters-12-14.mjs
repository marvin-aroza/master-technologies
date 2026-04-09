import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "angular.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter12 = sectionById.get("ssr-hydration-hybrid-rendering-performance");
const chapter13 = sectionById.get(
  "build-tooling-security-accessibility-i18n-deployment"
);
const chapter14 = sectionById.get("ecosystem-migration-interview-mastery");

for (const [index, chapter] of [chapter12, chapter13, chapter14].entries()) {
  assert.ok(chapter, `chapter ${index + 12} should exist`);
  assert.ok(
    chapter.blocks.length >= 7,
    `chapter ${index + 12} should contain a substantial block set`
  );
}

assert.ok(Array.isArray(chapter12.qa) && chapter12.qa.length >= 4);
assert.ok(Array.isArray(chapter13.qa) && chapter13.qa.length >= 4);
assert.ok(Array.isArray(chapter14.qa) && chapter14.qa.length >= 250);

const chapter12Titles = chapter12.blocks.map((block) => block.title ?? "");
assert.ok(
  chapter12Titles.includes("CSR is the default, hybrid rendering is the performance lever")
);
assert.ok(
  chapter12Titles.includes("CSR vs SSR and hybrid rendering vs incremental hydration")
);
assert.ok(chapter12Titles.includes("Drill: choose the rendering strategy"));

const chapter13Titles = chapter13.blocks.map((block) => block.title ?? "");
assert.ok(chapter13Titles.includes("Production hardening is more than a successful build"));
assert.ok(
  chapter13Titles.includes("What Angular handles for you vs what your app still owns")
);
assert.ok(chapter13Titles.includes("Security by default is not security by magic"));
assert.ok(chapter13Titles.includes("Drill: pick the deployment shape"));

const chapter14Titles = chapter14.blocks.map((block) => block.title ?? "");
assert.ok(chapter14Titles.includes("Modern Angular migration is incremental, not theatrical"));
assert.ok(chapter14Titles.includes("Incremental modernization vs rewrite-from-scratch"));
assert.ok(chapter14Titles.includes("What Angular interview mastery actually sounds like"));
assert.ok(chapter14Titles.includes("Drill: propose the migration plan"));

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

assert.ok(
  [chapter12, chapter13, chapter14].every((chapter) =>
    chapter.blocks.some((block) => block.type === "compare")
  ),
  "chapters 12 through 14 should each include a compare block"
);

assert.ok(
  [chapter12, chapter13, chapter14].every((chapter) =>
    chapter.blocks.some((block) => block.type === "mechanics")
  ),
  "chapters 12 through 14 should each include a mechanics block"
);

assert.ok(
  [chapter12, chapter13, chapter14].every((chapter) =>
    chapter.blocks.some((block) => block.type === "recap")
  ),
  "chapters 12 through 14 should each include a recap block"
);

assert.ok(
  [chapter12, chapter13, chapter14].every((chapter) =>
    chapter.blocks.some((block) => block.type === "code")
  ),
  "chapters 12 through 14 should each include a concrete code example"
);

assert.ok(
  chapter14.blocks.some(
    (block) =>
      block.type === "richText" &&
      block.title === "What Angular interview mastery actually sounds like"
  ),
  "chapter 14 should explicitly teach interview framing"
);

const chapter14Questions = new Set(chapter14.qa.map((item) => item.question));
assert.ok(chapter14Questions.has("What is an Angular module (NgModule)?"));
assert.ok(chapter14Questions.has("What is the difference between JIT and AOT compilation?"));
