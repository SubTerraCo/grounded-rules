# GV-0007 — Grok bot Anytype (Cara Local API bridge)

| | |
|--|--|
| **Address** | `GV.CX.DV.01.070.010` |
| **Release** | `v26.09.30` |
| **Status** | Ready for merge — Cara topology documented; classification locked **integration**; destination locked **Central integration**. Conflict three **resolved** (AT on bridge allowlist). Conflict four **resolved by rewrite** (packages-under-Central sanctioned). PI-020 answered |
| **Owner** | Grounded Rules agent (GV) |
| **Blueprint** | [Docs/ARCHITECTURE.md](../ARCHITECTURE.md) |
| **Display name** | **Grok bot Anytype** |
| **Machine key** | `grok-bot-anytype` (kebab id/path only; this PR does not create that folder) |
| **Classification** | **integration** (Powerline lock 2026-09-30). Sole label. |

Numbering: GV-0005 is claimed by open draft [PR #12](https://github.com/SubTerraCo/grounded-rules/pull/12) (hybrid + Metro/Central display); GV-0006 by open draft [PR #15](https://github.com/SubTerraCo/grounded-rules/pull/15). This record is **GV-0007**. Sibling agent owns the broader Central/Metro **role** docs; this record only locks Grok bot Anytype and the conflict override.

Docs-only. No runtime, no Local API client, no secrets. Conflict three and four resolved by rewrite in §6.2–§6.3.

---

## 1. Problem

Joshua uses Anytype desktop on **Cara**. The Local API listens on `127.0.0.1:31009`. Rook / Powerline need tasks, notes, and lists from spaces and channels Joshua grants — starting with the **Powerline** space — without putting the Anytype API key on the LAN, in chat, or in git.

PKM stays in a dedicated Anytype workspace. It is **not** a monorepo product package. The unfinished sentence was: align with Grounded Rules and “add as a package to our —”. Powerline then named Central, and on 2026-09-30 voice locked the host split:

- **SubTerra Central (`SC`)** — personal AI hub and suite of all tools. **Hosts packages and integrations.**
- **SubTerra Metro (`SM`)** — social media app, with access to packages and integrations **hosted in Central.**

**Grok bot Anytype as a Central integration is the intended shape, not a Grounded Rules violation.**

This record documents the Cara bridge, locks classification and destination, and records that override. It does not implement the bridge. It does not rewrite the full install matrix (sibling Central/Metro role lock).

---

## 2. Decision (this draft)

| Ref | Decision |
|-----|----------|
| **D1** | Display name is exactly **Grok bot Anytype**. Machine key `grok-bot-anytype` only where a path or id is required. |
| **D2** | Classification is **integration** only (Powerline 2026-09-30). Dewey home remains **AT** (Anytype), `role: integration`, leftover path `integrations/anytype`, repo `SubTerraCo/subterra-anytype`. **Grok bot Anytype** is that Central-hosted **integration**, not a PKM row under `packages/`. Conflict four separately **sanctions** packages-under-Central for the rest of the tool suite (rule rewrite, not a bypass). |
| **D3** | Cara topology in §3 is the documented bridge design. Dual credentials: Anytype key stays in Cara local env; a **separate** bridge token authenticates Rook / Powerline over LAN or tunnel. |
| **D4** | First pull/write after the bridge is up: list spaces → resolve **Powerline** space/channel → return types, tags, and task/note/list objects → create tag `development` and a new view in Powerline. |
| **D5** | Anytype is **not** the hub source of truth. Optional mirror / PKM workspace only. API keys are per-user runtime — never committed. Other packages still must not require Anytype. |
| **D6** | Destination **locked:** Central **integration** (Powerline 2026-09-30 voice; [PI-020](../POWERLINE_INPUT.md#pi-020-grok-bot-anytype-destination) answered). **Conflict three resolved:** bridge allowlist **OB + BI + OT + AT**. **Conflict four resolved by rewrite:** packages-under-Central is sanctioned. Other Central-packaging rows are intended Central integration. |

Historical audit (not options): “plugin” and “extension” were considered and **rejected**. Grok bot Anytype is not classified as either. Metro may *access* integrations/packages hosted in Central; that access language does not rename this item.

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
- Host: **Central integration.** Metro may access it as a Central-hosted integration. Loopback Local API still runs on Cara.

No values for either credential appear in this repository.

---

## 4. Auth hops

| Hop | Who | Credential | Where it lives |
|-----|-----|------------|----------------|
| 1 | Operator → Cara env | `ANYTYPE_API_KEY` | Cara local environment of the Grok bot Anytype process. Not git, not chat, not LAN. |
| 2 | Grok bot Anytype → Anytype Local API | `Authorization: Bearer` + `Anytype-Version` | Loopback `127.0.0.1:31009` only. |
| 3 | Rook / Powerline → Grok bot Anytype | Separate **bridge token** | LAN or tunnel. Distinct from hop 1. |

Dual-credential design is permitted: Luna already requires per-user runtime keys and forbids committing them ([ARCHITECTURE.md](../ARCHITECTURE.md) provider list). Same rule here.

---

## 5. First pull and write (Powerline space)

After the bridge process is running (implementation is **not** this PR):

1. List spaces.
2. Resolve the **Powerline** space (and channel, if Anytype exposes one).
3. Return types, tags, and task / note / list objects Joshua granted.
4. Create tag `development`.
5. Create a new view in Powerline.

Non-goals for that first use: not a hub write, not copying unbridged hub records onto Central public pages.

---

## 6. Conflict report (mandatory) — Central integration intended

Verified against tip `master` ([ARCHITECTURE.md](../ARCHITECTURE.md), [codes/APP_REGISTRY.yaml](../../codes/APP_REGISTRY.yaml), [GV-0004](GV-0004-enterprise-monorepo.md)) **and** Powerline 2026-09-30 voice. Sibling **unmerged** Central/Metro role docs: [PR #12](https://github.com/SubTerraCo/grounded-rules/pull/12) GV-0005 (Metro = social / busy feed; Central = personal productivity + Luna 7). This record does not steal that rewrite.

### 6.1 Locked host framing (align with sibling)

| Host | Dewey | Powerline 2026-09-30 (voice + GV-0005 display) |
|------|-------|-----------------------------------------------|
| SubTerra Central | `SC` | **Personal AI hub** and suite of all tools. **Hosts packages and integrations.** |
| SubTerra Metro | `SM` | **Social** media app. Accesses packages and integrations **hosted in Central.** |

**Grok bot Anytype as a Central integration is intended, not a violation.**

### 6.2 Conflict three (Metro↔Central data bridge) — **resolved**

Do **not** treat this as “overridden only.” The allowlist **gains Anytype (`AT`)**.

The optional Metro↔Central data bridge stays **off by default**. When the owner turns it on, it may copy only records they **mark**, from this allowlist:

| Code | Name | On the bridge |
|------|------|----------------|
| `OB` | Open Books | yes, when marked |
| `BI` | Open Bill | yes, when marked |
| `OT` | Open Time | yes, when marked |
| `AT` | Anytype (Grok bot Anytype / PKM) | **yes, when marked** (this record) |

Same pattern as Open Books / Open Bill / Open Time. Mail, banking, and home automation stay off the bridge unless a later lock adds them. Central public pages never receive the **unbridged** hub.

Wording aligned for the sibling hub/social PR’s canonical clause: **OB + BI + OT + AT**.

**Conflict three status: resolved** (allowlist rewrite, not override-only).

### 6.3 Conflict four (packages-under-Central) — **resolved by rule rewrite**

Do **not** bypass. Rewrite the rule.

| | |
|--|--|
| **Old rule** | A packages path under Central invents a cut product shape (forbidden). |
| **New rule** | Central hosts **packages and integrations** as the personal AI hub / tool suite. **Packages-under-Central is sanctioned.** Metro (social) accesses those Central-hosted packages and integrations. |

Sibling agent rewrites the canonical Grounded Rules clause (hub/social PR). This record aligns:

- Packages under `apps/subterra-central` / Central marketplace mounts are **in product shape**, not a leftover cut.
- **Grok bot Anytype** remains classified **integration** only (Dewey `AT`, `integrations/anytype`). PKM is still not a dedicated Anytype **monorepo `packages/*` product** — that “not a PKM package” clause still applies to AT. Conflict four does not turn Grok bot Anytype into `packages/grok-bot-anytype`.
- Other tools in the Central suite **may** be packages hosted on Central. That is now the rule, not an exception.

**Conflict four status: resolved** (rule rewrite, not override-only).

### 6.4 Still stands

| Clause | Still true |
|--------|------------|
| PKM / Grok bot Anytype is not a monorepo PKM package | Dedicated Anytype workspace. Dewey **AT**, path `integrations/anytype`. Classification **integration**. Open Axiom cut. |
| Central hosts packages **and** integrations | Conflict four rewrite. This item is the AT **integration**. |
| Classification = **integration** only | Not plugin. Not extension. |
| Optional PKM | Anytype is not required for the shell hub or for other packages. |
| Dual credentials / no secrets in git | Runtime keys only. |
| Twin fields on new Luna items | Do not add leftover twin SDK fields on a new catalog row. AT already is the leftover integration row. |
| No new app/integration GitHub pair | Rides **AT** (`SubTerraCo/subterra-anytype`). |

### 6.5 Other Central-packaging rows — intended Central **integration**

Earlier draft on this PR treated Central placement as a Grounded Rules conflict. **That reading is withdrawn.** Conflicts three and four are resolved in §6.2–§6.3 (rewrites, not bypass). Remaining host rows are **intended Central integration**.

| # | Earlier reading (withdrawn) | Resolution |
|---|-----------------------------|------------|
| **X1** | Central packaging vs AT-not-a-package = violation | **Intended Central integration.** PKM stays AT integration (not `packages/grok-bot-anytype`). Packages-under-Central in general is **sanctioned** (conflict four). |
| **X2** | Binding a marketplace package to Cara Local API vs empty-hub | **Intended Central integration.** Optional; other packages still work with an empty hub and without Anytype. |
| **X3** *(host matrix; not the data bridge)* | Tip matrix: personal/local clients Metro-only; Central = public events | **Intended Central integration.** Central is the personal AI hub. Metro is social. Sibling role lock owns the matrix rewrite. **Conflict three is §6.2 (allowlist), not this row.** |
| **X4** *(this table’s fourth host leftover, not conflict four)* | GV-0005 F1 (Luna matrix cells not swapped) blocks a Central mount | **Intended Central integration.** Aligns with GV-0005 display (Central = personal productivity + Luna 7) and the voice lock. **Conflict four is §6.3 (packages-under-Central rewrite), not this row.** |
| **X5** | Cara loopback process vs packaging inside the Central PWA = violation | **Intended Central integration.** Cara still runs Anytype desktop + Local API on loopback; host of the integration is Central. |
| **X6** | Unfinished “add as a package to our —” | **Resolved.** Destination = Central **integration**. Label = **integration** only. Packages-under-Central is separately sanctioned for the suite. |

### 6.6 Intended shape

- **Host:** SubTerra Central (`SC`) — personal AI hub; hosts **packages and integrations**.
- **Kind for this item:** **integration** (Dewey `AT`, leftover `integrations/anytype`, `SubTerraCo/subterra-anytype`).
- **PKM:** still not a monorepo `packages/*` Anytype product.
- **Suite:** packages-under-Central **sanctioned** (conflict four rewrite).
- **Metro:** social app; may access Central-hosted packages and integrations.
- **Runtime:** Cara process + `127.0.0.1:31009` as in §3.
- **Data bridge:** allowlist **OB + BI + OT + AT** (marked records only). **Conflict three resolved.**
- **Conflict four resolved** by the packages-under-Central rewrite.

---

## 7. Non-goals

- Not the hub source of truth.
- Not turning Grok bot Anytype into `packages/grok-bot-anytype` (PKM stays AT **integration**). Packages-under-Central for the rest of the suite is sanctioned (conflict four).
- Not making Anytype required for other packages or for an empty hub.
- Not rewriting the full SM/SC install matrix (sibling Central/Metro role lock).
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

## 9. Destination ([PI-020](../POWERLINE_INPUT.md#pi-020-grok-bot-anytype-destination)) — answered

Powerline 2026-09-30 voice: **Central integration.** Intended, not a violation. PI-020 Status `answered`.

---

## 10. What this pass does not do

- Merge this pull request (Powerline granted merge authority once #18 is ready; Rook merges).
- Create `SubTerraCo/luna` or a new GitHub repo.
- Run product builds or implement the Cara process.
- Turn Grok bot Anytype into a PKM `packages/*` row (it stays AT **integration**).
- Own the broader Central/Metro role document (sibling; GV-0005 / follow-on).
- Answer PI-010 (Banking).
