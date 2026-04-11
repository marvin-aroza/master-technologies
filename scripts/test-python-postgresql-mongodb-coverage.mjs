import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const routePath = join(repoRoot, "app", "[topic]", "page.tsx");
const homePath = join(repoRoot, "app", "page.tsx");
const topicPagePath = join(repoRoot, "components", "renderer", "TopicPage.tsx");
const topNavPath = join(repoRoot, "components", "TopNav.tsx");
const sidebarPath = join(repoRoot, "components", "Sidebar.tsx");

const routeSource = readFileSync(routePath, "utf8");
const homeSource = readFileSync(homePath, "utf8");
const topicPageSource = readFileSync(topicPagePath, "utf8");
const topNavSource = readFileSync(topNavPath, "utf8");
const sidebarSource = readFileSync(sidebarPath, "utf8");

const specs = [
  { id: "python", totalQaMin: 120, finalQaMin: 40, blocksMin: 4 },
  { id: "postgresql", totalQaMin: 110, finalQaMin: 40, blocksMin: 4 },
  { id: "mongodb", totalQaMin: 100, finalQaMin: 36, blocksMin: 4 },
];

for (const spec of specs) {
  const topic = JSON.parse(readFileSync(join(repoRoot, "data", "topics", `${spec.id}.json`), "utf8"));
  const totalQa = topic.sections.reduce((sum, section) => sum + ((section.qa || []).length), 0);
  const finalQa = topic.sections.at(-1).qa?.length ?? 0;

  assert.ok(totalQa >= spec.totalQaMin, `${spec.id} should ship with a deep interview bank`);
  assert.ok(finalQa >= spec.finalQaMin, `${spec.id} should ship with a strong capstone interview bank`);

  for (const section of topic.sections.slice(0, -1)) {
    assert.ok(
      Array.isArray(section.qa) && section.qa.length >= 3,
      `${spec.id}/${section.id} should include chapter-level interview reinforcement`
    );
  }

  for (const section of topic.sections.slice(0, 4)) {
    assert.ok(section.blocks.length >= spec.blocksMin, `${spec.id}/${section.id} should have stronger foundational coverage`);
  }
}

for (const importName of ["pythonData", "postgresqlData", "mongodbData"]) {
  assert.match(routeSource, new RegExp(importName), `route map should import ${importName}`);
}

for (const routeId of ['"python"', '"postgresql"', '"mongodb"']) {
  assert.match(routeSource, new RegExp(routeId), `route map should register ${routeId}`);
}

for (const href of ["/python", "/postgresql", "/mongodb"]) {
  assert.ok(homeSource.includes(`href: "${href}"`), `home page should include ${href}`);
  assert.ok(topNavSource.includes(`href="${href}"`) || topNavSource.includes(`href: "${href}"`) || topNavSource.includes(`"${href}"`), `TopNav should include ${href}`);
  assert.ok(sidebarSource.includes(`href: "${href}"`) || sidebarSource.includes(`"${href}"`), `Sidebar should include ${href}`);
}

for (const marker of ['{ id: "python"', '{ id: "postgresql"', '{ id: "mongodb"']) {
  assert.ok(topicPageSource.includes(marker), `TopicPage should include ${marker}`);
}

assert.ok(
  topicPageSource.indexOf('{ id: "npm"') < topicPageSource.indexOf('{ id: "python"'),
  "Python should come after npm in the topic order"
);
assert.ok(
  topicPageSource.indexOf('{ id: "python"') < topicPageSource.indexOf('{ id: "nodejs"'),
  "Node.js should come after Python in the topic order"
);
assert.ok(
  topicPageSource.indexOf('{ id: "angular"') < topicPageSource.indexOf('{ id: "postgresql"'),
  "PostgreSQL should come after Angular in the topic order"
);
assert.ok(
  topicPageSource.indexOf('{ id: "postgresql"') < topicPageSource.indexOf('{ id: "mongodb"'),
  "MongoDB should come after PostgreSQL in the topic order"
);
assert.ok(
  topicPageSource.indexOf('{ id: "mongodb"') < topicPageSource.indexOf('{ id: "docker"'),
  "Docker should come after MongoDB in the topic order"
);
