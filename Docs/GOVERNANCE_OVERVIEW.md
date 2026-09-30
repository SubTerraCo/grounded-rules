# SubTerra Governance — current state

**Audience:** Powerline / SubTerra Collective  
**Date:** 2026-09-30  
**This document** is a readable merge of the locked rulings in this repo. It does not replace them.

| If you need | Read |
|-------------|------|
| Product shape (wins on conflict) | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Conflict resolutions | [DESIGN_RECORDS/GV-0004-enterprise-monorepo.md](DESIGN_RECORDS/GV-0004-enterprise-monorepo.md) |
| Dewey, versioning, NFC, Material 3, license (when the blueprint is silent) | [../CI_OPS_CONSTITUTION.md](../CI_OPS_CONSTITUTION.md) |
| File-by-file cleanup of this pass | [CHANGELOG-cleanup-2026-09-30.md](CHANGELOG-cleanup-2026-09-30.md) |

Nothing in this 2026-09-30 pass was deleted or archived. Deletes and archive moves wait for Powerline approval.

---

## 1. What this repo is

`SubTerraCo/subterra-governance` is the **rules, Dewey, catalog, reusable CI, and templates** repo.

It is **not** the product. The product is one pnpm + Turborepo enterprise monorepo, `SubTerraCo/luna`, which **has not been created yet** (GV-0004 §4). Until it exists, this copy of [ARCHITECTURE.md](ARCHITECTURE.md) is the product blueprint.

Existing SubTerraCo product repos (`subterra-shell`, `Blocks`, `mailbot`, `subterra-anytype`, reserved `billbot` / `subtoken`) stay on `master` and keep calling governance workflows until they are folded in.

---

## 2. Source of truth (conflict order)

1. **[ARCHITECTURE.md](ARCHITECTURE.md)** — enterprise monorepo blueprint. Wins where it disagrees with older rulings.
2. **[GV-0004](DESIGN_RECORDS/GV-0004-enterprise-monorepo.md)** — locked conflict table and names/codes.
3. **[CI_OPS_CONSTITUTION.md](../CI_OPS_CONSTITUTION.md)** — applies where the blueprint is silent (Dewey format, `master`, audience, NFC crypto, design gates, reusable workflows for leftover repos).
4. Older design records — historical locks. What still stands is called out on each record:
   - GV-0001: GitHub org, Team plan, reusable pipelines, vendor `upstream`, workspace QA location.
   - GV-0002: `audience`, NFC challenge-response, Dewey `SO` / `EV`, Subtoken absorbs 2022 NFC repos. **Not** `apps/admin` / `apps/nexus`.
   - GV-0003: Material 3 and seed `#e8a54b`. **Not** Material Web or `@subterra/shell-ui` as the owner.

---

## 3. Product shape (locked)

Two runtimes only:

| Shell | Path | Runtime | Audience |
|-------|------|---------|----------|
| Luna OS | `apps/luna-os` (`LO`) | Tauri v2 + React 19 + Vite — Windows, macOS, Android, iOS, Arch Linux / Omarchy | `admin` |
| Web | `apps/web-shell` | Offline-first PWA | hosts SubTerra Central, Open Gig, Community |

SubTerra Central (`SC`, `apps/subterra-central`) is the gig/event hub on the web runtime. See Questions: how `web-shell` and `subterra-central` relate as folders.

Do **not** build `apps/admin`, `apps/nexus`, `packages/shell-core`, Electron, or Next shells. `subterra-shell` remains until Phase 1 copies what is still useful.

**Stack:** TypeScript strict, React 19, Vite. Rust only inside Tauri bindings (filesystem, local IPC, NFC hardware, DaVinci socket). Hub store: SQLite via SQLCipher + Yjs. Finance: Actual's own SQLite CRDT inside Open Books via `@actual-app/api`. PKM: dedicated Anytype workspace — not a monorepo package; Open Axiom is cut.

**Omarchy** (Arch) is the dedicated local AI host. Ollama on localhost. Ship AppImage and PKGBUILD.

---

## 4. Apps, packages, and codes

One product, one code, one folder. The folder is the name people say.

| Code | Name | Path | Status |
|------|------|------|--------|
| LO | Luna OS | `apps/luna-os` | to build (replaces ST) |
| LU | Luna | `packages/luna` | agent router (Ollama, Gemma 4 12B default) |
| SC | SubTerra Central | `apps/subterra-central` | to build (replaces NX) |
| OG | Open Gig | `apps/open-gig` | profile, listing, rate, date request |
| CH | Community | `apps/community` | voting / discussion UI |
| OD | Open Day | `packages/open-day` | tasks, timeline, Quick Blocks, Festy crew (replaces BK) |
| OS | Open Sort | `packages/open-sort` | Gmail/IMAP labels and archive (replaces MB) |
| OB | Open Books | `packages/open-books` | `@actual-app/api` budgeting (not “Open Budget”) |
| BI | Open Bill | `packages/open-bill` | invoicing / 1099 (replaces BB) |
| TK | Subtoken | `packages/subtoken` | NTAG424 + tickets |
| FM | Forum | `packages/forum` | Flarum (optional) |
| HA | Home Assistant | `packages/home-assistant` | client only |
| MA | Media | `packages/media` | DaVinci, OBS, Loupedeck |
| BS | Banking | `packages/banking` | SimpleFIN + GoCardless |
| AT | Anytype | dedicated workspace | **not** a monorepo package |
| GV | Governance | this repo | rules / CI / templates |
| WL | White-label | — | commercial gate on Luna OS, not a package |
| — | Open UI | `packages/open-ui` | Material 3 tokens. No app code |

**Address aliases** (keep on existing Dewey addresses; not folders to build): `ST` (Shell), `NX` (Nexus), `BK` (Blocks), `MB` (Mailbot), `BB` (Billbot).

**Cut:** Open Axiom (`AX` catalog row kept until archive approval). Codes that are not codes: `ST`/`NX`/`LF`/`TE`/`MT`/`PK`/`SN`/`CE` as products to build; `FN` and `BO` as current names.

Festy Blocks (`SubTerraCo/festy-blocks`) does not get its own code. Crew tools live in Open Day inside Luna OS; the finished schedule can appear read-only on Central when granted.

---

## 5. Marketplace

Every installable package stands alone. It may not import another package. The shell is the only dependency: Material 3, the marketplace, and a small SQLite hub. A package opens and works when the hub is empty.

Optional facts another package might have written are read from the hub only after the user grants that read.

The same package can be installed in Luna OS, in SubTerra Central, or in both. Each shell has its own hub. A person who uses both may turn on a **data bridge** (off by default). The bridge copies only Open Books, Open Bill, and Open Day records that the person marks. Mail, banking, and home automation stay on Luna OS.

**Dropped:** separate Apps and Integrations tabs; polyrepo as the product shape.

**Leftover until fold-in:** `@subterra/app-sdk` and `@subterra/integration-sdk` in `subterra-shell` must keep identical symbol names (`SDK_SURFACE`), differing only in `SDK_ROLE`. Manifest `role` / `marketplace` fields remain on existing catalog items.

**Audience** (still `admin` / `member`; fail-closed default `["admin"]`):

| Audience | Typical shell |
|----------|----------------|
| `admin` | Luna OS |
| `member` | SubTerra Central |

Never overload SDK `role` for permissions.

What sells where is in [ARCHITECTURE.md](ARCHITECTURE.md) (Open Books/Bill/Day/Sort, Banking, HA, Media, Luna, Subtoken, Open Gig, Community, Forum). UI is not a marketplace item.

---

## 6. SubTerra Central access and NFC

A tag opens an event page after **NTAG424 challenge-response**. A UID alone does not sign anyone in. UID-only auth is forbidden.

The tag holder is an anonymous member: tickets, show log, digital goods, follow artists, optional alias. Friend-show visibility is off until they turn it on.

A one-time charge upgrades that profile to Artist, Venue, or Vendor.

Open Gig listings are free for a single freelancer. A crew manager with 5 or more members pays the booking fee.

Subtoken (`TK`) absorbs `SubTerraCo/subtoken`, `tag-writer`, and `validation`. Revival is still deferred.

---

## 7. Material Design 3

SubTerra-owned UI uses Material 3 only.

- Tokens: `packages/open-ui`, generated with `@material/material-color-utilities`, applied through the Tailwind preset in `tooling/config-tailwind`.
- Seed: amber `#e8a54b`.
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
| Already published SubTerraCo `LICENSE` files (including **this** governance repo) | stay MIT |
| InvoiceShelf | AGPL — not vendored |
| any-sync | Any Source Available License |

AGPL servers are not copied into the monorepo.

This governance repo remains MIT. Relicensing it is not part of GV-0004.

---

## 9. Branches, versions, CI

**Default branch is `master` on every SubTerraCo repo**, including `luna`. Integration branch is `dev`. Do not use `main` or `staging`.

Release stamp: `vYY.MM.DD` / `vYY.MM.DDbX`. npm form `YY.M.D-bX`. Each repo stamps independently. Fleet dashboard: [VERSIONS.md](VERSIONS.md) (generated; not regenerated in this cleanup).

**This governance repo** keeps its own workflow (pnpm 11.14, Node 22, reusable `ci-node.yml@v1`). **Monorepo CI** (when `luna` exists) is the blueprint pipeline: pnpm 9, Node 22, Turbo, fail on lint / typecheck / token check / unit tests / build. Playwright: visual regression, offline Yjs, finance path, tenant isolation, mocked NFC, local Solana validator.

Leftover reusable workflows here:

| Workflow | Status |
|----------|--------|
| `ci-node.yml` | Live |
| `deploy-web.yml` | Live (Vercel, `master`) |
| `release-desktop.yml` | R0 stub — Electron / leftover Blocks, **not** Luna OS Tauri |
| `publish-npm.yml` | R0 stub |
| `build-android.yml` | R0 stub — Expo / leftover Blocks mobile, **not** Luna OS Android |
| `nightly-dev-push.yml` | R0 stub |

`SubTerraCo` is on GitHub Team (required for private reusable workflows). Org secrets, `master protection` rulesets, Actions access `organization` on this repo.

Vendor remotes: `origin` is always ours; vendor is `upstream`.

---

## 10. Existing GitHub vs later `luna`

Linked today: `subterra-governance`, `subterra-shell`, `Blocks`, `mailbot`, `subterra-anytype`.

Reserved / leftover: `billbot`, `subtoken`, `tag-writer`, `validation`.

Not created: `SubTerraCo/luna`.

Workspace QA lives in `tests/` here (`contract` + `marketplace`) until `luna` `tests/contract` replaces it. Coverage is still deferred (no shell host).

Product-repo template under `templates/product-repo/` is only for leftover standalone repos.

---

## 11. Phases (from the blueprint)

1. Workspace skeleton: layout, strict TypeScript, ESLint 9 flat, pnpm workspace, Turborepo.
2. Shell hub on SQLite + Yjs. Open Books around `@actual-app/api`. Open Bill separate. Anytype optional mirror, not the store.
3. `luna` provider interface + tool registry. Default local provider at the Omarchy host.
4. `packages/open-ui` tokens and domain widgets.
5. Bundle Luna OS in Tauri (including Arch / Omarchy) and SubTerra Central as the PWA. Confirm hub isolation and the marked-record bridge.
6. Playwright suites listed under CI.

---

## 12. Dewey (unchanged format)

```
APP.PP.PR.AA.SSS.FFF[-III]
N-####    B-####    vYY.MM.DD[bX]
```

Tables: `codes/APP_REGISTRY.yaml`, `codes/PLATFORM_CODES.yaml`, `codes/AREA_CODES.yaml`. Catalog: `subterra.manifest.yaml`.

New work uses current codes (LO, OD, OS, BI, …). Alias codes remain valid on existing addresses.

`/NF` `/NB` `/RD` still require Round 1 + Round 2 with conflict audits. Use AskQuestion when available.

---

## 13. How to work in this repo

1. Change rules here first; leftover product repos consume via workflow ref / template / `@subterra/ci-ops`.
2. Register new items in APP_REGISTRY **and** the manifest before GitHub scaffolding.
3. Do not invent product features in governance.
4. Do not create `apps/admin` or `apps/nexus`.
5. Material 3 / `#e8a54b` / `packages/open-ui` only.

Implementation of Luna OS, Open Day, Open Sort, Open Bill, Central, and Anytype handlers belongs to those product agents — not GV — unless explicitly asked.
