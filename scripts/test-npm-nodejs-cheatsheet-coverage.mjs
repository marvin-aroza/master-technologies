import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const routePath = join(repoRoot, "app", "[topic]", "page.tsx");
const homePath = join(repoRoot, "app", "page.tsx");
const topicPagePath = join(repoRoot, "components", "renderer", "TopicPage.tsx");

const routeSource = readFileSync(routePath, "utf8");
const homeSource = readFileSync(homePath, "utf8");
const topicPageSource = readFileSync(topicPagePath, "utf8");

for (const id of ["npm", "nodejs"]) {
  const topic = JSON.parse(readFileSync(join(repoRoot, "data", "topics", `${id}.json`), "utf8"));
  const totalQa = topic.sections.reduce((sum, section) => sum + ((section.qa || []).length), 0);
  const finalQa = topic.sections.at(-1).qa?.length ?? 0;

  assert.ok(totalQa >= 90, `${id} should ship with a strong launch interview bank`);
  assert.ok(finalQa >= 36, `${id} should ship with a strong capstone interview bank`);

  for (const section of topic.sections.slice(0, -1)) {
    assert.ok(
      Array.isArray(section.qa) && section.qa.length >= 3,
      `${id}/${section.id} should include chapter-level interview reinforcement`
    );
  }

  for (const section of topic.sections.slice(0, 4)) {
    assert.ok(section.blocks.length >= 4, `${id}/${section.id} should have stronger foundational coverage`);
  }
}

const cheatSheet = JSON.parse(readFileSync(join(repoRoot, "data", "topics", "frontend-cheat-sheet.json"), "utf8"));
const cheatSheetTotalQa = cheatSheet.sections.reduce((sum, section) => sum + ((section.qa || []).length), 0);
const cheatSheetFinalQa = cheatSheet.sections.at(-1).qa?.length ?? 0;

assert.ok(cheatSheetTotalQa >= 45, "frontend cheat sheet should ship with strong rapid-fire interview coverage");
assert.ok(cheatSheetFinalQa >= 18, "frontend cheat sheet should end with a stronger rapid-fire capstone bank");

for (const section of cheatSheet.sections.slice(0, -1)) {
  assert.ok(
    Array.isArray(section.qa) && section.qa.length >= 2,
    `frontend-cheat-sheet/${section.id} should include section-level quick recall questions`
  );
}

for (const section of cheatSheet.sections.slice(0, 6)) {
  assert.ok(section.blocks.length >= 3, `frontend-cheat-sheet/${section.id} should feel dense and revision-friendly`);
}

for (const importName of ["npmData", "nodejsData", "frontendCheatSheetData"]) {
  assert.match(routeSource, new RegExp(importName), `route map should import ${importName}`);
}

for (const routeId of ['"npm"', '"nodejs"', '"frontend-cheat-sheet"']) {
  assert.match(routeSource, new RegExp(routeId), `route map should register ${routeId}`);
}

for (const href of ["/npm", "/nodejs", "/frontend-cheat-sheet"]) {
  assert.ok(homeSource.includes(`href: "${href}"`), `home page should include ${href}`);
}

for (const marker of ['{ id: "npm"', '{ id: "nodejs"', '{ id: "frontend-cheat-sheet"']) {
  assert.ok(topicPageSource.includes(marker), `TopicPage should include ${marker}`);
}

assert.ok(
  topicPageSource.indexOf('{ id: "git"') < topicPageSource.indexOf('{ id: "npm"'),
  "npm should come after Git in the topic order"
);
assert.ok(
  topicPageSource.indexOf('{ id: "npm"') < topicPageSource.indexOf('{ id: "nodejs"'),
  "Node.js should come after npm in the topic order"
);
assert.ok(
  topicPageSource.indexOf('{ id: "uxui"') < topicPageSource.indexOf('{ id: "frontend-cheat-sheet"'),
  "Frontend Cheat Sheet should come after UX/UI in the topic order"
);
