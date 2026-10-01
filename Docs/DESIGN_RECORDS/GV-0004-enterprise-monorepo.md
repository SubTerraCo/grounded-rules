# GV-0004 — Enterprise monorepo ingestion

| | |
|--|--|
| **Address** | `GV.CX.DV.01.040.010` |
| **Release** | `v26.09.29` |
| **Status** | Design locked — conflicts resolved; monorepo not created yet |
| **Owner** | Grounded Rules agent (GV) |
| **Blueprint** | [Docs/ARCHITECTURE.md](../ARCHITECTURE.md) |

The enterprise blueprint wins wherever it disagrees with GV-0001, GV-0002, or GV-0003. Grounded Rules still owns Dewey addresses, the manifest, audience rules, NFC challenge-response, and vendor upstreams.

---

## 1. Conflict resolutions

| # | Old ruling | Blueprint | Resolution |
|---|------------|-----------|------------|
| C1 | One GitHub repo per app (§1) | One pnpm + Turborepo monorepo | The product is the monorepo. Grounded Rules (`subterra-governance`) stays this rules repo. `tooling/design-governance` enforces tokens; it does not fork the constitution |
| C2 | Shells are leftover `apps/admin` plus a member PWA over `shell-core` (GV-0002) | Exactly two runtimes: Tauri v2 and a PWA | Build `apps/metro` (Tauri, including Arch Linux / Omarchy) and `apps/central` (PWA). Do not create leftover `apps/admin` folders or a second PWA runtime besides Central |
| C3 | Electron + Next shell | Vite, React 19, Tauri v2 | Tauri + Vite. `subterra-shell` stays until Phase 1 copies what is still useful |
| C4 | Every repo defaults to `master` (§4.1) | The first blueprint draft used `main` and `staging` | Withdrawn. The monorepo uses `master` and `dev`, same as every other SubTerraCo repo |
| C5 | pnpm 11.14, reusable `ci-node.yml@v1` | pnpm 9, Node 22, Turbo pipeline in-repo | Monorepo CI is the blueprint pipeline (pnpm 9, Node 22). This Grounded Rules repo keeps its own workflow |
| C6 | Material Web and `@subterra/shell-ui` (GV-0003 D2–D3); later a single amber seed `#e8a54b` (GV-0003 D4) | Tailwind + `@material/material-color-utilities`, `packages/open-ui` | Material 3 stays. Tokens live in `packages/open-ui`, which owns palette, type, and spacing. Arbitrary Tailwind values and hardcoded colors in `.tsx` fail CI. Locked palette: purple `#400080`, pink `#ED1CAD`, light blue `#1CEDC5`, teal `#008080`. Type: interim Material 3 type scale; font families pending Powerline. Spacing: 4dp grid. Amber `#e8a54b` is withdrawn. (`packages/ui` was a draft folder name; the locked path is `open-ui`.) Token *code* is product-repo work, not this Grounded Rules repo. |
| C7 | New Rust is forbidden (§14) | Rust for Tauri bindings only | Rust is allowed only in those bindings. App logic stays TypeScript |
| C8 | Public repos are MIT | BSL 1.1, Apache 2.0 after 36 months, commercial key for 5+ seats | BSL applies to new original monorepo code. See §3. MIT files already published stay MIT |
| C9 | Actual UI is a vendor-fork exemption | Import `@actual-app/api` into the budgeting package | Package is `packages/open-books`, code `OB`. Open Bill stays `packages/open-bill`, code `BI`. Use the headless API. Actual's SQLite CRDT stays inside Open Books. SQLCipher is the hub store |
| C10 | Three NFC repos revive as TK | A Solana-named package and code `SN` | Withdrawn. The package is `packages/subtoken` and the code stays `TK`. NTAG424 and Solana live inside Subtoken. UID-only login stays forbidden |
| C11 | Yjs, Automerge, and any-sync listed together | One shared document model | Finance uses Actual's CRDT. PKM talks to Anytype through any-sync. The hub uses Yjs. Automerge is not a second hub |
| C12 | Flarum or Discourse | Community engine | Flarum (MIT). Discourse (GPL) fights the commercial gate |
| C13 | Teller, Plaid, SimpleFIN, GoCardless | Bank feeds without vendor lock-in | SimpleFIN and GoCardless are the default connectors. Teller and Plaid are optional adapters |
| C14 | "Open Day / Open Sort / Open Shift" rename draft | Named apps in the blueprint | That draft was never locked. Blueprint names win. See §2 |
| C15 | Packaging Anytype / Grok bot Anytype for Central violated Grounded Rules (Anytype was an optional Metro mirror only; PKM not a package) | Central is the personal AI hub; Anytype as a Central integration is the intended shape | **Rewritten 2026-09-30.** Intended shape = Central integration (`role: integration` only — not plugin/extension). Leftover PKM workspace is not required as a monorepo package. Central **hosts the integration**. Metro↔Central bridge allowlist is Open Books, Open Bill, Open Time, **and Anytype** (owner-marked) |
| C16 | Conflict 4: forcing a packages path under Central invents a product shape Grounded Rules already cut | Central hosts packages and integrations as the personal AI hub and tool suite | **Rewritten 2026-09-30 (this is the live rule, not an override note).** A packages-under-Central path (`apps/central/packages/` or equivalent, plus Central-hosted integrations) is a **legitimate, sanctioned** shape. Root `packages/` in `luna` remains valid. Leftover Anytype PKM workspace is still not required as a monorepo package |

External licenses are not overruled: InvoiceShelf stays AGPL and out of the paid host; any-sync stays under the Any Source Available License.

---

## 2. Names and codes

One product, one code, one folder. The folder is the name people say. Technical aliases (`ledger-finance`, `mail-triage`, `time-engine`, `solana-nfc`, `core-pkm`) are withdrawn.

Open-source names use the word Open. The folder matches that name. Older codes remain address aliases.

Open stays on names that would collide with a published app. The others use the plain product name.

| Code | Name | Path | What it is |
|------|------|------|------------|
| MT | Metro | `apps/metro` | Public PWA. Social media and ticketing. Former live code `SM` is an address alias |
| CT | Central | `apps/central` | Local Tauri app and package host, including Arch / Omarchy. Former live codes `SC` and `LO` are address aliases. Replaces ST |
| PR | Pepper | `packages/pepper` | Agent router. Hermes is the runtime. Former live code `LU` is an address alias. Gemma 4 12B through Ollama. Installs on Central |
| OT | Open Time | `packages/open-time` | Tasks, timeline, Quick Blocks, Festy crew tools. Replaces BK. Former code `OD` is an address alias |
| OS | Open Sort | `packages/open-sort` | Mail labels and archive. Replaces MB |
| OB | Open Books | `packages/open-books` | Budgeting via `@actual-app/api`. Not named Open Budget |
| BI | Open Bill | `packages/open-bill` | Invoicing. Replaces BB |
| TK | Subtoken | `packages/subtoken` | NFC and tickets |
| OG | Open Gig | `apps/open-gig` | Profile, listing, rate, date request |
| CH | Community | `apps/community` | Discussion UI |
| FM | Forum | `packages/forum` | Flarum |
| HA | Home Assistant | `packages/home-assistant` | Home automation client |
| MA | Media | `packages/media` | DaVinci, OBS, Loupedeck |
| BS | Banking | `packages/banking` | SimpleFIN and GoCardless |
| AT | Anytype | Central-hosted integration (leftover dedicated workspace until folded) | Central hosts the integration (`role: integration` only — not plugin/extension). Leftover PKM workspace is not required as a monorepo package. Packages-under-Central is sanctioned (C16). Open Axiom is cut. Owner-marked Metro↔Central bridge includes AT |
| GV | Grounded Rules | `SubTerraCo/subterra-governance` | This rules repo. Display name Grounded Rules; GitHub slug rename to `grounded-rules` is a Powerline Settings click |
| WL | White-label | — | Commercial gate on Central, the local app. Not a package |
| — | Open UI | `packages/open-ui` | Material 3 palette, type, spacing. No app code |

`ST`, `LO`, `SM`, `SC`, and `LU` are address aliases (`LO` and `SC` alias `CT`; `SM` aliases `MT`; `LU` aliases `PR`). `OD` is an address alias (`OD` = former live code for OT / Open Day). Existing `BK/N-####` were rewritten to `OT/N-####` (PI-011 A); `BK` stays an alias catalog row. `MT` is reclaimed as the live Metro code. `LF`, `TE`, `PK`, `SN`, and `CE` are not codes. `actual-budget-master-fork` stays the Actual upstream fork. Super Productivity, InvoiceShelf, and gmailctl are not adopted. Blocks, Billbot, and Mailbot are built here.

---

## 3. License boundary

| Layer | License |
|-------|---------|
| New original packages (`packages/open-ui`, `packages/open-books` wrapper, `packages/open-bill`, shells, Pepper, remaining original packages) | BSL 1.1. Additional grant: under 5 seats and under $100,000 gross, plus solos, artists, contributors, nonprofits. Each commit becomes Apache 2.0 after 36 months. Commercial keys are Ed25519 signatures from PoweredUpLabs |
| MIT upstream (Actual, Super Productivity, ephios, Flarum) | Stays MIT, notices included |
| Already published SubTerraCo `LICENSE` files | Stay MIT |
| InvoiceShelf | AGPL-3.0. Not vendored into a BSL package and not part of the multi-tenant host |
| any-sync | Any Source Available License |

Metro and Central keep separate hubs. The same owner may link a bridge that copies only Open Books, Open Bill, Open Time, and Anytype records they mark (Powerline lock 2026-09-30). The bridge is off by default. Central is the personal AI hub; Metro is the social media app that consumes Central-hosted packages. NFC event-page access remains a challenge-response, with a one-time upgrade for Artist, Venue, or Vendor profile tools. Friend-show visibility is off by default. Open Gig is free for a solo freelancer and billed for a crew manager of 5 or more.

Packages do not import each other. Each shell ships a SQLite hub, and every package runs against an empty hub. Central hosts packages and integrations; a packages-under-Central path is sanctioned (C16). Anytype is a Central-hosted integration and not a hub dependency. Leftover PKM remains a dedicated Anytype workspace unless folded. **Grok bot Anytype** Local API client ownership is Central; Cara runs Anytype desktop only ([GV-0007](GV-0007-grok-bot-anytype.md)). Forum is an optional richer backend for Community. The deployment matrix is in [Docs/ARCHITECTURE.md](../ARCHITECTURE.md).

---

## 4. What this pass does not do

The monorepo repository is not created. Existing app repos are not renamed on GitHub. Phase 1 in [Docs/ARCHITECTURE.md](../ARCHITECTURE.md) is the next implementation step.
