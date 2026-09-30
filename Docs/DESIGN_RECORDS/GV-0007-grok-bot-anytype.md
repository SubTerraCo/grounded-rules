# GV-0007 — Grok bot Anytype (Cara Local API bridge)

| | |
|--|--|
| **Address** | `GV.CX.DV.01.070.010` |
| **Release** | `v26.09.30` |
| **Status** | Ready for merge — Central-owned Local API client; Cara runs Anytype desktop only. Classification locked **integration**; destination locked **Central integration**. Prior Central-placement conflicts **superseded**. PI-020 answered |
| **Owner** | Grounded Rules agent (GV) |
| **Blueprint** | [Docs/ARCHITECTURE.md](../ARCHITECTURE.md) |
| **Display name** | **Grok bot Anytype** |
| **Machine key** | `grok-bot-anytype` (kebab id/path only; this PR does not create that folder) |
| **Classification** | **integration** (Powerline lock 2026-09-30). Sole label. |

Numbering: GV-0005 is claimed by open draft [PR #12](https://github.com/SubTerraCo/grounded-rules/pull/12) (hybrid + Metro/Central display); GV-0006 by open draft [PR #15](https://github.com/SubTerraCo/grounded-rules/pull/15). This record is **GV-0007**. Sibling agent owns the broader Central/Metro **role** docs; this record only locks Grok bot Anytype and the conflict override.

Docs-only. No runtime, no Local API client, no secrets. §6: intended Central integration; old conflict table removed.

---

## 1. Problem

Joshua uses Anytype desktop on **Cara**. The Local API listens on `127.0.0.1:31009`. Rook / Powerline need tasks, notes, and lists from spaces and channels Joshua grants — starting with the **Powerline** space — without putting the Anytype API key on the LAN, in chat, or in git.

PKM stays in a dedicated Anytype workspace. It is **not** a monorepo product package. The unfinished sentence was: align with Grounded Rules and “add as a package to our —”. Powerline then named Central, and on 2026-09-30 voice locked the host split:

- **SubTerra Central (`SC`)** — personal AI hub and suite of all tools. **Hosts integrations.**
- **SubTerra Metro (`SM`)** — social app, with access to Central-hosted extensions/packages.

**Grok bot Anytype as a Central integration is the intended shape, not a Grounded Rules violation.**

This record documents the Cara bridge, locks classification and destination, and records that override. It does not implement the bridge. It does not rewrite the full install matrix (sibling Central/Metro role lock).

---

## 2. Decision (this draft)

| Ref | Decision |
|-----|----------|
| **D1** | Display name is exactly **Grok bot Anytype**. Machine key `grok-bot-anytype` only where a path or id is required. |
| **D2** | Classification is **integration** only (Powerline 2026-09-30). Dewey home remains **AT** (Anytype), `role: integration`, leftover path `integrations/anytype`, repo `SubTerraCo/subterra-anytype`. **Grok bot Anytype** is a Central-hosted **integration**. PKM/Anytype is not a monorepo package. |
| **D3** | **Central owns** the Local API client, credentials, first-pull, and tag/view. **Cara only** runs Anytype desktop on `127.0.0.1:31009`. Dual credentials: `ANYTYPE_API_KEY` in Central/runtime env for the integration; a separate hop token may authenticate LAN/tunnel to Cara’s loopback path so the Anytype key is not the wire’s client secret. Reusable Central integration adapter (Hermes later). |
| **D4** | First pull/write is **Central-owned** (this integration): list spaces → resolve **Powerline** space/channel → return types, tags, and task/note/list objects → create tag `development` and a new view in Powerline. |
| **D5** | Anytype is **not** the hub source of truth. Optional mirror / PKM workspace only. API keys are per-user runtime — never committed. Other packages still must not require Anytype. |
| **D6** | Destination **locked:** Central **integration**. Prior “Central placement conflicts with GR” reading is **superseded**. Metro↔Central bridge allowlist includes **AT** with OB / BI / OT. |

Historical audit (not options): “plugin” and “extension” were considered and **rejected**. Grok bot Anytype is not classified as either. Metro may *access* integrations/packages hosted in Central; that access language does not rename this item.

---

## 3. Topology (Central-owned client)

Cara does **not** host the Grok bot Anytype process.

```
SubTerra Central
  Grok bot Anytype  (AT integration — Local API client, credentials, first-pull, tag/view)
  reusable adapter (Hermes later)
        |
        | LAN or tunnel
        | hop token if used (not ANYTYPE_API_KEY as the LAN client secret)
        v
Cara host
  Anytype desktop only
  Local API 127.0.0.1:31009
        ^
        | loopback
        | Authorization: Bearer  (key from Central runtime env)
        | Anytype-Version: 2025-11-08
```

- **Central** owns Grok bot Anytype: Local API client, `ANYTYPE_API_KEY` in Central/runtime env, first-pull, tag `development` + new view.
- **Cara only** runs Anytype desktop listening on **`127.0.0.1:31009`**.
- Reach Cara’s loopback-exposed path over LAN or tunnel. If a hop token is used, it is **distinct** from the Anytype key (dual-credential spirit). The Anytype key is never in chat or git.
- Calls that hit Local API use `Authorization: Bearer` plus `Anytype-Version` (example date `2025-11-08`; follow the vendor header Anytype ships).
- Scope: tasks, notes, and lists across spaces/channels Joshua grants.
- Metro may access this Central-hosted integration.

No values for either credential appear in this repository.

---

## 4. Auth hops

| Hop | Who | Credential | Where it lives |
|-----|-----|------------|----------------|
| 1 | Operator → Central runtime env | `ANYTYPE_API_KEY` | Central/runtime env of the **Grok bot Anytype** integration. Not git, not chat. Not the LAN hop’s client secret. |
| 2 | Central (Grok bot Anytype) → Cara Anytype Local API | `Authorization: Bearer` + `Anytype-Version` | Client is **Central**. Target is Cara `127.0.0.1:31009` via LAN/tunnel. |
| 3 | Central → Cara host path (if used) | Separate **hop token** | LAN or tunnel auth so the Anytype key is not the wire’s client secret. Distinct from hop 1. |

Dual-credential spirit: Anytype key owned by Central; hop token only if needed to reach Cara loopback. Luna already requires per-user runtime keys and forbids committing them ([ARCHITECTURE.md](../ARCHITECTURE.md) provider list). Same rule here.

---

## 5. First pull and write (Powerline space)

**Central owns** first-pull and writes (implementation is **not** this PR):

1. List spaces.
2. Resolve the **Powerline** space (and channel, if Anytype exposes one).
3. Return types, tags, and task / note / list objects Joshua granted.
4. Create tag `development`.
5. Create a new view in Powerline.

Non-goals for that first use: not a hub write, not copying unbridged hub records onto Central public pages.

---

## 6. Conflict report — superseded; intended Central integration

Powerline 2026-09-30 **supersedes** the earlier draft reading that placing Grok bot Anytype on Central violated Grounded Rules. There is no live X1–X5 conflict table. Sibling agent `bc-f5beba97` owns the broader Central/Metro role document; this section **aligns** with that framing and does not wait on it.

### 6.1 Host lock (Powerline)

| Host | Dewey | Role |
|------|-------|------|
| SubTerra Central | `SC` | **Personal AI hub** and suite of all tools. **Hosts integrations** (and packages). |
| SubTerra Metro | `SM` | **Social** app. Access to Central-hosted extensions/packages. |

**Grok bot Anytype as a Central integration is intended — not a violation.** Classification = **integration** only.

### 6.2 What still stands

- **PKM / Anytype is not a monorepo package.** Dedicated Anytype workspace. Dewey `AT`, leftover path `integrations/anytype`, repo `SubTerraCo/subterra-anytype`. Open Axiom is cut. Grok bot Anytype is that **integration**, not a PKM product under `packages/`.
- Optional PKM: other packages and an empty hub still run without Anytype.
- Dual credentials: `ANYTYPE_API_KEY` in **Central/runtime env**; optional hop token for LAN/tunnel to Cara; never in git.
- Twin leftover fields stay on the existing AT catalog row; do not add a second twin-SDK product.

### 6.3 Metro↔Central data bridge — AT on the allowlist

The optional data bridge stays **off by default**. When the owner turns it on, it may copy only **marked** records from:

**Open Books (`OB`) + Open Bill (`BI`) + Open Time (`OT`) + Anytype (`AT`)**

Same pattern as OB / BI / OT. Mail, banking, and home automation stay off the bridge unless a later lock adds them.

### 6.4 Packages and integrations on Central

Central hosts **packages and integrations** as the personal AI hub / tool suite. Metro reaches them as Central-hosted extensions/packages. That host shape is **intended**.

Grok bot Anytype remains **integration** (not a PKM `packages/*` row). Other Central tools may be packages. Canonical host-role prose lives with sibling `bc-f5beba97`.

### 6.5 Intended shape (this item)

- **Name:** Grok bot Anytype (machine key `grok-bot-anytype` if a path/id is required).
- **Host:** Central (`SC`).
- **Kind:** **integration** only (Dewey `AT`).
- **Runtime:** Central owns the client. Cara runs Anytype desktop on `127.0.0.1:31009` only (§3).
- **Bridge:** allowlist OB + BI + OT + AT (marked records).

Prior “Central placement is a GR conflict” notes on this PR are **superseded**.

---

## 7. Non-goals

- Not the hub source of truth.
- Not a monorepo PKM package (Anytype stays a dedicated workspace / AT integration).
- Not making Anytype required for other packages or for an empty hub.
- Not the broader Central/Metro role document (sibling `bc-f5beba97`).
- Not implementing Grok bot Anytype runtime in this Grounded Rules PR.
- Not committing or printing API keys / tokens.

---

## 8. Security

- `ANYTYPE_API_KEY` — **Central/runtime env** of the Grok bot Anytype integration. Never chat, never git.
- Hop token (if used) — distinct; LAN/tunnel to Cara’s loopback path; **not** the Anytype key as the LAN client secret.
- Neither credential in this record’s examples (names of env vars only).
- Anytype Local API listens on Cara loopback `127.0.0.1:31009`. Do not treat Cara as the Grok bot Anytype host.
- Per-user / runtime keys; no org-wide committed secret.

---

## 9. Destination ([PI-020](../POWERLINE_INPUT.md#pi-020-grok-bot-anytype-destination)) — answered

Powerline 2026-09-30 voice: **Central integration.** Intended, not a violation. PI-020 Status `answered`.

---

## 10. What this pass does not do

- Merge this pull request (Powerline granted; Rook merges).
- Create `SubTerraCo/luna` or a new GitHub repo.
- Run product builds or implement the Central Local API client.
- Own the broader Central/Metro role document (sibling `bc-f5beba97`).
- Answer PI-010 (Banking).
