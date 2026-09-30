# GV-0001 — GitHub management, deployment pipelines, workspace QA

| | |
|--|--|
| **Address** | `GV.CX.DV.01.010.010` |
| **Release** | `v26.08.03` |
| **Status** | Design locked (Round 1 + Round 2) — implementation partially blocked. **Product topology in this record (separate product repos, Shell as ST) is superseded by GV-0004.** GitHub org, `master`, reusable pipelines, vendor `upstream` remotes, and workspace-QA location still stand |
| **Owner** | Governance agent (GV) |

Expands the GV mandate (constitution §9) to cover GitHub repo management, reusable deployment pipelines, and a workspace-level Playwright QA suite.

**Still stands:** SubTerraCo org, Team plan, `master` as production, six reusable workflows, vendor `upstream` remotes, workspace QA in `tests/`, twin-SDK contract in `sdk-contract`.

**Superseded by GV-0004:** separate GitHub repos as the product shape, Shell application owned only by ST, Electron/Next desktop as the thing to build. The product is `SubTerraCo/luna` (not created yet). This governance repo still owns the reusable workflows consumed by leftover product repos.

---

## 1. Conflict audit findings

### Round 1

| # | Conflict | Evidence |
|---|----------|----------|
| C1 | `subterra-governance` and `subterra-shell` do not exist on GitHub; both local repos have no remote | Owner has only `Blocks`, `mailbot`, `gemini-quantbot`, `anytype-google-contact-integration` |
| C2 | Mailbot remote points at `poweredupbass/mailbot`, an owner handle that no longer resolves | `PoweredUpLabs/mailbot` exists and its HEAD matches local `dd1ddaa` exactly — safe URL repoint |
| C3 | Anytype identity ambiguous: local remote is the vendor SDK `anyproto/anytype-api` | Manifest claims `PoweredUpLabs/subterra-anytype` (provisional) |
| C4 | Twin SDKs do not exist as code — `shell/packages/` is README-only | Constitution §2 parity claim is aspirational; SDK-contract e2e has nothing to assert against |

### Round 2

| # | Conflict | Evidence |
|---|----------|----------|
| R2-1 | `PoweredUpLabs` is a **User** account, not an Organization — and is the authenticated account itself (renamed from `poweredupbass`) | `gh api users/PoweredUpLabs` → `"type": "User"` |
| R2-2 | Blocks `deploy-web.yml` deploys on push to `main`, which does not exist (default branch is `master`) | Remote branches: `master`, `dev`, `v26.06.19`…`v26.07.17` — the Vercel deploy has never fired |
| R2-3 | Local Anytype work sits on top of the vendor's upstream git history | `git log` shows `anyproto` commits beneath `Add SubTerra Anytype Integration Service` |
| R2-4 | Four of the six chosen pipelines have zero or one consumer | `publish-npm` needs `@subterra/*` (absent); `build-android` and `release-desktop` are Blocks-only |
| R2-5 | Deferring the QA suite makes Shell + the twin SDKs the critical path | `shell/packages/` is README-only |

---

## 2. Locked decisions

| Ref | Decision |
|-----|----------|
| **D1** | Full GitHub fix: create `subterra-governance` + `subterra-shell`, repoint Mailbot, resolve Anytype |
| **D2** | Anytype gets its own repo `subterra-anytype`; `anyproto/anytype-api` is retained as a separate `upstream` remote |
| **D3** | Six reusable pipelines are governance-owned: `ci-node`, `deploy-web`, `release-desktop`, `publish-npm`, `build-android`, `nightly-dev-push` |
| **D4** | Workspace QA lives in `governance/tests/` as its own Playwright project, run from the meta workspace |
| **D5** | QA coverage is **deferred** until Shell and the twin SDKs are real code — scaffold and location only for now |
| **D6** | Migrate to a **real GitHub Organization**; org-only features (org secrets, teams, rulesets) become available after migration |
| **D7** | Production branch is **`master`** (the existing default). Reusable deploy workflows target `master`; constitution §4 documents the flow |
| **D8** | Anytype repo is seeded by pushing local history as-is, preserving our commits and vendor traceability |
| **D9** | All six workflows are authored now; the four without consumers are marked `R0 stub` with a consumer note. Only `ci-node` and `deploy-web` are wired live |
| **D10** | Governance scaffolds `@subterra/app-sdk` + `@subterra/integration-sdk` skeletons as **parity contracts**; the Shell application itself stays ST-owned |

---

## 3. Blocked on user action

**GitHub organizations cannot be created through the API.** Verified: `POST /orgs` returns `404 Not Found` on github.com — org creation is web-UI only (`https://github.com/organizations/new`). The Enterprise `POST /admin/organizations` endpoint is GitHub Enterprise Server only.

Consequences for D6:

1. The organization must be created manually in a browser.
2. The org **cannot** be named `PoweredUpLabs` — that handle is already the personal user account. A distinct name is required.
3. The org name is load-bearing: it appears in every `uses:` workflow reference, every `repo:` field in `subterra.manifest.yaml` and `codes/APP_REGISTRY.yaml`, and every git remote.

Until the org exists and is named, repo creation and transfers are deferred so we don't create repos under the user account and immediately migrate them.

### Sequencing

| Step | Blocked? |
|------|----------|
| Design record, constitution updates | No — done |
| Author six reusable workflows | No — done, YAML-validated (owner in `uses:` refs pending org name) |
| Scaffold twin SDK skeletons | No — done, compiled and parity-verified |
| Scaffold `governance/tests/` | No — done, 13 specs discoverable |
| Fix Blocks `deploy-web.yml` branch trigger | No — done |
| Repoint Mailbot remote to a working URL | No — done, fetch verified |
| Create `subterra-governance` / `subterra-shell` / `subterra-anytype` | No — done under the user account as interim hosting |
| Tag governance `v1` + open Actions access | No — done |
| Wire Shell to reusable `ci-node@v1` | No — done, CI green |
| **Create the `SubTerra-OS` org** | **Yes** — user must create at `https://github.com/organizations/new` |
| Transfer all five repos into the org | **Yes** — awaiting org |
| Branch protection + org secrets conventions | **Yes** — awaiting org |

---

## 4. Follow-ups after org exists

1. Create the three missing repos in the org and push local `governance`, `shell`, `anytype`.
2. Transfer `Blocks` and `mailbot` into the org.
3. Rewrite `uses:` refs from the placeholder owner to the real org, and tag governance `v1`.
4. Replace Blocks' inline `deploy-web.yml` with a thin caller of the reusable workflow (constitution §9 invariant 3).
5. Apply branch protection on `master` and define the org secrets convention (`VERCEL_*`, `EXPO_TOKEN`, `NPM_TOKEN`).
6. Rename Mailbot's default branch `main` → `master` to satisfy D7 (found during implementation — Mailbot's remote default is `main`, unlike Blocks' `master`).
7. Revisit D5 for the `marketplace` project once Shell has a running host.

---

## 5. Verified this batch

Everything below was executed and checked, not just authored.

| Item | Result |
|------|--------|
| Seven workflow YAML files parse | Pass — `ci-node`, `deploy-web`, `release-desktop`, `publish-npm`, `build-android`, `nightly-dev-push`, `governance-ci` |
| **Governance CI green on GitHub** | Pass — run `30940664815` |
| **Shell CI green *through* the reusable workflow** | Pass — run `30940778396`; a clean runner type-checked and built all three SDK packages. First real consumer of `ci-node@v1` |
| Three repos created and pushed | Pass — `subterra-governance`, `subterra-shell` (both `master`), `subterra-anytype` (`main`) |
| Twin SDKs compile via TS project references | Pass — `pnpm -r build` across `sdk-contract`, `app-sdk`, `integration-sdk` |
| **Twin API parity holds at runtime** | Pass — both twins export exactly `SDK_CONTRACT_VERSION, SDK_ROLE, SDK_SURFACE, defineItem, marketplaceForRole`, equal to `SDK_SURFACE`; only `SDK_ROLE` differs |
| Role/marketplace guard rejects mismatches | Pass — `defineItem` throws when an app declares `marketplace: integrations` |
| Workspace QA suite is discoverable | Pass — 13 specs across `contract` (9) and `marketplace` (4) |
| Governance `type-check` | Pass |
| `validate:manifest` after catalog edits | Pass |
| Frozen-lockfile install (what `ci-node` runs) | Pass |
| Mailbot remote repoint | Pass — `git ls-remote` resolves; remote HEAD `dd1ddaa` matches local |
| Blocks `deploy-web.yml` trigger | Fixed — `master`, parse-verified |

### Defects found and fixed during verification

1. **Twin SDKs could not resolve the shared contract.** `type-check` used `--noEmit`, so no declarations existed for the twins to import. Fixed with TypeScript project references (`composite: true` + `references`) and `tsc -b`.
2. **Playwright discovered zero tests.** `test.fixme(title)` without a body is parsed as a *modifier*, not a test declaration. Fixed by giving each entry a body.
3. **`tsconfig` referenced `@types/node` that was not installed.** Added the dependency.
4. **`pnpm/action-setup` version conflict.** Passing its `version` input while `package.json` declares `packageManager` is a hard error. Every SubTerra repo declares `packageManager`, so the first CI run died before installing. The `pnpm-version` input now defaults to empty and `packageManager` wins.
5. **Node floor was incompatible with the pinned pnpm.** pnpm 11.14 requires Node ≥ 22.13, but the workflows defaulted to Node 20 and `engines.node` said `>=20`. CI failed with `ERR_UNKNOWN_BUILTIN_MODULE: node:sqlite`. Raised the default to Node 22 across all six workflows and corrected `engines` in governance and Shell.

> **Open risk (BK):** Blocks' own workflows pin `node-version: 20` with `pnpm/action-setup version: 11.8.0`, while its `package.json` declares `packageManager: pnpm@11.14.0`. That is the same latent mismatch as defect 5. Blocks CI has not been migrated to the reusable workflow yet, so this is untouched — address it when BK adopts `ci-node@v1`.

### Interim hosting

Repos were created under the `PoweredUpLabs` **user** account so the work is backed up immediately, and will be transferred into `SubTerra-OS` once that org exists. Actions access on `subterra-governance` is set to `user` so sibling private repos can call its reusable workflows, and the repo is tagged `v1`.

Consumers currently reference `PoweredUpLabs/subterra-governance/...@v1`. Docs and comments name the final `SubTerra-OS/...` path; both need updating at transfer time.

---

## 6. Org migration — resolved

**Superseded:** §3 assumed a new org had to be created and named. It did not. `SubTerraCo` already existed and the PM is an active **admin** of it, so D6 resolved to "use the existing org" and the locked `SubTerra-OS` name was dropped before anything referenced it in anger.

All five repos were transferred out of the `PoweredUpLabs` personal account on 2026-08-04:

| Repo | New home |
|------|----------|
| `subterra-governance` | `SubTerraCo/subterra-governance` |
| `subterra-shell` | `SubTerraCo/subterra-shell` |
| `subterra-anytype` | `SubTerraCo/subterra-anytype` |
| `Blocks` | `SubTerraCo/Blocks` |
| `mailbot` | `SubTerraCo/mailbot` |

Local remotes, manifest `repo:` fields, `APP_REGISTRY`, workflow `uses:` comments, both READMEs, and Shell's live CI ref were all rewritten to `SubTerraCo`. GitHub keeps redirects from the old paths, but nothing depends on them.

### Plan — upgraded to Team (resolved)

The org was on **Free** at transfer time and was upgraded to **Team** on 2026-08-04. Team turned out to be a hard dependency rather than a nice-to-have; see the CI investigation below.

Now enabled:

- `master protection` rulesets on all five product repos — `deletion`, `non_fast_forward`, and `required_status_checks`, with org admins as bypass actors so solo pushes still work. Requiring PRs was deliberately left off.
- Organization secrets scoped to selected private repos, consumed via `secrets: inherit`.

### Root cause — reusable workflows require a paid plan

Every CI run failed immediately after the transfer with **zero jobs, zero check-runs, and no downloadable log**. Three hypotheses were tested and falsified before the real one:

| Hypothesis | Test | Result |
|---|---|---|
| The migration commit broke a workflow | Diff `.github/` across the good/bad boundary | Only six comment lines changed |
| Line endings or a BOM from Windows edits | `od -c` on the raw bytes; CR counts | No BOM; CRLF predated the breakage |
| Actions access policy | A/B toggled `none` ↔ `organization` and re-ran | Failed identically both ways |
| Billing or org policy | Re-ran a plain workflow in `subterra-anytype` | Ran a real job successfully |

The decisive test was re-running an **older commit that had already passed**. It now failed, proving the cause was environmental rather than any change made during the migration. A three-file probe then separated the variables: a plain workflow succeeded while a brand-new **three-line** reusable workflow failed in the same repo, same commit.

**Reusable workflows in private repositories do not run on the GitHub Free plan.** They fail as `startup_failure` with no diagnostic surfaced through the API — the only visible tell is that the run's `name` is reported as the *file path* rather than the workflow's declared `name`. Upgrading to Team fixed it immediately, with no code change.

Because `subterra-shell` consumes `ci-node.yml` cross-repo, **the whole §11 pipeline layer depends on the Team plan.** Downgrading would break CI everywhere. This is recorded in §10 so it is not mistaken for an optional cost.

Two secondary findings:

- **Transfer silently reset Actions access to `none`** on `subterra-governance`, which would independently have broken cross-repo reuse. Re-apply `organization` after any transfer.
- After the upgrade, `subterra-shell` alone kept failing while `mailbot` succeeded with a byte-identical caller, and `workflow_dispatch` on it returned **HTTP 500** — stale per-repo Actions state. Toggling Actions off and on, plus a subsequent push, cleared it.

### Verified green under the org

| Repo | Check |
|------|-------|
| `subterra-governance` | `Governance CI` — local reusable call |
| `subterra-shell` | `Shell CI` — cross-repo `ci-node.yml@v1` |

### Pre-existing org repos to audit

`SubTerraCo` already contained `validation` (described as "the NFC validation app"), `tag-writer`, and `subtoken`, all from 2022. These plausibly belong to the reserved **`TK` (Ticketing / NFC)** APP code. They are noted in `APP_REGISTRY.yaml` but not yet claimed — audit before assigning a `localPath` or marketplace role.

`anytype-google-contact-integration` (the superseded Anytype predecessor) was also moved into the org so all Anytype history lives in one place; it stays flagged as `legacyRepo` in the manifest and is not part of the active AT product. `gemini-quantbot` is unrelated to SubTerra and deliberately stays on the personal account.

---

## 7. Design note — why parity is structural

Constitution §2 requires the twin SDKs to have "identical APIs". Enforcing that by hand across two packages guarantees eventual drift, so the contract lives in one internal package (`@subterra/sdk-contract`) that both twins re-export. `SDK_SURFACE` is the declared list of symbol names, which makes the parity invariant a one-line runtime assertion instead of a review checklist.
