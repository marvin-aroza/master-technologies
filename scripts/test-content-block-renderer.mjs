import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(
  repoRoot,
  "node_modules",
  `.tmp-render-tests-${process.pid}-${Date.now()}`
);
const tscCli = join(repoRoot, "node_modules", "typescript", "bin", "tsc");

const compile = spawnSync(
  process.execPath,
  [
    tscCli,
    "--pretty",
    "false",
    "--skipLibCheck",
    "--outDir",
    outDir,
    "--module",
    "commonjs",
    "--target",
    "es2020",
    "--jsx",
    "react-jsx",
    "--esModuleInterop",
    "true",
    "--moduleResolution",
    "node",
    "components/renderer/ContentBlockRenderer.test.tsx",
    "components/renderer/ContentBlockRenderer.tsx",
    "types/topic.ts",
  ],
  { cwd: repoRoot, stdio: "inherit" }
);

if (compile.error) {
  throw compile.error;
}

if (compile.status !== 0) {
  process.exit(compile.status ?? 1);
}

const run = spawnSync(
  process.execPath,
  [join(outDir, "components", "renderer", "ContentBlockRenderer.test.js")],
  { cwd: repoRoot, stdio: "inherit" }
);

if (run.error) {
  throw run.error;
}

try {
  rmSync(outDir, { recursive: true, force: true });
} catch {
  // Best-effort cleanup: a locked temp folder should not fail the test itself.
}

process.exit(run.status ?? 1);
