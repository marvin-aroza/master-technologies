import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "javascript.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter12 = sectionById.get("security-reliability");
const chapter13 = sectionById.get("architecture-large-scale-javascript");
const chapter14 = sectionById.get("mastery-interview-readiness");

function getBlockByTitle(chapter, title) {
  return chapter.blocks.find((block) => block.title === title);
}

function expectBlock(chapter, title, type) {
  const block = getBlockByTitle(chapter, title);
  assert.ok(block, `expected "${title}" block to exist`);
  assert.equal(block.type, type, `"${title}" should be a ${type} block`);
}

assert.ok(chapter12, "chapter 12 should exist");
assert.ok(chapter13, "chapter 13 should exist");
assert.ok(chapter14, "chapter 14 should exist");

assert.ok(chapter12.blocks.length >= 5, "chapter 12 should contain a substantial set of learning blocks");
assert.ok(chapter13.blocks.length >= 5, "chapter 13 should contain a substantial set of learning blocks");
assert.ok(chapter14.blocks.length >= 4, "chapter 14 should contain mastery blocks in addition to interview Q&A");

expectBlock(chapter12, "Unsafe DOM insertion and XSS", "richText");
expectBlock(chapter12, "textContent vs innerHTML vs insertAdjacentHTML", "compare");
expectBlock(chapter12, "Prototype pollution awareness", "richText");
expectBlock(chapter12, "eval() and Function() hazards", "richText");
expectBlock(chapter12, "Safer data handling", "richText");
expectBlock(chapter12, "Origin boundaries, cookies, and CSRF", "richText");
expectBlock(chapter12, "Drill: spot the injection sink", "drill");

expectBlock(chapter13, "State modeling before UI wiring", "richText");
expectBlock(chapter13, "Pure functions vs side effects", "compare");
expectBlock(chapter13, "Modularity and file boundaries", "richText");
expectBlock(chapter13, "Event-driven design without chaos", "richText");
expectBlock(chapter13, "Drill: choose the architectural boundary", "drill");

expectBlock(chapter14, "Fast recall anchors", "recap");
expectBlock(chapter14, "Explain it like an interviewer asked badly", "compare");
expectBlock(chapter14, "Debugging prompt: explain the bug", "drill");
expectBlock(chapter14, "Capstone mental checklist", "recap");

assert.ok(chapter14.qa.length >= 15, "chapter 14 should retain a substantial interview bank");

const retainedQuestions = new Set(chapter14.qa.map((item) => item.question));
assert.ok(retainedQuestions.has("What is the event loop?"));
assert.ok(retainedQuestions.has("What is the difference between macrotasks and microtasks?"));
assert.ok(retainedQuestions.has("What is prototypal inheritance?"));
assert.ok(retainedQuestions.has("What causes memory leaks in JS?"));
assert.ok(retainedQuestions.has("What is `Promise.withResolvers()`?"));
assert.ok(retainedQuestions.has("Why does CORS not stop CSRF?"));
assert.ok(retainedQuestions.has("What is the difference between escaping, sanitizing, and validating input?"));
assert.ok(retainedQuestions.has("How can prototype pollution happen in JavaScript apps?"));
assert.ok(retainedQuestions.has("How would you separate pure logic from side effects in a JavaScript feature?"));
assert.ok(retainedQuestions.has("When should you prefer events over direct function calls in architecture?"));

const disallowedMasteryQuestions = new Set([
  'What is the "void" vs "never" type?',
  "What is keyof?",
  "What does `strict: true` do in tsconfig.json?",
  'Explain "Shadow Realms" (Proposed).',
  'Explain the "Pipeline Operator" (`|>`) proposal.',
]);

assert.deepEqual(
  chapter14.qa
    .filter((item) => disallowedMasteryQuestions.has(item.question))
    .map((item) => item.question),
  [],
  "chapter 14 should keep the mastery bank JavaScript-focused and free of stale TS/proposal-only prompts"
);

const finalBatchText = JSON.stringify([chapter12, chapter13, chapter14]);
assert.ok(
  !/â€œ|â€|â€”|â†’/.test(finalBatchText),
  "chapters 12-14 should not ship mojibake or broken encoding artifacts"
);
