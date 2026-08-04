# subterra-governance

**Governance Agent (GV)** home — one-stop shop for SubTerra OS polyrepo standards:

| Domain | What lives here |
|--------|-----------------|
| CI Ops / Dewey | Constitution, APP/PP/PR codes, manifest |
| GitHub | Repo bootstrap conventions for shell / apps / integrations |
| Pipelines | Reusable Actions (`ci-node`, deploy/release as they land) |
| Templates | `templates/product-repo/` (+ role variants) |
| Workspace QA | Cross-package Playwright e2e (Shell ↔ Apps ↔ Integrations) |
| Tooling | `@subterra/ci-ops` |

## Quick links

- [CI_OPS_CONSTITUTION.md](./CI_OPS_CONSTITUTION.md) — §1.1 dual shell · §9 GV mandate · §10 GitHub · §11 pipelines · §12 workspace QA · §13 audiences + NFC auth
- [Docs/DESIGN_RECORDS/GV-0002-nexus-dual-shell.md](./Docs/DESIGN_RECORDS/GV-0002-nexus-dual-shell.md) — Nexus + audience gate (locked)
- [subterra.manifest.yaml](./subterra.manifest.yaml)
- [codes/APP_REGISTRY.yaml](./codes/APP_REGISTRY.yaml)
- [codes/PLATFORM_CODES.yaml](./codes/PLATFORM_CODES.yaml)
- [codes/AREA_CODES.yaml](./codes/AREA_CODES.yaml)
- [tests/README.md](./tests/README.md) — workspace QA scope and planned coverage
- [Docs/DESIGN_RECORDS/](./Docs/DESIGN_RECORDS/) — locked governance decisions
- [.cursor/rules/governance-agent.mdc](./.cursor/rules/governance-agent.mdc)

## Local

```bash
pnpm validate:manifest           # catalog checks
pnpm versions:fleet              # regenerate Docs/VERSIONS.md + versions/fleet.json
pnpm versions:fleet:check        # validate committed fleet.json (CI)
pnpm type-check                  # workspace QA sources
pnpm test:workspace:contract     # cross-repo contract tests (no browser)
pnpm test:workspace              # all QA projects
```

**Fleet versions:** [Docs/VERSIONS.md](./Docs/VERSIONS.md) — one-glance APP versions (GV, ST, BK, …).

## Reusable pipelines

| Workflow | Status |
|----------|--------|
| `ci-node.yml` | Live |
| `deploy-web.yml` | Live |
| `release-desktop.yml` | R0 stub |
| `publish-npm.yml` | R0 stub |
| `build-android.yml` | R0 stub |
| `nightly-dev-push.yml` | R0 stub |

Production branch is **`master`** across all repos (§4.1) — not `main`.

## Product template

Copy [`templates/product-repo/`](./templates/product-repo/) when creating a new app or integration under `apps/` or `integrations/`. Wire CI to:

```yaml
jobs:
  ci:
    uses: SubTerraCo/subterra-governance/.github/workflows/ci-node.yml@v1
```
