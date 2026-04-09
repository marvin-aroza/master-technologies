import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "angular.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const expectedTabs = [
  { id: "origins-versions-platform-model", label: "Origins & Platform Model" },
  { id: "bootstrapping-standalone-project-structure", label: "Standalone Architecture" },
  { id: "components-templates-built-in-control-flow", label: "Components & Templates" },
  { id: "signals-reactivity-change-detection", label: "Signals & Change Detection" },
  { id: "dependency-injection-providers-application-architecture", label: "DI & Architecture" },
  { id: "component-composition-directives-pipes-view-queries", label: "Composition & Directives" },
  { id: "routing-route-data-guards-navigation", label: "Routing & Navigation" },
  { id: "http-resources-interceptors-data-access", label: "HTTP & Data Access" },
  { id: "forms-validation-submission-flows", label: "Forms & Validation" },
  { id: "rxjs-interop-state-management-async-architecture", label: "RxJS & State" },
  { id: "testing-debugging-reliability", label: "Testing & Reliability" },
  { id: "ssr-hydration-hybrid-rendering-performance", label: "SSR & Performance" },
  {
    id: "build-tooling-security-accessibility-i18n-deployment",
    label: "Tooling & Hardening",
  },
  { id: "ecosystem-migration-interview-mastery", label: "Ecosystem & Interviews" },
];

assert.equal(topic.id, "angular");
assert.equal(topic.tabs.length, expectedTabs.length, "angular topic should expose 14 mastery chapters");
assert.deepEqual(
  topic.tabs.map((tab) => tab.id),
  expectedTabs.map((tab) => tab.id),
  "tab ids should follow the approved Angular mastery flow"
);
assert.deepEqual(
  topic.tabs.map((tab) => tab.label),
  expectedTabs.map((tab) => tab.label),
  "tab labels should match the approved Angular mastery flow"
);
assert.equal(topic.sections.length, expectedTabs.length);
assert.deepEqual(
  topic.sections.map((section) => section.id),
  expectedTabs.map((tab) => tab.id),
  "section ids should match the approved Angular mastery flow"
);

assert.deepEqual(
  topic.heroStats,
  [
    { label: "Chapters", value: "14" },
    { label: "Interview", value: "Capstone Ready" },
    { label: "Coverage", value: "Standalone+Signals" },
    { label: "Updated", value: "2026" },
  ],
  "hero stats should reflect the new Angular topic framing"
);

const forbiddenLegacyIds = [
  "core",
  "comp",
  "tmpl",
  "di",
  "data",
  "rxjs",
  "routing",
  "forms",
  "pipes",
  "signals",
  "perf",
  "testing",
  "ssr",
  "state-management",
  "material-cdk",
  "angular-animations",
  "i18n-l10n",
  "build-security-a11y",
  "pwa-sw",
  "micro-frontends",
  "v21",
  "cs",
  "iq",
];

const sectionIds = topic.sections.map((section) => section.id);

for (const id of forbiddenLegacyIds) {
  assert.ok(!sectionIds.includes(id), `legacy section ${id} should be removed`);
}

const finalSection = topic.sections.at(-1);
assert.equal(finalSection.id, "ecosystem-migration-interview-mastery");
assert.ok(Array.isArray(finalSection.qa), "final chapter should include a capstone interview bank");
assert.ok(finalSection.qa.length >= 12, "final chapter should keep a meaningful capstone Q&A bank");

for (const section of topic.sections) {
  assert.ok(
    typeof section.intro === "string" && section.intro.trim().length > 0,
    `${section.id} should remain navigable with a visible intro`
  );
  assert.ok(Array.isArray(section.blocks), `${section.id} should define a blocks array`);
  assert.ok(section.blocks.length >= 1, `${section.id} should expose at least one scaffold block`);
}

assert.ok(
  topic.sections.every((section) => !section.cards || section.cards.length === 0),
  "the restructured Angular skeleton should not keep legacy cards"
);
