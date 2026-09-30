# SubTerra CI Ops Constitution

> Source of truth for Grounded Rules and for every repo that consumes it.
> Product repos **consume** this document; they do not fork conflicting rules.
>
> **GV-0004 and [Docs/ARCHITECTURE.md](Docs/ARCHITECTURE.md) supersede this constitution wherever they disagree.** The enterprise monorepo (SubTerra Metro + packages, two runtimes, BSL for new original code, Tailwind Material 3 tokens, Rust only inside Tauri) is the current product shape. Readable summary: [Docs/GOVERNANCE_OVERVIEW.md](Docs/GOVERNANCE_OVERVIEW.md). Rules below still apply when GV-0004 is silent.

**ciOpsVersion:** aligns with this repo's `package.json` version (`YY.M.D`).

---

## 1. Topology (GV-0004)

The **product** is one pnpm + Turborepo enterprise monorepo (`SubTerraCo/luna`, not created yet). This repository (**Grounded Rules**, GitHub slug `SubTerraCo/subterra-governance`) stays the rules, Dewey, manifest, reusable Actions, and `@subterra/ci-ops` repo. It is not the product monorepo. Powerline may Settings-rename the GitHub slug to `grounded-rules` after this identity lands; until then consumers keep the live slug.

Existing SubTerraCo product repos stay on `master` and keep calling Grounded Rules workflows until they are folded in.

| Path | Repo | Role |
|------|------|------|
| this repo | `SubTerraCo/subterra-governance` | Grounded Rules — constitution, Dewey tables, manifest, reusable Actions, `@subterra/ci-ops` |
| (future) `apps/` `packages/` `tooling/` | `SubTerraCo/luna` | Enterprise monorepo — SubTerra Metro, SubTerra Central, and packages. Blueprint: [Docs/ARCHITECTURE.md](Docs/ARCHITECTURE.md) |
| `shell/` | `SubTerraCo/subterra-shell` | Leftover shell repo until Phase 1 copies what is still useful. Do not build leftover `apps/admin` folders or `packages/shell-core` |
| existing `apps/<name>/` | per product (Blocks, Mailbot, …) | Leftover standalone app repos until folded into `packages/` / `apps/` in `luna` |
| existing `integrations/<name>/` | per integration (Anytype) | Leftover standalone integration repos until folded. PKM stays a dedicated Anytype workspace, not a monorepo package |

### 1.1 Shell targets (GV-0004; supersedes GV-0002 D1–D2)

Exactly two executable runtimes. Product packages install into them. SubTerra Metro personal data and SubTerra Central data do not share a read or write path unless the owner turns on the optional data bridge.

| Shell | Path | Runtime | Hosts |
|-------|------|---------|-------|
| SubTerra Metro | `apps/subterra-metro` | Tauri v2 + React 19 + Vite | Windows, macOS, Android, iOS, and Arch Linux (Omarchy) |
| SubTerra Central | `apps/subterra-central` | Offline-first PWA | Gigs, events; Open Gig and Community install here |

Shared UI is `packages/open-ui` (Material 3). Shared local facts go through the hub. Upstream cores stay dependencies or forks: Actual's API for the ledger, any-sync at the PKM boundary, Flarum for community. Blueprint: [Docs/ARCHITECTURE.md](Docs/ARCHITECTURE.md). Record: [GV-0004](Docs/DESIGN_RECORDS/GV-0004-enterprise-monorepo.md).

Leftover `apps/admin` folders and `packages/shell-core` from GV-0002 are not the paths to build. `subterra-shell` remains until the monorepo exists.

---

## 2. Marketplace and remaining twin-SDK contract

**Current product marketplace (GV-0004).** Every installable package stands alone. It may not import another package. The shell is the only dependency: Material 3, the marketplace, and a small SQLite hub. A package opens and works when the hub is empty. Separate Apps and Integrations tabs are **dropped**. The same package can be installed in SubTerra Metro, in SubTerra Central, or in both; each shell has its own hub. The live mount gate is catalog **`audience`**, not twin marketplace fields.

**Stop on new monorepo packages.** Do not write `role: app` / `role: integration`, `marketplace: apps` / `marketplace: integrations`, or a twin SDK (`@subterra/app-sdk` / `@subterra/integration-sdk`) on reserved monorepo items. Those rows use `marketplace: null`, `sdk: null`, and `audience`.

**Deprecated leftover.** Existing filled twin fields on leftover standalone-repo items (Blocks, Mailbot, Billbot, Anytype, and the leftover shell SDK packages) stay in the catalog until fold-in. They keep the leftover `subterra-shell` surface:

- Same manifest schema (`subterra.manifest.yaml`)
- Twin SDKs with **identical APIs**: `@subterra/app-sdk` and `@subterra/integration-sdk` (leftover only)
- Same CI Ops / Dewey / `/NF` `/NB` `/RD` / `/BUILD` process

Do **not** start new product work as a pair of separate app/integration GitHub repos. New work follows [Docs/ARCHITECTURE.md](Docs/ARCHITECTURE.md). Prefer the monorepo package layout. The Grounded Rules **product-repo template** still exists only for leftover standalone repos that must be registered before fold-in.

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

**Cross-repo references:** `OT/N-0026` (rewritten from `BK/N-0026`, PI-011 A) or the former-code alias `OD/N-0026`; `SM/N-0001` or the aliases `LO/N-0001` / `ST/N-0001` (APP + local N/B). New work uses the current codes (SM, OT, OS, BI, …). Existing `BK/N-####` addresses were rewritten to `OT/N-####`. Alias codes (ST, LO, OD, MB, BB) remain valid on existing addresses. `BK` stays an address-alias catalog row for leftover Blocks. `LO` is the former live shell code for SubTerra Metro. `OD` is the former live code for Open Time.

**PP.MC vs PR.MC:** `PP.MC` = MCP as a delivery platform; `PR.MC` = MCP feature area. Prefer unambiguous combinations (e.g. `OT.DT.MC.01.010.010`, or the former-code alias `OD.DT.MC.01.010.010`). `BK.DT.MC.01.010.010` was rewritten to `OT.DT.MC.01.010.010` (PI-011 A).

---

## 4. Versioning (date + batch)

Shared **format** across all repos; each repo stamps **independently**.

| Layer | Format | Example |
|-------|--------|---------|
| Release | `vYY.MM.DD` | `v26.08.03` |
| Batch | `vYY.MM.DDbX` | `v26.08.03b1` |
| npm / installer stamp | `YY.M.D-bX` | `26.8.3-b1` |
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

Cross-repo versions are aggregated in Grounded Rules (not in Shell UI):

| Artifact | Path |
|----------|------|
| Machine-readable | [`versions/fleet.json`](versions/fleet.json) |
| Human dashboard | [`Docs/VERSIONS.md`](Docs/VERSIONS.md) |

Refresh from the meta workspace:

```bash
pnpm versions:fleet
```

(From this repo root. The older `cd governance && …` form is the meta-workspace checkout path.)

Collection is **local checkouts only** (manifest `localPath` + Package junctions). Each APP row shows Display (`vYY.MM.DDbX`), npm, branch, and catalog status. CI runs `pnpm versions:fleet:check` against the committed JSON (does not regenerate from missing siblings on the runner).

---

## 5. Design gates

`/NF`, `/NB`, `/RD` require Round 1 + Round 2 design with conflict audits before implementation (see Blocks `CI_OPS_FRAMEWORK.md` §4). Use AskQuestion when available; otherwise AskQuestion fallback lists including Need More Context, Open discussion, OTHER.

---

## 6. Manifest

Canonical catalog: [`subterra.manifest.yaml`](subterra.manifest.yaml).

Each shell (SubTerra Metro or SubTerra Central) vendors or generates JSON at build time from the catalog, then **filters by `audience`** for the active shell session (§13). New monorepo packages stand alone (GV-0004) and do not declare a twin marketplace tab.

### 6.1 Item fields (audience — GV-0002 D4)

| Field | Meaning |
|-------|---------|
| `role` | Topology: `shell` \| `governance`. Twin values `app` \| `integration` are **deprecated leftover** on standalone-repo rows only — not who is logged in, and not for new monorepo packages |
| `marketplace` | Leftover twin: `apps` \| `integrations` on BK/MB/BB/AT. Luna packages and shells use `null` |
| `sdk` | Leftover twin package (`@subterra/app-sdk` or `@subterra/integration-sdk`), or `null` on Luna items |
| `audience` | Live mount gate. List of catalog audiences that may mount the item. **Locked values: `admin` and/or `member` only** (GV-0002 D4). Do not rename these strings. |

**Mapping (locked):** `admin` → SubTerra Metro (`SM`, `apps/subterra-metro`; address aliases `LO`, `ST`); `member` → SubTerra Central (`SC`, `apps/subterra-central`).

**Default when `audience` is omitted: `["admin"]` (fail-closed).** An item is never visible on SubTerra Central unless it explicitly includes `member`. There is no third audience.

Do **not** overload leftover twin `role` for permissions — `SubterraRole` in `@subterra/sdk-contract` already means app vs integration on the leftover shell.

---

## 7. Reusable CI

Product repos should call:

```yaml
jobs:
  ci:
    uses: SubTerraCo/subterra-governance/.github/workflows/ci-node.yml@v1
```

Powerline may Settings-rename this GitHub repo to `grounded-rules` later; until that click, keep the live slug above.

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

Grounded Rules itself uses this constitution + codes + manifest; it does not ship a product ROADMAP for features.

---

## 9. Grounded Rules agent mandate (GV)

The Grounded Rules agent is the **one-stop shop** for cross-repo standards. Product agents (SM, OT, OS, AT, … and address aliases ST, LO, OD, BK, MB) consume these artifacts; they do not fork conflicting pipelines or Dewey rules.

### Owns

| Domain | Scope |
|--------|--------|
| **Rulesets & Dewey** | Constitution, APP/PP/PR codes, manifest, CI Ops gates |
| **Design language parity** | Material Design 3 (§15, GV-0003, GV-0004). One theme in `packages/open-ui` |
| **Feature parity** | Installable packages stand alone (GV-0004). Twin-SDK API identity remains only for leftover `subterra-shell` items until fold-in. New monorepo catalog items do not declare twin `role` / `marketplace` / SDK |
| **GitHub repo management** | Create/configure SubTerraCo repos (Grounded Rules, leftover product repos, and later `luna`); branch protections; default labels; secrets/vars conventions |
| **Deployment pipelines** | Reusable Actions (`ci-node`, deploy, release) consumed by product repos until the monorepo pipeline in `luna` replaces them |
| **Product templates** | `templates/product-repo/` (still used for leftover standalone repos; new product work prefers the monorepo layout) |
| **Workspace QA (Playwright)** | Cross-package e2e at the Grounded Rules layer until monorepo `tests/contract` replaces it |

### Does not own

- Product-specific feature implementation inside a single app (that stays on the product APP code)
- Product-local Playwright suites that only cover one app’s UI (e.g. leftover Blocks `tests/e2e`, later Open Time in the monorepo) — those remain in-product; Grounded Rules QA covers **cross-repo / catalog / SDK contract** journeys

### Invariants

1. New catalog items are registered in `codes/APP_REGISTRY.yaml` **and** `subterra.manifest.yaml` before first release.
2. Leftover standalone repos start from the Grounded Rules product template and wire reusable workflows from this repo. New product work goes in `SubTerraCo/luna` once that repo exists.
3. Deployment / CI changes for existing repos land in Grounded Rules first, then product repos bump the workflow ref (`@v1` / pin). Monorepo CI follows the blueprint pipeline in [Docs/ARCHITECTURE.md](Docs/ARCHITECTURE.md) (GV-0004 C5).
4. Workspace Playwright QA is the release gate for catalog + SDK parity until the monorepo `tests/contract` suite replaces it — not a substitute for product `/testrelease`.
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
| `required_status_checks` | CI must pass — `validate / lint-build` (Grounded Rules), `ci / lint-build` (consumers) |

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
2. Add the item to `subterra.manifest.yaml`. Leftover standalone repos may keep deprecated twin `role` + `marketplace`. New monorepo packages: `marketplace: null`, `sdk: null`, `audience` as the gate.
3. Copy `templates/product-repo/` and replace `APPCODE` / product name. Only for leftover standalone repos — new product work belongs in `luna`.
4. Create the repo in the org (private by default).
5. Set default branch to `master` (§4.1).
6. Wire CI to the reusable workflows (§11).
7. Apply the `master protection` ruleset.
8. Grant the repo access to any org secrets it needs.

### Vendor upstreams

When a product is seeded from a third-party repo, keep the vendor as a **separate `upstream` remote** — never as `origin`. `origin` always points at our own repo.

---

## 11. Reusable deployment pipelines

Grounded Rules owns six reusable workflows in `.github/workflows/`. Product repos call them; they do not fork equivalents.

| Workflow | Purpose | Status |
|----------|---------|--------|
| `ci-node.yml` | Install · type-check · lint · build · manifest validate | **Live** |
| `deploy-web.yml` | Vercel deploy from `master` | **Live** |
| `release-desktop.yml` | Desktop installer (authored against Electron / Blocks) | R0 stub — leftover consumer: BK. SubTerra Metro ships with Tauri; do not treat this stub as the SubTerra Metro pipeline |
| `publish-npm.yml` | Publish `@subterra/*` packages | R0 stub — blocked on SDK code. Tokens move to `packages/open-ui` in the monorepo |
| `build-android.yml` | Expo EAS Android build | R0 stub — leftover consumer: BK mobile. SubTerra Metro Android is Tauri, not Expo |
| `nightly-dev-push.yml` | Nightly batch seal onto `dev` | R0 stub — leftover consumer: BK |

`R0 stub` means the workflow is authored and syntactically valid but not yet wired to a consumer. Do not delete stubs; wire them when a consumer appears.

### Consumption

```yaml
jobs:
  ci:
    uses: SubTerraCo/subterra-governance/.github/workflows/ci-node.yml@v1
    secrets: inherit
```

Powerline may Settings-rename this GitHub repo to `grounded-rules` later; until that click, keep the live slug above.

Changes land here first, then product repos bump the ref (§9 invariant 3). `v1` is a moving tag on the Grounded Rules default branch; force-move it after every change consumers should pick up.

### Two prerequisites for cross-repo calls

Both are easy to break and both fail the same way — an instant run with **no jobs and no logs** (`startup_failure`), which reports nothing useful:

1. **Team plan.** Private-repo reusable workflows do not run on Free.
2. **Access policy.** Grounded Rules must keep Actions access set to `organization`:

```bash
gh api repos/SubTerraCo/subterra-governance/actions/permissions/access
# expected: {"access_level":"organization"}
```

**Transferring a repo silently resets this to `none`** — re-apply it after any transfer.

When diagnosing a `startup_failure`, note that a run whose `name` shows the *file path* instead of the workflow's declared `name` never resolved its workflow at all. Compare against a plain (non-reusable) workflow in the same repo to separate a repo-wide Actions problem from a reusable-workflow one.

---

## 12. Workspace QA (Playwright)

Home: **`tests/`** in this repo — its own Playwright project, run via `pnpm test:workspace`. (The older `governance/tests/` path is this same folder in a meta-workspace checkout.)

### Scope split

| Layer | Owner | Covers |
|-------|-------|--------|
| Product e2e | Product repo (e.g. Blocks `tests/e2e`) | One app's own UI and flows |
| **Workspace QA** | **Grounded Rules** | Cross-repo contracts: manifest ↔ registry parity, catalog/audience handoff, twin-SDK API identity (legacy shell), design-token parity. Replaced by monorepo `tests/contract` when `luna` exists |

### Status

Coverage is **deferred** (GV-0001 D5) until a shell host and real SDK surface exist to assert against. Twin SDK scaffolds live in `subterra-shell`; SubTerra Metro / SubTerra Central do not exist yet. The suite's config, docs, and location are locked; tests land once a shell host is real.

Workspace QA is a release gate for marketplace + SDK parity. It never substitutes for a product's own `/testrelease`.

---

## 13. Shell audiences and NFC auth (locked GV-0002)

Design record: [GV-0002](Docs/DESIGN_RECORDS/GV-0002-nexus-dual-shell.md).

### 13.1 Audiences

Catalog field `audience` is a list. **Machine values stay exactly `admin` and `member`** (GV-0002 D4). Do not rename them to shell names or any other enum.

| Catalog `audience` | Shell | Sees |
|--------------------|-------|------|
| `admin` | SubTerra Metro (`apps/subterra-metro`, code `SM`; address aliases `LO`, `ST`) | Items whose `audience` list contains `admin` (this is the default when the field is omitted) |
| `member` | SubTerra Central (`apps/subterra-central`, code `SC`) | Only items whose `audience` list contains `member` |

Prefer shell names (SubTerra Metro / SubTerra Central) in prose. Do not invent a third audience. “Powerline” and “Collective” are not `audience` values. Leftover `apps/admin` folders are not an audience value and are not the paths to build.

Session identity is separate from leftover twin `role`. Host context must expose audience without reusing the `role` field name.

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
| Audience | `[admin, member]` — ARCHITECTURE install matrix |
| SubTerra Metro (`admin`) | Organizer tools |
| SubTerra Central (`member`) | Event page, tickets, show log, digital goods |
| Absorbs | `SubTerraCo/subtoken`, `tag-writer`, `validation` |
| Status | Reserved — consolidation and revival deferred (GV-0002 D6 / D8) |

GV-0002 D3/D6 historically listed TK as `audience: [admin]` only. The live catalog follows the ARCHITECTURE matrix: both shells.

### 13.4 Dewey areas added for the member shell

Reserved in GV-0002 D7 for the member shell (SubTerra Central):

| Code | Area |
|------|------|
| `SO` | Social / feed |
| `EV` | Events / ticketing |

Existing `AU` (Auth / device identity) and `NF` (NFC / crypto tags) cover challenge-response and tag crypto.

### 13.5 Community (CH)

| | |
|--|--|
| APP | `CH` — **Community** |
| Audience | `[admin, member]` — ARCHITECTURE install matrix |
| SubTerra Metro (`admin`) | Crew discussion |
| SubTerra Central (`member`) | Public discussion |
| Engine | Flarum (`FM`, optional). Community still runs without Forum |

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
| Web, desktop, and mobile | Tailwind CSS preset plus `@material/material-color-utilities` in `packages/open-ui` (GV-0004). Arbitrary Tailwind values and hardcoded hex/RGB in `.tsx` fail CI. Docs may cite the locked palette hexes below; product `.tsx` must use tokens |
| Theme | One theme, owned by `packages/open-ui`. That package owns **palette, type, and spacing**. `@subterra/shell-ui` is the legacy package until the monorepo lands. Token *code* lives in the product monorepo / leftover shell — not this Grounded Rules repo |
| Palette | Purple `#400080`, pink `#ED1CAD`, light blue `#1CEDC5`, teal `#008080`. The single amber seed `#e8a54b` is withdrawn. Not Blocks magenta |
| Type | Interim [Material 3 type scale](https://m3.material.io/styles/typography/type-scale-tokens) (display, headline, title, body, label). Font **families are not locked** — do not invent a typeface; wait for Powerline |
| Spacing | 4dp baseline grid (4px at 1×). Component padding and gaps snap to that grid |
| New UI | Material 3 components: app bars, navigation, buttons, text fields, lists, sheets |
| Existing UI | Migrates when that screen is edited. This rule does not require a rewrite in place |

### Exemptions

| Case | Why |
|------|-----|
| Vendor-fork UI (Actual screens while they track upstream) | Restyling upstream UI makes every sync a conflict and blocks contributing back. Open Books (`OB`) uses `@actual-app/api` and our Material 3 wrapper |
| Tools with no UI (`tag-writer`) | Nothing to theme |

A repo that claims an exemption says so in its `.cursor/rules/` and in the manifest when the vendor-fork flag exists. The exemption covers that repo's upstream UI only. New SubTerra screens inside an exempt repo still use Material 3.

Headless use of `@actual-app/api` inside `packages/open-books` (`OB`) is the intended integration. That wrapper is ours and uses Material 3. Actual's own UI stays upstream. Open Bill (`BI`, `packages/open-bill`) is invoicing and is a separate package.

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

`packages/open-books`, `packages/open-bill`, and `packages/open-ui` are BSL only for code we write. Imported upstream code keeps its own license. PKM stays in an Anytype workspace, not in this repo.
