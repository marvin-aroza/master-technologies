import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import Module, { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(
  repoRoot,
  "node_modules",
  `.tmp-render-tests-${process.pid}-${Date.now()}`
);
const tscCli = join(repoRoot, "node_modules", "typescript", "bin", "tsc");
const tempTsconfig = join(outDir, "tsconfig.renderer-tests.json");
const testFiles = [
  "components/renderer/ContentBlockRenderer.test.tsx",
  "components/renderer/TopicPage.test.tsx",
];

mkdirSync(outDir, { recursive: true });
writeFileSync(
  tempTsconfig,
  JSON.stringify(
    {
      extends: join(repoRoot, "tsconfig.json"),
      compilerOptions: {
        noEmit: false,
        outDir,
        module: "commonjs",
        moduleResolution: "node",
        incremental: false,
      },
      files: testFiles.map((file) => join(repoRoot, file)),
    },
    null,
    2
  )
);

const compile = spawnSync(
  process.execPath,
  [
    tscCli,
    "--pretty",
    "false",
    "--project",
    tempTsconfig,
  ],
  { cwd: repoRoot, stdio: "inherit" }
);

if (compile.error) {
  throw compile.error;
}

if (compile.status !== 0) {
  process.exit(compile.status ?? 1);
}

const require = createRequire(import.meta.url);
const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function resolveFilename(request, parent, isMain, options) {
  if (request.startsWith("@/")) {
    return originalResolveFilename.call(
      this,
      join(outDir, ...request.slice(2).split("/")),
      parent,
      isMain,
      options
    );
  }

  return originalResolveFilename.call(this, request, parent, isMain, options);
};

let runStatus = 0;

for (const testFile of testFiles) {
  try {
    require(join(outDir, testFile.replace(/\.tsx$/, ".js")));
  } catch (error) {
    runStatus = 1;
    throw error;
  }
}

Module._resolveFilename = originalResolveFilename;

try {
  rmSync(outDir, { recursive: true, force: true });
} catch {
  // Best-effort cleanup: a locked temp folder should not fail the test itself.
}

process.exit(runStatus);
