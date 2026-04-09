import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const topicPath = join(repoRoot, "data", "topics", "html.json");
const topic = JSON.parse(readFileSync(topicPath, "utf8"));

const expectedTabs = [
  { id: "origins-standards-browser-parsing", label: "Origins & Parsing" },
  { id: "document-structure-head-body-metadata", label: "Document Structure" },
  { id: "text-semantics-links-urls-meaning", label: "Text & Links" },
  { id: "sectioning-landmarks-page-architecture", label: "Page Architecture" },
  { id: "lists-tables-data-markup", label: "Lists & Tables" },
  { id: "media-embeds-responsive-asset-markup", label: "Media & Assets" },
  { id: "forms-controls-validation-submission", label: "Forms & Validation" },
  { id: "interactive-html-dialog-popover-templates", label: "Interactive HTML" },
  { id: "custom-data-attributes-dom-hooks-integration", label: "Attributes & DOM Hooks" },
  { id: "architecture-anti-patterns-browser-quirks-interview-traps", label: "Architecture & Traps" },
  { id: "seo-search-facing-markup", label: "SEO" },
  { id: "accessibility-semantics-aria-form-accessibility", label: "Accessibility" },
  { id: "performance-resource-loading", label: "Performance" },
  { id: "native-browser-apis-platform-features-interview-mastery", label: "Platform APIs & Interviews" },
];

assert.equal(topic.id, "html");
assert.equal(topic.tabs.length, expectedTabs.length, "html topic should expose 14 mastery chapters");
assert.deepEqual(
  topic.tabs.map((tab) => tab.id),
  expectedTabs.map((tab) => tab.id),
  "tab ids should follow the approved HTML mastery flow"
);
assert.deepEqual(
  topic.tabs.map((tab) => tab.label),
  expectedTabs.map((tab) => tab.label),
  "tab labels should match the approved HTML mastery flow"
);
assert.equal(topic.sections.length, expectedTabs.length);
assert.deepEqual(
  topic.sections.map((section) => section.id),
  expectedTabs.map((tab) => tab.id),
  "section ids should match the approved HTML mastery flow"
);

assert.deepEqual(
  topic.heroStats,
  [
    { label: "Chapters", value: "14" },
    { label: "Interview", value: "Capstone Ready" },
    { label: "Coverage", value: "HTML+Applied" },
    { label: "Updated", value: "2026" },
  ],
  "hero stats should reflect the new HTML topic framing"
);

const forbiddenLegacyIds = [
  "html-sem",
  "html-tables-lists",
  "html-media",
  "html-advanced",
  "html-perf",
  "hc-a11y",
  "hc-modern",
  "css-2025",
  "web-perf",
  "html-tags",
  "hcs",
  "html-iq",
];

const sectionIds = topic.sections.map((section) => section.id);

for (const id of forbiddenLegacyIds) {
  assert.ok(!sectionIds.includes(id), `legacy section ${id} should be removed`);
}

const finalSection = topic.sections.at(-1);
assert.equal(finalSection.id, "native-browser-apis-platform-features-interview-mastery");
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
  "the restructured HTML skeleton should not keep legacy cards"
);
