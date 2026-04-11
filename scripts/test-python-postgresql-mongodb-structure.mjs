import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));

const topicSpecs = [
  {
    file: "python.json",
    id: "python",
    tabs: [
      ["python-origins-philosophy-execution-model", "Origins & Execution Model"],
      ["values-types-mutability-identity", "Types & Mutability"],
      ["control-flow-functions-scope-closures", "Functions & Scope"],
      ["collections-iterables-comprehensions-generators", "Collections & Iteration"],
      ["objects-classes-dataclasses-oop-tradeoffs", "Objects & Classes"],
      ["modules-packages-environments-dependency-management", "Modules & Environments"],
      ["typing-protocols-modern-python-design", "Typing & Protocols"],
      ["exceptions-debugging-defensive-coding", "Exceptions & Debugging"],
      ["files-io-standard-library-scripting", "Files, I/O & Scripting"],
      ["concurrency-async-multiprocessing-performance", "Concurrency & Performance"],
      ["testing-tooling-linting-project-structure", "Testing & Tooling"],
      ["backend-apis-clis-automation-production-patterns", "Backend & Automation"],
      ["internals-memory-model-optimization-reasoning", "Internals & Optimization"],
      ["interview-mastery-architecture-debugging-drills", "Interviews & Debugging"],
    ],
  },
  {
    file: "postgresql.json",
    id: "postgresql",
    tabs: [
      ["relational-foundations-postgresql-architecture", "Foundations & Architecture"],
      ["sql-querying-fundamentals-result-shaping", "SQL Querying"],
      ["schema-design-constraints-normalization", "Schema Design"],
      ["joins-subqueries-ctes-query-reasoning", "Joins & Query Reasoning"],
      ["indexes-query-planning", "Indexes & Planner"],
      ["transactions-mvcc-isolation-levels", "Transactions & MVCC"],
      ["locks-contention-concurrency-behavior", "Locks & Concurrency"],
      ["jsonb-arrays-full-text-extensions", "Advanced Features"],
      ["functions-procedures-triggers-server-side-logic", "Server-Side Logic"],
      ["partitioning-replication-backups-operational-design", "Replication & Operations"],
      ["performance-tuning-query-optimization", "Performance Tuning"],
      ["security-roles-permissions-safe-production-usage", "Security & Roles"],
      ["architecture-patterns-anti-patterns", "Architecture Patterns"],
      ["interview-mastery-production-troubleshooting", "Interviews & Troubleshooting"],
    ],
  },
  {
    file: "mongodb.json",
    id: "mongodb",
    tabs: [
      ["nosql-foundations-mongodb-architecture", "NoSQL & Architecture"],
      ["documents-bson-collections-schema-strategy", "Documents & Schema"],
      ["crud-queries-projections-update-semantics", "CRUD & Queries"],
      ["data-modeling-embedding-vs-references", "Modeling Documents"],
      ["indexes-query-performance", "Indexes & Performance"],
      ["aggregation-pipeline-mastery", "Aggregation Pipeline"],
      ["replication-replica-sets-failover", "Replication & Failover"],
      ["sharding-scale-out-design", "Sharding & Scale"],
      ["transactions-consistency-write-concerns", "Transactions & Consistency"],
      ["schema-governance-validation-migration-strategy", "Validation & Migration"],
      ["security-backups-operational-reliability", "Security & Operations"],
      ["performance-tuning-production-debugging", "Performance Tuning"],
      ["choosing-mongodb-vs-relational-systems", "MongoDB vs SQL"],
      ["interview-mastery-architecture-drills", "Interviews & Architecture"],
    ],
  },
];

for (const spec of topicSpecs) {
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
    assert.ok(Array.isArray(section.qa), `${spec.id}/${section.id} should include chapter-level or capstone Q&A`);
  }

  const finalSection = topic.sections.at(-1);
  assert.ok(Array.isArray(finalSection.qa), `${spec.id} final chapter should include capstone Q&A`);
}
