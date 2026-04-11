import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));

const topicSpecs = [
  {
    file: "git.json",
    id: "git",
    tabs: [
      ["origins-repositories-object-model", "Origins & Object Model"],
      ["working-tree-staging-commits", "Working Tree & Commits"],
      ["branching-merging-rebasing-history-shaping", "Branching & History"],
      ["remotes-fetch-pull-push-collaboration", "Remotes & Collaboration"],
      ["conflict-resolution-recovery", "Conflict Resolution"],
      ["tags-releases-versioning", "Tags & Releases"],
      ["advanced-history-tools-inspection", "History Inspection"],
      ["cherry-pick-revert-reset-restore-reflog", "Recovery Commands"],
      ["team-workflows-branching-strategies", "Team Workflows"],
      ["monorepos-submodules-large-repos", "Monorepos & Submodules"],
      ["hooks-automation-ci-integration", "Hooks & Automation"],
      ["security-signing-safe-collaboration", "Security & Signing"],
      ["git-internals-performance", "Internals & Performance"],
      ["interview-mastery-real-world-debugging", "Interviews & Debugging"],
    ],
  },
  {
    file: "terraform.json",
    id: "terraform",
    tabs: [
      ["iac-foundations-terraform-mental-model", "IaC Foundations"],
      ["providers-resources-data-sources-variables", "Providers & Resources"],
      ["state-plans-applies-lifecycle", "State, Plan & Apply"],
      ["modules-composition-reuse", "Modules & Reuse"],
      ["dependency-graph-execution-model", "Graph & Execution"],
      ["workspaces-environments-repo-structure", "Environments & Structure"],
      ["remote-state-locking-team-workflows", "Remote State & Teams"],
      ["drift-imports-refactors-migrations", "Drift & Refactors"],
      ["secrets-policy-governance", "Secrets & Governance"],
      ["testing-validation-automation", "Testing & Automation"],
      ["multi-account-multi-region-design", "Multi-Account Design"],
      ["performance-scale-operational-risk", "Scale & Risk"],
      ["terraform-ecosystem-opentofu-context", "Ecosystem & OpenTofu"],
      ["interview-mastery-architecture-drills", "Interviews & Drills"],
    ],
  },
  {
    file: "aws.json",
    id: "aws",
    tabs: [
      ["cloud-foundations-global-infrastructure", "Cloud Foundations"],
      ["iam-identities-accounts-security-boundaries", "IAM & Accounts"],
      ["compute-ec2-lambda-containers-runtimes", "Compute Services"],
      ["networking-vpc-subnets-routing-dns", "Networking & VPC"],
      ["storage-s3-ebs-efs-glacier", "Storage Services"],
      ["databases-rds-dynamodb-elasticache-redshift", "Databases"],
      ["messaging-integration-sqs-sns-eventbridge-step-functions", "Messaging & Integration"],
      ["observability-operations-cloudwatch-cloudtrail-config", "Observability & Ops"],
      ["deployment-delivery-cloudformation-cdk-cicd", "Deployment & Delivery"],
      ["high-availability-scaling-resilience", "Scaling & Resilience"],
      ["cost-performance-architecture-tradeoffs", "Cost & Tradeoffs"],
      ["multi-account-governance-enterprise-patterns", "Governance & Enterprise"],
      ["real-world-aws-architecture-case-studies", "AWS Case Studies"],
      ["interview-mastery-troubleshooting", "Interviews & Troubleshooting"],
    ],
  },
  {
    file: "docker.json",
    id: "docker",
    tabs: [
      ["containers-images-why-docker-exists", "Containers & Images"],
      ["images-layers-dockerfiles-build-mechanics", "Dockerfiles & Layers"],
      ["containers-processes-runtime-behavior", "Runtime Behavior"],
      ["volumes-bind-mounts-data-persistence", "Volumes & Persistence"],
      ["networking-service-communication", "Networking"],
      ["compose-local-multi-service-systems", "Compose"],
      ["registries-tagging-image-distribution", "Registries & Tagging"],
      ["security-secrets-least-privilege-containers", "Security & Secrets"],
      ["performance-caching-image-optimization", "Performance & Optimization"],
      ["debugging-introspection", "Debugging"],
      ["cicd-production-image-workflows", "CI/CD & Production"],
      ["orchestration-context-swarm-kubernetes-mental-model", "Orchestration Context"],
      ["container-architecture-patterns-anti-patterns", "Patterns & Anti-Patterns"],
      ["interview-mastery-production-troubleshooting", "Interviews & Troubleshooting"],
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
    `${spec.id} should follow the approved starter-topic chapter flow`
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
