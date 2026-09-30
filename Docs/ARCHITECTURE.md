# Enterprise monorepo blueprint

Resolved ingestion of the PoweredUp / SubTerra architecture. Conflicts with older Grounded Rules rulings are settled in [GV-0004](DESIGN_RECORDS/GV-0004-enterprise-monorepo.md). Where this file and an older ruling disagree, this file wins. Where this file is silent, `CI_OPS_CONSTITUTION.md` still applies.

Readable current-state summary of this Grounded Rules repo: [GOVERNANCE_OVERVIEW.md](GOVERNANCE_OVERVIEW.md).

Copy this file to the monorepo root (`SubTerraCo/luna-os`) at Phase 1 if that copy is not already the one people edit. This Grounded Rules copy remains the source of truth until then. Live GitHub slug is `luna-os` (display **SubTerra Metro**). Powerline Settings-rename to `subterra-metro` is proposed, not performed. Personal agent Luna is `packages/luna` (`LU`).

## Shell roles (Powerline lock 2026-09-30)

- **SubTerra Central** (`apps/subterra-central`, `SC`) is the **personal AI hub and suite of all tools**. It hosts extensions, packages, and integrations. Catalog `audience` `member` still mounts here (machine value unchanged).
- **SubTerra Metro** (`apps/subterra-metro`, `SM`) is converting to the **social media app**. It has access to all extensions and packages hosted in Central. Catalog `audience` `admin` still mounts here (machine value unchanged).
- This framing **overrides** the earlier characterization of Central as a public/member shell and Metro as the personal command center.
- **Anytype as a Central integration is the intended shape.** Classification is Dewey `role: integration` only — not plugin/extension. Leftover PKM still lives in a dedicated Anytype workspace and is not required to be a monorepo package; Central **hosts the integration**.
- **Conflict 4 rewritten (Powerline lock 2026-09-30).** Old cut: forcing a packages path under Central invents a product shape Grounded Rules already cut. **New rule:** Central hosts packages and integrations as the personal AI hub and tool suite. A packages-under-Central path (`apps/subterra-central/packages/` or equivalent host layout, plus Central-hosted integrations) is a **legitimate, sanctioned** shape.
- **Metro↔Central data bridge allowlist** (owner-marked, off by default): Open Books (`OB`), Open Bill (`BI`), Open Time (`OT`), and Anytype (`AT`).

## Stack

- TypeScript strict mode for UI, domain logic, and shared types. React 19. Vite.
- Two shells only: `apps/subterra-metro` (Tauri v2 social app for Windows, macOS, Android, iOS, and Arch Linux; consumes Central-hosted packages) and `apps/subterra-central` (offline-first PWA; personal AI hub and suite of all tools).
- Arch builds install on Omarchy. That machine is the dedicated local AI host: Ollama runs there, and `packages/luna` calls it on localhost. Ship an AppImage and a PKGBUILD.
- Rust only inside Tauri bindings: filesystem, local IPC, NFC hardware, DaVinci socket.
- Local hub store: SQLite via SQLCipher, hub documents synced with Yjs.
- Finance store: Actual's own SQLite CRDT inside `packages/open-books` (`OB`), via `@actual-app/api`. Do not wrap Actual's file in a second CRDT. Invoicing is `packages/open-bill` (`BI`).
- Leftover PKM lives in a dedicated Anytype workspace. It is not required as a monorepo package, and the shell hub does not require it. Central **hosts** the Anytype integration (and may host other packages). A packages-under-Central path is sanctioned (conflict 4 rewritten, 2026-09-30). The Metro↔Central bridge may copy owner-marked Anytype (`AT`) records. **Grok bot Anytype** ([GV-0007](DESIGN_RECORDS/GV-0007-grok-bot-anytype.md)): Central owns the Local API client and credentials; Cara only runs Anytype desktop on `127.0.0.1:31009`.
- Material 3 tokens in `packages/open-ui`, generated with `@material/material-color-utilities`, applied through the Tailwind preset in `tooling/config-tailwind`. `packages/open-ui` owns palette, type, and spacing. Locked palette: purple `#400080`, pink `#ED1CAD`, light blue `#1CEDC5`, teal `#008080`. Type: interim Material 3 type scale (display, headline, title, body, label); font families are not locked. Spacing: 4dp baseline grid. The single amber seed `#e8a54b` is withdrawn. No arbitrary Tailwind values. No hardcoded hex or RGB in `.tsx` (docs may cite these palette hexes; product screens use tokens). Token *code* is not in this Grounded Rules repo.

## Apps and packages

```
apps/
  subterra-metro/               # SM — social media app (Tauri); consumes Central-hosted packages (former code LO)
  subterra-central/      # SC — personal AI hub PWA; suite of all tools
    packages/            # SANCTIONED — Central-hosted packages (conflict 4 rewritten 2026-09-30)
    integrations/        # SANCTIONED — Central-hosted integrations (Anytype / Grok bot Anytype)

  open-gig/              # OG — profile, listing, rate, date request
  community/             # CH — voting and discussion UI
packages/                       # shared monorepo packages remain valid; Central-hosted copies/paths are also allowed
  open-time/             # OT — tasks, timeline, Quick Blocks, Festy crew tools (former code OD)
  open-sort/             # OS — Gmail and IMAP labels and archive
  open-books/            # OB — @actual-app/api budgeting
  open-bill/             # BI — invoicing and 1099 exports
  subtoken/              # TK — NTAG424 challenge-response and tickets
  luna/                  # LU — Ollama, Gemma 4 12B default
  banking/               # BS — SimpleFIN and GoCardless
  forum/                 # FM — Flarum
  home-assistant/        # HA — Home Assistant client
  media/                 # MA — DaVinci, OBS, Loupedeck
  open-ui/               # Material 3 tokens. No app code
tooling/
  config-eslint/
  config-typescript/
  config-tailwind/
  design-governance/     # token check used by CI
```

Luna's provider list is `local-ollama`, `local-vllm`, `cloud-anthropic`, `cloud-openai`, `cloud-gemini`. On Omarchy, local-ollama is the default and the base URL is that machine. Tool definitions and prompt shape do not change when the provider changes. API keys are supplied by the user at runtime and are never committed.

## CI

The monorepo pipeline runs on `master` and `dev`, and on pull requests into `master`. Node 22. pnpm 9. Fail the job on lint, typecheck, token check, unit tests, then build. Playwright covers visual regression, offline Yjs convergence, the finance path (receipt to ledger to Open Bill to a simulated bank match), tenant isolation, and mocked NFC plus a local Solana validator.

Live GitHub slug for the product monorepo is `SubTerraCo/luna-os` (display **SubTerra Metro**). Default branch is `master`. Do not use `main`. Powerline Settings-rename to `subterra-metro` is proposed, not performed. Personal agent Luna (`LU`, `packages/luna`) is not this GitHub slug.

## Upstream cores

Use these projects for the engine and the patches. Write the Material 3 screen and the shell grant in our package. Do not copy an AGPL server into the monorepo.

| Package | Use | Leave out |
|---------|-----|-----------|
| Open Books `OB` | `@actual-app/api` (MIT). Actual already syncs SimpleFIN and GoCardless | A second ledger. The name Open Budget is already published |
| Open Time `OT` | The existing Blocks app, plus Festy crew screens | Super Productivity. It has no Quick Blocks, and forking it would throw away the kanban that already works |
| Open Bill `BI` | Our invoicing package | InvoiceShelf. We will outbuild it. Do not vendor the AGPL app |
| Open Sort `OS` | Our label-and-archive package | gmailctl and hosted inbox products. We will outbuild them |
| Subtoken `TK` | NXP's public SDM spec for NTAG424. Our ticket record and event page | pretix and Hi.Events. Both are AGPL with extra terms that block a white-label ticket platform |
| Community `CH` / Forum `FM` | Flarum (MIT) | Discourse (GPL) |
| Home Assistant `HA` | `home-assistant-js-websocket` against a local Home Assistant server (Apache 2.0) | Forking Home Assistant |
| Media `MA` | `obs-websocket-js` (MIT). DaVinci's scripting API ships with Resolve | A video editor |
| Luna `LU` | Ollama as the local runtime. Gemma 4 12B as the default weights on a 16GB GPU. Cloud Gemini stays available | Hermes as the default model. Gemma 4 31B and the 26B MoE at Q4_K_M as the daily default |
| Hub | Yjs and SQLCipher | A CRDT written here |
| UI | `@material/material-color-utilities` | A second design system |
| Booking `BO` | No maintained open marketplace matches a profile, a rate, and a date request | Team@Once and Mercur. They are staffing or product commerce, not this listing |
| Anytype `AT` | any-sync; Central hosts the integration. Leftover PKM workspace is not required as a monorepo package. Metro↔Central bridge allowlist includes owner-marked AT. **Grok bot Anytype** ([GV-0007](DESIGN_RECORDS/GV-0007-grok-bot-anytype.md)): Central-owned Local API client; Cara desktop-only on `:31009` | Treating it as a plugin or extension. Forbidding a packages-under-Central path |

Existing SubTerraCo repos stay on `master` and keep calling Grounded Rules workflows until they are folded in.

## License

New original code is BSL 1.1. Solos, artists, contributors, nonprofits, and organizations under 5 seats and under $100,000 annual gross revenue get a royalty-free production grant. Larger commercial use needs an Ed25519 license key from PoweredUpLabs. Each commit becomes Apache 2.0 after 36 months.

MIT upstream stays MIT. Already published SubTerra MIT files stay MIT. AGPL code is not vendored. any-sync stays under its own license.

## Marketplace

Every installable package stands alone. It may not import another package. The shell is the only dependency: Material 3, the marketplace, and a small SQLite hub. A package opens and works when the hub is empty.

Optional facts another package might have written are read from the hub only after the user grants that read. If the other package is not installed, those fields stay empty and the installed package still runs.

Leftover PKM stays in a dedicated Anytype workspace and is not required as a package in this monorepo. Open Axiom is cut. The shell hub is the store for installed packages. Other people are not required to run Anytype. Central hosts packages and integrations, including Anytype / Grok bot Anytype (Dewey `role: integration` only — not plugin/extension). A packages-under-Central path is sanctioned (conflict 4 rewritten, Powerline lock 2026-09-30). Client topology: [GV-0007](DESIGN_RECORDS/GV-0007-grok-bot-anytype.md) (Central owns Local API client; Cara runs Anytype desktop on `127.0.0.1:31009` only).

The same package can be installed in SubTerra Metro, in the SubTerra Central PWA, or in both. Each shell has its own hub. Installing it in one shell does not install it in the other. Metro as the social app consumes extensions and packages hosted in Central.

Catalog registration for these packages uses `audience` as the mount gate. Do not write leftover twin fields (`role: app|integration`, `marketplace: apps|integrations`, twin SDKs) on new monorepo packages. Leftover Anytype keeps Dewey `role: integration`.

A person who uses both shells may turn on a data bridge. It is off by default. The bridge copies only **Open Books (`OB`), Open Bill (`BI`), Open Time (`OT`), and Anytype (`AT`)** records that the person marks (Powerline lock 2026-09-30). Mail, banking, and home automation stay off the bridge. Metro's social surface never receives the unbridged personal hub.

## SubTerra Central access

Central is the personal AI hub (Powerline lock 2026-09-30). NFC still opens an event page after NTAG424 challenge-response when that flow is used. A UID alone does not sign anyone in. Metro, as the social media app, consumes Central-hosted packages for social / feed surfaces.

The tag holder is an anonymous member. They can buy tickets, keep a log of shows, hold digital goods, and follow artists on a limited profile. They may set an alias. Seeing which shows friends attend is off until they turn that permission on, and each person controls their own visibility.

A one-time charge upgrades that profile to Artist, Venue, or Vendor. The charge unlocks the profile tools for that type. Ticket buying, show history, digital goods, and follows stay available without the upgrade.

Booking listings are free for a single freelancer. A crew manager with 5 or more members pays the booking fee. The fee is for managing that crew, not for looking for work alone.

Column labels use the 2026-09-30 shell roles (Metro = social, consuming Central-hosted packages; Central = personal AI hub). Per-package Yes/No cells for existing packages stay the GV-0004 mount table except the named lock: Anytype `AT` is a Central integration (not a monorepo package) and is on the owner-marked bridge allowlist with OB, BI, and OT.

| Package | SubTerra Metro (social; consumes Central-hosted packages) | SubTerra Central (personal AI hub; hosts tools) | Sells as |
|---------|--------------------------------------|----------------------------------|----------|
| Open Books `OB` | Yes | Only through the owner's bridge | Back-office seat. Bridge is optional. Allowlist: OB + BI + OT + AT |
| Open Bill `BI` | Yes | Only through the owner's bridge | Back-office seat. Bridge is optional. Allowlist: OB + BI + OT + AT |
| Open Time `OT` | Yes. Personal tasks, plus Festy crew drafting | Public schedule only, when granted | Seat. Drafting stays on SubTerra Metro. Allowlist: OB + BI + OT + AT |
| Anytype `AT` | Only through the owner's bridge (Powerline lock 2026-09-30) | Hosts the integration. PKM is a dedicated Anytype workspace — not a monorepo package | Integration (`role: integration` only). Not plugin/extension |
| Open Sort `OS` | Yes | No | Back-office seat |
| Banking `BS` | Yes | No | Back-office seat |
| Home Assistant `HA` | Yes | No | Back-office seat |
| Media `MA` | Yes | No | Show-control seat |
| Luna `LU` | Yes | No | Seat. Tools exist only for packages that are installed |
| Subtoken `TK` | Organizer tools | Event page, tickets, show log, digital goods | Ticket price. Anonymous tag access. One-time profile upgrade is separate |
| Open Gig `OG` | Yes | Yes | Free for a solo freelancer. Fee for a crew manager of 5 or more |
| Community `CH` | Crew discussion | Public discussion | Free under the BSL grant. Commercial key past 5 seats |
| Forum `FM` | Optional richer discussion | Optional richer discussion | Same grant. Community still runs without it |

UI is not a marketplace item. It ships inside both shells.

**Grok bot Anytype (Central integration).** Classification **integration** only ([GV-0007](DESIGN_RECORDS/GV-0007-grok-bot-anytype.md)). **Central owns** the Local API client, credentials, first-pull, and tag/view. **Cara only** runs Anytype desktop on `127.0.0.1:31009`. Dewey `AT` / `integrations/anytype`. Metro (social) may access Central-hosted extensions/packages. Data-bridge allowlist is **OB + BI + OT + AT** (marked records).

Monetization is the BSL seat key and PoweredUpLabs hosting for SubTerra Metro, ticket prices on SubTerra Central, a one-time Artist, Venue, or Vendor profile upgrade, and the Open Gig fee for crew managers of 5 or more. A solo freelancer does not pay that fee. A package that is not installed is not billed and is not loaded.

## Phases

1. Workspace skeleton matching this layout, strict TypeScript, ESLint 9 flat config, pnpm workspace, Turborepo.
2. Shell hub on SQLite (`better-sqlite3` in Tauri, SQL.js or WASM on the web) and Yjs. `packages/open-books` around `@actual-app/api`. `packages/open-bill` stays a separate invoicing package. Anytype is a Central-hosted integration (leftover PKM workspace is not required as a monorepo package; packages-under-Central is sanctioned). The owner-marked Metro↔Central bridge allowlist is Open Books, Open Bill, Open Time, and Anytype.
3. `packages/luna` (`LU`) with the provider interface and a tool registry for Open Books, Open Time, and Media. Default the local provider at the Omarchy host.
4. `packages/open-ui` Material 3 tokens (palette, type scale, 4dp spacing) and domain widgets: schedule kanban, receipt inspector, invoice preview, topic voting.
5. Bundle `subterra-metro` in Tauri, including the Arch Linux / Omarchy target, and `subterra-central` as the PWA. Confirm an unlinked SubTerra Metro hub cannot read SubTerra Central data. Confirm a linked bridge copies only Open Books, Open Bill, Open Time, and Anytype records the owner marked.
6. Playwright suites listed under CI.

## Festy Blocks

`SubTerraCo/festy-blocks` is the working festival crew app. It does not get its own code. The Firebase app and the Vite shell are not carried forward.

| Screen | Home |
|--------|------|
| Team setup, lobby, shift wishlist, conflict resolver, draft board, coverage, time clock | Open Time (`OT`), inside SubTerra Metro |
| The finished schedule | SubTerra Central, read-only, and only when the owner grants it |

Wishlists and the draft are crew-private. They do not appear on the public event page. Booking (`BO`) is still a hire for a date, not this draft.

## Prior plans

These files were searched before building. Vendor roadmaps inside `actual/` stay upstream and are not edited.

| Plan | Still used | Dropped |
|------|------------|---------|
| `subterra-shell` roadmap, August 2026 | Marketplace of optional packages | Electron and Next shells, leftover admin/member folder split, separate Apps and Integrations tabs, code `ST` as the thing to build |
| `blocks` roadmap | Kanban, timeline, quick-add, and task fields are the Blocks (`BK`) screen spec | Windows-desktop-first order. SubTerra Metro Tauri is the shell for every platform |
| `blocks/Docs/Integrations/HERMES_ECOSYSTEM_ARCHITECTURE.md` | A local agent with tools for Blocks, Billbot, Mailbot, and Anytype | Separate repos and MCP as the architecture. The agent is `packages/luna`. Packages do not import each other |
| `mailbot/cursor_gmail_api_auto_sorting_bot_strat.md` | A later Mailbot slice can pull a bill PDF and hand line items to Billbot if both are installed | Google Sheets as the system of record. The chat export is not a spec |
| GV-0001, GV-0002 | Dewey codes, audience, NFC challenge-response, vendor `upstream` remotes | Leftover admin/member folder layout, Electron shell, separate GitHub repos as the product shape |

Do not start a build from those files. Start from this blueprint.

## Kept from Grounded Rules

Dewey addresses, manifest registration, fail-closed audience, vendor `upstream` remotes, NFC challenge-response, and the rule that product e2e stays beside the product while cross-repo contracts stay in Grounded Rules `tests/` until the monorepo `tests/contract` replaces them.
