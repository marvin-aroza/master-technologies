import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "nextjs.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter5 = sectionById.get("data-fetching-server-data-ownership");
const chapter6 = sectionById.get("cache-components-use-cache-revalidation");
const chapter7 = sectionById.get("rendering-streaming-partial-prerendering");
const chapter8 = sectionById.get("server-functions-forms-mutations");

for (const [index, chapter] of [chapter5, chapter6, chapter7, chapter8].entries()) {
  assert.ok(chapter, `chapter ${index + 5} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 5} should contain a substantial block set`
  );
  assert.ok(
    Array.isArray(chapter.qa) && chapter.qa.length >= 3,
    `chapter ${index + 5} should include chapter-level interview questions`
  );
}

const chapter5Titles = chapter5.blocks.map((block) => block.title ?? "");
assert.ok(chapter5Titles.includes("Keep trusted data ownership on the server"));
assert.ok(chapter5Titles.includes("Sequential waterfalls vs parallel fetching"));
assert.ok(chapter5Titles.includes("Drill: fix the waterfall"));

const chapter6Titles = chapter6.blocks.map((block) => block.title ?? "");
assert.ok(chapter6Titles.includes("Cache Components make caching explicit"));
assert.ok(chapter6Titles.includes("How a use cache scope becomes reusable work"));
assert.ok(chapter6Titles.includes("revalidatePath vs revalidateTag vs updateTag"));
assert.ok(chapter6Titles.includes("Drill: pick the invalidation strategy"));

const chapter7Titles = chapter7.blocks.map((block) => block.title ?? "");
assert.ok(chapter7Titles.includes("Rendering is now a shell-plus-holes decision"));
assert.ok(chapter7Titles.includes("How streaming and PPR cooperate"));
assert.ok(chapter7Titles.includes("Drill: choose the rendering strategy"));

const chapter8Titles = chapter8.blocks.map((block) => block.title ?? "");
assert.ok(chapter8Titles.includes("Server Functions are the write path"));
assert.ok(chapter8Titles.includes("Mutation flow from submit to fresh UI"));
assert.ok(chapter8Titles.includes("Validated create action with redirect"));
assert.ok(chapter8Titles.includes("Validation, pending state, and optimistic UI"));
assert.ok(chapter8Titles.includes("Drill: design the mutation boundary"));

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

assert.ok(
  [chapter5, chapter6, chapter7, chapter8].every((chapter) =>
    chapter.blocks.some((block) => block.type === "compare")
  ),
  "chapters 5 through 8 should each include a compare block"
);

assert.ok(
  [chapter5, chapter6, chapter7, chapter8].every((chapter) =>
    chapter.blocks.some((block) => block.type === "mechanics")
  ),
  "chapters 5 through 8 should each include a mechanics block"
);

assert.ok(
  [chapter5, chapter6, chapter7, chapter8].every((chapter) =>
    chapter.blocks.some((block) => block.type === "recap")
  ),
  "chapters 5 through 8 should each include a recap block"
);

assert.ok(
  [chapter5, chapter6, chapter7, chapter8].every((chapter) =>
    chapter.blocks.some((block) => block.type === "code")
  ),
  "chapters 5 through 8 should each include a concrete code example"
);

assert.ok(
  chapter6.blocks.some(
    (block) =>
      block.type === "mechanics" &&
      block.title === "How a use cache scope becomes reusable work"
  ),
  "chapter 6 should teach use cache as mechanics"
);

assert.ok(
  chapter6.blocks.some(
    (block) =>
      block.type === "compare" &&
      block.title === "revalidatePath vs revalidateTag vs updateTag"
  ),
  "chapter 6 should compare the main invalidation tools explicitly"
);

const chapter6CodeBlock = chapter6.blocks.find((block) => block.type === "code");
assert.ok(chapter6CodeBlock, "chapter 6 should include a cache-focused code example");
assert.ok(
  typeof chapter6CodeBlock.code === "string" &&
    chapter6CodeBlock.code.includes("'use cache'") &&
    chapter6CodeBlock.code.includes("cacheLife") &&
    chapter6CodeBlock.code.includes("cacheTag"),
  "chapter 6 cache example should cover use cache, cacheLife, and cacheTag"
);

assert.ok(
  chapter7.blocks.some(
    (block) =>
      block.type === "mechanics" &&
      block.title === "How streaming and PPR cooperate"
  ),
  "chapter 7 should teach streaming and PPR as mechanics"
);

assert.ok(
  chapter8.blocks.some(
    (block) =>
      block.type === "mechanics" &&
      block.title === "Mutation flow from submit to fresh UI"
  ),
  "chapter 8 should teach the mutation lifecycle as mechanics"
);

const chapter8CodeBlock = chapter8.blocks.find(
  (block) =>
    block.type === "code" && block.title === "Validated create action with redirect"
);
assert.ok(chapter8CodeBlock, "chapter 8 should include a validated mutation code example");
assert.ok(
  typeof chapter8CodeBlock.code === "string" &&
    chapter8CodeBlock.code.includes("safeParse") &&
    chapter8CodeBlock.code.includes("updateTag") &&
    chapter8CodeBlock.code.includes("redirect"),
  "chapter 8 mutation example should cover validation, invalidation, and redirect behavior"
);
