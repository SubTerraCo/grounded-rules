# GV-0005 — Hybrid architecture lock and Metro / Central display framing

| | |
|--|--|
| **Address** | `GV.CX.DV.01.050.010` |
| **Release** | `v26.09.30` |
| **Status** | Design locked — hybrid: team Yes 6–0. Runtimes follow [PI-021](../POWERLINE_INPUT.md#pi-021-shell-swap-metro-central-pepper). Recorded as PI-022 |
| **Owner** | Grounded Rules agent (GV) |
| **Blueprint** | [Docs/ARCHITECTURE.md](../ARCHITECTURE.md) |

Locks the **hybrid architecture** (one monorepo, two hosts, standalone packages) into Grounded Rules. **Display wording** of the two hosts follows the already-merged PI-019 / PR #19 lock. Architecture underneath is unchanged.

This record does **not** create a second monorepo, change catalog `audience` machine values, or reopen plugin / extension debates (Anytype stays Dewey `role: integration` only — GV-0004 C15). Live codes are `MT`, `CT`, and `PR` (PI-021). `SM`, `SC`, `LU`, and `LO` are aliases.

---

## 1. Hybrid architecture (locked)

Still a **monorepo** ([ARCHITECTURE.md](../ARCHITECTURE.md) + [GV-0004](GV-0004-enterprise-monorepo.md) C1). **Not** polyrepo. **“Omni-repo” / “omnirepo” is not a GV term** — do not introduce it.

One platform, two entry apps (hosts), shared standalone packages.

| Ref | Decision |
|-----|----------|
| **D1** | **One monorepo, two hosts.** The product repo is `SubTerraCo/central`: `apps/central` and `apps/metro` plus `packages/*`. Grounded Rules stays this rules repo. Two entry apps in one repo is still a monorepo. A packages-under-Central path is **sanctioned** (GV-0004 C16); root `packages/` remains valid. |
| **D2** | **Packages are standalone** (hub / bridge style, not package-imports-as-apps). A package may not import another package. The host is the only dependency: Material 3, the marketplace, and a small SQLite hub. Optional facts another package wrote are read from the hub only after a grant. The optional data bridge stays off by default. Allowlist: owner-marked Open Books (`OB`), Open Bill (`OL`), Open Time (`OT`), and Anytype (`AT`). Former Open Bill code `BI`. |
| **D3** | **Bundles / suites are deferred.** Do not invent marketplace bundles in this pass. Packages remain independently loadable. Hosts are the two shells, not a bundle SKU. Central as “suite of all tools” is **display / host role**, not a marketplace bundle SKU. |
| **D4** | **White-label (`WL`) is the commercial gate only.** No new Dewey APP code. First-run wizard on Central. Brand pack in `packages/open-ui`. [PI-001](../POWERLINE_INPUT.md#pi-001-white-label-catalog-row): registry-only, no catalog row. [PI-015](../POWERLINE_INPUT.md#pi-015-white-label-first-run-dewey-path) Preferred: no `BR` / `packages/open-brand`; no fourth shell. **WL stays on Central, the local app.** |
| **D5** | **Per-package Devs when needed** — org / process under the repo lead. Not a Dewey code and not a catalog row. |
| **D6** | **Hold two runtimes.** Central (`CT`) is Tauri. Metro (`MT`) is the PWA. Unify **packages** only. Do not collapse the two runtimes into one shell. PI-021 swapped which name sits on which runtime. |

---

## 2. Display framing (PI-021)

Live hosts follow PI-021. This is audience / display framing only — **not** a Dewey or path rewrite.

| Host | Dewey | Path | Runtime | Catalog `audience` | Display framing |
|------|-------|------|---------|-------------------|-----------------|
| Metro | `MT` (alias `SM`) | `apps/metro` | Offline-first PWA | `member` | **Social media and ticketing** |
| Central | `CT` (aliases `SC`, `LO`) | `apps/central` | Tauri v2 | `admin` | **Local app and package host.** Pepper (`PR`) installs here |

Withdrawn on this record (do not reuse as live display):

- Metro “social / busy feed”
- Central “personal productivity + Pepper”

Older blueprint prose that labeled Metro “personal and white-label” / command center and Central “public events” is also display-stale.

Unchanged underneath:

- Live Dewey codes `MT` / `CT` / `PR`. Aliases `SM` / `SC` / `LU` / `LO`
- On-disk paths (`apps/metro`, `apps/central`, `packages/pepper`; packages-under-Central sanctioned)
- Catalog `audience` machine values `admin` \| `member` and the fail-closed default
- WL commercial gate on Central (wizard on Central; brand pack in `open-ui`)
- Dual-shell runtimes (Tauri + PWA)
- Bridge allowlist OB + OL + OT + AT

**Pepper** the package is `packages/pepper`, Dewey `PR` (alias `LU`). Pepper installs on Central. Hermes is the runtime.

---

## 3. Relationship to earlier records

| Record | What still stands | What this record adds |
|--------|-------------------|------------------------|
| [PI-019](../POWERLINE_INPUT.md#pi-019-central-hub-metro-social-anytype) / PR #19 | Packages-under-Central sanctioned; bridge OB+OL+OT+AT | Hybrid naming (D1–D6). PI-021 is the live runtime: Central is Tauri, Metro is the PWA. |
| [GV-0004](GV-0004-enterprise-monorepo.md) C1 | The product is one pnpm + Turborepo monorepo | That shape is named **hybrid**: one repo, two hosts, standalone packages. Not polyrepo. Not “omni-repo”. |
| GV-0004 C2 | Exactly two runtimes: Tauri v2 and a PWA | Hold that split. Unify packages only. |
| GV-0004 C15 / C16 | Anytype Central integration; packages-under-Central sanctioned | Not reopened. Not plugin / extension. |
| [GV-0002](GV-0002-nexus-dual-shell.md) D1, D4 | Two shells; `audience` `admin` / `member` | Display framing of those shells is §2. Machine values are not renamed. |
| GV-0002 D7 | Dewey areas `SO` (Social / feed) and `EV` (Events / ticketing) | Area codes are **not** rewritten. Metro as the social media app does not move `SO` onto `SM`. |
| PI-001 / PI-015 | WL registry-only; brand pack in `open-ui` | Restated as D4. The wizard sits on Central, the local app. |

Where live blueprint prose disagrees with older “Metro = personal / Central = public events” or “busy feed / Luna 7” labels, [ARCHITECTURE.md](../ARCHITECTURE.md) Shell roles + this record win.

---

## 4. Install-matrix flags (do not invent a rewrite)

Install cells follow ARCHITECTURE. Metro is the public PWA. Central is the local Tauri host.

| Flag | Tension | What this record does |
|------|---------|------------------------|
| **F1** | Pepper `PR` installs on Central only (PI-021). Former code `LU` is an alias | `packages/pepper` stays the agent. It does not install on Metro |
| **F2** | Open Time drafting lives on Central; a granted schedule can appear on Metro | Drafting stays on Central. |
| **F3** | Dewey `SO` (Social / feed) was reserved for the member shell. Display: Metro is the social media app | Area code unchanged. **Not** a Dewey rewrite. |
| **F4** | WL used to sit next to the old personal-shell copy | WL stays the commercial gate on Central. Brand pack stays in `open-ui`. |
| **F5** | Event page, tickets, show log, and public Community mount on Metro. Organizer tools and crew discussion stay on Central | That split matches the install matrix. |

---

## 5. What this pass does not do

- Create `SubTerraCo/luna` or start Phase 1
- Start product builds
- Run product / app builds
- Edit leftover `luna-os` or `subterra-shell` product repos
- Introduce the term “omni-repo”
- Add Dewey codes for WL, bundles, or per-package Devs
- Unify SM and SC into one runtime
- Rename catalog `audience` values
- Reopen plugin / extension classification for Anytype
- Delete or archive files
