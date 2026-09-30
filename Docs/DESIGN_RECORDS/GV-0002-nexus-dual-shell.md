# GV-0002 — Nexus dual-shell architecture

| | |
|--|--|
| **Address** | `GV.CX.DV.01.020.010` |
| **Release** | `v26.08.04` |
| **Status** | Historical. Shell paths `apps/admin` and `apps/nexus` are superseded by GV-0004 (Luna OS and SubTerra Central). Audience and NFC challenge-response still stand |
| **Owner** | Governance agent (GV) |

Locks a dual-shell model over one shared core: an admin SubTerra OS shell (ST) and a customer-facing **Nexus** shell (NX). Marketplace items gain an `audience` gate. NFC login must be challenge-response, never UID-only.

---

## 1. Conflict audit findings

### Round 1

| # | Conflict | Evidence |
|---|----------|----------|
| C1 | Three 2022 NFC repos (`subtoken`, `tag-writer`, `validation`) sit unregistered in `SubTerraCo` while `TK` is only a reserved placeholder named "Ticketing / NFC" | Org listing + `APP_REGISTRY.yaml` TK entry |
| C2 | Customer NFC "login by token ID" as stated is spoofable — UIDs are readable and cloneable | Any phone can read NDEF/UID; 2022 `validation` already uses offline ECDSA |
| C3 | Overloading SDK `role` for permissions would collide with `SubterraRole = "app" \| "integration"` | [`shell/packages/sdk-contract/src/index.ts`](../../../shell/packages/sdk-contract/src/index.ts) — `SubterraHostContext.role` is marketplace role |
| C4 | Treating Nexus as a marketplace app would fork marketplace chrome from the admin shell | Constitution §2 requires one Shell marketplace UX; Shell has no UI code yet (`apps/` absent) |

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
| **D1** | **Two shell targets, one repo, one shared core.** `subterra-shell` hosts `packages/shell-core` (marketplace, item host, session) plus thin `apps/admin` (ST) and `apps/nexus` (NX). Neither shell forks marketplace or auth logic. |
| **D2** | **Nexus is a shell target, not a marketplace app.** It gets its own APP code `NX` with `role: shell`. Customer social / events / ticket UX lives there; admin tools stay on ST. |
| **D3** | **Customer platform name is Nexus.** Backend ticketing / NFC admin product remains **Subtoken** under APP code `TK` (reads as ToKen). |
| **D4** | **Permissions use `audience`, never `role`.** Values: `admin` \| `member`. Manifest field `audience` is a list. Default when omitted: `["admin"]` (**fail-closed** — never customer-visible unless opted in). |
| **D5** | **NFC auth is challenge-response.** Login proves possession of the tag private key (ECDSA). UID is an identifier only. UID-only "auth" is forbidden. Crypto from the 2022 `validation` app becomes shared auth code, not mobile-only. |
| **D6** | **Subtoken (`TK`) absorbs** `SubTerraCo/subtoken`, `tag-writer`, and `validation` as the admin-facing NFC / ticketing product (`audience: [admin]`). Consolidation and revival are **deferred** follow-on work. |
| **D7** | Dewey areas **`SO`** (Social / feed) and **`EV`** (Events / ticketing) are reserved. Existing **`AU`** and **`NF`** cover auth and NFC crypto. |
| **D8** | Governance encodes D1–D7 now (this record, codes, manifest, constitution). Shell implementation and Subtoken revival are explicit follow-ons — not part of this gate. |

---

## 3. Topology (target)

```
subterra-shell/
  packages/shell-core/     # marketplace grids, item host, session
  apps/admin/              # ST — full OS shell (audience: admin)
  apps/nexus/              # NX — social, events, tickets (audience: member)

apps/subtoken/             # TK — admin apps (tag writer, validator, web resolver)
  # deferred revive from SubTerraCo/{subtoken,tag-writer,validation}
```

Marketplace filtering: a shell session with audience `member` only mounts items whose `audience` includes `member`. Admin shells see `admin` items. Fail-closed default keeps Subtoken, Blocks, Mailbot, etc. off the Nexus grid until each opts in.

---

## 4. Deferred follow-ons

| Work | Why deferred |
|------|----------------|
| `packages/shell-core`, `apps/admin`, `apps/nexus` | Shell code — after this record |
| `sdk-contract` `audience` / session surface + parity tests | Twin SDK change — after this record |
| Subtoken monorepo merge + Expo / Vue revival | Product work; Python `tools/tag-writer` needs future `ci-python.yml` (Anytype needs it too) |
| Ticket payments | Out of scope |

---

## 5. Verified in this gate

| Artifact | Change |
|----------|--------|
| This design record | Locked |
| `codes/APP_REGISTRY.yaml` | `NX` reserved; `TK` → Subtoken + absorb note |
| `codes/AREA_CODES.yaml` | `SO`, `EV` added |
| `subterra.manifest.yaml` | `audience` on items; `nexus` + `subtoken`; `defaultBranch` corrected |
| `CI_OPS_CONSTITUTION.md` | §1 dual-shell topology; §6 audience; §13 shell audiences + NFC invariant |
