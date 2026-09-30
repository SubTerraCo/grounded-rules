# Governance cleanup change log — 2026-09-30

**Branch:** `cursor/governance-cleanup-5f88`  
**Scope:** Align this repo with locked GV-0004 / [ARCHITECTURE.md](ARCHITECTURE.md), plus follow-ups (Central PWA; catalog `audience` stays `admin`/`member`; twin marketplace stop; TK/CH matrix; four-color palette).  
**Deletes / archives:** **Held.** No file was deleted or moved to an archive folder. Proposed later archive moves wait for Powerline approval.

Companion readable summary (not a diff list): [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md).

---

## Follow-up — twin marketplace stop, TK/CH matrix, four-color palette

Powerline queue (same day, draft PR #7):

1. **Twin marketplace:** stop `role: app|integration`, `marketplace: apps|integrations`, and twin SDKs on new Luna packages. Deprecate those fields where they are already filled on leftover standalone-repo rows.
2. **Subtoken + Community:** catalog `audience` and docs follow the ARCHITECTURE install matrix (`[admin, member]`).
3. **Palette:** replace amber `#e8a54b` with purple `#400080`, pink `#ED1CAD`, light blue `#1CEDC5`, teal `#008080`. `packages/open-ui` owns palette, type, and spacing (interim Material 3 type scale; 4dp grid; font families pending Powerline). Token *code* is sibling product-repo work — not this governance repo.
4. **Audience:** keep `admin` / `member`; Powerline / Collective stay out of audience prose (already locked earlier this branch; restated where the new copy touched audiences).

**Deletes still held.** No files deleted or archived. Validator still requires leftover twin needles on BK/MB/BB/AT.

### File-by-file (this batch)

| Path | What changed |
|------|----------------|
| `subterra.manifest.yaml` | Header: twin fields deprecated leftover; Luna items use `marketplace: null` / `sdk: null`. Leftover ST/BK/MB/BB/AT keep filled twin fields with `# DEPRECATED leftover twin field`. Luna packages (OG/AX/CH/OB/HA/LU/OD/OS/BI/FM/MA/BS/TK) have no twin role. TK and CH `audience: [admin, member]` with ARCHITECTURE matrix notes. BS treated as a Luna package, not a twin integration. Validator needles remain on leftover rows. |
| `CI_OPS_CONSTITUTION.md` | §2: stop twin fields on new Luna packages; leftover twins deprecated. §6.1: `audience` is the live gate; `role`/`marketplace`/`sdk` leftover. §9 feature-parity; §10 new-repo checklist. §13.1: Powerline/Collective are not audience values. §13.3 TK `[admin, member]` with matrix. §13.5 Community (CH) added. §15: four-color palette, interim M3 type scale, 4dp spacing; amber withdrawn. |
| `codes/APP_REGISTRY.yaml` | TK `audience: [admin, member]` + matrix note. CH `audience: [admin, member]` + matrix note. BS note: Luna package, not a twin integration; Dewey `role: integration` leftover until reclassified. |
| `codes/AREA_CODES.yaml` | SO: CH also mounts crew discussion on Luna OS. EV: TK organizer tools on Luna OS and event/ticket surfaces on Central. |
| `Docs/DESIGN_RECORDS/GV-0002-nexus-dual-shell.md` | Still-stands box: live TK/CH follow ARCHITECTURE matrix. D3/D6 annotated: historical `[admin]` superseded by `[admin, member]`. Filtering paragraph no longer keeps Subtoken off Central. |
| `Docs/DESIGN_RECORDS/GV-0003-material-3.md` | Status: D4 amber withdrawn. D4 annotated superseded with four-color palette + type + 4dp. Follow-on: token *code* is product work. Historical C1 evidence still cites amber. |
| `Docs/DESIGN_RECORDS/GV-0004-enterprise-monorepo.md` | C6 resolution: four-color palette, interim M3 type, 4dp spacing; amber withdrawn. Open UI names-row: palette, type, spacing. |
| `Docs/ARCHITECTURE.md` | Stack: four-color palette, type, 4dp spacing; amber withdrawn. Marketplace: do not write twin fields on new Luna items. Phase 4 names palette/type/spacing. |
| `Docs/GOVERNANCE_OVERVIEW.md` | Twin stop; TK/CH matrix; four-color palette + type + spacing; BS not a twin integration. Powerline/Collective remain non-audience. |
| `.cursor/rules/governance-agent.mdc` | Twin fields not on new Luna items. Palette hexes. Powerline/Collective not audience labels. Token *code* out of scope. |
| `.cursor/rules/material-3.mdc` | Four-color palette, interim M3 type, 4dp spacing; amber withdrawn. |
| `README.md` | Twin stop bullet. Palette hexes instead of amber seed. |
| `templates/product-repo/README.md` | Register leftover twins only; Luna packages `marketplace: null`. Palette hexes. |
| `tests/README.md` | Planned coverage: leftover twins vs Luna `marketplace: null`. |
| `tests/contract/placeholder.spec.ts` | Fixme title: leftover twin agreement vs Luna `marketplace: null` (no silent drop of coverage). |
| `Docs/CHANGELOG-cleanup-2026-09-30.md` | This section. Question 3 resolved. Question 10 noted (Dewey role leftover; catalog is Luna package). |

Sibling agents own luna-os / leftover-shell token *code*. This repo has no `packages/open-ui` tree.

---

## Lattice QA nit-pass (draft PR #7)

No merge blockers. Stay draft. No deletes/archives. Q11 (WL catalog row) and Q12 (fleet LO/SC/OD rows) left open.

| Path | What changed |
|------|----------------|
| `codes/AREA_CODES.yaml` | SO note: dropped leftover “Member-shell”; names SubTerra Central (SC). |
| `Docs/ARCHITECTURE.md` | CI finance path: Open Bill, not Billbot. Phases 2–3: `packages/open-books` / `packages/open-bill` / Open Day / Media (not `budget` / `billbot` / blocks). Prior-plans table left as historical quotes. |
| `versions/fleet.json` | TK `localPath` `packages/subtoken` (matches catalog). Did not add reserved LO/SC/OD rows (Q12 open). |
| `Docs/CHANGELOG-cleanup-2026-09-30.md` | Pass 1 playwright.config “What changed”: Luna OS / SubTerra Central (was web-shell). This nit-pass section. |
| `CI_OPS_CONSTITUTION.md` | §1.1 first column: Luna OS / SubTerra Central. Paths unchanged. |

---

## Powerline input queue added

Living clickable queue: [POWERLINE_INPUT.md](POWERLINE_INPUT.md) (`PI-001`–`PI-016`). Rook maintains it whenever a new blocker-for-Powerline appears. Changelog questions Q11–Q15 remain open *as PI items where those PIs are still open* (PI-001=Q11, PI-002=Q12, PI-004=Q15, PI-011=Q13, PI-012=Q14). PI-003 (palette replace), PI-015 (WL-FR-001 path), and PI-016 (SubTerra Metro rename) are **answered** and are not Q11–Q15. Open index = 12 (11 `open` decisions + 1 `watching`). Answered: PI-003, PI-014, PI-015, PI-016. PI-003 **answered** 2026-09-30 MT: **replace** amber entirely (four-color lock; `#e8a54b` withdrawn). PI-014 **answered** 2026-09-30 MT: accept residual nits; shell#3 merged to `master` (`c0e4f699` / merge `50a540c5`). PI-015 **answered** 2026-09-30 MT: Preferred (WL-FR-001) — no new Dewey APP code; WL gate only; wizard on SM; brand pack in `packages/open-ui`; no BR / fourth shell. PI-016 **answered** 2026-09-30 MT: Luna OS → **SubTerra Metro**; live Dewey `LO` → `SM`; `LO` kept as address alias.

| Path | What changed |
|------|----------------|
| `Docs/POWERLINE_INPUT.md` | **Added.** 16 items total in the file; Open index = 12 (11 `open` decisions + 1 `watching`); Answered: PI-003, PI-014, PI-015, PI-016. |
| `Docs/GOVERNANCE_OVERVIEW.md` | Source-of-truth table: Powerline input queue → `POWERLINE_INPUT.md`. |
| `Docs/CHANGELOG-cleanup-2026-09-30.md` | This note. Still-open list unchanged. |

---

## Luna OS → SubTerra Metro rename (PI-016)

Powerline approved 2026-09-30 MT. Display **Luna OS** → **SubTerra Metro**. Path `apps/luna-os` → `apps/subterra-metro`. Live Dewey shell code `LO` → `SM`. `LO` remains an address alias (like `ST`). **Unchanged:** personal agent Luna / Luna 7; Dewey `LU` / `packages/luna`; audience `admin` | `member`; SubTerra Central / `SC`; GV-0002 on-disk filename; existing `LO/N-####` address strings.

**Deletes still held.** No archive of GV-0002. Catalog `id: luna-os` kept as the LO alias row (not a second shell).

### File-by-file (this rename)

| Path | What changed |
|------|----------------|
| `codes/APP_REGISTRY.yaml` | Live shell `SM` / SubTerra Metro / `apps/subterra-metro`. `LO` is address alias. `LU` / Luna / `packages/luna` untouched. |
| `subterra.manifest.yaml` | Live item `subterra-metro` `appCode: SM`. Alias item `luna-os` `appCode: LO`. Path `apps/subterra-metro`. Matrix notes say SubTerra Metro. `LU` Luna row untouched. |
| `CI_OPS_CONSTITUTION.md` | Display SubTerra Metro; path `apps/subterra-metro`; live code `SM`; aliases `LO`, `ST`. New work uses SM. |
| `Docs/ARCHITECTURE.md` | Tree `subterra-metro/`; matrix column SubTerra Metro. |
| `Docs/GOVERNANCE_OVERVIEW.md` | Codes table SM live; LO listed as alias. |
| `Docs/DESIGN_RECORDS/GV-0004-enterprise-monorepo.md` | Names table SM; LO alias note. |
| `Docs/DESIGN_RECORDS/GV-0002-nexus-dual-shell.md` | Live paths/codes SM; **filename unchanged**. |
| `Docs/POWERLINE_INPUT.md` | PI-016 answered. PI-015 wizard on SM. PI-013 GitHub URL still luna-os#1 (real PR). |
| `Docs/VERSIONS.md` | Alias note includes LO; live codes SM / SC / OD / OS / BI. |
| `Docs/CHANGELOG-cleanup-2026-09-30.md` | This section. Prior pass tables left as historical audit (they said Luna OS then). |
| `.cursor/rules/governance-agent.mdc` | Audience mapping SM / SubTerra Metro. |
| `README.md` | Runtimes SubTerra Metro + Central; aliases include LO. |
| `codes/AREA_CODES.yaml` | SO/EV notes name SubTerra Metro. |
| `tests/README.md`, `tests/marketplace/placeholder.spec.ts`, `tests/playwright.config.ts` | Host names SubTerra Metro / Central; reserved path `apps/subterra-metro`. |
| `.github/workflows/release-desktop.yml`, `build-android.yml`, `publish-npm.yml` | Comments SubTerra Metro (jobs unchanged). |
| `packages/ci-ops/src/validate-manifest.ts` | Requires `appCode: SM` and still `appCode: LO`. |
| `packages/ci-ops/src/collect-versions.ts` | preferredOrder includes SM; PATH_FALLBACKS for `apps/subterra-metro` (and leftover `apps/luna-os`). |
| `templates/product-repo/README.md` | Twin stop wording: new monorepo packages (not “Luna packages”). |

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

Pass 1 file-by-file below is the earlier cleanup. Live current-state is later follow-ups plus [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md).

---

## Follow-up — catalog audience locked (`admin` / `member`)

Decision: keep machine values `admin` and `member` exactly (GV-0002 D4). Mapping: `admin` → Luna OS (`LO` / `apps/luna-os`); `member` → SubTerra Central (`SC` / `apps/subterra-central`). Prefer shell names in prose. Do not invent a third audience (including Powerline or Collective as `audience` labels). Powerline remains the archive/approver where factual.

**Deletes still held.** Catalog YAML `audience:` lists were not renamed.

### File-by-file (this audience pass)

| Path | What changed |
|------|----------------|
| `Docs/GOVERNANCE_OVERVIEW.md` | Replaced header `Audience: Powerline / SubTerra Collective` with catalog mapping table (`admin`/`member` → Luna OS / SubTerra Central). §5 audience block states locked values, fail-closed default, no third audience. Powerline kept only as archive approver. |
| `CI_OPS_CONSTITUTION.md` | §6.1 and §13.1 state locked machine values and the shell mapping. §13.4 “customer/member surface” → member shell (SubTerra Central). |
| `subterra.manifest.yaml` | Header comments: locked values, mapping, no third audience. Item `audience:` lists **unchanged** (`admin` / `member` only). |
| `.cursor/rules/governance-agent.mdc` | Invariant: do not rename catalog values; mapping; no third audience. |
| `Docs/DESIGN_RECORDS/GV-0002-nexus-dual-shell.md` | D2–D4 use member shell / SubTerra Central; D4 records mapping and fail-closed onto Central, not “customer-visible”. |
| `codes/AREA_CODES.yaml` | SO/EV notes name the member shell and catalog `member`. |
| `README.md` | Product-shape bullet: `admin`/`member` mapping. |
| `Docs/CHANGELOG-cleanup-2026-09-30.md` | This section. Question 4 marked resolved. |

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
| `tests/playwright.config.ts` | “SubTerra OS”; “Shell host”. | Comments: Luna OS / SubTerra Central; until `luna` tests/contract. |
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
3. ~~Twin SDKs and `role` / `marketplace: apps|integrations`: keep on every new catalog item until fold-in, or stop adding them on reserved monorepo packages?~~ — **Stop on new Luna packages.** Leftover filled twin fields stay deprecated until fold-in. Validator needles remain on those leftover rows.
4. ~~Rename audience values (`admin` / `member`) to Luna OS / Central~~ — **Keep `admin` and `member` exactly.** Mapping: `admin` → Luna OS; `member` → SubTerra Central. No third audience.

**Still open** (clickable queue: [POWERLINE_INPUT.md](POWERLINE_INPUT.md); none of these are marked resolved)
5. Archive Axiom (`AX`) after this review, or drop the catalog rows in a follow-up (still via archive, not delete)?
6. When should a **Tauri / Luna OS** release workflow be authored? This PR only labeled the Electron stub; it did not invent a replacement.
7. Confirm governance stays on **pnpm 11.14** while `luna` uses **pnpm 9** (GV-0004 C5). Left as-is.
8. **`PP.AP` = macOS.** Is Arch Linux / Omarchy `DT` (Desktop), or do we need a Linux/Arch platform code?
9. GV-0004 C6 originally said `packages/ui`; names table + ARCHITECTURE say `packages/open-ui`. This PR aligned C6 to **open-ui**. Confirm.
10. Banking (`BS`) Dewey `role: integration` in APP_REGISTRY vs other packages `role: app`. Catalog now treats BS as a Luna package (`marketplace: null`, not a twin integration). Dewey role left as-is until Powerline reclassifies it.
11. White-label (`WL`) is in APP_REGISTRY, not in the manifest. Should it get a `marketplace: null` catalog row?
12. `Docs/VERSIONS.md` / `versions/fleet.json` were not fully regenerated. The withdrawn member-shell fleet row was removed by hand. Should the next meta-workspace `pnpm versions:fleet` add reserved LO/SC/OD/… rows (mostly `—`) to the dashboard?
13. Should existing Dewey addresses on Blocks (`BK/N-####`) be rewritten to `OD/N-####`, or only **new** work use OD/OS/BI/LO?
14. GV-0002 on-disk filename: rename after archive approval (and leave a stub), or keep forever as history?
15. Font **families** for `packages/open-ui` — interim Material 3 type scale and 4dp spacing are locked; typeface names wait on Powerline.

---

## Deletes were held

This PR **did not delete or archive any file**. Proposed archive moves wait for Powerline review of this log and [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md).
