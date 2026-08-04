// ============================================================================
// SubTerra OS — Workspace QA (governance layer)
// Cross-repo contract tests: manifest ↔ registry ↔ filesystem parity,
// twin-SDK API identity, design-token parity, Shell marketplace handoff.
//
// Scope split (CI_OPS_CONSTITUTION §12):
//   product repo tests/  → one app's own UI and flows
//   governance tests/    → contracts BETWEEN repos
//
// Coverage is deferred (GV-0001 D5) until the Shell host is running.
// Contract projects need no browser; only `marketplace` does.
// ============================================================================

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./",

  // Batch / suite scoping — mirrors the Blocks convention (avoids shell pipe
  // quoting problems on Windows).
  grep: process.env.PLAYWRIGHT_GREP
    ? new RegExp(process.env.PLAYWRIGHT_GREP)
    : undefined,

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["html", { outputFolder: "../playwright-report" }],
    ["json", { outputFile: "../test-results/results.json" }],
    ["list"],
  ],

  timeout: 30_000,
  expect: { timeout: 5_000 },

  projects: [
    {
      // Pure assertion tests over repo metadata. No browser, no servers.
      name: "contract",
      testDir: "./contract",
      use: {},
    },
    {
      // Cross-app browser journeys. Blocked until the Shell host runs.
      name: "marketplace",
      testDir: "./marketplace",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.SUBTERRA_SHELL_URL ?? "http://localhost:3100",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
      },
    },
  ],

  outputDir: "../test-results",
});
