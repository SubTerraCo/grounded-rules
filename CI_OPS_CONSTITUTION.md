# SubTerra CI Ops Constitution

> Source of truth for all SubTerraCo SubTerra polyrepos.  
> Product repos **consume** this document; they do not fork conflicting rules.
>
> **GV-0004 supersedes this constitution wherever they disagree.** The enterprise monorepo (two shells, package layout, BSL for new original code, Tailwind Material 3 tokens, Rust only inside Tauri) is the current ruling. Its default branch is `master`, the same as every other SubTerraCo repo. Rules below still apply when GV-0004 is silent.

**ciOpsVersion:** aligns with `governance/package.json` version (`YY.M.D`).

---

## 1. Polyrepo topology

| Path (meta workspace) | Repo | Role |
|-----------------------|------|------|
| `governance/` | `SubTerraCo/subterra-governance` | This constitution, Dewey tables, manifest, reusable Actions, `@subterra/ci-ops` |
| `shell/` | `SubTerraCo/subterra-shell` | Dual shell targets + `@subterra/*` + `packages/shell-core` (GV-0002) |
| `apps/<name>/` | per product | Apps marketplace |
| `integrations/<name>/` | per integration | Integrations marketplace |

### 1.1 Shell targets (GV-0004; supersedes GV-0002 D1–D2)

Exactly two executable shells. Product entry points share them. Luna OS personal data and SubTerra Collective data do not share a read or write path.

| Shell | Path | Runtime | Hosts |
|-------|------|---------|-------|
| Desktop and mobile | `apps/luna-os` | Tauri v2 + React 19 + Vite | Luna OS on Windows, macOS, Android, iOS, and Arch Linux (Omarchy) |
| Web | `apps/web-shell` | Offline-first PWA | SubTerra Central, Booking, Axiom, Community |

Shared UI is `packages/ui` (Material 3). Shared local facts go through the hub. Upstream cores stay dependencies or forks: Actual's API for the ledger, any-sync at the PKM boundary, Flarum for community. Blueprint: [Docs/ARCHITECTURE.md](Docs/ARCHITECTURE.md). Record: [GV-0004](Docs/DESIGN_RECORDS/GV-0004-enterprise-monorepo.md).

`apps/admin`, `apps/nexus`, and `packages/shell-core` from GV-0002 are not the paths to build. `subterra-shell` remains until the monorepo exists.

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

**Default branch name.** Every SubTerraCo repository, including the enterprise monorepo, uses **`master`**. Do not invent another production-branch name.

| Branch | Role |
|--------|------|
| `vYY.MM.DD` | Active release/batch working branch |
| `dev` | Nightly integration target |
| `master` | **Production.** The default branch of every SubTerraCo repo; deploy workflows trigger here |

`master` is the production branch for existing SubTerraCo repos. Reusable deploy workflows for those repos target `master`.

The enterprise monorepo uses `master` for production and `dev` for integration. Do not create it with `main` or `staging`.

When an existing repository's default branch is still `main`, retarget it to `master` by renaming that branch so history stays intact. If a `master` branch already exists and its tip is a different commit from `main`, stop. Do not force-push over that `master`. Report both tips and reconcile them before changing the default.

Rules (from Blocks CI Ops):

- New calendar day → batch resets to `b1`
- One `/NF` · `/NB` · `/RD` implementation session → one batch
- Run `pnpm release:rollover` (or equivalent) at session start
- Do not rebuild the same `vYY.MM.DDbX` without force override

### 4.2 Fleet version dashboard

Cross-repo versions are aggregated in governance (not in Shell UI):

| Artifact | Path |
|----------|------|
| Machine-readable | [`versions/fleet.json`](versions/fleet.json) |
| Human dashboard | [`Docs/VERSIONS.md`](Docs/VERSIONS.md) |

Refresh from the meta workspace:

```bash
cd governance && pnpm versions:fleet
```

Collection is **local checkouts only** (manifest `localPath` + Package junctions). Each APP row shows Display (`vYY.MM.DDbX`), npm, branch, and catalog status. CI runs `pnpm versions:fleet:check` against the committed JSON (does not regenerate from missing siblings on the runner).

---

## 5. Design gates

`/NF`, `/NB`, `/RD` require Round 1 + Round 2 design with conflict audits before implementation (see Blocks `CI_OPS_FRAMEWORK.md` §4). Use AskQuestion when available; otherwise AskQuestion fallback lists including Need More Context, Open discussion, OTHER.

---

## 6. Manifest

Canonical catalog: [`subterra.manifest.yaml`](subterra.manifest.yaml).

Shell vendors or generates JSON at build time for **Apps** and **Integrations** marketplaces from `role` + `marketplace` fields, then **filters by `audience`** for the active shell session (§13).

### 6.1 Item fields (audience — GV-0002 D4)

| Field | Meaning |
|-------|---------|
| `role` | `app` \| `integration` \| `shell` \| `governance` — **which marketplace / topology**, not who is logged in |
| `marketplace` | `apps` \| `integrations` \| `null` (shell/governance) |
| `audience` | List of shell audiences that may mount the item: `admin` and/or `member` |

**Default when `audience` is omitted: `["admin"]` (fail-closed).** An item is never customer-visible on Nexus unless it explicitly includes `member`.

Do **not** overload `role` for permissions — `SubterraRole` in `@subterra/sdk-contract` already means app vs integration.

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
| **Design language parity** | Material Design 3 (§15, GV-0003, GV-0004). One theme in `packages/ui` |
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
5. SubTerra-owned UI uses Material Design 3 (§15). Product repos do not add a second component library or token set.

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

---

## 13. Shell audiences and NFC auth (locked GV-0002)

Design record: [GV-0002](Docs/DESIGN_RECORDS/GV-0002-nexus-dual-shell.md).

### 13.1 Audiences

| Audience | Typical shell | Sees |
|----------|---------------|------|
| `admin` | ST (`apps/admin`) | Items with `audience` containing `admin` (default) |
| `member` | NX Nexus (`apps/nexus`) | Only items that explicitly list `member` |

Session identity is separate from marketplace `role`. Host context must expose audience without reusing the `role` field name.

### 13.2 NFC authentication invariant

NFC **UIDs are not secrets** — any phone can read them and they are cloneable. Therefore:

1. **UID-only login is forbidden.**
2. Login MUST be a **signed challenge-response** proving the tag holds the private key (ECDSA or equivalent).
3. The UID may identify which credential to look up; it must not authenticate by itself.
4. Tag programming (Subtoken / tag-writer) that locks keys after write is the provisioning path; validation crypto is **shared auth code**, not mobile-only code.

Product implementations that shortcut this invariant are constitution violations.

### 13.3 Subtoken (TK)

| | |
|--|--|
| APP | `TK` — **Subtoken** |
| Audience | `[admin]` |
| Absorbs | `SubTerraCo/subtoken`, `tag-writer`, `validation` |
| Status | Reserved — consolidation and revival deferred (GV-0002 D6 / D8) |

### 13.4 Dewey areas added for Nexus

| Code | Area |
|------|------|
| `SO` | Social / feed |
| `EV` | Events / ticketing |

Existing `AU` (Auth / device identity) and `NF` (NFC / crypto tags) cover challenge-response and tag crypto.

---

## 14. Implementation language

**New application code is TypeScript.** This rule applies to every SubTerraCo repository.

| Allowed | When |
|---------|------|
| TypeScript (`.ts`, `.tsx`) | All new app, shell, integration, library, and service code |
| Python | Only when the work needs Python: an existing Python service, script, or tool, or a job that Python is required to perform |
| JavaScript (`.js`, `.cjs`, `.mjs`) | Only for config and tooling files that the tool itself requires to be JavaScript |

Do not add new JavaScript or JSX (`.jsx`) for application code. `.tsx` is TypeScript; use it when a file needs JSX syntax.

Rust is allowed only inside Tauri v2 native bindings: file system, local process IPC, hardware NFC, and DaVinci socket control (GV-0004). Application logic stays TypeScript.

This rule does not require converting existing code. New code follows it. An existing Python service stays Python, and new modules of that service may be Python. A new app or library starts in TypeScript.

---

## 15. Design language (Material Design 3)

Design record: [GV-0003](Docs/DESIGN_RECORDS/GV-0003-material-3.md).

**Material Design 3 is the UI framework for the SubTerra shell and for every SubTerra-owned app.** Shell chrome and product screens share one component system and one theme so layout, type, shape, and color stay uniform.

| Rule | Requirement |
|------|-------------|
| System | [Material Design 3](https://m3.material.io/) only. Do not add a second UI kit (MUI, shadcn, or a hand-rolled button/nav set) for new UI |
| Web, desktop, and mobile | Tailwind CSS preset plus `@material/material-color-utilities` in `packages/ui` (GV-0004). Arbitrary Tailwind values and hardcoded hex/RGB in `.tsx` fail CI |
| Theme | One theme, owned by `packages/ui`. `@subterra/shell-ui` is the legacy package until the monorepo lands |
| Seed color | Amber `#e8a54b` (current shell accent). Not Blocks magenta, and not Material's default purple |
| New UI | Material 3 components: app bars, navigation, buttons, text fields, lists, sheets |
| Existing UI | Migrates when that screen is edited. This rule does not require a rewrite in place |

### Exemptions

| Case | Why |
|------|-----|
| Vendor-fork UI (Actual / `FN` while it tracks upstream screens) | Restyling upstream UI makes every sync a conflict and blocks contributing back |
| Tools with no UI (`tag-writer`) | Nothing to theme |

A repo that claims an exemption says so in its `.cursor/rules/` and in the manifest when the vendor-fork flag exists. The exemption covers that repo's upstream UI only. New SubTerra screens inside an exempt repo still use Material 3.

Headless use of `@actual-app/api` inside `packages/budget` (`FN`) is the intended integration. That wrapper is ours and uses Material 3. Actual's own UI stays upstream. Billbot (`BB`, `packages/billbot`) is invoicing and is a separate package.

---

## 16. Licensing (GV-0004)

New original packages in the enterprise monorepo use **Business Source License 1.1**, with an additional use grant and a 36-month change to Apache 2.0. PoweredUpLabs issues Ed25519 commercial license keys. The grant covers solo operators, artists, contributors, nonprofits, and businesses under 5 seats and under $100,000 annual gross revenue.

This constitution cannot relicense other people's code:

| Code | License that stays |
|------|--------------------|
| Already published SubTerraCo MIT files | MIT. Those grants are irrevocable |
| Actual, Flarum, and other MIT upstream we choose to ship | MIT. Notices stay in the bundle |
| InvoiceShelf, if used | AGPL-3.0. It is not wrapped into the BSL packages or the paid multi-tenant host |
| Anytype any-sync | Any Source Available License. Commercial use stays limited to Allowed Networks |

`packages/budget`, `packages/anytype`, and `packages/ui` are BSL only for code we write. Imported upstream code keeps its own license.
