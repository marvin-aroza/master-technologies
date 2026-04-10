import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "css.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const totalQa = topic.sections.reduce((sum, section) => sum + ((section.qa || []).length), 0);
assert.ok(totalQa >= 130, "css topic should keep a large combined interview bank");

const finalSection = topic.sections.at(-1);
assert.ok(
  Array.isArray(finalSection.qa) && finalSection.qa.length >= 60,
  "final css capstone should retain a substantial interview bank"
);

for (const section of topic.sections.slice(0, -1)) {
  assert.ok(
    Array.isArray(section.qa) && section.qa.length >= 5,
    `${section.id} should include chapter-level interview reinforcement`
  );
}

const distributedQuestions = new Set(
  topic.sections.slice(0, -1).flatMap((section) => (section.qa || []).map((item) => item.question))
);

assert.ok(
  distributedQuestions.has("What does box-sizing: border-box do?"),
  "chapter coverage should restore the legacy box-sizing interview question"
);
assert.ok(
  distributedQuestions.has("What is z-index?"),
  "chapter coverage should restore the legacy z-index interview question"
);
assert.ok(
  distributedQuestions.has("How do you align items in Flexbox?"),
  "chapter coverage should restore the legacy Flexbox alignment interview question"
);
assert.ok(
  distributedQuestions.has("What is BEM methodology?"),
  "chapter coverage should restore the legacy BEM interview question"
);
assert.ok(
  distributedQuestions.has("What are stacking contexts?"),
  "chapter coverage should restore the legacy stacking-context interview question"
);
assert.ok(
  distributedQuestions.has("What are container units?"),
  "chapter coverage should restore the legacy container-units interview question"
);
assert.ok(
  distributedQuestions.has("How does CSS Grid auto-placement work?"),
  "chapter coverage should restore the legacy grid mechanics interview question"
);

const capstoneQuestions = new Set(finalSection.qa.map((item) => item.question));
assert.ok(
  capstoneQuestions.has("What is the cascade in CSS?"),
  "the capstone should retain foundational CSS interview coverage"
);
assert.ok(
  capstoneQuestions.has("What is the difference between Flexbox and Grid?"),
  "the capstone should retain core layout comparison coverage"
);
assert.ok(
  capstoneQuestions.has("What is CSS containment?"),
  "the capstone should retain performance-oriented CSS coverage"
);
assert.ok(
  capstoneQuestions.has("What is CSS-in-JS?"),
  "the capstone should include ecosystem tradeoff coverage"
);
