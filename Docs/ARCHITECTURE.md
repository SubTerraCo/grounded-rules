# Enterprise monorepo blueprint

Resolved ingestion of the PoweredUp / SubTerra architecture. Conflicts with older governance are settled in [GV-0004](DESIGN_RECORDS/GV-0004-enterprise-monorepo.md). Where this file and an older ruling disagree, this file wins. Where this file is silent, `CI_OPS_CONSTITUTION.md` still applies.

Copy this file to the monorepo root at Phase 1. Until that repo exists, this copy is the source of truth.

## Stack

- TypeScript strict mode for UI, domain logic, and shared types. React 19. Vite.
- Two shells only: `apps/poweredup-os` (Tauri v2 for Windows, macOS, Android, iOS) and `apps/web-shell` (offline-first PWA).
- Rust only inside Tauri bindings: filesystem, local IPC, NFC hardware, DaVinci socket.
- Local hub store: SQLite via SQLCipher, hub documents synced with Yjs.
- Finance store: Actual's own SQLite CRDT inside `packages/ledger-finance`, via `@actual-app/api`. Do not wrap Actual's file in a second CRDT.
- PKM boundary: any-sync to a local Anytype node. Hub documents are not stored in Anytype's database.
- Material 3 tokens in `packages/ui`, generated with `@material/material-color-utilities`, applied through the Tailwind preset in `tooling/config-tailwind`. Seed color `#e8a54b`. No arbitrary Tailwind values. No hardcoded hex or RGB in `.tsx`.

## Apps and packages

```
apps/
  poweredup-os/          # PU — Tauri command center
  web-shell/             # PWA runtime
  subterra-central/      # SC — ticketing, NFC, fan portal
  time-shift-portal/     # TS — freelance marketplace
  axiom-wiki/            # AX — isolated knowledge reader
  community-hub/         # CH — voting and discussion UI
packages/
  core-pkm/              # PK — any-sync boundary
  agent-poe/             # PO — local Ollama (Hermes 3) or cloud providers
  ledger-finance/        # LF — @actual-app/api wrapper
  banking-sync/          # BS — SimpleFIN and GoCardless; Teller and Plaid optional
  billbot/               # BB — invoicing we write; not an AGPL fork
  time-engine/           # TE — scheduler; absorbs Blocks and Festy Blocks behavior
  community-engine/      # CE — Flarum
  mail-triage/           # MT — Gmail and IMAP labels and archive
  solana-nfc/            # SN — NTAG424 challenge-response and Solana tickets
  media-automation/      # MA — DaVinci, OBS, Loupedeck
  ui/                    # Material 3 primitives, tokens, domain widgets
tooling/
  config-eslint/
  config-typescript/
  config-tailwind/
  design-governance/     # token check used by CI
```

Poe's provider list is `local-ollama`, `local-vllm`, `cloud-anthropic`, `cloud-openai`, `cloud-gemini`. Tool definitions and prompt shape do not change when the provider changes. API keys are supplied by the user at runtime and are never committed.

## CI

The monorepo pipeline runs on `main` and `staging`, and on pull requests into `main`. Node 22. pnpm 9. Fail the job on lint, typecheck, token check, unit tests, then build. Playwright covers visual regression, offline Yjs convergence, the finance path (receipt to ledger to Billbot to a simulated bank match), tenant isolation, and mocked NFC plus a local Solana validator.

Existing SubTerraCo repos stay on `master` and keep calling governance workflows until they are folded in.

## License

New original code is BSL 1.1. Solos, artists, contributors, nonprofits, and organizations under 5 seats and under $100,000 annual gross revenue get a royalty-free production grant. Larger commercial use needs an Ed25519 license key from PoweredUpLabs. Each commit becomes Apache 2.0 after 36 months.

MIT upstream stays MIT. Already published SubTerra MIT files stay MIT. AGPL code is not vendored. any-sync stays under its own license.

## Data isolation

PoweredUp OS, SubTerra Central, and Axiom Wiki do not have a shared database path. An extension reads another area only through a hub grant the user turned on.

## Phases

1. Workspace skeleton matching this layout, strict TypeScript, ESLint 9 flat config, pnpm workspace, Turborepo.
2. `ledger-finance` around `@actual-app/api`. `core-pkm` schema on SQLite (`better-sqlite3` in Tauri, SQL.js or WASM on the web) and Yjs for hub documents.
3. `agent-poe` with the provider interface and a tool registry for ledger, time, and media.
4. `packages/ui` Material 3 tokens and domain widgets: schedule kanban, receipt inspector, invoice preview, topic voting.
5. Bundle `poweredup-os` in Tauri and `subterra-central` as the PWA. Confirm the PU bundle cannot read SC data and the reverse.
6. Playwright suites listed under CI.

## Kept from governance

Dewey addresses, manifest registration, fail-closed audience, vendor `upstream` remotes, NFC challenge-response, and the rule that product e2e stays beside the product while cross-repo contracts stay in governance `tests/` until the monorepo `tests/contract` replaces them.
