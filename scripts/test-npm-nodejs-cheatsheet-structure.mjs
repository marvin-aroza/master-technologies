import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));

const masterySpecs = [
  {
    file: "npm.json",
    id: "npm",
    tabs: [
      ["npm-ecosystem-registries-package-management", "Ecosystem & Registries"],
      ["package-json-scripts-metadata-bootstrapping", "package.json & Scripts"],
      ["dependency-types-peer-optional-dev", "Dependency Types"],
      ["semver-version-ranges-lockfiles", "Semver & Lockfiles"],
      ["install-update-dedupe-prune-resolution", "Install & Resolution"],
      ["workspaces-monorepos-local-linking", "Workspaces & Monorepos"],
      ["npx-binaries-clis-script-orchestration", "npx & CLIs"],
      ["publishing-scopes-tags-release-flows", "Publishing & Releases"],
      ["security-audit-provenance-supply-chain", "Security & Provenance"],
      ["caching-offline-registries-mirrors", "Caching & Registries"],
      ["troubleshooting-installs-conflicts", "Troubleshooting"],
      ["performance-repo-hygiene-scale", "Performance & Hygiene"],
      ["team-workflows-ci-package-strategy", "Team Workflows & CI"],
      ["interview-mastery-real-world-debugging", "Interviews & Debugging"],
    ],
  },
  {
    file: "nodejs.json",
    id: "nodejs",
    tabs: [
      ["nodejs-runtime-v8-libuv-architecture", "Runtime Architecture"],
      ["modules-commonjs-esm-resolution-packaging", "Modules & Packaging"],
      ["event-loop-timers-microtasks-async", "Event Loop & Async"],
      ["process-env-cli-runtime-lifecycle", "Process & Lifecycle"],
      ["filesystem-paths-streams-buffers", "Filesystem & Streams"],
      ["http-servers-networking-sockets-requests", "HTTP & Networking"],
      ["backend-patterns-api-architecture", "Backend Patterns"],
      ["databases-queues-jobs-external-services", "Data & Jobs"],
      ["child-processes-workers-clustering-concurrency", "Concurrency"],
      ["testing-debugging-logging-observability", "Testing & Observability"],
      ["performance-memory-production-tuning", "Performance & Memory"],
      ["security-secrets-validation-hardening", "Security & Hardening"],
      ["deployment-containers-cloud-operations", "Deployment & Operations"],
      ["interview-mastery-system-debugging-drills", "Interviews & Debugging"],
    ],
  },
];

const cheatSheetSpec = {
  file: "frontend-cheat-sheet.json",
  id: "frontend-cheat-sheet",
  tabs: [
    ["html-essentials", "HTML Essentials"],
    ["css-layout-selectors", "CSS Layout & Selectors"],
    ["javascript-essentials", "JavaScript Essentials"],
    ["browser-apis-dom-events", "Browser APIs & Events"],
    ["accessibility-quick-rules", "Accessibility Rules"],
    ["performance-quick-wins", "Performance Wins"],
    ["react-quick-reference", "React Quick Reference"],
    ["nextjs-quick-reference", "Next.js Quick Reference"],
    ["git-frontend-workflow-basics", "Workflow Basics"],
    ["interview-rapid-fire-traps", "Interview Rapid Fire"],
  ],
};

for (const spec of masterySpecs) {
  const topicPath = join(repoRoot, "data", "topics", spec.file);
  const topic = JSON.parse(readFileSync(topicPath, "utf8"));

  assert.equal(topic.id, spec.id, `${spec.file} should have the expected topic id`);
  assert.equal(topic.tabs.length, 14, `${spec.id} should expose 14 mastery chapters`);
  assert.equal(topic.sections.length, 14, `${spec.id} should expose 14 mastery sections`);
  assert.deepEqual(
    topic.tabs.map((tab) => [tab.id, tab.label]),
    spec.tabs,
    `${spec.id} should follow the approved mastery chapter flow`
  );
  assert.deepEqual(
    topic.sections.map((section) => section.id),
    spec.tabs.map(([id]) => id),
    `${spec.id} section ids should match the approved chapter flow`
  );

  assert.ok(Array.isArray(topic.heroStats) && topic.heroStats.length === 4, `${spec.id} should define 4 hero stats`);

  for (const section of topic.sections) {
    assert.ok(
      typeof section.intro === "string" && section.intro.trim().length > 0,
      `${spec.id}/${section.id} should include a visible intro`
    );
    assert.ok(Array.isArray(section.blocks), `${spec.id}/${section.id} should define blocks`);
    assert.ok(section.blocks.length >= 1, `${spec.id}/${section.id} should expose at least one content block`);
    assert.ok(!section.cards || section.cards.length === 0, `${spec.id}/${section.id} should not use legacy cards`);
  }

  const finalSection = topic.sections.at(-1);
  assert.ok(Array.isArray(finalSection.qa), `${spec.id} final chapter should include capstone Q&A`);
}

const cheatSheetPath = join(repoRoot, "data", "topics", cheatSheetSpec.file);
const cheatSheet = JSON.parse(readFileSync(cheatSheetPath, "utf8"));

assert.equal(cheatSheet.id, cheatSheetSpec.id, `${cheatSheetSpec.file} should have the expected topic id`);
assert.equal(cheatSheet.tabs.length, cheatSheetSpec.tabs.length, "frontend cheat sheet should keep its compact section count");
assert.equal(cheatSheet.sections.length, cheatSheetSpec.tabs.length, "frontend cheat sheet sections should match its compact section count");
assert.deepEqual(
  cheatSheet.tabs.map((tab) => [tab.id, tab.label]),
  cheatSheetSpec.tabs,
  "frontend cheat sheet should follow the approved quick-reference structure"
);
assert.deepEqual(
  cheatSheet.sections.map((section) => section.id),
  cheatSheetSpec.tabs.map(([id]) => id),
  "frontend cheat sheet section ids should match the approved reference flow"
);
assert.ok(Array.isArray(cheatSheet.heroStats) && cheatSheet.heroStats.length === 4, "frontend cheat sheet should define 4 hero stats");

for (const section of cheatSheet.sections) {
  assert.ok(
    typeof section.intro === "string" && section.intro.trim().length > 0,
    `frontend-cheat-sheet/${section.id} should include a visible intro`
  );
  assert.ok(Array.isArray(section.blocks), `frontend-cheat-sheet/${section.id} should define blocks`);
  assert.ok(section.blocks.length >= 1, `frontend-cheat-sheet/${section.id} should expose at least one content block`);
  assert.ok(!section.cards || section.cards.length === 0, `frontend-cheat-sheet/${section.id} should not use legacy cards`);
  assert.ok(Array.isArray(section.qa), `frontend-cheat-sheet/${section.id} should include rapid-fire Q&A`);
}
