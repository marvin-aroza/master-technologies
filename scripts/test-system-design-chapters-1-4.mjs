import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "system-design.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter1 = sectionById.get("system-design-foundations-requirements-tradeoffs");
const chapter2 = sectionById.get("client-server-architecture-request-lifecycles");
const chapter3 = sectionById.get("application-architecture-state-data-flow");
const chapter4 = sectionById.get("api-design-contracts-integration-patterns");

for (const [index, chapter] of [chapter1, chapter2, chapter3, chapter4].entries()) {
  assert.ok(chapter, `chapter ${index + 1} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 1} should contain a substantial block set`
  );
  assert.ok(
    Array.isArray(chapter.qa) && chapter.qa.length >= 4,
    `chapter ${index + 1} should include chapter-level interview questions`
  );
}

const chapter1Titles = chapter1.blocks.map((block) => block.title ?? "");
assert.ok(chapter1Titles.includes("System design starts with requirements, not components"));
assert.ok(chapter1Titles.includes("Functional requirements vs non-functional requirements"));
assert.ok(chapter1Titles.includes("How to structure the first 10 minutes"));
assert.ok(chapter1Titles.includes("Drill: frame the architecture conversation"));

const chapter2Titles = chapter2.blocks.map((block) => block.title ?? "");
assert.ok(chapter2Titles.includes("A user action becomes a distributed path"));
assert.ok(chapter2Titles.includes("How a request moves through the system"));
assert.ok(chapter2Titles.includes("Layer 4 vs Layer 7 load balancing"));
assert.ok(chapter2Titles.includes("Drill: find the latency bottleneck"));

const chapter3Titles = chapter3.blocks.map((block) => block.title ?? "");
assert.ok(chapter3Titles.includes("Architecture is ownership and change"));
assert.ok(chapter3Titles.includes("Server state vs client state vs URL state"));
assert.ok(chapter3Titles.includes("How a user action propagates through an application"));
assert.ok(chapter3Titles.includes("Drill: choose the right state boundary"));

const chapter4Titles = chapter4.blocks.map((block) => block.title ?? "");
assert.ok(chapter4Titles.includes("Contracts matter more than endpoint count"));
assert.ok(chapter4Titles.includes("REST vs GraphQL vs event contracts"));
assert.ok(chapter4Titles.includes("A robust write API contract"));
assert.ok(chapter4Titles.includes("Drill: choose the contract shape"));

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
  "request-flow and contract chapters should each include a concrete code example"
);
