import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "system-design.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const totalQa = topic.sections.reduce((sum, section) => sum + ((section.qa || []).length), 0);
assert.ok(totalQa >= 120, "system design topic should keep a large combined interview bank");

const finalSection = topic.sections.at(-1);
assert.ok(finalSection.qa.length >= 50, "final system design capstone should retain a substantial interview bank");

for (const section of topic.sections.slice(0, -1)) {
  assert.ok(
    Array.isArray(section.qa) && section.qa.length >= 4,
    `${section.id} should include chapter-level interview reinforcement`
  );
}

const questionSet = new Set(finalSection.qa.map((item) => item.question));
assert.ok(questionSet.has("Explain the CAP Theorem."));
assert.ok(questionSet.has("What is Database Sharding?"));
assert.ok(questionSet.has("What is CQRS (Command Query Responsibility Segregation)?"));
assert.ok(questionSet.has("What is a \"Circuit Breaker\" in microservices?"));
