# Powerline input queue

Living clickable queue of every item that needs **Powerline’s input** before Rook can continue. Rook maintains this file whenever a new blocker-for-Powerline appears.

Draft PR: [SubTerraCo/subterra-governance#7](https://github.com/SubTerraCo/subterra-governance/pull/7). Stay draft. No deletes or archives from this queue.

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

Decisions (`open`) and watches (`watching`). 13 items.

- [PI-001](#pi-001-white-label-catalog-row) — Q11 White-label catalog row
- [PI-002](#pi-002-fleet-reserved-rows) — Q12 Fleet reserved LO/SC/OD rows
- [PI-003](#pi-003-palette-replace-vs-supplement) — Palette: replace amber seed vs supplement
- [PI-004](#pi-004-font-families-for-open-ui) — Q15 Font families for open-ui
- [PI-005](#pi-005-archive-axiom) — Q5 Archive Axiom (AX)
- [PI-006](#pi-006-tauri-luna-os-release-workflow) — Q6 Tauri / Luna OS release workflow timing
- [PI-007](#pi-007-pnpm-11-14-vs-9) — Q7 pnpm 11.14 vs 9
- [PI-008](#pi-008-arch-omarchy-platform-code) — Q8 Arch / Omarchy platform code
- [PI-009](#pi-009-open-ui-c6-confirm) — Q9 open-ui C6 confirm
- [PI-010](#pi-010-banking-dewey-role) — Q10 Banking (BS) Dewey role
- [PI-011](#pi-011-dewey-bk-to-od-rewrite) — Q13 Dewey BK→OD rewrite
- [PI-012](#pi-012-gv-0002-on-disk-filename) — Q14 GV-0002 on-disk filename
- [PI-013](#pi-013-luna-os-open-ui-token-pr) — Luna OS open-ui token PR *(watching)*

## Answered

- [PI-014](#pi-014-shell-token-pr-3-lattice-nits) — A) accept residual nits / merged 2026-09-30 MT

---

<h2 id="pi-001-white-label-catalog-row">PI-001 — Q11 White-label catalog row</h2>

- **Status:** `open`
- **Needed:** decision
- **Question:** White-label (`WL`) is in APP_REGISTRY, not in the manifest. Should it get a `marketplace: null` catalog row?
- **Options:**
  - [ ] A) Yes — add reserved `marketplace: null` / `sdk: null` catalog row for WL
  - [ ] B) No — keep registry-only (commercial gate, not a package)
  - [ ] C) Other (text)
- **Text:**
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #11. [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md) §4 WL row “commercial gate on Luna OS, not a package”. [governance PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-002-fleet-reserved-rows">PI-002 — Q12 Fleet reserved LO/SC/OD rows</h2>

- **Status:** `open`
- **Needed:** decision
- **Question:** `Docs/VERSIONS.md` / `versions/fleet.json` were not fully regenerated. The withdrawn member-shell fleet row was removed by hand. Should the next meta-workspace `pnpm versions:fleet` add reserved LO/SC/OD/… rows (mostly `—`) to the dashboard?
- **Options:**
  - [ ] A) Yes — add reserved LO/SC/OD/… rows on next fleet regen
  - [ ] B) No — leave fleet as leftover snapshot until monorepo exists
  - [ ] C) Other (text)
- **Text:**
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #12. Lattice left Q12 open on [governance PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-003-palette-replace-vs-supplement">PI-003 — Palette: replace amber seed vs supplement</h2>

- **Status:** `open`
- **Needed:** decision
- **Question:** Four colors were given — purple `#400080`, pink `#ED1CAD`, light blue `#1CEDC5`, teal `#008080`. Should they **replace** the amber seed `#e8a54b`, or **supplement** it (keep amber alongside)?
- **Options:**
  - [ ] A) Replace amber entirely (current draft lock on PR #7 / shell#3)
  - [ ] B) Supplement — keep amber seed plus the four
  - [ ] C) Other (text)
- **Text:**
- **More context:** DRAFT already withdrew amber on [governance PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7). Powerline asked to confirm replace vs supplement. [DESIGN_RECORDS/GV-0003-material-3.md](DESIGN_RECORDS/GV-0003-material-3.md). [ARCHITECTURE.md](ARCHITECTURE.md). [subterra-shell PR #3](https://github.com/SubTerraCo/subterra-shell/pull/3).

---

<h2 id="pi-004-font-families-for-open-ui">PI-004 — Q15 Font families for open-ui</h2>

- **Status:** `open`
- **Needed:** decision
- **Question:** Font **families** for `packages/open-ui` — interim Material 3 type scale and 4dp spacing are locked; typeface names wait on Powerline.
- **Options:**
  - [ ] A) Name typefaces now (use Text)
  - [ ] B) Keep interim M3 type scale only until later
  - [ ] C) Other (text)
- **Text:**
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #15. [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md) §7. [DESIGN_RECORDS/GV-0003-material-3.md](DESIGN_RECORDS/GV-0003-material-3.md). [governance PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

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
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #5. [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md) §4 Cut. [governance PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-006-tauri-luna-os-release-workflow">PI-006 — Q6 Tauri / Luna OS release workflow timing</h2>

- **Status:** `open`
- **Needed:** decision
- **Question:** When should a Tauri / Luna OS release workflow be authored?
- **Options:**
  - [ ] A) After `luna` monorepo Phase 5 shell bundle
  - [ ] B) Author stub now on governance
  - [ ] C) Other (text)
- **Text:**
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #6. [ARCHITECTURE.md](ARCHITECTURE.md) Phases. [governance PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-007-pnpm-11-14-vs-9">PI-007 — Q7 pnpm 11.14 vs 9</h2>

- **Status:** `open`
- **Needed:** decision
- **Question:** Confirm governance stays on pnpm 11.14 while `luna` uses pnpm 9 (GV-0004 C5).
- **Options:**
  - [ ] A) Confirm as-is
  - [ ] B) Align both (specify in Text)
  - [ ] C) Other (text)
- **Text:**
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #7. [DESIGN_RECORDS/GV-0004-enterprise-monorepo.md](DESIGN_RECORDS/GV-0004-enterprise-monorepo.md) C5. [governance PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

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
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #8. [governance PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-009-open-ui-c6-confirm">PI-009 — Q9 open-ui C6 confirm</h2>

- **Status:** `open`
- **Needed:** decision
- **Question:** GV-0004 C6 originally said `packages/ui`; names table + ARCHITECTURE say `packages/open-ui`. This PR aligned C6 to **open-ui**. Confirm.
- **Options:**
  - [ ] A) Confirm open-ui
  - [ ] B) Prefer packages/ui
  - [ ] C) Other (text)
- **Text:**
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #9. [DESIGN_RECORDS/GV-0004-enterprise-monorepo.md](DESIGN_RECORDS/GV-0004-enterprise-monorepo.md) C6. [ARCHITECTURE.md](ARCHITECTURE.md). [governance PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-010-banking-dewey-role">PI-010 — Q10 Banking (BS) Dewey role</h2>

- **Status:** `open`
- **Needed:** decision
- **Question:** Banking (`BS`) Dewey `role: integration` in APP_REGISTRY vs other packages `role: app`. Catalog treats BS as Luna package. Reclassify Dewey role?
- **Options:**
  - [ ] A) Change Dewey role to `app`
  - [ ] B) Leave `integration` until fold-in
  - [ ] C) Other (text)
- **Text:**
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #10. [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md) §4 BS row. [governance PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-011-dewey-bk-to-od-rewrite">PI-011 — Q13 Dewey BK→OD rewrite</h2>

- **Status:** `open`
- **Needed:** decision
- **Question:** Should existing Dewey addresses on Blocks (`BK/N-####`) be rewritten to `OD/N-####`, or only **new** work use OD/OS/BI/LO?
- **Options:**
  - [ ] A) Rewrite existing BK→OD
  - [ ] B) Only new work uses OD/…
  - [ ] C) Other (text)
- **Text:**
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #13. [governance PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

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
- **More context:** [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) Still open #14. [DESIGN_RECORDS/GV-0002-nexus-dual-shell.md](DESIGN_RECORDS/GV-0002-nexus-dual-shell.md). [governance PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

---

<h2 id="pi-013-luna-os-open-ui-token-pr">PI-013 — Luna OS open-ui token PR</h2>

- **Status:** `watching`
- **Needed:** status
- **Question:** Track until draft PR is ready for Lattice.
- **Options:** N/A — Rook updates when PR ready / Lattice clears.
- **Text:**
- **Current:** agent [bc-ceeeb171-7643-5354-9303-55a529182bbb](https://cursor.com/agents/bc-ceeeb171-7643-5354-9303-55a529182bbb) — branch `cursor/powerline-open-ui-tokens-2bbb` — PR [luna-os#1](https://github.com/SubTerraCo/luna-os/pull/1) (was running when queued).
- **More context:** Sibling of [subterra-shell PR #3](https://github.com/SubTerraCo/subterra-shell/pull/3). Governance palette docs already on [governance PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).

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
- **More context:** Sibling palette lock on [governance PR #7](https://github.com/SubTerraCo/subterra-governance/pull/7).
