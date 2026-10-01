# Workspace QA (Grounded Rules layer)

Cross-repo contract tests for SubTerra. Owned by the Grounded Rules agent (GV) per CI_OPS_CONSTITUTION §12. Until `SubTerraCo/luna` exists, this suite lives here; the monorepo `tests/contract` project is intended to replace it (GV-0004 / Docs/ARCHITECTURE.md).

## Scope

| Layer | Owner | Covers |
|-------|-------|--------|
| Product e2e | Product repo (leftover Blocks `tests/e2e`; later Open Time in `luna`) | One app's own UI and flows |
| **Workspace QA** | **Grounded Rules** | Contracts *between* repos / packages |

This suite never duplicates a product's own e2e. It asserts the things no single repo can check alone.

Shared product-e2e scaffolding (grep/tags helpers, reusable `playwright-features.yml`, tag contract) lives in [`playwright-kit/`](../playwright-kit/README.md). Products opt in; this `tests/` tree stays the only Grounded Rules–owned suites (`contract` + `marketplace`). Constitution §12: product e2e stays with the product.

## Projects

| Project | Browser? | Purpose |
|---------|----------|---------|
| `contract` | No | Manifest ↔ `APP_REGISTRY` parity, twin-SDK API identity (legacy `subterra-shell`), workflow adoption, template drift, design-token parity |
| `marketplace` | Yes | Shell catalog handoff and install/open journeys (Metro / Central once those hosts exist) |

## Status — coverage deferred

Locked in [GV-0001](../Docs/DESIGN_RECORDS/GV-0001-github-pipelines-qa.md) D5: the suite's location and config are fixed, but tests are deferred.

| Precondition | State |
|--------------|-------|
| Twin SDKs are real code | **Met** for the leftover shell — scaffolded under `shell/packages/` (D10). Exports are identical and match `SDK_SURFACE` |
| Shell host is running | **Not met** — Metro and Central do not exist yet, so `marketplace` has nothing to drive |

So `contract` tests against the leftover SDK surface are unblocked in principle, while `marketplace` remains genuinely blocked. GV-0004 dropped separate Apps and Integrations tabs; when marketplace tests land they should drive package install into a shell, not two grids.

## Planned coverage

`contract`:

1. Every `subterra.manifest.yaml` item has a matching `codes/APP_REGISTRY.yaml` entry, and vice versa (withdrawn rows such as AX Axiom stay in both until Powerline approves archive).
2. Every leftover linked item's `localPath` exists in the meta workspace. Reserved monorepo paths (`apps/metro`, `packages/open-time`, …) are allowed to be absent until `luna` exists.
3. Leftover standalone-repo items keep deprecated twin `role` / `marketplace` (`app`→`apps`, `integration`→`integrations`). New monorepo packages must not declare those twin fields (`marketplace: null`, `sdk: null`).
4. Every item declares platform codes that exist in `PLATFORM_CODES.yaml`.
5. While `subterra-shell` remains, `@subterra/app-sdk` and `@subterra/integration-sdk` export identical symbol names, equal to `SDK_SURFACE`, differing only in `SDK_ROLE`.
6. Each leftover product repo's CI references the Grounded Rules reusable workflows.
7. No leftover product repo has drifted from `templates/product-repo/` required docs.

`marketplace`:

1. Catalog items render in the active shell, filtered by `audience`.
2. An installed package opens against an empty hub.
3. Metro and Central do not share hub data unless the owner-marked bridge is on. Allowlist: Open Books (`OB`), Open Bill (`BI`), Open Time (`OT`), and Anytype (`AT`).

## Running

```bash
pnpm test:workspace              # all projects
pnpm test:workspace:contract     # no browser, no servers
```

Browsers are only needed for `marketplace`:

```bash
pnpm exec playwright install chromium
```
