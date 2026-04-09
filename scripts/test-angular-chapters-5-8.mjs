import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "angular.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const sectionById = new Map(topic.sections.map((section) => [section.id, section]));

const chapter5 = sectionById.get("dependency-injection-providers-application-architecture");
const chapter6 = sectionById.get("component-composition-directives-pipes-view-queries");
const chapter7 = sectionById.get("routing-route-data-guards-navigation");
const chapter8 = sectionById.get("http-resources-interceptors-data-access");

for (const [index, chapter] of [chapter5, chapter6, chapter7, chapter8].entries()) {
  assert.ok(chapter, `chapter ${index + 5} should exist`);
  assert.ok(
    chapter.blocks.length >= 7,
    `chapter ${index + 5} should contain a substantial block set`
  );
  assert.ok(
    Array.isArray(chapter.qa) && chapter.qa.length >= 4,
    `chapter ${index + 5} should include chapter-level interview questions`
  );
}

const chapter5Titles = chapter5.blocks.map((block) => block.title ?? "");
assert.ok(chapter5Titles.includes("Angular DI is a lifetime and boundary system"));
assert.ok(chapter5Titles.includes("EnvironmentInjector vs ElementInjector"));
assert.ok(chapter5Titles.includes("Drill: choose the injector boundary"));

const chapter6Titles = chapter6.blocks.map((block) => block.title ?? "");
assert.ok(chapter6Titles.includes("Angular composition is bigger than parent-child components"));
assert.ok(chapter6Titles.includes("Component vs attribute directive vs pipe"));
assert.ok(chapter6Titles.includes("Drill: choose the right composition primitive"));

const chapter7Titles = chapter7.blocks.map((block) => block.title ?? "");
assert.ok(chapter7Titles.includes("Angular routing is a feature composition system"));
assert.ok(chapter7Titles.includes("Guard vs resolver vs component-side fetch"));
assert.ok(chapter7Titles.includes("Guards improve UX, but they are not your security boundary"));
assert.ok(chapter7Titles.includes("Drill: choose the routing strategy"));

const chapter8Titles = chapter8.blocks.map((block) => block.title ?? "");
assert.ok(chapter8Titles.includes("HttpClient remains the stable backbone of Angular data access"));
assert.ok(chapter8Titles.includes("HttpClient service layer vs httpResource"));
assert.ok(chapter8Titles.includes("How an interceptor chain works"));
assert.ok(chapter8Titles.includes("Drill: choose the right HTTP abstraction"));

assert.ok(
  [chapter5, chapter6, chapter7, chapter8].every((chapter) =>
    chapter.blocks.some((block) => block.type === "drill")
  ),
  "chapters 5 through 8 should each include a drill block"
);

assert.ok(
  [chapter5, chapter6, chapter7, chapter8].every((chapter) =>
    chapter.blocks.some((block) => block.type === "trap")
  ),
  "chapters 5 through 8 should each include a trap block"
);

assert.ok(
  [chapter5, chapter6, chapter7, chapter8].every((chapter) =>
    chapter.blocks.some((block) => block.type === "compare")
  ),
  "chapters 5 through 8 should each include a compare block"
);

assert.ok(
  [chapter5, chapter6, chapter7, chapter8].every((chapter) =>
    chapter.blocks.some((block) => block.type === "mechanics")
  ),
  "chapters 5 through 8 should each include a mechanics block"
);

assert.ok(
  [chapter5, chapter6, chapter7, chapter8].every((chapter) =>
    chapter.blocks.some((block) => block.type === "recap")
  ),
  "chapters 5 through 8 should each include a recap block"
);

assert.ok(
  [chapter5, chapter6, chapter7, chapter8].every((chapter) =>
    chapter.blocks.some((block) => block.type === "code")
  ),
  "chapters 5 through 8 should each include a concrete code example"
);

assert.ok(
  chapter8.blocks.some(
    (block) =>
      block.type === "compare" && block.title === "HttpClient service layer vs httpResource"
  ),
  "chapter 8 should explicitly separate stable HttpClient architecture from experimental httpResource"
);
