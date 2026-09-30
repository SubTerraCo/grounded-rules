# Product repo template (leftover standalone repo)

Copy into a leftover standalone repo only when a new GitHub repo must exist before fold-in to `SubTerraCo/luna`. New product work belongs in the enterprise monorepo (see `Docs/ARCHITECTURE.md`).

1. Register in governance `subterra.manifest.yaml`. Leftover standalone repos may keep deprecated twin `role` / `marketplace` / SDK. Do not add those twin fields on new Luna packages (`marketplace: null`, `sdk: null`, `audience` is the gate)
2. Reserve APP code in `codes/APP_REGISTRY.yaml`
3. Replace `APPCODE` / product name in Docs and package.json
4. Point CI at `SubTerraCo/subterra-governance/.github/workflows/ci-node.yml@v1`
5. Existing leftover apps still use `@subterra/app-sdk` or `@subterra/integration-sdk` until the monorepo hub replaces that surface
6. Build UI with Material Design 3 tokens from `packages/open-ui` (Tailwind + `@material/material-color-utilities`; palette purple `#400080`, pink `#ED1CAD`, light blue `#1CEDC5`, teal `#008080`; interim M3 type scale; 4dp spacing). Do not add another component library. Do not use Material Web or `@subterra/shell-ui` as the owner (constitution §15, GV-0004)
