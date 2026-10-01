# grounded-rules playwright-kit

Shared Playwright scaffolding for SubTerra packages.

Surface: `playwright-kit/` in [SubTerraCo/grounded-rules](https://github.com/SubTerraCo/grounded-rules).
Reusable workflow: `.github/workflows/playwright-features.yml`.
Tag contract: [TAG_CONTRACT.md](./TAG_CONTRACT.md).

## What Grounded Rules owns

- Generic grep and tags helpers (`playwright-kit/scripts/playwright-feature-tags.mjs`)
- The thin reusable `playwright-features` GitHub Actions workflow
- The tag contract those helpers and the workflow share
- The runner wiring that invokes them (`playwright-kit/scripts/run-feature-tests.mjs`)

Packages call this surface; they do not dig into Grounded Rules internals.

Grounded Rules also keeps its own `contract` and `marketplace` projects under `tests/` as the only Grounded Rules–owned suites. Those are separate from product e2e. This kit does not import or run them as product coverage.

## What each product / package owns

- Its own `tests/` directory
- Its own tags (including product-specific incident prefixes)
- Its domain specs and selectors

## Open Time / Blocks

Open Time and Blocks product specs and selectors are **not** included. Strip any Open Time paths, selectors, or fixtures before pulling scaffolding into this kit. Leave a thin product adapter beside those specs in the product repo. When Open Time moves into luna-os, its e2e moves with it, not into Grounded Rules.

Generalized from leftover Blocks helpers (`scripts/playwright-feature-tags.mjs`, `scripts/run-feature-tests.mjs`, `.github/workflows/playwright-features.yml`). Product path filters (`apps/web`, `apps/desktop`, ROADMAP/FEATURE_REGISTRY watchers) and Blocks incident tags (`@B-`) stay in Blocks.

## Deploy / publish gates

Publish and tester-deploy gates are **deferred**. Do not require green suites until this workflow is stable and at least one real package is wired through it. Products opt in explicitly; Grounded Rules does not invent product coverage.

Do **not** wire this workflow into `publish-npm.yml`, `deploy-web.yml`, or tester-deploy. Grounded Rules CI (`governance-ci.yml`) does not call it.

Aligns with constitution §12: product e2e stays with the product.

## Opt in — reusable workflow

In the **product** repo:

```yaml
# Opt in explicitly. Not a Grounded Rules gate.
jobs:
  playwright-features:
    uses: SubTerraCo/grounded-rules/.github/workflows/playwright-features.yml@v1
    with:
      test-path: tests/e2e
      playwright-config: tests/playwright.config.ts
      project: chromium
      # grep: ""          # empty → ROADMAP tags helper if present, else @N-|@core
      # node-version: "22"
      # pnpm-version: ""  # empty → packageManager from package.json
      # run-build: false
```

Pin `@v1` the same way as `ci-node.yml`. `v1` is a moving tag on the Grounded Rules `master` branch.

## Opt in — local runner

Copy or path-link the two scripts into the product `scripts/` directory (or invoke them from a sibling Grounded Rules checkout):

```bash
node playwright-kit/scripts/run-feature-tests.mjs all
node playwright-kit/scripts/run-feature-tests.mjs headed
node playwright-kit/scripts/run-feature-tests.mjs ui
node playwright-kit/scripts/run-feature-tests.mjs tags
node playwright-kit/scripts/run-feature-tests.mjs tags-headed
node playwright-kit/scripts/playwright-feature-tags.mjs
```

The product Playwright config should honor `PLAYWRIGHT_GREP` (see [TAG_CONTRACT.md](./TAG_CONTRACT.md)). Grounded Rules `tests/playwright.config.ts` already does, for workspace QA only — do not point this runner at those suites for product e2e.

## Layout

```
playwright-kit/
  README.md
  TAG_CONTRACT.md
  scripts/
    playwright-feature-tags.mjs
    run-feature-tests.mjs
.github/workflows/playwright-features.yml
```
