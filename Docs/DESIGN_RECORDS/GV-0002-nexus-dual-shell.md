# GV-0002 — Audience, dual-shell, and NFC

> On-disk filename `GV-0002-nexus-dual-shell.md` is historical. Rename awaits archive approval. This record is the audience + NFC lock.

| | |
|--|--|
| **Address** | `GV.CX.DV.01.020.010` |
| **Release** | `v26.08.04` |
| **Status** | Historical folder sketch superseded by GV-0004 (SubTerra Metro and SubTerra Central). Audience and NFC challenge-response still stand |
| **Owner** | Grounded Rules agent (GV) |

Locks a dual-shell model: an admin shell and a member-facing public shell. Marketplace items gain an `audience` gate. NFC login must be challenge-response, never UID-only.

**Still stands:** `audience` (`admin` / `member`, fail-closed default `["admin"]`); NFC challenge-response (no UID-only auth); Dewey areas `SO` and `EV`; Subtoken `TK` absorbs the 2022 NFC repos; `role` is never used for permissions. Live TK / CH `audience` lists follow the ARCHITECTURE install matrix (`[admin, member]`), not the historical admin-only D3/D6 rows.

**Superseded by GV-0004:** leftover `apps/admin` / shared `shell-core` folder sketch, SubTerra OS as the shell to build, and separate product repos as the product shape. Build `apps/subterra-metro` (`SM`, address aliases `LO` and `ST`) and `apps/subterra-central` (`SC`).

**Rewritten by Powerline lock 2026-09-30 (voice):** product-role prose that called Central a public/member shell and Metro the personal command center. Live roles: Central = personal AI hub + suite of all tools (hosts packages and integrations; packages-under-Central is sanctioned, GV-0004 C16); Metro = social media app that consumes Central-hosted packages. Catalog `audience` machine values and mapping are **not** renamed. Anytype as a Central integration is the intended shape (GV-0004 C15).

---

## 1. Conflict audit findings

### Round 1

| # | Conflict | Evidence |
|---|----------|----------|
| C1 | Three 2022 NFC repos (`subtoken`, `tag-writer`, `validation`) sit unregistered in `SubTerraCo` while `TK` is only a reserved placeholder named "Ticketing / NFC" | Org listing + `APP_REGISTRY.yaml` TK entry |
| C2 | Customer NFC "login by token ID" as stated is spoofable — UIDs are readable and cloneable | Any phone can read NDEF/UID; 2022 `validation` already uses offline ECDSA |
| C3 | Overloading SDK `role` for permissions would collide with `SubterraRole = "app" \| "integration"` | [`shell/packages/sdk-contract/src/index.ts`](../../../shell/packages/sdk-contract/src/index.ts) — `SubterraHostContext.role` is marketplace role |
| C4 | Treating the member surface as a marketplace app would fork marketplace chrome from the admin shell | Constitution §2 requires one Shell marketplace UX; Shell has no UI code yet (`apps/` absent) |

### Round 2

| # | Conflict | Evidence |
|---|----------|----------|
| R2-1 | `tag-writer` is Python and cannot join a pnpm workspace as a package | Repo root: `requirements.txt`, `subterra_installer.py`, committed `.exe` |
| R2-2 | Manifest still marks `mailbot` / `anytype` `defaultBranch: main` after both were renamed to `master` | Remote defaults verified `master` on 2026-08-04 |
| R2-3 | Shell UI does not exist yet — dual-shell costs zero migration now, expensive after first screen | `shell/` has SDK packages only; `pnpm-workspace.yaml` declares `apps/*` with no directory |
| R2-4 | Full Subtoken revival (Expo, Vue forward, payments) is out of scope for an architecture lock | PM chose architecture-first (GV-0002) over combined revival roadmap |

---

## 2. Locked decisions

| Ref | Decision |
|-----|----------|
| **D1** | **Two shell targets.** Admin and member surfaces share marketplace, item host, and session logic. Neither shell forks that core. GV-0004 paths: `apps/subterra-metro` (admin) and `apps/subterra-central` (member). Do not build leftover `apps/admin` or `packages/shell-core`. |
| **D2** | **The member-audience shell is a shell target, not a marketplace app.** It has APP code `SC` (`role: shell`). Catalog `member` still mounts on SubTerra Central; catalog `admin` still mounts on SubTerra Metro (`SM`). **Product roles (Powerline lock 2026-09-30):** Central is the personal AI hub and suite of all tools; Metro is the social media app and consumes Central-hosted packages. Historical D2 prose that put social / events / ticket UX on Central as a public member surface is superseded for *product role*; audience machine values are unchanged. |
| **D3** | **Member shell name is SubTerra Central.** Backend ticketing / NFC product remains **Subtoken** under APP code `TK`. Historical lock listed `audience: [admin]`. **Live catalog (ARCHITECTURE matrix):** `audience: [admin, member]` — organizer tools on SubTerra Metro; event page, tickets, show log, and digital goods on SubTerra Central. |
| **D4** | **Permissions use `audience`, never `role`.** Machine values stay exactly `admin` \| `member`. Manifest field `audience` is a list. Default when omitted: `["admin"]` (**fail-closed** — never visible on SubTerra Central unless `member` is listed). Mapping: `admin` → SubTerra Metro (`SM`, `apps/subterra-metro`; aliases `LO`, `ST`); `member` → SubTerra Central (`apps/subterra-central`). |
| **D5** | **NFC auth is challenge-response.** Login proves possession of the tag private key (ECDSA). UID is an identifier only. UID-only "auth" is forbidden. Crypto from the 2022 `validation` app becomes shared auth code, not mobile-only. |
| **D6** | **Subtoken (`TK`) absorbs** `SubTerraCo/subtoken`, `tag-writer`, and `validation`. Consolidation and revival are **deferred** follow-on work. Historical lock listed admin-facing only (`audience: [admin]`). **Live catalog (ARCHITECTURE matrix):** `audience: [admin, member]` as in D3. |
| **D7** | Dewey areas **`SO`** (Social / feed) and **`EV`** (Events / ticketing) are reserved. Existing **`AU`** and **`NF`** cover auth and NFC crypto. |
| **D8** | Governance encodes D1–D7 now (this record, codes, manifest, constitution). Shell implementation and Subtoken revival are explicit follow-ons — not part of this gate. |

---

## 3. Topology (target — GV-0004)

```
apps/subterra-metro/            # SM — social media app, Tauri (audience: admin); consumes Central-hosted packages; LO = former code
apps/subterra-central/   # SC — personal AI hub PWA (audience: member); hosts packages and integrations
packages/subtoken/       # TK — NFC / ticketing
  # deferred revive from SubTerraCo/{subtoken,tag-writer,validation}
```

Marketplace filtering: a shell session with audience `member` only mounts items whose `audience` includes `member`. Admin shells see `admin` items. Fail-closed default keeps leftover Blocks, Mailbot, and similar admin-only rows off SubTerra Central until each lists `member`. Subtoken (`TK`) and Community (`CH`) list both audiences per the ARCHITECTURE install matrix.

---

## 4. Deferred follow-ons

| Work | Why deferred |
|------|----------------|
| SubTerra Metro and SubTerra Central hosts | Shell code — after this record; paths locked in GV-0004 |
| `sdk-contract` `audience` / session surface + parity tests | Twin SDK change — after this record |
| Subtoken merge + Expo / Vue revival | Product work; Python `tools/tag-writer` needs future `ci-python.yml` (Anytype needs it too) |
| Ticket payments | Out of scope |

---

## 5. Verified in this gate

| Artifact | Change |
|----------|--------|
| This design record | Locked (audience + NFC). Live names/paths follow GV-0004 |
| `codes/APP_REGISTRY.yaml` | Member shell is `SC`; `TK` → Subtoken + absorb note |
| `codes/AREA_CODES.yaml` | `SO`, `EV` added |
| `subterra.manifest.yaml` | `audience` on items; SubTerra Central + `subtoken`; `defaultBranch` corrected |
| `CI_OPS_CONSTITUTION.md` | §1 dual-shell topology; §6 audience; §13 shell audiences + NFC invariant |
