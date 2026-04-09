import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "angular.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const chapters = topic.sections;
const capstone = chapters.at(-1);

const totalQuestions = chapters.reduce(
  (count, chapter) => count + (Array.isArray(chapter.qa) ? chapter.qa.length : 0),
  0
);

assert.ok(totalQuestions >= 302, "Angular topic should preserve the restored legacy-plus-modern interview bank");

for (const chapter of chapters.slice(0, -1)) {
  assert.ok(
    Array.isArray(chapter.qa) && chapter.qa.length >= 4,
    `${chapter.id} should include at least four chapter-level interview questions`
  );
}

assert.ok(
  Array.isArray(capstone.qa) && capstone.qa.length >= 250,
  "Angular capstone chapter should include the restored legacy interview bank plus the new capstone prompts"
);

const capstoneLevels = new Set(capstone.qa.map((item) => item.level));
assert.ok(capstoneLevels.has("basic"));
assert.ok(capstoneLevels.has("intermediate"));
assert.ok(capstoneLevels.has("advanced"));
assert.ok(capstoneLevels.has("expert"));

const capstoneQuestions = new Set(capstone.qa.map((item) => item.question));
assert.ok(capstoneQuestions.has("What is an Angular module (NgModule)?"));
assert.ok(capstoneQuestions.has("Why did Angular shift to Standalone Components?"));
