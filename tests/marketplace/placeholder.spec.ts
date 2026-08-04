/**
 * Placeholder for the `marketplace` project.
 *
 * Genuinely blocked: no Shell host application exists yet, so there is nothing
 * to drive a browser against (GV-0001 D5, conflict C4). Unblock alongside the
 * Shell R1 marketplace UI.
 *
 * See tests/README.md for the full planned coverage.
 */
import { test } from "@playwright/test";

const pending = () => {
  // Intentionally empty — see the surrounding fixme title for the assertion owed.
};

test.describe("@marketplace Shell grids", () => {
  test.fixme("Apps and Integrations grids render from subterra.manifest.yaml", pending);
  test.fixme("an app opens in the Shell host and mounts via the SDK lifecycle", pending);
  test.fixme("an integration opens and mounts through the identical twin API", pending);
  test.fixme("both grids share identical chrome (Apps ↔ Integrations UX parity)", pending);
});
