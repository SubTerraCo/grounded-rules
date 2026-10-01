# Powerline input queue

Living clickable queue of every item that needs **Powerline’s input** before Rook can continue. Rook maintains this file whenever a new blocker-for-Powerline appears.

Display name for this repo: **Grounded Rules**. GitHub slug remains `SubTerraCo/subterra-governance` until Powerline Settings-renames it to `grounded-rules`.

PR #7 squash-merged to `master` @ `c6b9aba` (Metro / GV-0004 cleanup). [PR #8](https://github.com/SubTerraCo/subterra-governance/pull/8) squash-merged to `master` @ `9b7d901` (Grounded Rules display identity). GitHub slug rename to `grounded-rules` still pending Powerline Settings. No deletes or archives from this queue.

## Format

- Each item has a stable id `PI-NNN` and a GitHub-friendly heading anchor (`#pi-nnn-…`).
- Fields per item:
  - **Status** — `open` | `answered` | `watching`
  - **Needed** — `decision` | `status`
  - **Question**
  - **Options** — A/B/C… as unchecked markdown checkboxes when multi-choice
  - **Text** — freeform answer line
  - **More context** — links to changelog / overview / PRs / design records. Paths are relative to `Docs/`. Do not invent URLs.
- The **Open** index below lists `PI-NNN` as markdown links to those anchors so Powerline can jump.
- When answered: set Status to `answered`, record the choice and date. **Do not delete history.** Move answered items to the Answered index; leave the full item body in place.

How to answer: check one option, fill **Text** if needed (required for Other), and tell Rook. Rook updates Status and the indexes.

---

## Open

Decisions (`open`). 5 items.

- [PI-002](#pi-002-fleet-reserved-rows) — Q12 Fleet reserved LO/SC/OT rows
- [PI-005](#pi-005-archive-axiom) — Q5 Archive Axiom (AX)
- [PI-006](#pi-006-tauri-luna-os-release-workflow) — Q6 Tauri / SubTerra Metro release workflow timing
- [PI-008](#pi-008-arch-omarchy-platform-code) — Q8 Arch / Omarchy platform code
- [PI-012](#pi-012-gv-0002-on-disk-filename) — Q14 GV-0002 on-disk filename

## Answered

- [PI-019](#pi-019-central-hub-metro-social-anytype) — Central personal hub + Metro social; Anytype Central integration; packages-under-Central sanctioned; bridge OB+BI+OT+AT / 2026-09-30 voice
- [PI-003](#pi-003-palette-replace-vs-supplement) — A) Replace amber entirely / 2026-09-30 MT
- [PI-014](#pi-014-shell-token-pr-3-lattice-nits) — A) accept residual nits / merged 2026-09-30 MT
- [PI-015](#pi-015-white-label-first-run-dewey-path) — A) Preferred WL-FR-001 / 2026-09-30 MT
- [PI-016](#pi-016-subterra-metro-rename) — A) Luna OS → SubTerra Metro / LO → SM / 2026-09-30 MT
- [PI-017](#pi-017-grounded-rules-rename) — A) SubTerra Governance → Grounded Rules / 2026-09-30 MT
- [PI-009](#pi-009-open-ui-c6-confirm) — A) Confirm open-ui / 2026-09-30 MT
- [PI-013](#pi-013-luna-os-open-ui-token-pr) — luna-os#1 squash-merged @ `edd17c3` / 2026-09-30 MT
- [PI-001](#pi-001-white-label-catalog-row) — B) No marketplace-null catalog row / 2026-09-30 MT
- [PI-018](#pi-018-open-day-to-open-time) — A) Open Day → Open Time / OD → OT / 2026-09-30 MT
- [PI-011](#pi-011-dewey-bk-to-ot-rewrite) — A) Rewrite existing BK→OT / 2026-09-30 MT
- [PI-020](#pi-020-grok-bot-anytype-destination) — Central integration; conflict three+four resolved / 2026-09-30 MT
- [PI-021](#pi-021-shell-swap-metro-central-pepper) — Central local Tauri `CT`; Metro public PWA `MT`; Pepper `PR` / 2026-09-30 MT
- [PI-004](#pi-004-font-families-for-open-ui) — A) Roboto + Roboto Flex as typeface lock / 2026-09-30 MT
- [PI-010](#pi-010-banking-dewey-role) — C) Stay `integration`; plugin is a third-party docs label / 2026-09-30 MT
- [PI-007](#pi-007-pnpm-11-14-vs-9) — B) Align both to pnpm 11.x (Powerline override) / 2026-09-30 MT

---

<h2 id="pi-001-white-label-catalog-row">PI-001 — Q11 White-label catalog row</h2>

- **Status:** `answered` (2026-09-30 MT)
- **Needed:** decision
- **Question:** White-label (`WL`) is in APP_REGISTRY, not in the manifest. Should it get a `marketplace: null` catalog row?
- **Options:**
  - [ ] A) Yes — add reserved `marketplace: null` / `sdk: null` catalog row for WL
  - [x] B) No — keep registry-only (commercial gate, not a package)
  - [ ] C) Other (text)
- **Text:** No marketplace-null catalog row for white-label. Keep registry-only (APP_REGISTRY commercial gate on SubTerra Metro).
- **More context:** Preferred WL-FR-001 path locked ([PI-015](#pi-015-white-label-first-run-dewey-path)). [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) PI-001 answered section. [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md) §4 WL row “commercial gate on SubTerra Metro, not a package (PI-001: registry-only; no catalog row)”. [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-002-fleet-reserved-rows">PI-002 — Q12 Fleet reserved LO/SC/OT rows</h2>

- **Status:** `open`
- **Needed:** decision
- **Question:** `Docs/VERSIONS.md` / `versions/fleet.json` were not fully regenerated. The withdrawn member-shell fleet row was removed by hand. Should the next meta-workspace `pnpm versions:fleet` add reserved LO/SC/OT/… rows (mostly `—`) to the dashboard?
- **Options:**
  - [ ] A) Yes — add reserved LO/SC/OT/… rows on next fleet regen
  - [ ] B) No — leave fleet as leftover snapshot until monorepo exists
  - [ ] C) Other (text)
- **Text:**
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #12. Lattice left Q12 open on [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7). Live Open Time code is `OT` ([PI-018](#pi-018-open-day-to-open-time)); `OD` is an address alias.

---

<h2 id="pi-003-palette-replace-vs-supplement">PI-003 — Palette: replace amber seed vs supplement</h2>

- **Status:** `answered` (2026-09-30 MT)
- **Needed:** decision
- **Question:** Four colors were given — purple `#400080`, pink `#ED1CAD`, light blue `#1CEDC5`, teal `#008080`. Should they **replace** the amber seed `#e8a54b`, or **supplement** it (keep amber alongside)?
- **Options:**
  - [x] A) Replace amber entirely (current draft lock on PR #7 / shell#3 / luna-os#1)
  - [ ] B) Supplement — keep amber seed plus the four
  - [ ] C) Other (text)
- **Text:** Replace amber entirely — four-color lock confirmed (purple `#400080`, pink `#ED1CAD`, light blue `#1CEDC5`, teal `#008080`). Amber `#e8a54b` withdrawn.
- **More context:** DRAFT already withdrew amber on [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7). Powerline asked to confirm replace vs supplement. [DESIGN_RECORDS/GV-0003-material-3.md](DESIGN_RECORDS/GV-0003-material-3.md). [ARCHITECTURE.md](ARCHITECTURE.md). [subterra-shell PR #3](https://github.com/SubTerraCo/subterra-shell/pull/3).

---

<h2 id="pi-004-font-families-for-open-ui">PI-004 — Q15 Font families for open-ui</h2>

- **Status:** `answered` (2026-09-30 MT)
- **Needed:** decision
- **Question:** Font **families** for `packages/open-ui` — interim Material 3 type scale and 4dp spacing are locked; typeface names wait on Powerline.
- **Options:**
  - [x] A) Name typefaces now (use Text)
  - [ ] B) Keep interim M3 type scale only until later
  - [ ] C) Other (text)
- **Text:** Roboto + Roboto Flex locked for open-ui (PI-004).
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #15. [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md) §7. [DESIGN_RECORDS/GV-0003-material-3.md](DESIGN_RECORDS/GV-0003-material-3.md). [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-005-archive-axiom">PI-005 — Q5 Archive Axiom (AX)</h2>

- **Status:** `open`
- **Needed:** decision
- **Question:** Archive Axiom (`AX`) after this review, or drop the catalog rows in a follow-up (still via archive, not delete)?
- **Options:**
  - [ ] A) Archive now (after merge approval of this PR’s archive batch)
  - [ ] B) Follow-up PR later
  - [ ] C) Keep rows indefinitely
  - [ ] D) Other (text)
- **Text:**
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #5. [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md) §4 Cut. [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-006-tauri-luna-os-release-workflow">PI-006 — Q6 Tauri / SubTerra Metro release workflow timing</h2>

- **Status:** `open`
- **Needed:** decision
- **Question:** When should a Tauri / SubTerra Metro release workflow be authored?
- **Options:**
  - [ ] A) After `luna` monorepo Phase 5 shell bundle
  - [ ] B) Author stub now on Grounded Rules
  - [ ] C) Other (text)
- **Text:**
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #6. [ARCHITECTURE.md](ARCHITECTURE.md) Phases. [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-007-pnpm-11-14-vs-9">PI-007 — Q7 pnpm 11.14 vs 9</h2>

- **Status:** `answered` (2026-09-30 MT)
- **Needed:** decision
- **Question:** Confirm Grounded Rules stays on pnpm 11.14 while `luna` uses pnpm 9 (GV-0004 C5).
- **Options:**
  - [ ] A) Confirm as-is
  - [x] B) Align both (specify in Text)
  - [ ] C) Other (text)
- **Text:** Powerline override: align both Grounded Rules and luna to pnpm 11.x. Team tally was tied 3–3 (as-is vs align-to-9) with 0 votes for 11.x before override; Powerline chose 11.x.
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #7. [DESIGN_RECORDS/GV-0004-enterprise-monorepo.md](DESIGN_RECORDS/GV-0004-enterprise-monorepo.md) C5. [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-008-arch-omarchy-platform-code">PI-008 — Q8 Arch / Omarchy platform code</h2>

- **Status:** `open`
- **Needed:** decision
- **Question:** `PP.AP` = macOS. Is Arch Linux / Omarchy `DT` (Desktop), or do we need a Linux/Arch platform code?
- **Options:**
  - [ ] A) Use `DT`
  - [ ] B) Add Linux/Arch platform code (name in Text)
  - [ ] C) Other (text)
- **Text:**
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #8. [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-009-open-ui-c6-confirm">PI-009 — Q9 open-ui C6 confirm</h2>

- **Status:** `answered` (2026-09-30 MT)
- **Needed:** decision
- **Question:** GV-0004 C6 originally said `packages/ui`; names table + ARCHITECTURE say `packages/open-ui`. This PR aligned C6 to **open-ui**. Confirm.
- **Options:**
  - [x] A) Confirm open-ui
  - [ ] B) Prefer packages/ui
  - [ ] C) Other (text)
- **Text:** Confirm packages/open-ui (GV-0004 C6 aligned); not packages/ui.
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #9. [DESIGN_RECORDS/GV-0004-enterprise-monorepo.md](DESIGN_RECORDS/GV-0004-enterprise-monorepo.md) C6. [ARCHITECTURE.md](ARCHITECTURE.md). [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-010-banking-dewey-role">PI-010 — Q10 Banking (BS) Dewey role</h2>

- **Status:** `answered` (2026-09-30 MT)
- **Needed:** decision
- **Question:** Banking (`BS`) Dewey `role: integration` in APP_REGISTRY vs other packages `role: app`. Catalog treats BS as a package. Reclassify Dewey role?
- **Options:**
  - [ ] A) Change Dewey role to `app`
  - [ ] B) Leave `integration` until fold-in
  - [x] C) Other (text)
- **Text:** Option 3 locked (tally 5–2). Keep Dewey role `integration`. Package-shaped docs: `marketplace: null`, no twin SDK. Do not flip the role field. `plugin` is a docs label for third-party connectors only, not a new Dewey role. Live code is `BK` (Banking). `BS` is the former code.
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #10. [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md) §4 BS row. [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<a id="pi-011-dewey-bk-to-od-rewrite"></a>
<h2 id="pi-011-dewey-bk-to-ot-rewrite">PI-011 — Q13 Dewey BK→OT rewrite</h2>

- **Status:** `answered` (2026-09-30 MT)
- **Needed:** decision
- **Question:** Should existing Dewey addresses on Blocks (`BK/N-####`) be rewritten to `OT/N-####`, or only **new** work use OT/OS/BI/SM? (`LO` is an address alias for `SM` per [PI-016](#pi-016-subterra-metro-rename); `OD` is an address alias for `OT` per [PI-018](#pi-018-open-day-to-open-time); new work uses `SM` / `OT`.)
- **Options:**
  - [x] A) Rewrite existing BK→OT
  - [ ] B) Only new work uses OT/OS/BI/SM (`LO` and `OD` address aliases)
  - [ ] C) Other (text)
- **Text:** Rewrite all existing BK addresses (`BK/N-####`) to `OT` (Open Time). 2026-09-30 MT. Documented address examples now use `OT/N-####`. `BK` remains an address-alias catalog row pointing at OT / `packages/open-time`. Open Books `OB` unchanged.
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) PI-011 A rewrite section. [PI-018](#pi-018-open-day-to-open-time) Open Day → Open Time. [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-012-gv-0002-on-disk-filename">PI-012 — Q14 GV-0002 on-disk filename</h2>

- **Status:** `open`
- **Needed:** decision
- **Question:** GV-0002 on-disk filename: rename after archive approval (and leave a stub), or keep forever as history?
- **Options:**
  - [ ] A) Rename after archive approval + stub
  - [ ] B) Keep filename forever
  - [ ] C) Other (text)
- **Text:**
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #14. [DESIGN_RECORDS/GV-0002-nexus-dual-shell.md](DESIGN_RECORDS/GV-0002-nexus-dual-shell.md). [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-013-luna-os-open-ui-token-pr">PI-013 — SubTerra Metro open-ui token PR</h2>

- **Status:** `answered` (2026-09-30 MT)
- **Needed:** status
- **Question:** Track until Powerline merge decision (this agent does not merge).
- **Options:** N/A — Rook updates until Powerline merge. Do not mark answered until that decision.
- **Text:** Lattice 2026-09-30: `nits_only`, blockers none. Patron 2026-09-30 chrome validation PASS (7/7) on luna-os#1 @ `39bb566`. Tip was `0cdf88b` (Metro rename landed on that PR). [PI-003](#pi-003-palette-replace-vs-supplement) answered replace. luna-os#1 squash-merged @ `edd17c3` (2026-09-30 MT).
- **Current:** squash-merged [luna-os#1](https://github.com/SubTerraCo/luna-os/pull/1) into `master` @ `edd17c3` (2026-09-30 MT). Former tip `0cdf88b` — branch `cursor/powerline-open-ui-tokens-2bbb`. Agent [bc-ceeeb171-7643-5354-9303-55a529182bbb](https://cursor.com/agents/bc-ceeeb171-7643-5354-9303-55a529182bbb). Metro rename landed on this PR.
- **Merged:** [luna-os#1](https://github.com/SubTerraCo/luna-os/pull/1) squash-merged into `master` @ `edd17c3` (2026-09-30 MT). Merge commit `edd17c308ca835db50bb3d4455116ed1972df471`.
- **Lattice (2026-09-30):** `nits_only`, blockers none.
- **Patron (2026-09-30):** chrome validation PASS (7/7) on [luna-os#1](https://github.com/SubTerraCo/luna-os/pull/1) @ `39bb566`.
- **More context:** Sibling of [subterra-shell PR #3](https://github.com/SubTerraCo/subterra-shell/pull/3). Palette docs already on [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7). PI-003 replace answered; luna-os#1 squash-merged @ `edd17c3`.

---

<h2 id="pi-014-shell-token-pr-3-lattice-nits">PI-014 — Shell token PR #3 Lattice nits</h2>

- **Status:** `answered` (2026-09-30 MT)
- **Needed:** decision
- **Question:** Accept residual Lattice nits on shell#3 as-is, or ask Shell UI Dev to fix them further before Powerline merge?
- **Options:**
  - [x] A) Accept residual nits (unused `--space-unit` CSS; semantic `status.warning` `#f59e0b`; CI notices)
  - [ ] B) Further fix those residual nits before Powerline merge
  - [ ] C) Other (text)
- **Text:** accept residual nits / merged 2026-09-30 MT — SHA `c0e4f699`; accepted residuals: unused `--space-unit` CSS; semantic `status.warning` `#f59e0b`; CI notices.
- **Lattice (2026-09-30):** PASS / `nits_only`. Patron chrome PASS. Accepted residuals are only unused `--space-unit` CSS; semantic `status.warning` `#f59e0b`; CI notices. Pink/focus PR-body sync was already fixed and is not a residual.
- **Merged:** [subterra-shell PR #3](https://github.com/SubTerraCo/subterra-shell/pull/3) into `master`. Head `c0e4f699`. Merge commit `50a540c5`.
- **More context:** Sibling palette lock on [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-015-white-label-first-run-dewey-path">PI-015 — White-label first-run Dewey path (WL-FR-001)</h2>

- **Status:** `answered` (2026-09-30 MT)
- **Needed:** decision
- **Question:** Confirm Meridian Preferred vs Alt A (BR) for white-label branding first-run?
- **Options:**
  - [x] A) Preferred — no new Dewey APP code; WL gate only; wizard on SM; brand pack in packages/open-ui; no fourth shell; no BR/open-brand.
  - [ ] B) Alt A — add BR / packages/open-brand.
  - [ ] C) Other
- **Text:** Preferred locked. Dewey mapping (existing codes only): APP `WL` = commercial gate (APP_REGISTRY reserved; not a package/shell). APP `SM` = host of first-run wizard + primary WL runtime (former live code `LO` is an address alias). APP `SC` = optional co-brand. APP `ST` = out (do not use for WL path). Brand pack = `packages/open-ui` (no APP letter in registry — Open UI row uses em dash). Area `UI` for wizard chrome. Area `AU` optional for WL entitlement/key. Reject BR and fourth shell. Personal agent Luna (`LU`) is unchanged.
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md). [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md) §4 WL / Open UI rows. [PI-001](#pi-001-white-label-catalog-row) answered B — no catalog row for the gate. [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-016-subterra-metro-rename">PI-016 — Luna OS → SubTerra Metro rename</h2>

- **Status:** `answered` (2026-09-30 MT)
- **Needed:** decision
- **Question:** Approve display rename Luna OS → SubTerra Metro and Dewey live shell code LO → SM?
- **Options:**
  - [x] A) Yes — display SubTerra Metro; path `apps/subterra-metro`; live code `SM`; `LO` address alias
  - [ ] B) Keep Luna OS / LO
  - [ ] C) Other (text)
- **Text:** Approved. Display **SubTerra Metro** (match SubTerra Central casing). Path `apps/subterra-metro`. Live Dewey shell code `SM`. `LO` is the former live code and remains an address alias (like `ST`). Personal agent **Luna** / Luna 7, Dewey `LU`, and `packages/luna` are unchanged. Audience `admin` | `member` unchanged. SubTerra Central / `SC` unchanged. GV-0002 on-disk filename unchanged. Existing `LO/N-####` addresses stay valid; new work uses `SM`.
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Luna OS → SubTerra Metro rename section. [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-017-grounded-rules-rename">PI-017 — SubTerra Governance → Grounded Rules rename</h2>

- **Status:** `answered` (2026-09-30 MT)
- **Needed:** decision
- **Question:** Approve display rename SubTerra Governance → Grounded Rules (electrical grounding safety + grounded rules)?
- **Options:**
  - [x] A) Yes — display Grounded Rules; Dewey `GV` unchanged; GitHub slug rename to `grounded-rules` is a Powerline Settings click
  - [ ] B) Keep SubTerra Governance
  - [ ] C) Other (text)
- **Text:** Approved. Display **Grounded Rules**. Pun: electrical grounding safety + grounded rules. Dewey code `GV` unchanged. Machine keys (`role: governance`, catalog `governance:`, `localPath: governance`, on-disk filenames) unchanged. GitHub slug remains `SubTerraCo/subterra-governance` until Powerline Settings-renames to `grounded-rules`. Metro / SM / Central / SC / LO / Luna / LU unchanged. PR #7 already squash-merged; this is a new draft off `master` @ `c6b9aba`.
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Grounded Rules rename section. [merged PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-018-open-day-to-open-time">PI-018 — Open Day → Open Time rename</h2>

- **Status:** `answered` (2026-09-30 MT)
- **Needed:** decision
- **Question:** Approve display rename Open Day → Open Time and Dewey live package code OD → OT?
- **Options:**
  - [x] A) Yes — display Open Time; path `packages/open-time`; live code `OT`; `OD` address alias
  - [ ] B) Keep Open Day / OD
  - [ ] C) Other (text)
- **Text:** Approved. Display **Open Time**. Path `packages/open-time`. Live Dewey code `OT`. `OD` is the former live code (Open Day) and remains an address alias (like `LO` for `SM`). Reason: “OD” sounds like overdose; `OB` is taken by Open Books. Scope unchanged: tasks, timeline, Quick Blocks, Festy crew. Existing `OD/N-####` addresses stay valid; new work uses `OT`. `BK` (Blocks) retargets to `OT` / `packages/open-time`. Unchanged: Open Books `OB`, Open Bill `BI`, Open Sort `OS`, SubTerra Metro `SM`, SubTerra Central `SC`.
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Open Day → Open Time rename section. [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md) §4. [PI-011](#pi-011-dewey-bk-to-ot-rewrite) answered A — existing `BK/N-####` rewritten to `OT/N-####`.

---

<h2 id="pi-019-central-hub-metro-social-anytype">PI-019 — Central personal hub + Metro social + Anytype Central integration</h2>

- **Status:** `answered` (2026-09-30 voice)
- **Needed:** decision
- **Question:** Lock Central / Metro product roles, Anytype as a Central integration, packages-under-Central, and Metro↔Central bridge allowlist?
- **Options:**
  - [x] A) Yes — Central = personal AI hub + suite of all tools; Metro = social media app consuming Central-hosted packages; Anytype as Central integration intended; packages-under-Central sanctioned; bridge allowlist OB + BI + OT + AT
  - [ ] B) Keep prior Metro-as-command-center / Central-as-public-member-shell framing
  - [ ] C) Other (text)
- **Text:** Powerline lock 2026-09-30 voice. (1) Central is the personal AI hub and suite of all tools. (2) Metro is converting to the social media app, with access to all extensions and packages hosted in Central. Catalog `audience` `admin`/`member` machine values unchanged. (3) Anytype as a Central integration is the intended shape (`role: integration` only — not plugin/extension). Leftover PKM workspace is not required as a monorepo package; Central hosts the integration. Prior conflict that packaging Anytype / Grok bot Anytype for Central violated Grounded Rules is rewritten, not merely noted. (4) Conflict 4 rewritten: old cut “forcing a packages path under Central invents a product shape Grounded Rules already cut” → new rule: a packages-under-Central path is a legitimate, sanctioned shape. (5) Metro↔Central data bridge allowlist (owner-marked, off by default) is Open Books, Open Bill, Open Time, **and Anytype**.
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) PI-019 section. [ARCHITECTURE.md](ARCHITECTURE.md) Shell roles. [DESIGN_RECORDS/GV-0004-enterprise-monorepo.md](DESIGN_RECORDS/GV-0004-enterprise-monorepo.md) C15 / C16.

---

<h2 id="pi-020-grok-bot-anytype-destination">PI-020 — Grok bot Anytype destination</h2>

- **Status:** `answered` (2026-09-30 MT)
- **Needed:** decision
- **Question:** Where does **Grok bot Anytype** live, and who owns the Local API client?
- **Options:**
  - [ ] A) AT leftover integration on Cara
  - [ ] B) Metro-side consumer / Luna tool on `SM`
  - [ ] C) Central is a LAN client only
  - [ ] D) Other host
  - [ ] Need More Context
  - [ ] Open discussion
  - [x] OTHER (text)
- **Text:** Powerline 2026-09-30. Destination = **Central integration**. **Central owns** the Local API client, credentials (`ANYTYPE_API_KEY` in Central/runtime env), first-pull, and tag/view. **Cara only** runs Anytype desktop on `127.0.0.1:31009`. Classification **integration** only. Aligns with [PI-019](#pi-019-central-hub-metro-social-anytype). Bridge allowlist **OB + BI + OT + AT**.
- **More context:** [DESIGN_RECORDS/GV-0007-grok-bot-anytype.md](DESIGN_RECORDS/GV-0007-grok-bot-anytype.md) §3–§4, §6. [PI-019](#pi-019-central-hub-metro-social-anytype).

---

<h2 id="pi-021-shell-swap-metro-central-pepper">PI-021 — Shell swap: Central local, Metro public, Pepper</h2>

- **Status:** `answered` (2026-09-30 MT)
- **Needed:** decision
- **Question:** Swap the shells and rename the agent?
- **Options:**
  - [x] A) Central (`CT`) is the local Tauri app and package host. Metro (`MT`) is the public PWA for social and ticketing. The agent is Pepper (`PR`). No SubTerra prefix on those names. `SM`, `SC`, `LU`, and `LO` stay aliases (`LO` and `SC` alias `CT`).
  - [ ] B) Keep Metro on Tauri and Central on the PWA
  - [ ] C) Other (text)
- **Text:** Powerline 2026-09-30. Drop the SubTerra prefix. Metro is the public PWA (social and tickets). Central is the local Tauri app and holds the packages. Luna the agent is Pepper, in honor of Pepper Potts. Hermes is the runtime. Repo slug to follow: `SubTerraCo/central`.
- **More context:** [ARCHITECTURE.md](ARCHITECTURE.md) Shell roles. [DESIGN_RECORDS/GV-0004-enterprise-monorepo.md](DESIGN_RECORDS/GV-0004-enterprise-monorepo.md).
