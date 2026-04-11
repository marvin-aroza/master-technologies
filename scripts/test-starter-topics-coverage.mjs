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

const starterTopics = ["git", "terraform", "aws", "docker"];

for (const id of starterTopics) {
  const topic = JSON.parse(readFileSync(join(repoRoot, "data", "topics", `${id}.json`), "utf8"));
  const totalQa = topic.sections.reduce((sum, section) => sum + ((section.qa || []).length), 0);
  const finalQa = topic.sections.at(-1).qa?.length ?? 0;

  assert.ok(totalQa >= 75, `${id} should ship with a stronger starter interview bank`);
  assert.ok(finalQa >= 36, `${id} should ship with a stronger capstone interview bank`);

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

for (const importName of ["gitData", "terraformData", "awsData", "dockerData"]) {
  assert.match(routeSource, new RegExp(importName), `route map should import ${importName}`);
}

for (const routeId of ['"git"', '"terraform"', '"aws"', '"docker"']) {
  assert.match(routeSource, new RegExp(routeId), `route map should register ${routeId}`);
}

for (const href of ["/git", "/terraform", "/aws", "/docker"]) {
  assert.ok(homeSource.includes(`href: "${href}"`), `home page should include ${href}`);
}

const topicOrderChecks = [
  '{ id: "git"',
  '{ id: "docker"',
  '{ id: "aws"',
  '{ id: "terraform"',
];

for (const marker of topicOrderChecks) {
  assert.ok(topicPageSource.includes(marker), `TopicPage should include ${marker}`);
}

assert.ok(
  topicPageSource.indexOf('{ id: "javascript"') < topicPageSource.indexOf('{ id: "git"'),
  "Git should come after JavaScript in the topic order"
);
assert.ok(
  topicPageSource.indexOf('{ id: "angular"') < topicPageSource.indexOf('{ id: "docker"'),
  "Docker should come after Angular in the topic order"
);
assert.ok(
  topicPageSource.indexOf('{ id: "docker"') < topicPageSource.indexOf('{ id: "aws"'),
  "AWS should come after Docker in the topic order"
);
assert.ok(
  topicPageSource.indexOf('{ id: "aws"') < topicPageSource.indexOf('{ id: "terraform"'),
  "Terraform should come after AWS in the topic order"
);
