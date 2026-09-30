# Grounded Rules — current state

**Who this is for:** people who work on SubTerra rules, catalog, and CI.  
**Catalog `audience` (locked GV-0002 D4):** machine values are only `admin` and `member`. They are not renamed.

| Catalog `audience` | Mounts in |
|--------------------|-----------|
| `admin` (default when omitted; fail-closed) | SubTerra Metro (`SM`, `apps/subterra-metro`; aliases `LO`, `ST`) |
| `member` | SubTerra Central (`SC`, `apps/subterra-central`) |

There is no third audience. “Powerline” is an owner/approver of archive decisions, not an `audience` value. “Collective” is not an `audience` value.

**Date:** 2026-09-30 (Grounded Rules display name; SubTerra Metro / SM; former Luna OS / LO is an address alias; Open Time / OT; former Open Day / OD is an address alias; Luna LU unchanged)  
**This document** is a readable merge of the locked rulings in this repo. It does not replace them.

| If you need | Read |
|-------------|------|
| Product shape (wins on conflict) | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Conflict resolutions | [DESIGN_RECORDS/GV-0004-enterprise-monorepo.md](DESIGN_RECORDS/GV-0004-enterprise-monorepo.md) |
| Grok bot Anytype (Cara Local API, AT integration) | [DESIGN_RECORDS/GV-0007-grok-bot-anytype.md](DESIGN_RECORDS/GV-0007-grok-bot-anytype.md) (draft; destination [PI-020](POWERLINE_INPUT.md#pi-020-grok-bot-anytype-destination)) |
| Dewey, versioning, NFC, Material 3, license (when the blueprint is silent) | [../CI_OPS_CONSTITUTION.md](../CI_OPS_CONSTITUTION.md) |
| File-by-file cleanup of this pass | [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) |
| Powerline input queue | [POWERLINE_INPUT.md](POWERLINE_INPUT.md) |

Nothing in this 2026-09-30 pass was deleted or archived. Deletes and archive moves wait for Powerline approval.

---

## 1. What this repo is

**Grounded Rules** (`SubTerraCo/subterra-governance`) is the **rules, Dewey, catalog, reusable CI, and templates** repo. GitHub slug stays `subterra-governance` until Powerline Settings-renames it to `grounded-rules`.

It is **not** the product. The product is one pnpm + Turborepo enterprise monorepo, `SubTerraCo/luna`, which **has not been created yet** (GV-0004 §4). Until it exists, this copy of [ARCHITECTURE.md](ARCHITECTURE.md) is the product blueprint.

Existing SubTerraCo product repos (`subterra-shell`, `Blocks`, `mailbot`, `subterra-anytype`, reserved `billbot` / `subtoken`) stay on `master` and keep calling Grounded Rules workflows until they are folded in.

---

## 2. Source of truth (conflict order)

1. **[ARCHITECTURE.md](ARCHITECTURE.md)** — enterprise monorepo blueprint. Wins where it disagrees with older rulings.
2. **[GV-0004](DESIGN_RECORDS/GV-0004-enterprise-monorepo.md)** — locked conflict table and names/codes.
3. **[CI_OPS_CONSTITUTION.md](../CI_OPS_CONSTITUTION.md)** — applies where the blueprint is silent (Dewey format, `master`, audience, NFC crypto, design gates, reusable workflows for leftover repos).
4. Older design records — historical locks. What still stands is called out on each record:
   - GV-0001: GitHub org, Team plan, reusable pipelines, vendor `upstream`, workspace QA location.
   - GV-0002: `audience`, NFC challenge-response, Dewey `SO` / `EV`, Subtoken absorbs 2022 NFC repos. Live TK / CH lists follow the ARCHITECTURE install matrix (`[admin, member]`). **Not** leftover `apps/admin` / `shell-core` folders.
   - GV-0003: Material 3. Palette purple `#400080`, pink `#ED1CAD`, light blue `#1CEDC5`, teal `#008080`; interim M3 type scale; 4dp spacing. **Not** Material Web, `@subterra/shell-ui`, or amber `#e8a54b`.

---

## 3. Product shape (locked)

Two runtimes only:

| Shell | Path | Runtime | Audience |
|-------|------|---------|----------|
| SubTerra Metro | `apps/subterra-metro` (`SM`) | Tauri v2 + React 19 + Vite — Windows, macOS, Android, iOS, Arch Linux / Omarchy | `admin` |
| SubTerra Central | `apps/subterra-central` (`SC`) | Offline-first PWA — gigs, events; Open Gig and Community install here | `member` |

The PWA **is** SubTerra Central. There is no second web runtime folder. The path to build is `apps/subterra-central`.

Do **not** build leftover `apps/admin` folders, `packages/shell-core`, Electron, or Next shells. `subterra-shell` remains until Phase 1 copies what is still useful.

**Stack:** TypeScript strict, React 19, Vite. Rust only inside Tauri bindings (filesystem, local IPC, NFC hardware, DaVinci socket). Hub store: SQLite via SQLCipher + Yjs. Finance: Actual's own SQLite CRDT inside Open Books via `@actual-app/api`. PKM: dedicated Anytype workspace — not a monorepo package; Open Axiom is cut.

**Omarchy** (Arch) is the dedicated local AI host. Ollama on localhost. Ship AppImage and PKGBUILD.

---

## 4. Apps, packages, and codes

One product, one code, one folder. The folder is the name people say.

| Code | Name | Path | Status |
|------|------|------|--------|
| SM | SubTerra Metro | `apps/subterra-metro` | to build (replaces ST; former code LO) |
| LU | Luna | `packages/luna` | agent router (Ollama, Gemma 4 12B default). Not Metro. |
| SC | SubTerra Central | `apps/subterra-central` | to build — member PWA |
| OG | Open Gig | `apps/open-gig` | profile, listing, rate, date request |
| CH | Community | `apps/community` | voting / discussion UI. Audience `[admin, member]`: crew on SubTerra Metro; public on Central |
| OT | Open Time | `packages/open-time` | tasks, timeline, Quick Blocks, Festy crew (replaces BK; former code OD) |
| OS | Open Sort | `packages/open-sort` | Gmail/IMAP labels and archive (replaces MB) |
| OB | Open Books | `packages/open-books` | `@actual-app/api` budgeting (not “Open Budget”) |
| BI | Open Bill | `packages/open-bill` | invoicing / 1099 (replaces BB) |
| TK | Subtoken | `packages/subtoken` | NTAG424 + tickets. Audience `[admin, member]`: organizer tools on SubTerra Metro; event page / tickets / show log / digital goods on Central |
| FM | Forum | `packages/forum` | Flarum (optional) |
| HA | Home Assistant | `packages/home-assistant` | client only |
| MA | Media | `packages/media` | DaVinci, OBS, Loupedeck |
| BS | Banking | `packages/banking` | SimpleFIN + GoCardless. Monorepo package, not a twin integration |
| AT | Anytype | dedicated workspace | **not** a monorepo package. Optional Cara bridge **Grok bot Anytype** is an **integration** under AT ([GV-0007](DESIGN_RECORDS/GV-0007-grok-bot-anytype.md)); Central package intent conflicts — [PI-020](POWERLINE_INPUT.md#pi-020-grok-bot-anytype-destination) |
| GV | Grounded Rules | this repo | rules / CI / templates |
| WL | White-label | — | commercial gate on SubTerra Metro, not a package (PI-001: registry-only; no catalog row) |
| — | Open UI | `packages/open-ui` | Material 3 palette, type, spacing. No app code |

**Address aliases** (keep on existing Dewey addresses; not folders to build): `ST` (leftover Shell), `LO` (former SubTerra Metro live code), `OD` (former Open Time live code / Open Day), `MB` (Mailbot), `BB` (Billbot). `BK` (Blocks) is an alias catalog row; existing `BK/N-####` were rewritten to `OT/N-####` (PI-011 A).

**Cut:** Open Axiom (`AX` catalog row kept until archive approval). Withdrawn product codes are not used. `ST` is an alias only. `FN` and `BO` are not current names.

Festy Blocks (`SubTerraCo/festy-blocks`) does not get its own code. Crew tools live in Open Time inside SubTerra Metro; the finished schedule can appear read-only on Central when granted.

---

## 5. Marketplace

Every installable package stands alone. It may not import another package. The shell is the only dependency: Material 3, the marketplace, and a small SQLite hub. A package opens and works when the hub is empty.

Optional facts another package might have written are read from the hub only after the user grants that read.

The same package can be installed in SubTerra Metro, in SubTerra Central, or in both. Each shell has its own hub. A person who uses both may turn on a **data bridge** (off by default). The bridge copies only Open Books, Open Bill, and Open Time records that the person marks. Mail, banking, and home automation stay on SubTerra Metro.

**Dropped:** separate Apps and Integrations tabs; separate GitHub repos as the product shape.

**Twin marketplace fields — stop on new monorepo packages.** Do not write `role: app|integration`, `marketplace: apps|integrations`, or a twin SDK on reserved monorepo rows. Those items use `marketplace: null`, `sdk: null`, and `audience` as the live mount gate.

**Deprecated leftover until fold-in:** filled twin fields on Blocks, Mailbot, Billbot, Anytype, and leftover `@subterra/app-sdk` / `@subterra/integration-sdk` in `subterra-shell`. Those twins must keep identical symbol names (`SDK_SURFACE`), differing only in `SDK_ROLE`. Validator needles stay on the leftover rows.

**Catalog `audience` (GV-0002 D4, locked):** machine values stay exactly `admin` and `member`. Do not rename them to luna/central or anything else. Fail-closed default when omitted: `["admin"]`.

| Catalog value | Shell that may mount the item |
|---------------|-------------------------------|
| `admin` | SubTerra Metro (`SM`, `apps/subterra-metro`; aliases `LO`, `ST`) |
| `member` | SubTerra Central (`SC`, `apps/subterra-central`) |

An item is never visible on SubTerra Central unless its list includes `member`. Never overload SDK `role` for permissions. Do not invent a third audience (including “Powerline”, “Collective”, or “operator”).

What sells where is in [ARCHITECTURE.md](ARCHITECTURE.md) (Open Books/Bill/Time/Sort, Banking, HA, Media, Luna, Subtoken, Open Gig, Community, Forum). UI is not a marketplace item.

---

## 6. SubTerra Central access and NFC

A tag opens an event page after **NTAG424 challenge-response**. A UID alone does not sign anyone in. UID-only auth is forbidden.

The tag holder is an anonymous member: tickets, show log, digital goods, follow artists, optional alias. Friend-show visibility is off until they turn it on.

A one-time charge upgrades that profile to Artist, Venue, or Vendor.

Open Gig listings are free for a single freelancer. A crew manager with 5 or more members pays the booking fee.

Subtoken (`TK`) absorbs `SubTerraCo/subtoken`, `tag-writer`, and `validation`. Revival is still deferred. Catalog `audience` is `[admin, member]` per the ARCHITECTURE install matrix (organizer tools on SubTerra Metro; event page, tickets, show log, and digital goods on Central).

Community (`CH`) is also `[admin, member]`: crew discussion on SubTerra Metro; public discussion on SubTerra Central.

---

## 7. Material Design 3

SubTerra-owned UI uses Material 3 only. `packages/open-ui` owns **palette, type, and spacing**. Token *code* is product-repo work (not this Grounded Rules repo).

- Tokens applied through the Tailwind preset in `tooling/config-tailwind`, generated with `@material/material-color-utilities`.
- Palette: purple `#400080`, pink `#ED1CAD`, light blue `#1CEDC5`, teal `#008080`. Amber `#e8a54b` is withdrawn.
- Type: interim Material 3 type scale (display, headline, title, body, label). Font families are **not locked** — do not invent a typeface.
- Spacing: 4dp baseline grid.
- No arbitrary Tailwind values. No hardcoded hex/RGB in `.tsx`.
- Do not add MUI, shadcn, Material Web as owner, or a second kit.
- `@subterra/shell-ui` is leftover until the monorepo lands.
- Exempt: Actual's own UI while it tracks upstream; tools with no UI (`tag-writer`). Open Books is our wrapper and uses Material 3.

---

## 8. License

| Layer | License |
|-------|---------|
| New original monorepo code | BSL 1.1. Royalty-free grant: solos, artists, contributors, nonprofits, and orgs under 5 seats and under $100,000 annual gross. Ed25519 commercial key from PoweredUpLabs past that. Each commit becomes Apache 2.0 after 36 months |
| MIT upstream (Actual API, Flarum, …) | stays MIT |
| Already published SubTerraCo `LICENSE` files (including **this** Grounded Rules repo) | stay MIT |
| InvoiceShelf | AGPL — not vendored |
| any-sync | Any Source Available License |

AGPL servers are not copied into the monorepo.

This Grounded Rules repo remains MIT. Relicensing it is not part of GV-0004.

---

## 9. Branches, versions, CI

**Default branch is `master` on every SubTerraCo repo**, including `luna`. Integration branch is `dev`. Do not use `main` or `staging`.

Release stamp: `vYY.MM.DD` / `vYY.MM.DDbX`. npm form `YY.M.D-bX`. Each repo stamps independently. Fleet dashboard: [VERSIONS.md](VERSIONS.md) (generated; not regenerated in this cleanup).

**This Grounded Rules repo** keeps its own workflow (pnpm 11.14, Node 22, reusable `ci-node.yml@v1`). **Monorepo CI** (when `luna` exists) is the blueprint pipeline: pnpm 9, Node 22, Turbo, fail on lint / typecheck / token check / unit tests / build. Playwright: visual regression, offline Yjs, finance path, tenant isolation, mocked NFC, local Solana validator.

Leftover reusable workflows here:

| Workflow | Status |
|----------|--------|
| `ci-node.yml` | Live |
| `deploy-web.yml` | Live (Vercel, `master`) |
| `release-desktop.yml` | R0 stub — Electron / leftover Blocks, **not** SubTerra Metro Tauri |
| `publish-npm.yml` | R0 stub |
| `build-android.yml` | R0 stub — Expo / leftover Blocks mobile, **not** SubTerra Metro Android |
| `nightly-dev-push.yml` | R0 stub |

`SubTerraCo` is on GitHub Team (required for private reusable workflows). Org secrets, `master protection` rulesets, Actions access `organization` on this repo.

Vendor remotes: `origin` is always ours; vendor is `upstream`.

---

## 10. Existing GitHub vs later `luna`

Linked today: `subterra-governance` (Grounded Rules; slug rename to `grounded-rules` is a Powerline Settings click), `subterra-shell`, `Blocks`, `mailbot`, `subterra-anytype`.

Reserved / leftover: `billbot`, `subtoken`, `tag-writer`, `validation`.

Not created: `SubTerraCo/luna`.

Workspace QA lives in `tests/` here (`contract` + `marketplace`) until `luna` `tests/contract` replaces it. Coverage is still deferred (no shell host).

Product-repo template under `templates/product-repo/` is only for leftover standalone repos.

---

## 11. Phases (from the blueprint)

1. Workspace skeleton: layout, strict TypeScript, ESLint 9 flat, pnpm workspace, Turborepo.
2. Shell hub on SQLite + Yjs. Open Books around `@actual-app/api`. Open Bill separate. Anytype optional mirror, not the store.
3. `luna` provider interface + tool registry. Default local provider at the Omarchy host.
4. `packages/open-ui` tokens (palette, type, 4dp spacing) and domain widgets.
5. Bundle SubTerra Metro in Tauri (including Arch / Omarchy) and SubTerra Central as the PWA. Confirm hub isolation and the marked-record bridge.
6. Playwright suites listed under CI.

---

## 12. Dewey (unchanged format)

```
APP.PP.PR.AA.SSS.FFF[-III]
N-####    B-####    vYY.MM.DD[bX]
```

Tables: `codes/APP_REGISTRY.yaml`, `codes/PLATFORM_CODES.yaml`, `codes/AREA_CODES.yaml`. Catalog: `subterra.manifest.yaml`.

New work uses current codes (SM, OT, OS, BI, …). Existing `BK/N-####` were rewritten to `OT/N-####` (PI-011 A). Alias codes (ST, LO, OD, MB, BB) remain valid on existing addresses. `BK` stays an alias catalog row for leftover Blocks.

`/NF` `/NB` `/RD` still require Round 1 + Round 2 with conflict audits. Use AskQuestion when available.

---

## 13. How to work in this repo

1. Change rules here first; leftover product repos consume via workflow ref / template / `@subterra/ci-ops`.
2. Register new items in APP_REGISTRY **and** the manifest before GitHub scaffolding.
3. Do not invent product features in Grounded Rules.
4. Do not create leftover `apps/admin` folders or a second PWA besides SubTerra Central.
5. Material 3 / four-color palette / `packages/open-ui` only. No amber `#e8a54b`.

Implementation of SubTerra Metro, Open Time, Open Sort, Open Bill, Central, and Anytype handlers belongs to those product agents — not GV — unless explicitly asked.
