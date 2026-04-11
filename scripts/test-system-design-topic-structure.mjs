import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "system-design.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const expectedTabs = [
  { id: "system-design-foundations-requirements-tradeoffs", label: "Foundations & Tradeoffs" },
  { id: "client-server-architecture-request-lifecycles", label: "Client-Server & Requests" },
  { id: "application-architecture-state-data-flow", label: "App Architecture & State" },
  { id: "api-design-contracts-integration-patterns", label: "APIs & Contracts" },
  { id: "caching-cdn-edge-performance-layers", label: "Caching, CDN & Edge" },
  {
    id: "scalable-frontend-full-stack-product-architecture",
    label: "Frontend & Product Architecture",
  },
  { id: "real-time-systems-collaboration-event-driven-ux", label: "Real-Time & Event-Driven UX" },
  {
    id: "authentication-authorization-security-multi-tenancy",
    label: "Security & Multi-Tenancy",
  },
  { id: "databases-storage-models-indexing-search", label: "Databases & Search" },
  { id: "asynchronous-work-queues-jobs-workflow-design", label: "Queues, Jobs & Workflows" },
  { id: "reliability-resilience-failure-management", label: "Reliability & Failure" },
  { id: "observability-testing-rollouts-operations", label: "Observability & Operations" },
  {
    id: "global-scale-consistency-distributed-systems-tradeoffs",
    label: "Global Scale & Consistency",
  },
  { id: "architecture-case-studies-interview-mastery", label: "Case Studies & Interviews" },
];

assert.equal(topic.id, "system-design");
assert.equal(
  topic.tabs.length,
  expectedTabs.length,
  "system design topic should expose 14 mastery chapters"
);
assert.deepEqual(
  topic.tabs.map((tab) => tab.id),
  expectedTabs.map((tab) => tab.id),
  "tab ids should follow the approved System Design mastery flow"
);
assert.deepEqual(
  topic.tabs.map((tab) => tab.label),
  expectedTabs.map((tab) => tab.label),
  "tab labels should match the approved System Design mastery flow"
);
assert.equal(topic.sections.length, expectedTabs.length);
assert.deepEqual(
  topic.sections.map((section) => section.id),
  expectedTabs.map((tab) => tab.id),
  "section ids should match the approved System Design mastery flow"
);

assert.deepEqual(
  topic.heroStats,
  [
    { label: "Chapters", value: "14" },
    { label: "Interview", value: "Architecture + Capstone" },
    { label: "Coverage", value: "Frontend to Distributed Systems" },
    { label: "Updated", value: "2026" },
  ],
  "hero stats should reflect the new System Design topic framing"
);

const forbiddenLegacyIds = ["fsd-core", "sd-arch", "sd-data", "fsd-examples", "sd-mastery", "sd-cs", "fsd-iq"];

const tabIds = topic.tabs.map((tab) => tab.id);
const sectionIds = topic.sections.map((section) => section.id);

for (const id of forbiddenLegacyIds) {
  assert.ok(!tabIds.includes(id), `legacy tab ${id} should be removed`);
  assert.ok(!sectionIds.includes(id), `legacy section ${id} should be removed`);
}

const finalSection = topic.sections.at(-1);
assert.equal(finalSection.id, "architecture-case-studies-interview-mastery");
assert.ok(Array.isArray(finalSection.qa), "final chapter should include a capstone interview bank");
assert.ok(finalSection.qa.length >= 16, "final chapter should keep a meaningful capstone Q&A bank");

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
  "the restructured System Design topic should not keep legacy cards"
);
