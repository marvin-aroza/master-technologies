import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "nextjs.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const capstoneId = "migration-architecture-interview-mastery";
const capstone = topic.sections.find((section) => section.id === capstoneId);

assert.ok(capstone, "the Next.js capstone section should exist");

const distributedSections = topic.sections.filter((section) => section.id !== capstoneId);

assert.ok(
  distributedSections.every(
    (section) => Array.isArray(section.qa) && section.qa.length >= 3
  ),
  "chapters 1 through 13 should each include chapter-level interview questions"
);

const totalQuestions = topic.sections.reduce(
  (sum, section) => sum + (Array.isArray(section.qa) ? section.qa.length : 0),
  0
);

assert.ok(totalQuestions >= 80, "the Next.js topic should contain a large interview bank");
assert.ok(
  capstone.qa.length >= 40,
  "the capstone should retain a large advanced interview bank"
);

const capstoneExpertCount = capstone.qa.filter(
  (item) => item.level === "expert" || item.level === "advanced"
).length;
assert.ok(
  capstoneExpertCount >= 16,
  "the capstone should include many advanced or expert interview prompts"
);

const capstoneQuestions = capstone.qa.map((item) => item.question.toLowerCase());
assert.ok(
  capstoneQuestions.some((question) => question.includes("hydration")),
  "the capstone should include hydration debugging coverage"
);
assert.ok(
  capstoneQuestions.some((question) => question.includes("cache")),
  "the capstone should include cache reasoning coverage"
);
assert.ok(
  capstoneQuestions.some((question) => question.includes("migrate")),
  "the capstone should include migration coverage"
);
assert.ok(
  capstoneQuestions.some((question) => question.includes("route handler")),
  "the capstone should include Route Handler architecture coverage"
);
assert.ok(
  capstoneQuestions.some((question) => question.includes("edge")),
  "the capstone should include runtime tradeoff coverage"
);
