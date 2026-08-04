# Product repo template (app or integration)

Copy into a new repo under `apps/<name>/` or `integrations/<name>/`.

1. Set `role` and `marketplace` in governance `subterra.manifest.yaml`
2. Reserve APP code in `codes/APP_REGISTRY.yaml`
3. Replace `APPCODE` / product name in Docs and package.json
4. Point CI at `PoweredUpLabs/subterra-governance/.github/workflows/ci-node.yml@v1`
5. Use `@subterra/app-sdk` (apps) or `@subterra/integration-sdk` (integrations)
