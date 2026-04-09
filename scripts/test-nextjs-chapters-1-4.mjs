import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "nextjs.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter1 = sectionById.get("origins-philosophy-runtime-model");
const chapter2 = sectionById.get("app-router-file-system-architecture");
const chapter3 = sectionById.get("server-client-component-boundaries");
const chapter4 = sectionById.get("navigation-layout-persistence-metadata");

for (const [index, chapter] of [chapter1, chapter2, chapter3, chapter4].entries()) {
  assert.ok(chapter, `chapter ${index + 1} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 1} should contain a substantial block set`
  );
  assert.ok(
    Array.isArray(chapter.qa) && chapter.qa.length >= 3,
    `chapter ${index + 1} should include chapter-level interview questions`
  );
}

const chapter1Titles = chapter1.blocks.map((block) => block.title ?? "");
assert.ok(chapter1Titles.includes("Next.js is a React framework, not a rendering mode"));
assert.ok(chapter1Titles.includes("Build time vs request time vs browser time"));
assert.ok(chapter1Titles.includes("Drill: choose the right execution boundary"));

const chapter2Titles = chapter2.blocks.map((block) => block.title ?? "");
assert.ok(chapter2Titles.includes("The app directory is a route tree"));
assert.ok(chapter2Titles.includes("layout.tsx vs template.tsx vs page.tsx vs route.ts"));
assert.ok(chapter2Titles.includes("Drill: map the URL to files"));

const chapter3Titles = chapter3.blocks.map((block) => block.title ?? "");
assert.ok(chapter3Titles.includes("Server first by default"));
assert.ok(chapter3Titles.includes("Server Components vs Client Components"));
assert.ok(chapter3Titles.includes("Drill: place the boundary"));

const chapter4Titles = chapter4.blocks.map((block) => block.title ?? "");
assert.ok(chapter4Titles.includes("How navigation works in App Router"));
assert.ok(chapter4Titles.includes("Static metadata vs generateMetadata"));
assert.ok(chapter4Titles.includes("How metadata resolves through the route tree"));
assert.ok(chapter4Titles.includes("Drill: diagnose the slow navigation"));
assert.ok(
  chapter4.blocks.some(
    (block) =>
      block.type === "mechanics" &&
      block.title === "How metadata resolves through the route tree"
  ),
  "chapter 4 should teach metadata resolution as a mechanics block"
);

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
  [chapter2, chapter4].every((chapter) =>
    chapter.blocks.some((block) => block.type === "code")
  ),
  "routing and metadata chapters should each include a concrete code example"
);

const chapter4CodeBlocks = chapter4.blocks.filter((block) => block.type === "code");
assert.ok(
  chapter4CodeBlocks.every(
    (block) =>
      !(
        typeof block.code === "string" &&
        block.code.includes("export const metadata") &&
        block.code.includes("generateMetadata")
      )
  ),
  "chapter 4 should not teach static metadata and generateMetadata as a single-segment code sample"
);
