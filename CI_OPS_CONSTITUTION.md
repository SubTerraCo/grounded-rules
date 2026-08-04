# SubTerra CI Ops Constitution

> Source of truth for all SubTerraCo SubTerra polyrepos.  
> Product repos **consume** this document; they do not fork conflicting rules.

**ciOpsVersion:** aligns with `governance/package.json` version (`YY.M.D`).

---

## 1. Polyrepo topology

| Path (meta workspace) | Repo | Role |
|-----------------------|------|------|
| `governance/` | `SubTerraCo/subterra-governance` | This constitution, Dewey tables, manifest, reusable Actions, `@subterra/ci-ops` |
| `shell/` | `SubTerraCo/subterra-shell` | SubTerra Shell + `@subterra/*` packages |
| `apps/<name>/` | per product | Apps marketplace |
| `integrations/<name>/` | per integration | Integrations marketplace |

Meta folder `SubTerra OS/` has **no root git**. Open `SubTerra-OS.code-workspace`.

---

## 2. Apps ↔ Integrations parity (mandatory)

**Apps and Integrations are operational twins.**

- Same folder depth under the meta workspace
- Same repo-per-item polyrepo pattern
- Same manifest schema (`subterra.manifest.yaml`)
- Twin SDKs with **identical APIs**: `@subterra/app-sdk` and `@subterra/integration-sdk`
- Same SubTerra Shell marketplace chrome (two grids, unified UX)
- Same CI Ops / Dewey / `/NF` `/NB` `/RD` / `/BUILD` process

Difference is **role** (`app` vs `integration`), which SDK package is declared, and which marketplace tab discovers the item — not architecture or API shape.

New products use the governance **product-repo template** with `role` + target folder (`apps/` vs `integrations/`).

---

## 3. Dewey address system

```
APP.PP.PR.AA.SSS.FFF[-III]
N-####                   New feature (per-repo counter)
B-####                   Bug group (per-repo counter)
vYY.MM.DD                Release (date-based)
vYY.MM.DDbX              Batch within that day
```

| Segment | File | Notes |
|---------|------|-------|
| **APP** | [`codes/APP_REGISTRY.yaml`](codes/APP_REGISTRY.yaml) | Every app **and** integration gets its own code (`AT`, not a shared `IG`) |
| **PP** | [`codes/PLATFORM_CODES.yaml`](codes/PLATFORM_CODES.yaml) | Blocks-compatible platforms |
| **PR** | [`codes/AREA_CODES.yaml`](codes/AREA_CODES.yaml) | Feature areas |
| **AA.SSS.FFF** | Per-repo `FEATURE_REGISTRY.md` | Section tree |
| **III** | Incident suffix on address | `-001`, `-002`, … |

**Cross-repo references:** `BK/N-0026`, `ST/N-0001` (APP + local N/B).

**PP.MC vs PR.MC:** `PP.MC` = MCP as a delivery platform; `PR.MC` = MCP feature area. Prefer unambiguous combinations (e.g. `BK.DT.MC.01.010.010`).

---

## 4. Versioning (date + batch)

Shared **format** across all repos; each repo stamps **independently**.

| Layer | Format | Example |
|-------|--------|---------|
| Release | `vYY.MM.DD` | `v26.08.03` |
| Batch | `vYY.MM.DDbX` | `v26.08.03b1` |
| npm / electron-builder | `YY.M.D-bX` | `26.8.3-b1` |
| Branch | `vYY.MM.DD` → nightly → `dev` → `master` | same as Blocks |

### 4.1 Branch model (locked GV-0001 D7)

| Branch | Role |
|--------|------|
| `vYY.MM.DD` | Active release/batch working branch |
| `dev` | Nightly integration target |
| `master` | **Production.** Default branch; deploy workflows trigger here |

`master` is production across all SubTerra repos — **not `main`**. Reusable deploy workflows target `master`; do not author workflows against `main`.

Rules (from Blocks CI Ops):

- New calendar day → batch resets to `b1`
- One `/NF` · `/NB` · `/RD` implementation session → one batch
- Run `pnpm release:rollover` (or equivalent) at session start
- Do not rebuild the same `vYY.MM.DDbX` without force override

---

## 5. Design gates

`/NF`, `/NB`, `/RD` require Round 1 + Round 2 design with conflict audits before implementation (see Blocks `CI_OPS_FRAMEWORK.md` §4). Use AskQuestion when available; otherwise AskQuestion fallback lists including Need More Context, Open discussion, OTHER.

---

## 6. Manifest

Canonical catalog: [`subterra.manifest.yaml`](subterra.manifest.yaml).

Shell vendors or generates JSON at build time for **Apps** and **Integrations** marketplaces from `role` + `marketplace` fields.

---

## 7. Reusable CI

Product repos should call:

```yaml
jobs:
  ci:
    uses: SubTerraCo/subterra-governance/.github/workflows/ci-node.yml@v1
```

Local scripts: consume `@subterra/ci-ops` from this repo (`packages/ci-ops`) via path/link or published package when available.

---

## 8. File layout expected in each product repo

```
Docs/Working Docs-Features-Incidents/
  FEATURE_REGISTRY.md
  INCIDENTS.md
  ROADMAP.md
  CHANGELOG.md
  build-log.json          # optional until first /BUILD
.cursor/skills/           # /NF /NB /RD /BUILD (from template)
scripts/                  # release:rollover, etc. (shell has full set; others may path-link ci-ops)
```

Governance itself uses this constitution + codes + manifest; it does not ship a product ROADMAP for features.

---

## 9. Governance Agent mandate (GV)

The Governance agent is the **one-stop shop** for cross-polyrepo standards. Product agents (ST, BK, MB, AT, …) consume these artifacts; they do not fork conflicting pipelines or Dewey rules.

### Owns

| Domain | Scope |
|--------|--------|
| **Rulesets & Dewey** | Constitution, APP/PP/PR codes, manifest, CI Ops gates |
| **Design language parity** | Shared tokens / UX contracts across Shell + Apps + Integrations |
| **Feature parity** | Apps ↔ Integrations twins; SDK API identity |
| **GitHub repo management** | Create/configure SubTerraCo polyrepos for new shell/apps/integrations; branch protections; default labels; secrets/vars conventions |
| **Deployment pipelines** | Reusable Actions (`ci-node`, deploy, release) consumed by all product repos |
| **Product templates** | `templates/product-repo/` (+ role variants for `shell` / `app` / `integration`) |
| **Workspace QA (Playwright)** | Cross-package e2e suite at the governance layer that exercises Shell ↔ Apps ↔ Integrations contracts in the meta workspace |

### Does not own

- Product-specific feature implementation inside a single app (that stays on the product APP code)
- Product-local Playwright suites that only cover one app’s UI (e.g. Blocks `tests/e2e`) — those remain in-product; governance QA covers **cross-repo / marketplace / SDK contract** journeys

### Invariants

1. New polyrepo items are registered in `codes/APP_REGISTRY.yaml` **and** `subterra.manifest.yaml` before first release.
2. New repos start from the governance product template and wire reusable workflows from this repo.
3. Deployment / CI changes land in governance first, then product repos bump the workflow ref (`@v1` / pin).
4. Workspace Playwright QA is the release gate for Shell marketplace + SDK parity — not a substitute for product `/testrelease`.

---

## 10. GitHub repo management

Design record: [GV-0001](Docs/DESIGN_RECORDS/GV-0001-github-pipelines-qa.md).

### Ownership model

All SubTerra repos live under the **`SubTerraCo`** GitHub organization. Create new repos there directly — never under a personal account.

The legacy `PoweredUpLabs` handle is a **personal user account** (it was the original home and still owns unrelated repos). Anything SubTerra found there is misplaced and should be transferred.

> **Organizations cannot be created via the API** — `POST /orgs` returns 404 on github.com. This matters only if a second org is ever needed; `SubTerraCo` already exists.

**Plan:** `SubTerraCo` is on **GitHub Team** (upgraded 2026-08-04). This is a hard requirement, not a convenience — **reusable workflows in private repos do not run on the Free plan**, so the entire §11 pipeline layer depends on it. Downgrading to Free would break CI across every repo. See GV-0001 §6.

### Repo protection

Every product repo carries a `master protection` **ruleset** (private-repo rulesets are a Team feature):

| Rule | Effect |
|------|--------|
| `deletion` | The default branch cannot be deleted |
| `non_fast_forward` | No force-pushes onto the default branch |
| `required_status_checks` | CI must pass — `validate / lint-build` (governance), `ci / lint-build` (consumers) |

Org admins are **bypass actors**, so solo direct-to-`master` pushes still work. Requiring pull requests is deliberately *not* enabled; revisit when more than one person commits.

### Secrets convention

Shared credentials live as **organization secrets** scoped to selected private repos (a Team capability), never as per-repo copies:

| Secret | Consumers |
|--------|-----------|
| `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` | `deploy-web.yml` |
| `NPM_TOKEN` | `publish-npm.yml` |
| `EXPO_TOKEN` | `build-android.yml` |

Callers pass them with `secrets: inherit`. Reusable workflows must never hardcode a secret name a caller cannot override.

### New repo checklist

1. Reserve the APP code in `codes/APP_REGISTRY.yaml`.
2. Add the item to `subterra.manifest.yaml` with `role` + `marketplace`.
3. Copy `templates/product-repo/` and replace `APPCODE` / product name.
4. Create the repo in the org (private by default).
5. Set default branch to `master` (§4.1).
6. Wire CI to the reusable workflows (§11).
7. Apply the `master protection` ruleset.
8. Grant the repo access to any org secrets it needs.

### Vendor upstreams

When a product is seeded from a third-party repo, keep the vendor as a **separate `upstream` remote** — never as `origin`. `origin` always points at our own repo.

---

## 11. Reusable deployment pipelines

Governance owns six reusable workflows in `.github/workflows/`. Product repos call them; they do not fork equivalents.

| Workflow | Purpose | Status |
|----------|---------|--------|
| `ci-node.yml` | Install · type-check · lint · build · manifest validate | **Live** |
| `deploy-web.yml` | Vercel deploy from `master` | **Live** |
| `release-desktop.yml` | Electron builder installer | R0 stub — consumer: BK, later ST |
| `publish-npm.yml` | Publish `@subterra/*` packages | R0 stub — blocked on SDK code |
| `build-android.yml` | Expo EAS Android build | R0 stub — consumer: BK mobile |
| `nightly-dev-push.yml` | Nightly batch seal onto `dev` | R0 stub — consumer: BK |

`R0 stub` means the workflow is authored and syntactically valid but not yet wired to a consumer. Do not delete stubs; wire them when a consumer appears.

### Consumption

```yaml
jobs:
  ci:
    uses: SubTerraCo/subterra-governance/.github/workflows/ci-node.yml@v1
    secrets: inherit
```

Changes land here first, then product repos bump the ref (§9 invariant 3). `v1` is a moving tag on the governance default branch; force-move it after every change consumers should pick up.

### Two prerequisites for cross-repo calls

Both are easy to break and both fail the same way — an instant run with **no jobs and no logs** (`startup_failure`), which reports nothing useful:

1. **Team plan.** Private-repo reusable workflows do not run on Free.
2. **Access policy.** `subterra-governance` must keep Actions access set to `organization`:

```bash
gh api repos/SubTerraCo/subterra-governance/actions/permissions/access
# expected: {"access_level":"organization"}
```

**Transferring a repo silently resets this to `none`** — re-apply it after any transfer.

When diagnosing a `startup_failure`, note that a run whose `name` shows the *file path* instead of the workflow's declared `name` never resolved its workflow at all. Compare against a plain (non-reusable) workflow in the same repo to separate a repo-wide Actions problem from a reusable-workflow one.

---

## 12. Workspace QA (Playwright)

Home: **`governance/tests/`** — its own Playwright project, run from the meta workspace via `pnpm test:workspace`.

### Scope split

| Layer | Owner | Covers |
|-------|-------|--------|
| Product e2e | Product repo (e.g. Blocks `tests/e2e`) | One app's own UI and flows |
| **Workspace QA** | **Governance** | Cross-repo contracts: manifest ↔ registry ↔ filesystem parity, Shell marketplace handoff, twin-SDK API identity, design-token parity |

### Status

Coverage is **deferred** (GV-0001 D5). Shell has no running host and the twin SDKs have no real surface area, so cross-repo browser journeys have nothing to assert against. The suite's config, docs, and location are locked; tests land once Shell and the SDKs are real.

Workspace QA is a release gate for marketplace + SDK parity. It never substitutes for a product's own `/testrelease`.
