# GV-0003 — Material Design 3 as the SubTerra UI framework

| | |
|--|--|
| **Address** | `GV.CX.DV.01.030.010` |
| **Release** | `v26.09.29` |
| **Status** | Design locked. **GV-0004 replaces D2 and D3:** tokens live in `packages/open-ui` via Tailwind and `@material/material-color-utilities`, not Material Web and not `@subterra/shell-ui`. Material 3 itself and the vendor-fork exemption still stand. **D4 amber seed `#e8a54b` is withdrawn:** `packages/open-ui` owns purple `#400080`, pink `#ED1CAD`, light blue `#1CEDC5`, teal `#008080`, plus interim Material 3 type scale and a 4dp spacing grid |
| **Owner** | Grounded Rules agent (GV) |

Locks Material Design 3 as the only UI framework for the SubTerra shell and for SubTerra-owned apps. One theme. Vendor-fork screens and non-UI tools stay exempt.

---

## 1. Conflict audit

| # | Conflict | Evidence |
|---|----------|----------|
| C1 | Shell chrome is hand-built, not Material | `subterra-shell` `@subterra/shell-ui` draws `TopBar`, `BottomNav`, and `AppGrid` from local tokens. Accent is amber `#e8a54b` |
| C2 | Blocks already has a second visual system | `@blocks/ui` uses magenta `#9b4dca` and its own bottom nav |
| C3 | Mailbot and Festy Blocks ship bespoke CSS | Neither imports shell tokens or a shared component library |
| C4 | Actual's UI cannot be restyled while we track upstream | A Material rewrite of `desktop-client` conflicts on every vendor sync and blocks contributing UI fixes back |
| C5 | Adopting "a design system" without naming the package forks again | MUI and shadcn are not Material 3. A second kit recreates C1–C3 |

---

## 2. Locked decisions

| Ref | Decision |
|-----|----------|
| **D1** | Material Design 3 is the UI framework for the shell and every SubTerra-owned app. |
| **D2** | Web and desktop use Material Web (`@material/web`). Do not add MUI, shadcn, or a new hand-rolled control set. **Superseded by GV-0004 C6:** Tailwind + `@material/material-color-utilities` in `packages/open-ui`. |
| **D3** | One theme, owned by `@subterra/shell-ui`. Apps import it. They do not copy token files into the product repo. **Superseded by GV-0004:** owner is `packages/open-ui`. `@subterra/shell-ui` is the legacy package until the monorepo lands. |
| **D4** | The theme seed is shell amber `#e8a54b`. Blocks magenta stays inside Blocks until that screen is migrated. It is not the shell seed. Material's default purple is not the seed. **Superseded (2026-09-30):** `packages/open-ui` owns a four-color palette — purple `#400080`, pink `#ED1CAD`, light blue `#1CEDC5`, teal `#008080` — plus interim Material 3 type scale and a 4dp spacing grid. Font families are not locked (pending Powerline). Token *code* is not in this Grounded Rules repo. |
| **D5** | New UI uses Material 3 components (app bars, navigation, buttons, text fields, lists, sheets). Existing screens move to Material 3 when they are edited. This record does not schedule a rewrite. |
| **D6** | Exempt: vendor-fork UI (Actual screens while they track upstream; Open Books `OB` uses `@actual-app/api` and our Material 3 wrapper — the code `FN` is withdrawn), and tools with no UI (`tag-writer`). New SubTerra screens inside an exempt repo still follow D1–D5. |
| **D7** | Governance encodes D1–D6 now (this record, constitution §15, governance Cursor rule, product-repo template). Shell and app restyles are follow-on work in those repos. |

---

## 3. Follow-on

| Work | Repo |
|------|------|
| Theme `packages/open-ui` with Material 3 color roles from the locked palette (purple `#400080`, pink `#ED1CAD`, light blue `#1CEDC5`, teal `#008080`), interim Material 3 type scale, and 4dp spacing (Tailwind + `@material/material-color-utilities`). Font families wait on Powerline. `@subterra/shell-ui` / Material Web is leftover until the monorepo lands. Token *code* is sibling product work | `SubTerraCo/luna` (not created) and leftover `subterra-shell`. Do not restyle leftover shell as if it were the product |
| Migrate Blocks, Mailbot, and Festy Blocks screens as they are edited | each app repo |
| Register the Actual / Open Books (`OB`) vendor-fork exemption in the manifest when `OB` is no longer reserved | Grounded Rules (`grounded-rules`) |
