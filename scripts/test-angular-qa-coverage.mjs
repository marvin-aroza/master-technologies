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

assert.ok(totalQuestions >= 80, "Angular topic should expose a large interview bank");

for (const chapter of chapters.slice(0, -1)) {
  assert.ok(
    Array.isArray(chapter.qa) && chapter.qa.length >= 4,
    `${chapter.id} should include at least four chapter-level interview questions`
  );
}

assert.ok(
  Array.isArray(capstone.qa) && capstone.qa.length >= 24,
  "Angular capstone chapter should include a deep final interview bank"
);

const capstoneLevels = new Set(capstone.qa.map((item) => item.level));
assert.ok(capstoneLevels.has("basic"));
assert.ok(capstoneLevels.has("intermediate"));
assert.ok(capstoneLevels.has("advanced"));
assert.ok(capstoneLevels.has("expert"));
