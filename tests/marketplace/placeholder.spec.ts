/**
 * Placeholder for the `marketplace` project.
 *
 * Genuinely blocked: Luna OS and SubTerra Central do not exist yet, so there is
 * nothing to drive a browser against (GV-0001 D5). Unblock alongside the
 * first shell host. GV-0004 dropped separate Apps and Integrations tabs.
 *
 * See tests/README.md for the full planned coverage.
 */
import { test } from "@playwright/test";

const pending = () => {
  // Intentionally empty — see the surrounding fixme title for the assertion owed.
};

test.describe("@marketplace catalog handoff", () => {
  test.fixme("catalog items render in the active shell, filtered by audience", pending);
  test.fixme("an installed package opens against an empty hub", pending);
  test.fixme("Luna OS and SubTerra Central hubs stay isolated unless the bridge is on", pending);
});
