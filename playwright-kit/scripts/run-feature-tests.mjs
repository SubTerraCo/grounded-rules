#!/usr/bin/env node
/**
 * Run Playwright feature-tagged suites with consistent env on all platforms.
 *
 * Usage: node playwright-kit/scripts/run-feature-tests.mjs [all|headed|ui|tags|tags-headed]
 *
 * Paths and grep come from the tag contract (playwright-kit/TAG_CONTRACT.md).
 * This runner does not encode product specs, selectors, or Open Time UX.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const kitScripts = dirname(fileURLToPath(import.meta.url));
const tagsHelper = join(kitScripts, "playwright-feature-tags.mjs");
const productRoot = process.env.PLAYWRIGHT_CWD || process.cwd();
const mode = process.argv[2] ?? "all";

const MODES = new Set(["all", "headed", "ui", "tags", "tags-headed"]);

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

if (!MODES.has(mode)) {
  fail(
    `Unknown mode "${mode}". Use all | headed | ui | tags | tags-headed.`,
  );
}

function resolveGrep() {
  if (process.env.PLAYWRIGHT_GREP) return process.env.PLAYWRIGHT_GREP;
  if (mode === "tags" || mode === "tags-headed") {
    if (!existsSync(tagsHelper)) {
      fail(`Missing tags helper at ${tagsHelper}`);
    }
    return execFileSync(process.execPath, [tagsHelper], {
      cwd: productRoot,
      encoding: "utf8",
      env: process.env,
    }).trim();
  }
  return process.env.PLAYWRIGHT_GREP_FALLBACK || "@N-|@core";
}

const testPath = process.env.PLAYWRIGHT_TEST_PATH || "tests/e2e";
const configPath = process.env.PLAYWRIGHT_CONFIG || "tests/playwright.config.ts";
const project = process.env.PLAYWRIGHT_PROJECT ?? "chromium";

const playwrightArgs = [
  "exec",
  "playwright",
  "test",
  testPath,
  `--config=${configPath}`,
];

if (project) {
  playwrightArgs.push(`--project=${project}`);
}

if (mode === "headed" || mode === "tags-headed") {
  playwrightArgs.push("--headed", "--workers=1");
}
if (mode === "ui") {
  playwrightArgs.push("--ui");
}

const isWin = process.platform === "win32";
const pnpmBin = isWin ? "pnpm.cmd" : "pnpm";

const result = spawnSync(pnpmBin, playwrightArgs, {
  cwd: productRoot,
  stdio: "inherit",
  env: {
    ...process.env,
    PLAYWRIGHT_FEATURES: "1",
    PLAYWRIGHT_GREP: resolveGrep(),
    PLAYWRIGHT_HEADED:
      mode === "headed" || mode === "tags-headed"
        ? "1"
        : process.env.PLAYWRIGHT_HEADED,
  },
  shell: isWin,
});

process.exit(result.status ?? 1);
