import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "nextjs.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const expectedTabs = [
  { id: "origins-philosophy-runtime-model", label: "Origins & Runtime Model" },
  { id: "app-router-file-system-architecture", label: "App Router Architecture" },
  { id: "server-client-component-boundaries", label: "Server vs Client Boundaries" },
  { id: "navigation-layout-persistence-metadata", label: "Navigation & Metadata" },
  { id: "data-fetching-server-data-ownership", label: "Data Fetching & Ownership" },
  { id: "cache-components-use-cache-revalidation", label: "Cache & Revalidation" },
  { id: "rendering-streaming-partial-prerendering", label: "Rendering & PPR" },
  { id: "server-functions-forms-mutations", label: "Server Functions & Mutations" },
  { id: "request-lifecycle-proxy-cookies-headers-auth", label: "Request Lifecycle & Auth" },
  { id: "apis-databases-full-stack-integration", label: "APIs & Full-Stack" },
  { id: "performance-assets-build-tooling", label: "Performance & Tooling" },
  { id: "security-reliability-production-hardening", label: "Security & Hardening" },
  { id: "deployment-runtimes-self-hosting-scale", label: "Deployment & Scale" },
  { id: "migration-architecture-interview-mastery", label: "Migration & Interviews" },
];

assert.equal(topic.id, "nextjs");
assert.equal(topic.tabs.length, expectedTabs.length, "nextjs topic should expose 14 mastery chapters");
assert.deepEqual(
  topic.tabs.map((tab) => tab.id),
  expectedTabs.map((tab) => tab.id),
  "tab ids should follow the approved Next.js mastery flow"
);
assert.deepEqual(
  topic.tabs.map((tab) => tab.label),
  expectedTabs.map((tab) => tab.label),
  "tab labels should match the approved Next.js mastery flow"
);
assert.equal(topic.sections.length, expectedTabs.length);
assert.deepEqual(
  topic.sections.map((section) => section.id),
  expectedTabs.map((tab) => tab.id),
  "section ids should match the approved Next.js mastery flow"
);

assert.deepEqual(
  topic.heroStats,
  [
    { label: "Chapters", value: "14" },
    { label: "Interview", value: "Capstone Ready" },
    { label: "Coverage", value: "App Router+Full Stack" },
    { label: "Updated", value: "2026" },
  ],
  "hero stats should reflect the new Next.js topic framing"
);

const forbiddenLegacyIds = [
  "n-core",
  "n-render",
  "n-app",
  "next-app-router",
  "n-data",
  "n-mid-auth",
  "next-auth-db",
  "n-deploy",
  "n-advanced",
  "next-optimization",
  "n-16",
  "ncs",
  "iq-next",
];

const sectionIds = topic.sections.map((section) => section.id);

for (const id of forbiddenLegacyIds) {
  assert.ok(!sectionIds.includes(id), `legacy section ${id} should be removed`);
}

const finalSection = topic.sections.at(-1);
assert.equal(finalSection.id, "migration-architecture-interview-mastery");
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
  "the restructured Next.js skeleton should not keep legacy cards"
);
