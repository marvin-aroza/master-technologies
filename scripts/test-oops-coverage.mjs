import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topic = JSON.parse(readFileSync(join(repoRoot, "data", "topics", "oops.json"), "utf8"));

const routeSource = readFileSync(join(repoRoot, "app", "[topic]", "page.tsx"), "utf8");
const homeSource = readFileSync(join(repoRoot, "app", "page.tsx"), "utf8");
const topicPageSource = readFileSync(join(repoRoot, "components", "renderer", "TopicPage.tsx"), "utf8");
const topNavSource = readFileSync(join(repoRoot, "components", "TopNav.tsx"), "utf8");
const sidebarSource = readFileSync(join(repoRoot, "components", "Sidebar.tsx"), "utf8");

const totalQa = topic.sections.reduce((sum, section) => sum + ((section.qa || []).length), 0);
const finalQa = topic.sections.at(-1).qa?.length ?? 0;

assert.ok(totalQa >= 100, "OOPS should ship with a serious interview bank");
assert.ok(finalQa >= 48, "OOPS should ship with a strong capstone interview bank");

for (const section of topic.sections.slice(0, -1)) {
  assert.ok(section.qa.length >= 4, `${section.id} should include chapter-level interview reinforcement`);
  assert.ok(section.blocks.length >= 6, `${section.id} should include layered mastery content`);
}

for (const section of topic.sections.slice(0, 4)) {
  assert.ok(section.blocks.length >= 7, `${section.id} should have especially strong foundational coverage`);
}

assert.match(routeSource, /oopsData/, "route map should import the OOPS topic data");
assert.match(routeSource, /"oops"/, "route map should register the OOPS slug");

for (const source of [homeSource, topNavSource, sidebarSource]) {
  assert.ok(source.includes('"/oops"') || source.includes('href: "/oops"'), "navigation surfaces should include the OOPS route");
}

assert.ok(homeSource.includes('id: "computer-science"'), "home page should still expose a Computer Science group");
assert.ok(topicPageSource.includes('{ id: "oops"'), "topic order should include OOPS");
assert.ok(
  topicPageSource.indexOf('{ id: "data-structures-algorithms"') < topicPageSource.indexOf('{ id: "oops"'),
  "OOPS should come after DSA in the study order"
);
assert.ok(
  topicPageSource.indexOf('{ id: "oops"') < topicPageSource.indexOf('{ id: "python"'),
  "Python should come after OOPS in the study order"
);
