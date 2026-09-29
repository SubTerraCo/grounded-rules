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
| C2 | Shells are `apps/admin` and `apps/nexus` over `shell-core` (GV-0002) | Exactly two runtimes: Tauri v2 and a PWA | Build `apps/poweredup-os` (Tauri) and `apps/web-shell` (PWA). Five entry points share them. Do not create `apps/admin` or `apps/nexus` |
| C3 | Electron + Next shell | Vite, React 19, Tauri v2 | Tauri + Vite. `subterra-shell` stays until Phase 1 copies what is still useful |
| C4 | Every repo defaults to `master` (§4.1) | CI on `main` and `staging` | Existing repos stay `master`. The new monorepo uses `main`, with `staging` as integration |
| C5 | pnpm 11.14, reusable `ci-node.yml@v1` | pnpm 9, Node 22, Turbo pipeline in-repo | Monorepo CI is the blueprint pipeline (pnpm 9, Node 22). This governance repo keeps its own workflow |
| C6 | Material Web and `@subterra/shell-ui` (GV-0003 D2–D3) | Tailwind + `@material/material-color-utilities`, `packages/ui` | Material 3 stays. Tokens move to `packages/ui`. Arbitrary Tailwind values and hardcoded colors fail CI. Seed stays amber `#e8a54b` |
| C7 | New Rust is forbidden (§14) | Rust for Tauri bindings only | Rust is allowed only in those bindings. App logic stays TypeScript |
| C8 | Public repos are MIT | BSL 1.1, Apache 2.0 after 36 months, commercial key for 5+ seats | BSL applies to new original monorepo code. See §3. MIT files already published stay MIT |
| C9 | Actual UI is a vendor-fork exemption | Import `@actual-app/api` into `packages/ledger-finance` | Use the headless API. Do not repaint Actual's UI in the fork. Actual's SQLite CRDT stays inside the ledger. SQLCipher is the hub store |
| C10 | Three NFC repos revive as TK | `packages/solana-nfc`, NTAG424, Solana | Ticketing moves to SN. Challenge-response stays. UID-only login stays forbidden. Existing tags were never deployed |
| C11 | Yjs, Automerge, and any-sync listed together | One shared document model | Finance uses Actual's CRDT. PKM talks to Anytype through any-sync. The hub uses Yjs. Automerge is not a second hub |
| C12 | Flarum or Discourse | Community engine | Flarum (MIT). Discourse (GPL) fights the commercial gate |
| C13 | Teller, Plaid, SimpleFIN, GoCardless | Bank feeds without vendor lock-in | SimpleFIN and GoCardless are the default connectors. Teller and Plaid are optional adapters |
| C14 | "Open Day / Open Sort / Open Shift" rename draft | Named apps in the blueprint | That draft was never locked. Blueprint names win. See §2 |

External licenses are not overruled: InvoiceShelf stays AGPL and out of the paid host; any-sync stays under the Any Source Available License.

---

## 2. Rename map

Old Dewey codes stay valid so existing addresses still resolve. New work uses the new code.

| Old name | Old code | New name | New code | Monorepo path |
|----------|----------|----------|----------|---------------|
| SubTerra Shell | ST | PoweredUp OS | PU | `apps/poweredup-os` |
| Nexus | NX | SubTerra Central | SC | `apps/subterra-central` |
| Blocks | BK | Time Engine | TE | `packages/time-engine` |
| Festy Blocks | — | (folds into Time Engine, shown in SubTerra Central) | TE | `packages/time-engine` |
| — | — | Time Shift Portal | TS | `apps/time-shift-portal` |
| Mailbot | MB | Mail Triage | MT | `packages/mail-triage` |
| Billbot | BB | Billbot | BB | `packages/billbot` |
| Anytype integration | AT | Core PKM | PK | `packages/core-pkm` |
| Subtoken / tag-writer / validation | TK | Solana NFC | SN | `packages/solana-nfc` |
| White-label OS | WL | Commercial gate on PoweredUp OS | WL | PoweredUpLabs hosting, not an app |
| Actual fork | — | Ledger Finance | LF | `packages/ledger-finance` |
| — | — | Axiom Wiki | AX | `apps/axiom-wiki` |
| — | — | Community Hub | CH | `apps/community-hub` |
| — | — | Poe | PO | `packages/agent-poe` |
| — | — | Banking Sync | BS | `packages/banking-sync` |
| — | — | Community Engine | CE | `packages/community-engine` |
| — | — | Media Automation | MA | `packages/media-automation` |
| Governance | GV | Governance (this repo) | GV | `SubTerraCo/subterra-governance` |
| `@subterra/shell-ui` | — | Shared UI | — | `packages/ui` |

`actual-budget-master-fork` stays the upstream fork. The monorepo depends on `@actual-app/api`. It is not renamed into Ledger Finance.

Super Productivity and ephios stay upstream forks when those cores are adopted. They are not renamed into Time Engine. Time Engine is our scheduler package.

---

## 3. License boundary

| Layer | License |
|-------|---------|
| New original packages (`core-pkm` glue, `ui`, `ledger-finance` wrapper, shells, Poe) | BSL 1.1. Additional grant: under 5 seats and under $100,000 gross, plus solos, artists, contributors, nonprofits. Each commit becomes Apache 2.0 after 36 months. Commercial keys are Ed25519 signatures from PoweredUpLabs |
| MIT upstream (Actual, Super Productivity, ephios, Flarum) | Stays MIT, notices included |
| Already published SubTerraCo `LICENSE` files | Stay MIT |
| InvoiceShelf | AGPL-3.0. Not vendored into a BSL package and not part of the multi-tenant host |
| any-sync | Any Source Available License |

PoweredUp OS personal data and SubTerra Central data have no shared read or write path. Axiom Wiki is a third isolated store. The contract test in the blueprint is the enforcement.

---

## 4. What this pass does not do

The monorepo repository is not created. Existing app repos are not renamed on GitHub. Phase 1 in [Docs/ARCHITECTURE.md](../ARCHITECTURE.md) is the next implementation step.
