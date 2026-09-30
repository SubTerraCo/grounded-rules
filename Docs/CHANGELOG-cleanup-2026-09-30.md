# Governance cleanup change log — 2026-09-30

**Branch:** `cursor/governance-cleanup-5f88`  
**Scope:** Align this repo with locked GV-0004 / [ARCHITECTURE.md](ARCHITECTURE.md) / recent architecture-ingestion, plus Powerline terminology follow-up (Central PWA; drop leftover product-name and topology words from live prose).  
**Deletes / archives:** **Held.** No file was deleted or moved to an archive folder. Proposed later archive moves wait for Powerline approval.

Companion readable summary (not a diff list): [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md).

---

## Follow-up (Powerline, same day) — terminology

Mandatory: (1) product-facing PWA is **SubTerra Central** at `apps/subterra-central`, not a separate web-runtime product; (2) remove leftover member-shell product naming from live prose and catalog; (3) describe topology as this rules repo + the Luna OS monorepo (plus leftover product repos until fold-in), without leftover multi-repo product-shape labels.

**Deletes still held.** Filename `Docs/DESIGN_RECORDS/GV-0002-nexus-dual-shell.md` is unchanged (archive rename would be a path delete). Markdown links must still use that path.

### File-by-file (this follow-up)

| Path | What changed |
|------|----------------|
| `Docs/ARCHITECTURE.md` | Two shells are `apps/luna-os` and `apps/subterra-central`. Tree no longer lists a separate web-runtime folder. Prior-plans “dropped” column rewritten without leftover member-shell / multi-repo product labels. |
| `Docs/DESIGN_RECORDS/GV-0004-enterprise-monorepo.md` | C1 old ruling = “one GitHub repo per app”. C2 builds Luna OS + SubTerra Central PWA; forbids leftover `apps/admin` and a second PWA folder. SC row no longer cites a withdrawn member-shell code. Withdrawn-code sentence no longer lists that code. |
| `Docs/DESIGN_RECORDS/GV-0002-nexus-dual-shell.md` | **Body rewritten** to Luna OS + SubTerra Central, audience, and NFC. Historical D1–D3 now use current names/paths. Topology diagram is `apps/luna-os` + `apps/subterra-central`. Filename unchanged (archive hold). |
| `Docs/DESIGN_RECORDS/GV-0001-github-pipelines-qa.md` | Status/superseded lines: “separate product repos”, not leftover multi-repo product-shape labels. |
| `CI_OPS_CONSTITUTION.md` | Web runtime path `apps/subterra-central`. Leftover standalone repos (not leftover multi-repo product-shape labels). Member shell is SubTerra Central (`SC`) with no withdrawn alias. §13.4 is the member surface. Link to GV-0002 still uses the on-disk filename. |
| `README.md` | Runtimes: Luna OS + SubTerra Central. Aliases: ST, BK, MB, BB only. |
| `.cursor/rules/governance-agent.mdc` | No leftover multi-repo product-shape labels; no leftover member-shell folders. |
| `codes/APP_REGISTRY.yaml` | Withdrawn member-shell **code row removed**. Header aliases are ST, BK, MB, BB. SC note does not cite a withdrawn code. |
| `codes/AREA_CODES.yaml` | SO note: SubTerra Central only. |
| `subterra.manifest.yaml` | Header: leftover standalone-repo items. Withdrawn member-shell **catalog item removed** (SC already present). ST note forbids leftover `apps/admin` / `shell-core` only. |
| `tests/README.md`, `tests/playwright.config.ts`, `tests/marketplace/placeholder.spec.ts` | Blocked on Luna OS / SubTerra Central, not a separate web-runtime product. |
| `packages/ci-ops/src/collect-versions.ts` | `preferredOrder` and notes drop the withdrawn member-shell code. |
| `Docs/VERSIONS.md` | Withdrawn member-shell fleet **row removed**. Alias note is ST / BK / MB / BB. |
| `versions/fleet.json` | Withdrawn member-shell object **removed** (catalog no longer has that item). Other snapshot fields left as generated. |
| `Docs/GOVERNANCE_OVERVIEW.md` | Two shells: Luna OS + SubTerra Central PWA. No second web-runtime folder. Aliases without the withdrawn member-shell code. Dropped “separate GitHub repos as the product shape”. How-to: no leftover admin folder / no second PWA. |
| `Docs/CHANGELOG-cleanup-2026-09-30.md` | This follow-up section. Questions 1–2 marked resolved. |

Pass 1 file-by-file below is the earlier cleanup. Live current-state is this follow-up plus [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md).

---

## What was stale (summary) — Pass 1

The following quotes leftover wording **as it existed then** (audit trail). Live docs after the Powerline follow-up no longer use those product names.

After GV-0004 landed, live documents still spoke as if the product were a **polyrepo** with **`apps/admin` + `apps/nexus`**, **Electron / Next**, **Material Web / `@subterra/shell-ui`**, and **Apps ↔ Integrations tabs**. Catalog rows for Luna OS / Central existed, but several locked packages were missing from the manifest, Axiom was still an active reserved app after Open Axiom was cut, and Subtoken’s `localPath` still said `apps/subtoken`.

Hypothesis confirmed: leftover wording was in `CI_OPS_CONSTITUTION.md`, README, cursor rules, design-record status/follow-ons, `APP_REGISTRY` / manifest notes, templates, tests, and workflow comments. Design-record **bodies** that lock historical decisions were not rewritten.

---

## File-by-file

### Added

| Path | What was stale | What changed |
|------|----------------|--------------|
| `Docs/GOVERNANCE_OVERVIEW.md` | No single readable current-state doc. Powerline had to stitch constitution + four design records + ARCHITECTURE + codes. | **Added.** Merges locked topology, codes/aliases, marketplace, NFC, Material 3, license, CI, phases, and leftover vs `luna`. Points at the detailed sources. Does not invent features. |
| `Docs/CHANGELOG-cleanup-2026-09-30.md` | This file. | **Added.** Primary deliverable: per-file stale → change (or left alone + why). |

### Edited — constitution, overview pointers, rules

| Path | What was stale | What changed |
|------|----------------|--------------|
| `CI_OPS_CONSTITUTION.md` | Titled/led as polyrepo source of truth. §1 still listed `shell/` + `apps/` + `integrations/` as the product. §2 mandated Apps ↔ Integrations twins and two marketplace grids. Cross-refs used `BK`/`ST` as current. Version table said `electron-builder`. Fleet refresh said `cd governance`. §6 “never customer-visible on Nexus”. §9 “cross-polyrepo”, product agents ST/BK/MB, GitHub polyrepos. §11 Electron installer “later ST”, Expo Android as if it were the mobile path. §12 `governance/tests/` and Apps/Integrations QA. §13.1 typical shells `apps/admin` / `apps/nexus`. §13.4 “for Nexus”. §15 exemption `FN`. `ciOpsVersion` pointed at `governance/package.json`. | Lead now states GV-0004 / ARCHITECTURE win; points at the overview. §1 is topology: this repo + future `luna` + leftover repos. §2 is standalone packages (tabs dropped) plus leftover twin-SDK contract. Cross-refs prefer LO/OD with aliases. Version table is installer stamp. Fleet command is this repo root. Audience text uses SubTerra Central. §9 mandate/invariants updated. §11 stubs labeled leftover Electron/Expo, not Luna OS. §12 path and replacement by monorepo tests. §13.1 Luna OS / Central. §13.4 member-shell areas. Exemption is Actual screens / Open Books wrapper. |
| `README.md` | “SubTerra OS polyrepo standards”; GV-0002 listed as the live dual-shell lock; template copy-into `apps/`/`integrations/`; fleet “GV, ST, BK”. No overview / ARCHITECTURE-first links. | Rewritten as rules repo for Luna OS product. Overview + ARCHITECTURE + GV-0004 first. Aliases called out. Pipelines labeled leftover vs Tauri. Template is leftover-only. |
| `.cursor/rules/governance-agent.mdc` | Mandate: polyrepos, ST admin + NX Nexus, Apps ↔ Integrations twins. Out of scope named Blocks/Shell/Mailbot as the products. | Mandate: `luna` + leftover repos; Luna OS / Central audience; packages standalone. Invariant: do not create admin/nexus folders. Out of scope uses current product names, leftover repos until fold-in. Overview in source-of-truth table. |
| `.cursor/rules/material-3.mdc` | Exemption `Actual / FN`. Description still “shared shell theme”. | Exemption is Actual upstream UI / Open Books wrapper. Material Web is not the owner. Description names `packages/open-ui`. |

### Edited — design records

| Path | What was stale | What changed |
|------|----------------|--------------|
| `Docs/ARCHITECTURE.md` | Current blueprint. Not stale. Missing a pointer to the new overview. | One see-also line to `GOVERNANCE_OVERVIEW.md`. **No topology edits** (this file already wins). |
| `Docs/DESIGN_RECORDS/GV-0004-enterprise-monorepo.md` | C6 and the license table still said `packages/ui` / `budget` / Billbot after the names table locked `packages/open-ui`, Open Books, Open Bill. | C6 path is `packages/open-ui` (draft name `packages/ui` noted). License layer uses current package names. Conflict table otherwise left as the lock history. |
| `Docs/DESIGN_RECORDS/GV-0003-material-3.md` | Status said tokens live in `packages/ui`. D2/D3 still read as current (Material Web, `@subterra/shell-ui`). Follow-on still “rebuild shell on Material Web”. D6 used `FN`. | Status/follow-on/D2/D3/D6 annotated **superseded** with open-ui / Tailwind. Historical decision text kept. |
| `Docs/DESIGN_RECORDS/GV-0002-nexus-dual-shell.md` | Status already “Historical”, but the opening still presented admin/nexus as the live lock. | Added **Still stands** / **Superseded** box. D1–D8 and topology diagram **left as the historical lock** (rewriting them would erase the record). Filename left `GV-0002-nexus-dual-shell.md` (rename would be an archive-class move). |
| `Docs/DESIGN_RECORDS/GV-0001-github-pipelines-qa.md` | Status and intro still described GitHub **polyrepo** management as the live product shape. | Status + intro: topology superseded; org, Team, `master`, workflows, `upstream`, QA location still stand. Historical audit/decision tables **left intact**. |

### Edited — codes and catalog

| Path | What was stale | What changed |
|------|----------------|--------------|
| `codes/APP_REGISTRY.yaml` | ST named “SubTerra Shell (admin)”. NX note did not say “do not build apps/nexus”. TK `localPath` `apps/subtoken` vs locked `packages/subtoken`. AX missing while the manifest still listed Axiom after Open Axiom was cut. Header had no current-vs-alias map. BB alias `localPath` was `packages/billbot` while the leftover reserved repo in the manifest is `apps/billbot`. | Header lists current codes vs aliases. ST name is address alias. NX note forbids `apps/nexus`. TK path `packages/subtoken`. AX reserved row marked withdrawn in name/note (status stays `reserved` — no new status enum). BS note: role copied from existing registry, path is `packages/banking`. BB alias path aligned to leftover `apps/billbot`; the package to build is BI `packages/open-bill`. |
| `codes/AREA_CODES.yaml` | MK = “Apps and Integrations grids”. SO/EV notes named Nexus as the shell to build. | MK is marketplace chrome (tabs dropped). SO/EV notes: member surface is SubTerra Central. |
| `codes/PLATFORM_CODES.yaml` | `AP` = macOS; no Arch/Linux-specific code. Luna OS lists `[DT, AD, IO, AP]`. | **Left alone.** Ambiguous whether Arch is `DT`. See Questions. |
| `subterra.manifest.yaml` | Header: dual Apps + Integrations marketplaces. ST/NX notes: `apps/admin` / `apps/nexus` / `shell-core`. TK path `apps/subtoken`. Axiom still a live reserved app. Missing locked packages LU, OD, OS, BI, FM, MA, BS. Leftover BK/MB/BB had no alias notes. | Header is GV-0004 catalog. Alias notes on ST/NX/BK/MB/BB. TK path `packages/subtoken`. Axiom reserved + WITHDRAWN note (row **kept**). Added reserved rows for LU, OD, OS, BI, FM, MA, BS matching APP_REGISTRY. Did **not** add `web-shell` or `open-ui` (no Dewey codes). Did **not** add WL (not a package). |

### Edited — templates, tests, CI tooling, workflows

| Path | What was stale | What changed |
|------|----------------|--------------|
| `templates/product-repo/README.md` | Copy into `apps/`/`integrations/`; Material Web + `@subterra/shell-ui`. | Leftover standalone repo only. UI via `packages/open-ui`. Twin SDKs called leftover surface. |
| `templates/product-repo/Docs/Working Docs-Features-Incidents/ROADMAP.md` | Sprint seed: only “wire twin SDKs”. | Register in catalog; twin SDKs for leftover repos; new work waits on `luna`. Dates left as template seed. |
| `templates/product-repo/Docs/Working Docs-Features-Incidents/FEATURE_REGISTRY.md` | Generic seed. | **Left alone** — placeholders only. |
| `templates/product-repo/Docs/Working Docs-Features-Incidents/INCIDENTS.md` | Generic seed. | **Left alone**. |
| `templates/product-repo/.cursor/skills/new-feature/SKILL.md` | Points at constitution. | **Left alone** — still correct. |
| `tests/README.md` | “SubTerra OS polyrepo”; marketplace = two grids. localPath-must-exist would fail reserved monorepo paths. | Governance QA until `luna` tests/contract. Marketplace = audience-filtered catalog + empty hub + hub isolation. Reserved paths allowed absent. |
| `tests/playwright.config.ts` | “SubTerra OS”; “Shell host”. | Comments: Luna OS / web-shell; until `luna` tests/contract. |
| `tests/contract/placeholder.spec.ts` | “every item localPath exists”. | Fixme title allows reserved monorepo paths to be absent. Other fixmes left (still owed). |
| `tests/marketplace/placeholder.spec.ts` | Four fixmes for Apps/Integrations grids and twin mount. | Three fixmes matching GV-0004 marketplace (audience, empty hub, bridge isolation). No silent delete of coverage — titles replaced in place. |
| `package.json` | Description “SubTerra OS governance”. | “SubTerra governance”. Version **left** `26.8.4` (no release stamp this pass). |
| `packages/ci-ops/src/validate-manifest.ts` | Required needles ST + BK only. | Also requires `appCode: LO` and `SC`. Still requires leftover marketplace fields (schema still used). |
| `packages/ci-ops/src/collect-versions.ts` | Notes said Electron. `preferredOrder` was ST/NX/BK…. PATH_FALLBACKS missed `packages/subtoken` and Open * paths. Missing `shell` fallback briefly during edit — restored. | Notes: npm semver + alias reminder. Order includes current codes then aliases. Fallbacks for open-* / subtoken. `shell` fallback kept. |
| `packages/ci-ops/src/index.ts` | Rollover helpers; “R0”. | **Left alone** — no product-shape prose. |
| `packages/ci-ops/src/index.mjs` | Loader for leftover shell scripts. | **Left alone** — still needed by `subterra-shell`. |
| `packages/ci-ops/package.json` | Description fine. | **Left alone**. |
| `Docs/VERSIONS.md` | Electron wording; no alias reminder. Generated snapshot from 2026-08-04. | Notes updated to match the generator. **Not regenerated** (no sibling checkouts here; would wipe real Display/npm/branch data). |
| `versions/fleet.json` | Snapshot of leftover GV/ST/NX/BK/MB/BB/TK/AT only. Windows metaRoot paths. | **Left alone** — generated artifact. Regenerating on this runner would drop version numbers. |
| `.github/workflows/ci-node.yml` | Comments about pnpm 11.14 / Node 22. Matches this repo, not monorepo pnpm 9 (C5). | **Left alone** (behavior). C5 says governance keeps its own workflow. |
| `.github/workflows/governance-ci.yml` | `master` / `dev` — already correct. | **Left alone**. |
| `.github/workflows/deploy-web.yml` | Vercel on `master` — still valid for leftover web deploys. | **Left alone**. |
| `.github/workflows/release-desktop.yml` | Comments: consumers BK, later ST. Electron-shaped job. | Comments only: leftover Blocks, not Luna OS Tauri. **Job YAML not rewritten into Tauri** (that would invent a pipeline). |
| `.github/workflows/publish-npm.yml` | Comments: ST publishing `@subterra/ui`. | Comments: leftover SDKs; tokens are `packages/open-ui`. Job YAML unchanged. |
| `.github/workflows/build-android.yml` | Comments: BK Expo as if it were the mobile path. | Comments: leftover Blocks; Luna OS Android is Tauri. Job YAML unchanged. |
| `.github/workflows/nightly-dev-push.yml` | Comments: BK, later ST. | Comments: leftover BK only. Job YAML unchanged. |

### Left alone — other

| Path | Why |
|------|-----|
| `LICENSE` | Already-published MIT. GV-0004 BSL applies to new original **monorepo** code, not this file. |
| `.gitignore` | No stale product-shape content. |
| `.npmrc` | CI pnpm setting. |
| `tsconfig.json` / `packages/ci-ops/tsconfig.json` | Tooling. |
| `pnpm-lock.yaml` | No dependency change. |
| `packages/ci-ops` implementation beyond the files above | No topology strings. |
| Creating `SubTerraCo/luna` | Explicitly out of scope (GV-0004 §4). |
| Relicensing this repo to BSL | Not locked for governance. |
| Renaming `Docs/DESIGN_RECORDS/GV-0002-nexus-dual-shell.md` | Would be an archive-class path change. Proposed below, not done. |

---

## Proposed for archive (awaiting approval)

**Policy later:** move to `Docs/archive/` (or similar), do not permanently delete. **Not done in this PR.**

| Current path | Proposed later move | Why |
|--------------|---------------------|-----|
| `Docs/DESIGN_RECORDS/GV-0002-nexus-dual-shell.md` | Keep in DESIGN_RECORDS **or** rename to `GV-0002-audience-and-nfc.md` and leave a stub at the old name | On-disk filename is historical. Body now uses Luna OS + SubTerra Central. Rename is a path delete unless a stub stays. |
| `subterra.manifest.yaml` item `axiom-wiki` (`AX`) and `codes/APP_REGISTRY.yaml` AX row | After approval: move the withdrawn text into an archive note / overview only | Open Axiom is cut. Rows kept now so the cut is visible. |
| Nothing else | — | This repo is small. Stale material was **inside** live files, not a pile of extra docs. Constitution, ARCHITECTURE, GV-0001/0003/0004, codes, workflows, and templates should stay live. |

No other deletions proposed. R0 workflow stubs stay (constitution §11: do not delete stubs).

---

## Proposed deletions (awaiting approval)

**None.** Powerline gated deletes. Even after archive approval, the policy is **archive (move)**, not permanent delete.

---

## Questions for Powerline

**Resolved this follow-up**

1. ~~`apps/web-shell` vs `apps/subterra-central`~~ — **Central is the PWA.** Path to build is `apps/subterra-central`. No second web-runtime product or Dewey code.
2. ~~Should the old web-runtime slug get a catalog row~~ — **No.** SC is the catalog row.

**Still open**

3. Twin SDKs and `role` / `marketplace: apps|integrations`: keep on every new catalog item until fold-in, or stop adding them on reserved monorepo packages?
4. Rename audience values (`admin` / `member`) to Luna OS / Central, or keep the strings and only change the typical-shell mapping (what this PR did)?
5. Archive Axiom (`AX`) after this review, or drop the catalog rows in a follow-up (still via archive, not delete)?
6. When should a **Tauri / Luna OS** release workflow be authored? This PR only labeled the Electron stub; it did not invent a replacement.
7. Confirm governance stays on **pnpm 11.14** while `luna` uses **pnpm 9** (GV-0004 C5). Left as-is.
8. **`PP.AP` = macOS.** Is Arch Linux / Omarchy `DT` (Desktop), or do we need a Linux/Arch platform code?
9. GV-0004 C6 originally said `packages/ui`; names table + ARCHITECTURE say `packages/open-ui`. This PR aligned C6 to **open-ui**. Confirm.
10. Banking (`BS`) is `role: integration` in APP_REGISTRY while other packages are `role: app`. Copied as-is. Should BS be `app` like Open Books?
11. White-label (`WL`) is in APP_REGISTRY, not in the manifest. Should it get a `marketplace: null` catalog row?
12. `Docs/VERSIONS.md` / `versions/fleet.json` were not fully regenerated. The withdrawn member-shell fleet row was removed by hand. Should the next meta-workspace `pnpm versions:fleet` add reserved LO/SC/OD/… rows (mostly `—`) to the dashboard?
13. Should existing Dewey addresses on Blocks (`BK/N-####`) be rewritten to `OD/N-####`, or only **new** work use OD/OS/BI/LO?
14. GV-0002 on-disk filename: rename after archive approval (and leave a stub), or keep forever as history?

---

## Deletes were held

This PR **did not delete or archive any file**. Proposed archive moves wait for Powerline review of this log and [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md).
