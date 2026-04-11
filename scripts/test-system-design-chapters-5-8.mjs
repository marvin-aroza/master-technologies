import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "system-design.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter5 = sectionById.get("caching-cdn-edge-performance-layers");
const chapter6 = sectionById.get("scalable-frontend-full-stack-product-architecture");
const chapter7 = sectionById.get("real-time-systems-collaboration-event-driven-ux");
const chapter8 = sectionById.get("authentication-authorization-security-multi-tenancy");

for (const [index, chapter] of [chapter5, chapter6, chapter7, chapter8].entries()) {
  assert.ok(chapter, `chapter ${index + 5} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 5} should contain a substantial block set`
  );
  assert.ok(
    Array.isArray(chapter.qa) && chapter.qa.length >= 4,
    `chapter ${index + 5} should include chapter-level interview questions`
  );
}

const chapter5Titles = chapter5.blocks.map((block) => block.title ?? "");
assert.ok(chapter5Titles.includes("Caches are copies with risk"));
assert.ok(chapter5Titles.includes("Browser cache vs CDN cache vs application cache"));
assert.ok(chapter5Titles.includes("How stale data appears"));
assert.ok(chapter5Titles.includes("Drill: choose the invalidation path"));

const chapter6Titles = chapter6.blocks.map((block) => block.title ?? "");
assert.ok(chapter6Titles.includes("Product architecture is team architecture under load"));
assert.ok(chapter6Titles.includes("Monolith vs modular monolith vs micro-frontends"));
assert.ok(chapter6Titles.includes("How ownership boundaries scale"));
assert.ok(chapter6Titles.includes("Drill: choose the product architecture"));

const chapter7Titles = chapter7.blocks.map((block) => block.title ?? "");
assert.ok(chapter7Titles.includes("Freshness has a systems cost"));
assert.ok(chapter7Titles.includes("Polling vs SSE vs WebSockets"));
assert.ok(chapter7Titles.includes("How real-time updates propagate"));
assert.ok(chapter7Titles.includes("Drill: choose the lightest real-time model"));

const chapter8Titles = chapter8.blocks.map((block) => block.title ?? "");
assert.ok(chapter8Titles.includes("Security boundaries are architecture boundaries"));
assert.ok(chapter8Titles.includes("Authentication vs authorization vs tenant isolation"));
assert.ok(chapter8Titles.includes("How a secure request is evaluated"));
assert.ok(chapter8Titles.includes("Drill: design tenant isolation"));

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
  [chapter5, chapter7].every((chapter) =>
    chapter.blocks.some((block) => block.type === "code")
  ),
  "caching and real-time chapters should each include a concrete code example"
);
