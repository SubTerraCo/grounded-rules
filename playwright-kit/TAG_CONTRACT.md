# Playwright tag contract

Shared by `playwright-kit/scripts/` and `.github/workflows/playwright-features.yml`.
Products own extra tags; this file is only the generic contract.

## Environment variables

| Variable | Meaning |
|----------|---------|
| `PLAYWRIGHT_GREP` | Regex passed to Playwright `grep`. When set, it wins over ROADMAP-derived tags. |
| `PLAYWRIGHT_FEATURES` | Set to `1` by the feature runner / workflow. Product configs may use it to turn on traces and video for feature QA. |
| `PLAYWRIGHT_HEADED` | Set to `1` for a visible browser. Equivalent to CLI `--headed`. |
| `PLAYWRIGHT_TEST_PATH` | Suite path relative to the product root. Default: `tests/e2e`. |
| `PLAYWRIGHT_CONFIG` | Playwright config path relative to the product root. Default: `tests/playwright.config.ts`. |
| `PLAYWRIGHT_PROJECT` | Playwright project name. Default: `chromium`. Empty means all projects. |
| `PLAYWRIGHT_ROADMAP` | Path to a CI_OPS ROADMAP file. Default tries `Docs/Working Docs-Features-Incidents/ROADMAP.md` then `docs/Working Docs-Features-Incidents/ROADMAP.md`. |
| `PLAYWRIGHT_GREP_FALLBACK` | Used when no active Dewey feature tags are found. Default: `@N-\|@core`. |
| `PLAYWRIGHT_EXTRA_TAGS` | Pipe-separated tags always unioned with ROADMAP hits. Default: `@core`. |
| `PLAYWRIGHT_BASE_URL` | Optional product base URL. Not set by this kit. |

## Tags Grounded Rules understands

| Tag | Meaning |
|-----|---------|
| `@N-####` | Dewey feature id from CI_OPS ROADMAP / FEATURE_REGISTRY (any APP code). |
| `@core` | Untagged core coverage the product wants on every feature run. |

The tags helper reads ROADMAP rows whose status matches `🧪 QA`, `🔄 In progress`, or `📋 Proposed`, collects `@N-####`, and always unions `PLAYWRIGHT_EXTRA_TAGS`. If none match, it prints `PLAYWRIGHT_GREP_FALLBACK`.

## Tags this kit does not own

Product-specific prefixes, selectors, and fixtures stay in the product repo. Examples that must **not** land here:

- Blocks incident tags such as `@B-`
- Open Time / Blocks specs, page objects, or `apps/web` / `apps/desktop` paths
- ROADMAP watchers or FEATURE_REGISTRY path filters in CI

Add those in the product adapter that calls this surface.

## Product config snippet

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  grep: process.env.PLAYWRIGHT_GREP
    ? new RegExp(process.env.PLAYWRIGHT_GREP)
    : undefined,
});
```
