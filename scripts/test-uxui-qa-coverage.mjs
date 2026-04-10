import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "uxui.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const totalQa = topic.sections.reduce((sum, section) => sum + ((section.qa || []).length), 0);
assert.ok(totalQa >= 120, "uxui topic should keep a large combined interview bank");

const finalSection = topic.sections.at(-1);
assert.ok(finalSection.qa.length >= 60, "final uxui capstone should retain a substantial interview bank");

for (const section of topic.sections.slice(0, -1)) {
  assert.ok(
    Array.isArray(section.qa) && section.qa.length >= 4,
    `${section.id} should include chapter-level interview reinforcement`
  );
}

const questionSet = new Set(finalSection.qa.map((item) => item.question));
assert.ok(questionSet.has("What is the difference between UX and UI?"));
assert.ok(questionSet.has("How would you critique a confusing checkout flow?"));
assert.ok(questionSet.has("What is a design token?"));
assert.ok(questionSet.has("How do you decide between a modal, drawer, and inline edit flow?"));
