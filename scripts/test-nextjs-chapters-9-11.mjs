import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "nextjs.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter9 = sectionById.get("request-lifecycle-proxy-cookies-headers-auth");
const chapter10 = sectionById.get("apis-databases-full-stack-integration");
const chapter11 = sectionById.get("performance-assets-build-tooling");

for (const [index, chapter] of [chapter9, chapter10, chapter11].entries()) {
  assert.ok(chapter, `chapter ${index + 9} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 9} should contain a substantial block set`
  );
  assert.ok(
    Array.isArray(chapter.qa) && chapter.qa.length >= 3,
    `chapter ${index + 9} should include chapter-level interview questions`
  );
}

const chapter9Titles = chapter9.blocks.map((block) => block.title ?? "");
assert.ok(chapter9Titles.includes("Proxy is request-time policy, not a second app layer"));
assert.ok(chapter9Titles.includes("Proxy vs in-render auth checks"));
assert.ok(chapter9Titles.includes("Cookies and headers are request signals"));
assert.ok(chapter9Titles.includes("Drill: where should the auth gate live?"));

const chapter10Titles = chapter10.blocks.map((block) => block.title ?? "");
assert.ok(chapter10Titles.includes("Route Handlers are HTTP boundaries"));
assert.ok(chapter10Titles.includes("Route Handler vs Server Function"));
assert.ok(chapter10Titles.includes("Database drivers and runtimes must agree"));
assert.ok(chapter10Titles.includes("Drill: pick the boundary for each caller"));

const chapter11Titles = chapter11.blocks.map((block) => block.title ?? "");
assert.ok(chapter11Titles.includes("Performance starts with less client work"));
assert.ok(chapter11Titles.includes("Optimize images and fonts at the framework layer"));
assert.ok(chapter11Titles.includes("Turbopack is a developer-time performance tool"));
assert.ok(chapter11Titles.includes("Drill: diagnose the laggy route"));

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
      block.type === "compare" && block.title === "Proxy vs in-render auth checks"
  ),
  "chapter 9 should explicitly compare proxy with in-render auth checks"
);

const chapter9CodeBlock = chapter9.blocks.find(
  (block) => block.type === "code" && block.title === "Early auth gate in proxy.ts"
);
assert.ok(chapter9CodeBlock, "chapter 9 should include a proxy example");
assert.ok(
  typeof chapter9CodeBlock.code === "string" &&
    chapter9CodeBlock.code.includes("NextResponse.redirect") &&
    chapter9CodeBlock.code.includes("request.cookies"),
  "chapter 9 proxy example should cover request cookies and redirects"
);

assert.ok(
  chapter10.blocks.some(
    (block) =>
      block.type === "compare" && block.title === "Route Handler vs Server Function"
  ),
  "chapter 10 should explicitly compare Route Handlers and Server Functions"
);

const chapter10CodeBlock = chapter10.blocks.find((block) => block.type === "code");
assert.ok(chapter10CodeBlock, "chapter 10 should include a full-stack endpoint example");
assert.ok(
  typeof chapter10CodeBlock.code === "string" &&
    chapter10CodeBlock.code.includes("export const runtime = 'nodejs'") &&
    chapter10CodeBlock.code.includes("NextResponse"),
  "chapter 10 example should bind runtime choice to a Route Handler"
);

const chapter11CodeBlock = chapter11.blocks.find(
  (block) =>
    block.type === "code" &&
    block.title === "Optimize images and fonts at the framework layer"
);
assert.ok(chapter11CodeBlock, "chapter 11 should include an asset optimization example");
assert.ok(
  typeof chapter11CodeBlock.code === "string" &&
    chapter11CodeBlock.code.includes("next/image") &&
    chapter11CodeBlock.code.includes("next/font"),
  "chapter 11 example should cover framework-level image and font optimization"
);
