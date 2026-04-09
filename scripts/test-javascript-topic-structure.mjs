import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "javascript.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const expectedTabs = [
  { id: "origins-ecmascript-runtimes", label: "Origins & Runtimes" },
  { id: "values-types-identity", label: "Values, Types & Identity" },
  { id: "variables-scope-closures", label: "Scope & Closures" },
  { id: "functions-invocation-mechanics", label: "Functions & Invocation" },
  { id: "objects-prototypes-classes", label: "Objects, Prototypes & Classes" },
  { id: "arrays-collections-iteration", label: "Collections & Iteration" },
  { id: "modules-tooling-project-structure", label: "Modules & Tooling" },
  { id: "asynchrony-event-loop", label: "Asynchrony & Event Loop" },
  { id: "browser-apis-dom-platform", label: "Browser APIs & DOM" },
  { id: "error-handling-defensive-coding", label: "Errors & Defensive Coding" },
  { id: "performance-memory", label: "Performance & Memory" },
  { id: "security-reliability", label: "Security & Reliability" },
  { id: "architecture-large-scale-javascript", label: "Architecture at Scale" },
  { id: "mastery-interview-readiness", label: "Mastery & Interviews" },
];

assert.equal(topic.id, "javascript");
assert.deepEqual(topic.tabs, expectedTabs);
assert.equal(topic.sections.length, expectedTabs.length);
assert.deepEqual(
  topic.sections.map((section) => section.id),
  expectedTabs.map((tab) => tab.id)
);

assert.ok(Array.isArray(topic.heroStats), "heroStats should be defined");
assert.equal(topic.heroStats.length, 4, "heroStats should expose the 4-card hero summary");
assert.deepEqual(
  topic.heroStats.find((stat) => stat.label === "Chapters"),
  { label: "Chapters", value: "14" }
);
assert.deepEqual(
  topic.heroStats.find((stat) => stat.label === "Updated"),
  { label: "Updated", value: "2026" }
);

const populatedChapterIds = new Set([
  "origins-ecmascript-runtimes",
  "values-types-identity",
  "variables-scope-closures",
  "functions-invocation-mechanics",
  "objects-prototypes-classes",
  "arrays-collections-iteration",
  "modules-tooling-project-structure",
  "asynchrony-event-loop",
]);

assert.ok(
  topic.sections.every((section) => {
    if (!Array.isArray(section.blocks)) {
      return false;
    }

    if (populatedChapterIds.has(section.id)) {
      return section.blocks.length > 0;
    }

    return section.blocks.length === 0;
  }),
  "Chapters 1-8 should be populated while the remaining chapters stay in skeleton form"
);
assert.ok(
  topic.sections.every((section) => !section.cards || section.cards.length === 0),
  "Task 5 should not carry forward legacy cards into the new skeleton"
);

const sectionsWithQA = topic.sections.filter((section) => (section.qa?.length ?? 0) > 0);
const coreQaStat = topic.heroStats.find((stat) => stat.label === "Core Q&A");

assert.deepEqual(
  sectionsWithQA.map((section) => section.id),
  ["mastery-interview-readiness"]
);
assert.ok(coreQaStat, "heroStats should include the Core Q&A summary");
assert.equal(coreQaStat.value, String(sectionsWithQA[0].qa.length));

const disallowedQuestionTitles = new Set([
  'What is the "any" type?',
  'What is the "unknown" type?',
  "What are Conditional Types?",
  "What is the `infer` keyword?",
  "What is a Discriminated Union?",
  'What is "Index Signature"?',
  "What does `as const` do (Const Assertions)?",
  'What is a "Branded Type" (Nominal Typing)?',
  'How do "Template Literal Types" work?',
  'What is "Distributive Conditional Types"?',
  "How do you extract the return type of a function dynamicallly?",
  'What is "Module Augmentation"?',
  'What are "Global Type Declarations" (`.d.ts`)?',
  'How does "Const Type Parameters" (``) work?',
  'What is "Exhaustiveness Checking"?',
  'What is the "Omit" vs "Exclude" utility type?',
  'How do you handle "Branded Strings" with Template Literals?',
  'What is "Structural" vs "Nominal" typing in depth?',
  'What is "Type Argument Inference" for functions?',
  'How do you handle "Recursive Conditional Types"?',
  'What is the "NoInfer" intrinsic type?',
  'Explain "String Mapping Types" (Uppercase, Lowercase, etc.).',
  'What is a "Global augmentation" vs "Module augmentation"?',
  'How does "Discriminated Union" Exhaustiveness with `default` work?',
]);

const disallowedContentMarkers = [
  /ReturnType</,
  /declare module/i,
  /\.d\.ts/i,
  /\bNoInfer\b/,
  /\bas const\b/,
  /Template Literal Types?/i,
  /const type parameters?/i,
  /conditional types?/i,
  /discriminated union/i,
  /branded strings?/i,
  /module augmentation/i,
  /global augmentation/i,
  /Omit</,
  /Exclude</,
  /Index Signature/i,
  /nominal typing/i,
  /type argument inference/i,
  /recursive conditional types?/i,
  /string mapping types?/i,
];

const tsHeavyQuestions = sectionsWithQA[0].qa.filter((item) => {
  const combinedText = `${item.question} ${item.answerHtml}`;
  return (
    disallowedQuestionTitles.has(item.question) ||
    disallowedContentMarkers.some((pattern) => pattern.test(combinedText))
  );
});

assert.deepEqual(
  tsHeavyQuestions.map((item) => item.question),
  [],
  "The JavaScript interview bank should not keep TypeScript-only legacy Q&A"
);

assert.ok(topic.tabs.every((tab) => !/TypeScript/i.test(tab.label)));
assert.ok(topic.tabs.every((tab) => !/Cheat Sheet/i.test(tab.label)));
