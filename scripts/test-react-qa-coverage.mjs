import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "react.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const qaCountBySection = new Map(
  topic.sections.map((section) => [section.id, Array.isArray(section.qa) ? section.qa.length : 0])
);

const totalQa = topic.sections.reduce((sum, section) => sum + (section.qa?.length ?? 0), 0);

assert.equal(totalQa, 104, "react topic should expose a very deep interview bank across the full track");

const chapterIdsWithDistributedInterviewCoverage = [
  "react-origins-mental-model",
  "jsx-elements-render-tree",
  "components-props-composition",
  "rendering-commit-state-snapshot",
  "state-ownership-preserving-resetting",
  "events-effects-escape-hatches",
  "refs-dom-imperative-apis",
  "context-reducers-external-stores",
  "async-ui-suspense-data-boundaries",
  "forms-actions-optimistic-mutations",
  "performance-compiler-render-tradeoffs",
  "server-components-directives-boundaries",
  "testing-accessibility-reliability"
];

for (const id of chapterIdsWithDistributedInterviewCoverage) {
  assert.ok(
    (qaCountBySection.get(id) ?? 0) >= 4,
    `${id} should include chapter-specific interview questions`
  );
}

assert.equal(
  qaCountBySection.get("architecture-ecosystem-interview-mastery"),
  52,
  "the final chapter should keep a large expert-heavy capstone interview bank"
);

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

assert.ok(
  sectionById.get("react-origins-mental-model").qa.some(
    (item) => item.question === "What is declarative UI in React?"
  ),
  "chapter 1 should include a declarative UI question"
);

assert.ok(
  sectionById.get("events-effects-escape-hatches").qa.some(
    (item) => item.question === "What is the difference between an event handler and an Effect in React?"
  ),
  "chapter 6 should include event-vs-Effect interview coverage"
);

assert.ok(
  sectionById.get("async-ui-suspense-data-boundaries").qa.some(
    (item) => item.question === "What is Suspense for in React?"
  ),
  "chapter 9 should include Suspense interview coverage"
);

assert.ok(
  sectionById.get("server-components-directives-boundaries").qa.some(
    (item) => item.question === "What does the 'use client' directive actually mark?"
  ),
  "chapter 12 should include server-boundary interview coverage"
);
