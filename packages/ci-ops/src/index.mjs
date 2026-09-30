/**
 * Compatibility entry for plain Node.
 *
 * subterra-shell imports this path with no loader and no type-stripping flag
 * (scripts/daily-release-rollover.mjs, scripts/check-governance.mjs).
 * Node 22.13–22.17 cannot import the .ts sources that way, so this file
 * transpiles those sources and evaluates the emitted ESM.
 */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);

let ts;
try {
  ts = require("typescript");
} catch (error) {
  const wrapped = new Error(
    "index.mjs needs the typescript package from Grounded Rules (this repo; pnpm install) to load the TypeScript implementation.",
  );
  wrapped.cause = error;
  throw wrapped;
}

const here = dirname(fileURLToPath(import.meta.url));

function transpileFile(filename) {
  const path = join(here, filename);
  const source = readFileSync(path, "utf8").replace(/^#!.*\n/, "");
  const result = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      verbatimModuleSyntax: true,
    },
    fileName: path,
    reportDiagnostics: true,
  });
  const diagnostics = result.diagnostics ?? [];
  if (diagnostics.length > 0) {
    const message = diagnostics
      .map((diagnostic) =>
        ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
      )
      .join("\n");
    throw new Error(`Failed to load ${filename}: ${message}`);
  }
  const javascript = result.outputText
    .replace(/^#!.*\n/, "")
    .replaceAll("import.meta.url", JSON.stringify(pathToFileURL(path).href));
  return javascript;
}

function moduleUrl(javascript) {
  return `data:text/javascript;charset=utf-8,${encodeURIComponent(javascript)}`;
}

const collectModuleUrl = moduleUrl(transpileFile("collect-versions.ts"));
const indexJavaScript = transpileFile("index.ts").replace(
  /from\s+["']\.\/collect-versions\.ts["']/g,
  () => `from ${JSON.stringify(collectModuleUrl)}`,
);
const impl = await import(moduleUrl(indexJavaScript));

const exportedNames = [
  "todayLocalDate",
  "todayReleaseTag",
  "todayNpmVersion",
  "parseBatchLogRows",
  "maxBatchIndexForRelease",
  "nextBatchId",
  "syncRoadmapRelease",
  "ensureBatchLogRow",
  "stampPackageJson",
  "runRollover",
  "governanceRootFromCiOps",
  "buildFleet",
  "collectRow",
  "parseManifestItems",
  "renderVersionsMarkdown",
  "resolveLocalCheckout",
];

for (const name of exportedNames) {
  if (typeof impl[name] !== "function") {
    throw new Error(`TypeScript implementation is missing export ${name}`);
  }
}

export const {
  todayLocalDate,
  todayReleaseTag,
  todayNpmVersion,
  parseBatchLogRows,
  maxBatchIndexForRelease,
  nextBatchId,
  syncRoadmapRelease,
  ensureBatchLogRow,
  stampPackageJson,
  runRollover,
  governanceRootFromCiOps,
  buildFleet,
  collectRow,
  parseManifestItems,
  renderVersionsMarkdown,
  resolveLocalCheckout,
} = impl;
