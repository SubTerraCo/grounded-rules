# GV-0007 — Grok bot Anytype (Cara Local API bridge)

| | |
|--|--|
| **Address** | `GV.CX.DV.01.070.010` |
| **Release** | `v26.09.30` |
| **Status** | Draft — Cara topology documented; classification locked **integration**. Destination (Central packaging vs AT) waits on [PI-020](../POWERLINE_INPUT.md#pi-020-grok-bot-anytype-destination). Stay draft until Powerline says merge |
| **Owner** | Grounded Rules agent (GV) |
| **Blueprint** | [Docs/ARCHITECTURE.md](../ARCHITECTURE.md) |
| **Display name** | **Grok bot Anytype** |
| **Machine key** | `grok-bot-anytype` (kebab id/path only; this PR does not create that folder) |
| **Classification** | **integration** (Powerline lock 2026-09-30). Sole label. |

Numbering: GV-0005 is claimed by open draft [PR #12](https://github.com/SubTerraCo/grounded-rules/pull/12); GV-0006 by open draft [PR #15](https://github.com/SubTerraCo/grounded-rules/pull/15). This record is **GV-0007**.

Docs-only. No runtime, no Local API client, no marketplace package, no secrets.

---

## 1. Problem

Joshua uses Anytype desktop on **Cara**. The Local API listens on `127.0.0.1:31009`. Rook / Powerline need tasks, notes, and lists from spaces and channels Joshua grants — starting with the **Powerline** space — without putting the Anytype API key on the LAN, in chat, or in git.

PKM stays in a dedicated Anytype workspace. Grounded Rules already forbids treating Anytype as a monorepo product package. The unfinished sentence was: align with Grounded Rules and “add as a package to our —” (trailed off). Powerline later named **SubTerra Central (`SC`)** as the intended destination: add **Grok bot Anytype** as a Central package **or** third-party integration, whichever Grounded Rules permits.

This record documents the Cara bridge, locks the classification, and **flags every Grounded Rules conflict** with Central packaging. It does not implement the bridge.

---

## 2. Decision (this draft)

| Ref | Decision |
|-----|----------|
| **D1** | Display name is exactly **Grok bot Anytype**. Machine key `grok-bot-anytype` only where a path or id is required. |
| **D2** | Classification is **integration** only (Powerline 2026-09-30). Dewey home is **AT** (Anytype), `role: integration`, leftover path `integrations/anytype`, repo `SubTerraCo/subterra-anytype`. Do not invent `packages/anytype-bridge` or `packages/grok-bot-anytype`. |
| **D3** | Cara topology in §3 is the documented bridge design. Dual credentials: Anytype key stays in Cara local env; a **separate** bridge token authenticates Rook / Powerline over LAN or tunnel. |
| **D4** | First pull/write after the bridge is up: list spaces → resolve **Powerline** space/channel → return types, tags, and task/note/list objects → create tag `development` and a new view in Powerline. |
| **D5** | Anytype is **not** the hub source of truth. Optional mirror / PKM workspace only. API keys are per-user runtime — never committed. |
| **D6** | **OPEN:** destination. Powerline intent is Central (`SC`). Grounded Rules **does not currently permit** a Central marketplace package for this (conflict report §6). Compliant shape until PI-020: third-party **integration** under AT. |

Historical audit (not options): “plugin” and “extension” were considered and **rejected**. There is no Dewey role `extension`. Marketplace/shell language at tip does not use `plugin` for third-party mounts. Exploratory PI-019 on sibling draft [PR #11](https://github.com/SubTerraCo/grounded-rules/pull/11) kept `integration` and noted `plugin` as an unlocked 3P-wording candidate; that candidate is **not** used here.

---

## 3. Cara topology

```
Rook / Powerline  --(LAN or tunnel, bridge token)-->  Grok bot Anytype (Cara process)
                                                              |
                                                              | loopback only
                                                              | Authorization: Bearer  (ANYTYPE_API_KEY from local env)
                                                              | Anytype-Version: 2025-11-08
                                                              v
                                                    Anytype desktop Local API
                                                    127.0.0.1:31009
```

- Anytype desktop on Cara keeps Local API on **`127.0.0.1:31009`**.
- The **Grok bot Anytype** process on Cara holds `ANYTYPE_API_KEY` in **local environment only**.
- Calls to Anytype use `Authorization: Bearer` plus `Anytype-Version` (example date `2025-11-08`; follow the vendor header Anytype ships).
- Rook / Powerline reach the bridge over LAN or a tunnel with a **separate bridge token**. The Anytype key is never on that hop, never in chat, never in git.
- Scope: tasks, notes, and lists across spaces/channels Joshua grants.

No values for either credential appear in this repository.

---

## 4. Auth hops

| Hop | Who | Credential | Where it lives |
|-----|-----|------------|----------------|
| 1 | Operator → Cara env | `ANYTYPE_API_KEY` | Cara local environment of the Grok bot Anytype process. Not git, not chat, not LAN. |
| 2 | Grok bot Anytype → Anytype Local API | `Authorization: Bearer` + `Anytype-Version` | Loopback `127.0.0.1:31009` only. |
| 3 | Rook / Powerline → Grok bot Anytype | Separate **bridge token** | LAN or tunnel. Distinct from hop 1. |

Dual-credential design is permitted: Luna already requires per-user runtime keys and forbids committing them ([ARCHITECTURE.md](../ARCHITECTURE.md) provider list). Banking / HA stay Metro-local for the same class of reason.

---

## 5. First pull and write (Powerline space)

After the bridge process is running (implementation is **not** this PR):

1. List spaces.
2. Resolve the **Powerline** space (and channel, if Anytype exposes one).
3. Return types, tags, and task / note / list objects Joshua granted.
4. Create tag `development`.
5. Create a new view in Powerline.

Non-goals for that first use: not a hub write, not installing a marketplace package, not copying Metro hub records onto Central public pages.

---

## 6. Conflict report (mandatory)

What Grounded Rules **permits**, **restricts**, and **conflicts** with this initial plan. Verified against **tip** `master` ([ARCHITECTURE.md](../ARCHITECTURE.md), [codes/APP_REGISTRY.yaml](../../codes/APP_REGISTRY.yaml), [subterra.manifest.yaml](../../subterra.manifest.yaml), [GV-0004](GV-0004-enterprise-monorepo.md)). Sibling **unmerged** drafts are called out as drafts, not tip.

### 6.1 Permits

| Clause | Why it fits |
|--------|-------------|
| AT Dewey **integration** | APP_REGISTRY: `code: AT`, `role: integration`, `localPath: integrations/anytype`, `repo: SubTerraCo/subterra-anytype`, `status: linked`, `upstream: anyproto/anytype-api`. Constitution §1 leftover `integrations/<name>/` is Anytype. |
| Optional PKM | ARCHITECTURE: any-sync optional; “Making it required” is the leave-out. Phase 2: `anytype` is an optional mirror of the hub, not the store packages require. |
| Dual credentials / no secrets in git | ARCHITECTURE Luna: API keys supplied at runtime, never committed. Same rule here. |
| Cara localhost Local API | Vendor Local API on loopback is consistent with “dedicated Anytype workspace” living **outside** the monorepo hub. |
| TypeScript later | Constitution §14: new application code is TypeScript. Not this PR. |

### 6.2 Restricts

| Clause | Restriction |
|--------|-------------|
| PKM is not a monorepo package | ARCHITECTURE: “PKM lives in a dedicated Anytype workspace. It is not a package in this monorepo. The shell hub does not require it.” GV-0004 names table: AT path `—`, “Dedicated workspace. Not a package.” Open Axiom cut. |
| Marketplace empty-hub rule | Every installable package stands alone and works when the hub is empty. Other people are not required to run Anytype. A package that cannot open without Cara Anytype + Local API **fails** this rule. |
| Twin fields on new Luna items | Do not write leftover `role: app\|integration`, `marketplace: apps\|integrations`, or twin SDKs on **new** Luna catalog items. AT already **is** the leftover integration row; do not add a second catalog product. |
| Banking `BS` | APP_REGISTRY leftover `role: integration` on BS is a **separate** vocabulary note (PI-010 still open on tip). Do not copy BS’s `packages/banking` shape onto Anytype. |
| Metro ↔ Central data bridge | Copies only marked Open Books, Open Bill, and Open Time records. Mail, banking, and home automation stay on Metro. **Does not include Anytype / PKM.** |
| No new app/integration GitHub pair | Constitution §2: do not start new work as a pair of separate app/integration repos. Grok bot Anytype rides **AT**, it does not get a new org repo in this pass. |

### 6.3 Conflicts (explicit)

| # | Plan | Grounded Rules | Conflict |
|---|------|----------------|----------|
| **X1** | Powerline intent: add Grok bot Anytype as a **Central package** | AT is Dewey **integration**, not `packages/*`. “PKM … is not a package in this monorepo.” | **Yes.** A Central (or Metro) **marketplace package** for PKM contradicts AT-not-a-package. Do not silently invent `packages/grok-bot-anytype` with `audience: [member]`. |
| **X2** | Central packaging / installable package | Marketplace: installable packages stand alone; PKM/Anytype is **not required** for the shell hub. | **Yes.** Binding a Central installable package to Cara Anytype Local API makes Anytype required for that item and violates empty-hub. |
| **X3** | Destination **Central (`SC`)** | Tip install matrix: Central is the **member PWA** for gigs / events / NFC event page. Personal and back-office clients (Open Sort, Banking, Home Assistant, Media, **Luna**) are **Metro-only**. AT catalog `audience: [admin]` mounts Metro, not Central. | **Yes on tip.** A Cara-local PKM bridge (loopback `:31009`, LAN to Rook) is personal/local, same class as HA / Luna / Banking — Metro-shaped, not public-event Central. Putting it on Central as a package fights the matrix. |
| **X4** | Same as X3 vs sibling draft GV-0005 | Unmerged [PR #12](https://github.com/SubTerraCo/grounded-rules/pull/12) **display**-frames Central as personal productivity + Luna 7, Metro as social / busy feed. Install-matrix **Yes/No cells are not swapped** (F1: Luna `LU` remains Metro Yes / Central No). | **Still a conflict.** Even if Central *display* becomes personal productivity, F1 holds Luna off Central. A localhost Anytype bridge is not a reason to invent a Central mount GV-0005 refused to invent for Luna. |
| **X5** | Runtime of the bridge is a **Cara process** talking to `127.0.0.1` | SubTerra Central is an **offline-first PWA**. Local API is Cara loopback. Rook/Powerline already reach the bridge over **LAN**, not by living inside the PWA. | **Yes if “Central package” means the process is packaged in `apps/subterra-central`.** The process belongs on Cara. Central (or Rook) may be a **client** of the LAN bridge; that is not a Central marketplace package. |
| **X6** | “Add as a package to our —” (unfinished) | No GR Dewey role `extension`. Twin `integration` on leftover AT is already the Anytype row. New Luna items must not re-declare twin fields. | **Resolved for label** (D2: integration). **Unresolved for destination** (PI-020). |

### 6.4 Compliant shape (until PI-020)

Do **not** invent a Central marketplace package that violates X1–X5.

Permitted until Powerline answers PI-020:

1. **Preferred / GR-native:** third-party **integration** under **AT** — leftover repo `SubTerraCo/subterra-anytype`, path `integrations/anytype`. Grok bot Anytype is the Cara Local API bridge **of that integration**, not a new APP code and not `packages/*`.
2. **Optional Metro-side consumer:** a Metro (`SM`, `audience: admin`) tool or Luna tool that calls the LAN bridge. Still **not** a marketplace package; Luna matrix remains Metro-only on tip (and on GV-0005 F1).
3. **Docs-only** (this PR) until PI-020.

Central may later be a **LAN client** (same hop as Rook / Powerline) without becoming the package home.

---

## 7. Non-goals

- Not the hub source of truth.
- Not a monorepo `packages/*` product package.
- Not a Central (or Metro) marketplace SKU in this draft.
- Not making Anytype required for the shell or for other packages.
- Not extending the Metro↔Central data bridge to PKM.
- Not implementing Grok bot Anytype runtime in this Grounded Rules PR.
- Not committing or printing API keys / tokens.

---

## 8. Security

- `ANYTYPE_API_KEY` — Cara local env of the Grok bot Anytype process only.
- Bridge token — distinct; LAN/tunnel only; never equal to the Anytype key in documentation or in storage guidance.
- Neither credential in git, chat, or this record’s examples (names of env vars only).
- Local API stays on loopback. Do not expose `:31009` on the LAN.
- Per-user / runtime keys; no org-wide committed secret.

---

## 9. Open destination ([PI-020](../POWERLINE_INPUT.md#pi-020-grok-bot-anytype-destination))

Powerline named Central as the packaging intent. Grounded Rules conflict report §6 says a Central **package** is not permitted; an AT **integration** is.

Options for Powerline are on PI-020. This record does not pick a violating shape.

---

## 10. What this pass does not do

- Merge this pull request (stay draft until Powerline says).
- Create `SubTerraCo/luna`, `packages/grok-bot-anytype`, or a new GitHub repo.
- Run product builds or implement the Cara process.
- Rewrite AT Dewey `role`, `localPath`, or catalog twin leftover fields (those stay until fold-in).
- Answer PI-010 (Banking) or merge sibling drafts #10–#17.
