# subterra-governance

**Governance Agent (GV)** home — rules, Dewey codes, catalog, reusable CI, and templates for SubTerra.

The **product** is the Luna OS enterprise monorepo (`SubTerraCo/luna`, not created yet). This repo stays the constitution and pipeline source. It is not the product monorepo.

Readable current-state summary: **[Docs/GOVERNANCE_OVERVIEW.md](./Docs/GOVERNANCE_OVERVIEW.md)**. File-by-file cleanup log: **[Docs/CHANGELOG-cleanup-2026-09-30.md](./Docs/CHANGELOG-cleanup-2026-09-30.md)**.

| Domain | What lives here |
|--------|-----------------|
| CI Ops / Dewey | Constitution, APP/PP/PR codes, manifest |
| GitHub | Repo bootstrap conventions for leftover product repos and later `luna` |
| Pipelines | Reusable Actions (`ci-node`, deploy/release as they land). Monorepo CI follows the blueprint once `luna` exists |
| Templates | `templates/product-repo/` (leftover standalone repos) |
| Workspace QA | Playwright contracts until monorepo `tests/contract` replaces them |
| Tooling | `@subterra/ci-ops` |

## Quick links

- [Docs/GOVERNANCE_OVERVIEW.md](./Docs/GOVERNANCE_OVERVIEW.md) — current state of SubTerra Governance
- [Docs/ARCHITECTURE.md](./Docs/ARCHITECTURE.md) — enterprise monorepo blueprint (**wins** where older rulings disagree)
- [Docs/DESIGN_RECORDS/GV-0004-enterprise-monorepo.md](./Docs/DESIGN_RECORDS/GV-0004-enterprise-monorepo.md) — locked conflict resolutions
- [CI_OPS_CONSTITUTION.md](./CI_OPS_CONSTITUTION.md) — Dewey, versioning, audience, NFC, Material 3, license. Silent only where GV-0004 is silent
- [subterra.manifest.yaml](./subterra.manifest.yaml)
- [codes/APP_REGISTRY.yaml](./codes/APP_REGISTRY.yaml)
- [codes/PLATFORM_CODES.yaml](./codes/PLATFORM_CODES.yaml)
- [codes/AREA_CODES.yaml](./codes/AREA_CODES.yaml)
- [tests/README.md](./tests/README.md) — workspace QA scope and planned coverage
- [Docs/DESIGN_RECORDS/](./Docs/DESIGN_RECORDS/) — locked governance decisions (GV-0002 shell paths are historical)
- [Docs/DESIGN_RECORDS/GV-0003-material-3.md](./Docs/DESIGN_RECORDS/GV-0003-material-3.md) — Material Design 3 (tokens now `packages/open-ui`)
- [.cursor/rules/governance-agent.mdc](./.cursor/rules/governance-agent.mdc)

## Current product shape (GV-0004)

- Two runtimes: `apps/luna-os` (Tauri v2, including Arch / Omarchy) and `apps/subterra-central` (PWA).
- Packages: Open Day, Open Sort, Open Books, Open Bill, Subtoken, Luna, Banking, Forum, Home Assistant, Media, Open UI.
- Material 3 in `packages/open-ui`, seed `#e8a54b`.
- New original monorepo code is BSL 1.1. Already published MIT stays MIT.
- Default branch is **`master`** on every SubTerraCo repo, including `luna`.

Address aliases (`ST`, `BK`, `MB`, `BB`) remain valid on existing Dewey addresses. They are not the folders to build.

## Local

```bash
pnpm validate:manifest           # catalog checks
pnpm versions:fleet              # regenerate Docs/VERSIONS.md + versions/fleet.json
pnpm versions:fleet:check        # validate committed fleet.json (CI)
pnpm type-check                  # workspace QA sources
pnpm test:workspace:contract     # cross-repo contract tests (no browser)
pnpm test:workspace              # all QA projects
```

**Fleet versions:** [Docs/VERSIONS.md](./Docs/VERSIONS.md) — one-glance APP versions (GV plus leftover and reserved catalog rows).

## Reusable pipelines

| Workflow | Status |
|----------|--------|
| `ci-node.yml` | Live |
| `deploy-web.yml` | Live |
| `release-desktop.yml` | R0 stub (Electron / leftover Blocks — not the Luna OS Tauri pipeline) |
| `publish-npm.yml` | R0 stub |
| `build-android.yml` | R0 stub (Expo / leftover Blocks mobile — Luna OS Android is Tauri) |
| `nightly-dev-push.yml` | R0 stub |

Production branch is **`master`** across all repos (§4.1) — not `main`.

## Product template

Copy [`templates/product-repo/`](./templates/product-repo/) only when a leftover standalone repo must be created before fold-in. New product work belongs in `SubTerraCo/luna` once that repo exists. Wire leftover CI to:

```yaml
jobs:
  ci:
    uses: SubTerraCo/subterra-governance/.github/workflows/ci-node.yml@v1
```
