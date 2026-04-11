import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topic = JSON.parse(
  readFileSync(join(repoRoot, "data", "topics", "data-structures-algorithms.json"), "utf8")
);

const routeSource = readFileSync(join(repoRoot, "app", "[topic]", "page.tsx"), "utf8");
const homeSource = readFileSync(join(repoRoot, "app", "page.tsx"), "utf8");
const topicPageSource = readFileSync(join(repoRoot, "components", "renderer", "TopicPage.tsx"), "utf8");
const topNavSource = readFileSync(join(repoRoot, "components", "TopNav.tsx"), "utf8");
const sidebarSource = readFileSync(join(repoRoot, "components", "Sidebar.tsx"), "utf8");

const totalQa = topic.sections.reduce((sum, section) => sum + ((section.qa || []).length), 0);
const finalQa = topic.sections.at(-1).qa?.length ?? 0;

assert.ok(totalQa >= 100, "DSA should ship with a serious interview bank");
assert.ok(finalQa >= 48, "DSA should ship with a strong capstone interview bank");

for (const section of topic.sections.slice(0, -1)) {
  assert.ok(section.qa.length >= 4, `${section.id} should include chapter-level interview reinforcement`);
  assert.ok(section.blocks.length >= 6, `${section.id} should include layered mastery content`);
}

for (const section of topic.sections.slice(0, 4)) {
  assert.ok(section.blocks.length >= 7, `${section.id} should have especially strong foundational coverage`);
}

assert.match(routeSource, /dataStructuresAlgorithmsData/, "route map should import the DSA topic data");
assert.match(routeSource, /"data-structures-algorithms"/, "route map should register the DSA slug");

for (const source of [homeSource, topNavSource, sidebarSource]) {
  assert.ok(source.includes('"/data-structures-algorithms"') || source.includes('href: "/data-structures-algorithms"'), "navigation surfaces should include the DSA route");
}

assert.ok(homeSource.includes('id: "computer-science"'), "home page should expose a Computer Science group");
assert.ok(topicPageSource.includes('{ id: "data-structures-algorithms"'), "topic order should include DSA");
assert.ok(
  topicPageSource.indexOf('{ id: "npm"') < topicPageSource.indexOf('{ id: "data-structures-algorithms"'),
  "DSA should come after npm in the study order"
);
assert.ok(
  topicPageSource.indexOf('{ id: "data-structures-algorithms"') < topicPageSource.indexOf('{ id: "python"'),
  "Python should come after DSA in the study order"
);
