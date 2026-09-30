# Grounded Rules

**Grounded Rules agent (GV)** home — rules, Dewey codes, catalog, reusable CI, and templates for SubTerra.

Display name **Grounded Rules** (electrical grounding safety + grounded rules). GitHub slug remains `SubTerraCo/subterra-governance` until Powerline Settings-renames it to `grounded-rules`. Dewey code **GV** is unchanged.

The **product** is the SubTerra Metro enterprise monorepo (`SubTerraCo/luna`, not created yet). This repo stays the constitution and pipeline source. It is not the product monorepo.

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

- [Docs/GOVERNANCE_OVERVIEW.md](./Docs/GOVERNANCE_OVERVIEW.md) — current state of Grounded Rules
- [Docs/ARCHITECTURE.md](./Docs/ARCHITECTURE.md) — enterprise monorepo blueprint (**wins** where older rulings disagree)
- [Docs/DESIGN_RECORDS/GV-0004-enterprise-monorepo.md](./Docs/DESIGN_RECORDS/GV-0004-enterprise-monorepo.md) — locked conflict resolutions
- [CI_OPS_CONSTITUTION.md](./CI_OPS_CONSTITUTION.md) — Dewey, versioning, audience, NFC, Material 3, license. Silent only where GV-0004 is silent
- [subterra.manifest.yaml](./subterra.manifest.yaml)
- [codes/APP_REGISTRY.yaml](./codes/APP_REGISTRY.yaml)
- [codes/PLATFORM_CODES.yaml](./codes/PLATFORM_CODES.yaml)
- [codes/AREA_CODES.yaml](./codes/AREA_CODES.yaml)
- [tests/README.md](./tests/README.md) — workspace QA scope and planned coverage
- [Docs/DESIGN_RECORDS/](./Docs/DESIGN_RECORDS/) — locked Grounded Rules decisions (GV-0002 shell paths are historical)
- [Docs/DESIGN_RECORDS/GV-0003-material-3.md](./Docs/DESIGN_RECORDS/GV-0003-material-3.md) — Material Design 3 (tokens now `packages/open-ui`)
- [.cursor/rules/governance-agent.mdc](./.cursor/rules/governance-agent.mdc)

## Current product shape (GV-0004 + Powerline lock 2026-09-30)

- Two runtimes: `apps/subterra-metro` (Tauri v2 social media app, including Arch / Omarchy; consumes Central-hosted packages) and `apps/subterra-central` (PWA personal AI hub and suite of all tools; hosts packages and integrations).
- **Packages-under-Central is sanctioned** (`apps/subterra-central/packages/` or equivalent). Old cut that this invented a forbidden product shape is rewritten (GV-0004 C16).
- Catalog `audience` values stay `admin` and `member` (GV-0002 D4). Mapping: `admin` → SubTerra Metro; `member` → SubTerra Central. Default `["admin"]` fail-closed. No third audience. Audience strings are mount gates, not product-role labels.
- Metro↔Central data bridge (off by default, owner-marked): Open Books, Open Bill, Open Time, **and Anytype (`AT`)**.
- Packages: Open Time, Open Sort, Open Books, Open Bill, Subtoken, Luna, Banking, Forum, Home Assistant, Media, Open UI. Anytype is a Central-hosted integration (leftover PKM workspace is not required as a monorepo package).
- Twin `role` / `marketplace` / SDK fields are **deprecated leftover** on standalone-repo rows. New monorepo packages: `marketplace: null`, `sdk: null`.
- Material 3 in `packages/open-ui`: purple `#400080`, pink `#ED1CAD`, light blue `#1CEDC5`, teal `#008080`; interim M3 type scale; 4dp spacing.
- New original monorepo code is BSL 1.1. Already published MIT stays MIT.
- Default branch is **`master`** on every SubTerraCo repo, including `luna`.

Address aliases (`ST`, `LO`, `OD`, `MB`, `BB`) remain valid on existing Dewey addresses. They are not the folders to build. Existing `BK/N-####` were rewritten to `OT/N-####` (PI-011 A); `BK` stays an alias catalog row. Live shell code is `SM`. Live Open Time code is `OT`.

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
| `release-desktop.yml` | R0 stub (Electron / leftover Blocks — not the SubTerra Metro Tauri pipeline) |
| `publish-npm.yml` | R0 stub |
| `build-android.yml` | R0 stub (Expo / leftover Blocks mobile — SubTerra Metro Android is Tauri) |
| `nightly-dev-push.yml` | R0 stub |

Production branch is **`master`** across all repos (§4.1) — not `main`.

```yaml
jobs:
  ci:
    uses: SubTerraCo/subterra-governance/.github/workflows/ci-node.yml@v1
```

Powerline may Settings-rename this GitHub repo to `grounded-rules` later; until that click, keep the live slug above.
