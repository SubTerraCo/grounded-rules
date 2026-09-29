# GV-0004 — Enterprise monorepo ingestion

| | |
|--|--|
| **Address** | `GV.CX.DV.01.040.010` |
| **Release** | `v26.09.29` |
| **Status** | Design locked — conflicts resolved; monorepo not created yet |
| **Owner** | Governance agent (GV) |
| **Blueprint** | [Docs/ARCHITECTURE.md](../ARCHITECTURE.md) |

The enterprise blueprint wins wherever it disagrees with GV-0001, GV-0002, or GV-0003. Governance still owns Dewey addresses, the manifest, audience rules, NFC challenge-response, and vendor upstreams.

---

## 1. Conflict resolutions

| # | Old ruling | Blueprint | Resolution |
|---|------------|-----------|------------|
| C1 | Polyrepo, one repo per app (§1) | One pnpm + Turborepo monorepo | Monorepo is the product. `subterra-governance` stays this rules repo. `tooling/design-governance` enforces tokens; it does not fork the constitution |
| C2 | Shells are `apps/admin` and `apps/nexus` over `shell-core` (GV-0002) | Exactly two runtimes: Tauri v2 and a PWA | Build `apps/luna-os` (Tauri, including Arch Linux / Omarchy) and `apps/web-shell` (PWA). Do not create `apps/admin` or `apps/nexus` |
| C3 | Electron + Next shell | Vite, React 19, Tauri v2 | Tauri + Vite. `subterra-shell` stays until Phase 1 copies what is still useful |
| C4 | Every repo defaults to `master` (§4.1) | The first blueprint draft used `main` and `staging` | Withdrawn. The monorepo uses `master` and `dev`, same as every other SubTerraCo repo |
| C5 | pnpm 11.14, reusable `ci-node.yml@v1` | pnpm 9, Node 22, Turbo pipeline in-repo | Monorepo CI is the blueprint pipeline (pnpm 9, Node 22). This governance repo keeps its own workflow |
| C6 | Material Web and `@subterra/shell-ui` (GV-0003 D2–D3) | Tailwind + `@material/material-color-utilities`, `packages/ui` | Material 3 stays. Tokens move to `packages/ui`. Arbitrary Tailwind values and hardcoded colors fail CI. Seed stays amber `#e8a54b` |
| C7 | New Rust is forbidden (§14) | Rust for Tauri bindings only | Rust is allowed only in those bindings. App logic stays TypeScript |
| C8 | Public repos are MIT | BSL 1.1, Apache 2.0 after 36 months, commercial key for 5+ seats | BSL applies to new original monorepo code. See §3. MIT files already published stay MIT |
| C9 | Actual UI is a vendor-fork exemption | Import `@actual-app/api` into the budgeting package | Package is `packages/budget`, code `FN`. Billbot stays `packages/billbot`, code `BB`. Use the headless API. Actual's SQLite CRDT stays inside Budget. SQLCipher is the hub store |
| C10 | Three NFC repos revive as TK | A Solana-named package and code `SN` | Withdrawn. The package is `packages/subtoken` and the code stays `TK`. NTAG424 and Solana live inside Subtoken. UID-only login stays forbidden |
| C11 | Yjs, Automerge, and any-sync listed together | One shared document model | Finance uses Actual's CRDT. PKM talks to Anytype through any-sync. The hub uses Yjs. Automerge is not a second hub |
| C12 | Flarum or Discourse | Community engine | Flarum (MIT). Discourse (GPL) fights the commercial gate |
| C13 | Teller, Plaid, SimpleFIN, GoCardless | Bank feeds without vendor lock-in | SimpleFIN and GoCardless are the default connectors. Teller and Plaid are optional adapters |
| C14 | "Open Day / Open Sort / Open Shift" rename draft | Named apps in the blueprint | That draft was never locked. Blueprint names win. See §2 |

External licenses are not overruled: InvoiceShelf stays AGPL and out of the paid host; any-sync stays under the Any Source Available License.

---

## 2. Names and codes

One product, one code, one folder. The folder is the name people say. Technical aliases (`ledger-finance`, `mail-triage`, `time-engine`, `solana-nfc`, `core-pkm`) are withdrawn.

| Code | Name | Path | What it is |
|------|------|------|------------|
| LO | Luna OS | `apps/luna-os` | Tauri command center, including Arch / Omarchy. Replaces ST |
| SC | SubTerra Central | `apps/subterra-central` | Ticketing and fan portal PWA. Replaces NX |
| BO | Booking | `apps/booking` | Profile, listing, rate, and a date request. Replaces the Time Shift name. Not Blocks |
| AX | Axiom | `apps/axiom` | Optional isolated knowledge reader. Skip unless Anytype is not the knowledge store |
| CH | Community | `apps/community` | Voting and discussion UI |
| FN | Budget | `packages/budget` | Budgeting. `@actual-app/api`. Not Billbot |
| BB | Billbot | `packages/billbot` | Invoicing and 1099 exports. Not Budget |
| BK | Blocks | `packages/blocks` | Tasks, timeline, and Festy crew tools (wishlist, conflict draft, coverage, time clock). Public schedule is a SubTerra Central grant |
| MB | Mailbot | `packages/mailbot` | Gmail and IMAP labels and archive |
| TK | Subtoken | `packages/subtoken` | NFC. NTAG424 challenge-response and Solana tickets. Absorbs tag-writer and validation |
| AT | Anytype | `packages/anytype` | Local-first graph via any-sync |
| LU | Luna | `packages/luna` | Agent router. Ollama runs Gemma 4 12B on the 16GB Omarchy GPU. Cloud Gemini remains a provider |
| BS | Banking | `packages/banking` | SimpleFIN and GoCardless |
| FM | Forum | `packages/forum` | Flarum logic used by CH |
| MA | Media | `packages/media` | DaVinci, OBS, Loupedeck |
| HA | Home Assistant | `packages/home-assistant` | Home automation client. Upstream server stays Apache 2.0 |
| GV | Governance | `SubTerraCo/subterra-governance` | This rules repo |
| WL | White-label | — | Commercial gate on PU. Not a package |
| — | UI | `packages/ui` | Material 3 tokens. No app code (`UI` is already an area code) |

`ST`, `NX`, `LF`, `TE`, `MT`, `PK`, `SN`, and `CE` are not codes. `actual-budget-master-fork` stays the Actual upstream fork. Super Productivity, InvoiceShelf, and gmailctl are not adopted. Blocks, Billbot, and Mailbot are built here.

---

## 3. License boundary

| Layer | License |
|-------|---------|
| New original packages (`anytype` glue, `ui`, `budget` wrapper, shells, Luna, Billbot) | BSL 1.1. Additional grant: under 5 seats and under $100,000 gross, plus solos, artists, contributors, nonprofits. Each commit becomes Apache 2.0 after 36 months. Commercial keys are Ed25519 signatures from PoweredUpLabs |
| MIT upstream (Actual, Super Productivity, ephios, Flarum) | Stays MIT, notices included |
| Already published SubTerraCo `LICENSE` files | Stay MIT |
| InvoiceShelf | AGPL-3.0. Not vendored into a BSL package and not part of the multi-tenant host |
| any-sync | Any Source Available License |

Luna OS and SubTerra Central keep separate hubs. The same owner may link a bridge that copies only Budget, Billbot, and Blocks records they mark. The bridge is off by default. Central anonymous access is an NFC challenge-response to an event page, with a one-time upgrade for Artist, Venue, or Vendor profile tools. Friend-show visibility is off by default. Booking is free for a solo freelancer and billed for a crew manager of 5 or more.

Packages do not import each other. Each shell ships a SQLite hub, and every package runs against an empty hub. Anytype is an optional mirror for a personal Luna OS install, not a dependency. Forum is an optional richer backend for Community. The deployment matrix is in [Docs/ARCHITECTURE.md](../ARCHITECTURE.md).

---

## 4. What this pass does not do

The monorepo repository is not created. Existing app repos are not renamed on GitHub. Phase 1 in [Docs/ARCHITECTURE.md](../ARCHITECTURE.md) is the next implementation step.
