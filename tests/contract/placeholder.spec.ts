/**
 * Placeholder for the `contract` project.
 *
 * Coverage is deferred per GV-0001 D5. These `fixme` entries are the locked
 * backlog — replace each body with a real assertion as it lands. They are
 * listed by `playwright test --list` so the suite shape stays visible.
 *
 * See tests/README.md for the full planned coverage.
 */
import { test } from "@playwright/test";

const pending = () => {
  // Intentionally empty — see the surrounding fixme title for the assertion owed.
};

test.describe("@contract manifest parity", () => {
  test.fixme("every manifest item has an APP_REGISTRY entry and vice versa", pending);
  test.fixme("every item localPath exists in the meta workspace", pending);
  test.fixme("role and marketplace agree for every item", pending);
  test.fixme("every item declares known PLATFORM_CODES", pending);
});

test.describe("@contract twin-SDK parity", () => {
  // Unblocked: the SDKs now exist under shell/packages (GV-0001 D10).
  test.fixme("app-sdk and integration-sdk export identical symbol names", pending);
  test.fixme("both twins' exports equal SDK_SURFACE", pending);
  test.fixme("SDK_ROLE is the only differing value", pending);
});

test.describe("@contract pipeline adoption", () => {
  test.fixme("each product repo CI references governance reusable workflows", pending);
  test.fixme("no product repo has drifted from the product-repo template docs", pending);
});
