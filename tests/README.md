# Workspace QA (governance layer)

Cross-repo contract tests for the SubTerra OS polyrepo. Owned by the Governance agent (GV) per CI_OPS_CONSTITUTION §12.

## Scope

| Layer | Owner | Covers |
|-------|-------|--------|
| Product e2e | Product repo (e.g. Blocks `tests/e2e`) | One app's own UI and flows |
| **Workspace QA** | **Governance** | Contracts *between* repos |

This suite never duplicates a product's own e2e. It asserts the things no single repo can check alone.

## Projects

| Project | Browser? | Purpose |
|---------|----------|---------|
| `contract` | No | Manifest ↔ `APP_REGISTRY` ↔ filesystem parity, twin-SDK API identity, workflow adoption, template drift, design-token parity |
| `marketplace` | Yes | Shell Apps/Integrations grid handoff, install/open journeys |

## Status — coverage deferred

Locked in [GV-0001](../Docs/DESIGN_RECORDS/GV-0001-github-pipelines-qa.md) D5: the suite's location and config are fixed, but tests are deferred.

The two preconditions have diverged since that lock:

| Precondition | State |
|--------------|-------|
| Twin SDKs are real code | **Met** — scaffolded and verified under `shell/packages/` (D10). Exports are identical and match `SDK_SURFACE` |
| Shell host is running | **Not met** — no Shell application exists, so `marketplace` has nothing to drive |

So `contract` tests are unblocked, while `marketplace` remains genuinely blocked.

## Planned coverage

`contract`:

1. Every `subterra.manifest.yaml` item has a matching `codes/APP_REGISTRY.yaml` entry, and vice versa.
2. Every item's `localPath` exists in the meta workspace.
3. `role` and `marketplace` agree (`app`→`apps`, `integration`→`integrations`).
4. Every item declares platform codes that exist in `PLATFORM_CODES.yaml`.
5. `@subterra/app-sdk` and `@subterra/integration-sdk` export identical symbol names, equal to `SDK_SURFACE`, differing only in `SDK_ROLE`.
6. Each product repo's CI references the governance reusable workflows.
7. No product repo has drifted from `templates/product-repo/` required docs.

`marketplace`:

1. Apps and Integrations grids render from the manifest.
2. An item opens in the Shell host and mounts through the SDK lifecycle.
3. Both grids share identical chrome (Apps ↔ Integrations UX parity, §2).

## Running

```bash
pnpm test:workspace              # all projects
pnpm test:workspace:contract     # no browser, no servers
```

Browsers are only needed for `marketplace`:

```bash
pnpm exec playwright install chromium
```
