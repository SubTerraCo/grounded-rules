import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  buildGrepPattern,
  collectFeatureTags,
  parseExtraTags,
  resolveGrepPattern,
  resolveRoadmapPath,
} from "./playwright-feature-tags.mjs";

describe("collectFeatureTags", () => {
  it("collects Dewey N-#### from active CI_OPS statuses only", () => {
    const roadmap = `
| OT/N-0101 | 🧪 QA | ship it |
| SM/N-0202 | ✅ Done | skip |
| OS/N-0303 | 🔄 In progress | mail |
| BK/N-0404 | 📋 Proposed | leftover |
| note without a number | 🧪 QA |
`;
    assert.deepEqual(collectFeatureTags(roadmap).sort(), [
      "@N-0101",
      "@N-0303",
      "@N-0404",
    ]);
  });
});

describe("buildGrepPattern", () => {
  it("unions extra tags when ROADMAP hits exist", () => {
    assert.equal(
      buildGrepPattern(["@N-0101"], ["@core"]),
      "@N-0101|@core",
    );
  });

  it("falls back when no feature tags match", () => {
    assert.equal(buildGrepPattern([], ["@core"], "@N-|@core"), "@N-|@core");
  });
});

describe("parseExtraTags", () => {
  it("defaults to @core", () => {
    assert.deepEqual(parseExtraTags(undefined), ["@core"]);
  });

  it("splits pipe-separated tags", () => {
    assert.deepEqual(parseExtraTags("@core|@smoke"), ["@core", "@smoke"]);
  });
});

describe("resolveGrepPattern", () => {
  it("reads ROADMAP from cwd and ignores missing files via fallback", () => {
    const dir = mkdtempSync(join(tmpdir(), "pw-kit-"));
    writeFileSync(
      join(dir, "ROADMAP.md"),
      "| OT/N-1111 | 🧪 QA | active |\n",
      "utf8",
    );
    const pattern = resolveGrepPattern({
      cwd: dir,
      env: { PLAYWRIGHT_ROADMAP: "ROADMAP.md" },
    });
    assert.equal(pattern, "@N-1111|@core");
    assert.equal(resolveRoadmapPath(dir, "missing.md"), null);
    assert.equal(
      resolveGrepPattern({
        cwd: dir,
        env: { PLAYWRIGHT_ROADMAP: "missing.md", PLAYWRIGHT_GREP_FALLBACK: "@x" },
      }),
      "@x",
    );
  });
});
