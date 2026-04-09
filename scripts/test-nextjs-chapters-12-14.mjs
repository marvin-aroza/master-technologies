import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "nextjs.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter12 = sectionById.get("security-reliability-production-hardening");
const chapter13 = sectionById.get("deployment-runtimes-self-hosting-scale");
const chapter14 = sectionById.get("migration-architecture-interview-mastery");

for (const [index, chapter] of [chapter12, chapter13, chapter14].entries()) {
  assert.ok(chapter, `chapter ${index + 12} should exist`);
  assert.ok(
    chapter.blocks.length >= 6,
    `chapter ${index + 12} should contain a substantial block set`
  );
}

assert.ok(
  Array.isArray(chapter12.qa) && chapter12.qa.length >= 3,
  "chapter 12 should include chapter-level interview questions"
);
assert.ok(
  Array.isArray(chapter13.qa) && chapter13.qa.length >= 3,
  "chapter 13 should include chapter-level interview questions"
);
assert.ok(
  Array.isArray(chapter14.qa) && chapter14.qa.length >= 116,
  "chapter 14 should include the restored legacy-plus-modern capstone interview bank"
);

const chapter12Titles = chapter12.blocks.map((block) => block.title ?? "");
assert.ok(chapter12Titles.includes("Server-only boundaries are your first hardening layer"));
assert.ok(chapter12Titles.includes("Authentication vs authorization vs validation"));
assert.ok(chapter12Titles.includes("Trust boundaries for reads, writes, and caches"));
assert.ok(chapter12Titles.includes("Drill: harden the mutation path"));

const chapter13Titles = chapter13.blocks.map((block) => block.title ?? "");
assert.ok(chapter13Titles.includes("Deployment is part of architecture"));
assert.ok(chapter13Titles.includes("Node runtime vs Edge runtime in production"));
assert.ok(chapter13Titles.includes("Self-hosting changes cache, images, and Server Functions"));
assert.ok(chapter13Titles.includes("Drill: choose the deployment shape"));

const chapter14Titles = chapter14.blocks.map((block) => block.title ?? "");
assert.ok(chapter14Titles.includes("Migrate by carving seams, not by rewriting blind"));
assert.ok(chapter14Titles.includes("Pages Router mindset vs App Router mindset"));
assert.ok(chapter14Titles.includes("How to migrate incrementally without losing control"));
assert.ok(chapter14Titles.includes("Architecture questions are boundary questions"));
assert.ok(chapter14Titles.includes("Drill: answer the system design follow-up"));

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

const chapter12CodeBlock = chapter12.blocks.find((block) => block.type === "code");
assert.ok(chapter12CodeBlock, "chapter 12 should include a hardening example");
assert.ok(
  typeof chapter12CodeBlock.code === "string" &&
    chapter12CodeBlock.code.includes("server-only") &&
    chapter12CodeBlock.code.includes("safeParse"),
  "chapter 12 security example should cover server-only modules and validation"
);

const chapter13CodeBlock = chapter13.blocks.find((block) => block.type === "code");
assert.ok(chapter13CodeBlock, "chapter 13 should include a deployment example");
assert.ok(
  typeof chapter13CodeBlock.code === "string" &&
    chapter13CodeBlock.code.includes("generateBuildId") &&
    chapter13CodeBlock.code.includes("deploymentId"),
  "chapter 13 deployment example should cover build identity and deployment skew protection"
);

assert.ok(
  chapter14.blocks.some(
    (block) =>
      block.type === "compare" &&
      block.title === "Pages Router mindset vs App Router mindset"
  ),
  "chapter 14 should explicitly compare Pages Router and App Router migration mindsets"
);

assert.ok(
  chapter14.blocks.some(
    (block) =>
      block.type === "mechanics" &&
      block.title === "How to migrate incrementally without losing control"
  ),
  "chapter 14 should teach migration as mechanics"
);

assert.ok(
  chapter14.qa.some((item) => item.question.includes("Pages Router")),
  "chapter 14 should keep explicit Pages Router migration interview coverage"
);
assert.ok(
  chapter14.qa.some((item) => item.question === "What is Next.js?"),
  "chapter 14 should retain the legacy foundational Next.js question bank"
);
assert.ok(
  chapter14.qa.some((item) => item.question === "What is SSR (Server-Side Rendering)?"),
  "chapter 14 should retain the legacy SSR question bank"
);
