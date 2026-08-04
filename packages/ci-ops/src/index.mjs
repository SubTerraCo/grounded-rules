/**
 * @subterra/ci-ops — shared versioning helpers for SubTerra product repos.
 * R0: rollover stamp + manifest validate. Expand as apps adopt governance.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

/** @returns {{ year: number, month: number, day: number }} */
export function todayLocalDate(now = new Date()) {
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
}

/** @returns {string} e.g. v26.08.03 */
export function todayReleaseTag(now = new Date()) {
  const d = todayLocalDate(now);
  const yy = String(d.year).slice(-2);
  const mm = String(d.month).padStart(2, "0");
  const dd = String(d.day).padStart(2, "0");
  return `v${yy}.${mm}.${dd}`;
}

/** @returns {string} e.g. 26.8.3 */
export function todayNpmVersion(now = new Date()) {
  const d = todayLocalDate(now);
  return `${d.year % 100}.${d.month}.${d.day}`;
}

/**
 * Parse batch rows from ROADMAP markdown (`| v26.08.03b1 |` style).
 * @param {string} roadmap
 * @returns {{ batch: string }[]}
 */
export function parseBatchLogRows(roadmap) {
  const rows = [];
  const re = /\|\s*(v\d+\.\d+\.\d+b\d+)\s*\|/g;
  let m;
  while ((m = re.exec(roadmap)) !== null) {
    rows.push({ batch: m[1] });
  }
  return rows;
}

/**
 * @param {string} releaseTag e.g. v26.08.03
 * @param {{ batch: string }[]} rows
 */
export function maxBatchIndexForRelease(releaseTag, rows) {
  const prefix = releaseTag.replace(/^v/, "");
  let max = 0;
  for (const row of rows) {
    const match = row.batch.match(/^v([\d.]+)b(\d+)$/);
    if (!match || match[1] !== prefix) continue;
    max = Math.max(max, parseInt(match[2], 10));
  }
  return max;
}

/**
 * @param {string} releaseTag
 * @param {{ batch: string }[]} rows
 */
export function nextBatchId(releaseTag, rows) {
  const next = maxBatchIndexForRelease(releaseTag, rows) + 1;
  const prefix = releaseTag.replace(/^v/, "");
  return `v${prefix}b${next}`;
}

/**
 * Sync **Release:** line and optional Active sprint paren tag.
 * @param {string} roadmap
 * @param {string} releaseTag
 */
export function syncRoadmapRelease(roadmap, releaseTag) {
  let updated = roadmap.replace(
    /(\*\*Release:\*\*\s+)v[\d.]+/,
    `$1${releaseTag}`,
  );
  updated = updated.replace(
    /(### Active sprint \d+ \()(v[\d.]+)(\))/,
    `$1${releaseTag}$3`,
  );
  const todayIso = (() => {
    const d = todayLocalDate();
    return `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}`;
  })();
  updated = updated.replace(
    /(\*\*Last Updated:\*\*\s+)\d{4}-\d{2}-\d{2}/,
    `$1${todayIso}`,
  );
  return updated;
}

/**
 * Insert a batch log row after the Batch log table header (best-effort).
 * @param {string} roadmap
 * @param {string} batchId
 * @param {string} note
 */
export function ensureBatchLogRow(roadmap, batchId, note = "R0 scaffold") {
  if (roadmap.includes(batchId)) return roadmap;
  const row = `| ${batchId} | 🧪 QA | ${note} |\n`;
  // Match header + full markdown separator row (multi-column)
  if (/## Batch log[\s\S]*?\n\|[-:| \t]+\|\s*\n/i.test(roadmap)) {
    return roadmap.replace(
      /(## Batch log[\s\S]*?\n\|[-:| \t]+\|\s*\n)/i,
      `$1${row}`,
    );
  }
  return `${roadmap.trimEnd()}\n\n## Batch log\n\n| Batch | Status | Notes |\n|-------|--------|-------|\n${row}`;
}

/**
 * Stamp package.json version fields for a product repo root.
 * @param {string} repoRoot
 * @param {string} npmVersion e.g. 26.8.3
 * @param {string} batchId e.g. v26.08.03b1
 * @param {{ shellVersionKey?: string }} [opts]
 */
export function stampPackageJson(repoRoot, npmVersion, batchId, opts = {}) {
  const pkgPath = join(repoRoot, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  pkg.version = npmVersion;
  const key = opts.shellVersionKey ?? "subterraShellVersion";
  pkg[key] = batchId;
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
}

/**
 * Full rollover for a product repo that has ROADMAP + package.json.
 * @param {string} repoRoot
 * @param {{ stamp?: boolean, nextBatch?: boolean }} flags
 */
export function runRollover(repoRoot, flags = {}) {
  const roadmapPath = join(
    repoRoot,
    "Docs/Working Docs-Features-Incidents/ROADMAP.md",
  );
  if (!existsSync(roadmapPath)) {
    throw new Error(`ROADMAP not found: ${roadmapPath}`);
  }
  const releaseTag = todayReleaseTag();
  let roadmap = readFileSync(roadmapPath, "utf8");
  roadmap = syncRoadmapRelease(roadmap, releaseTag);
  const rows = parseBatchLogRows(roadmap);
  const batchId = nextBatchId(releaseTag, rows);

  if (flags.nextBatch || flags.stamp) {
    roadmap = ensureBatchLogRow(roadmap, batchId, "session batch");
  }
  writeFileSync(roadmapPath, roadmap, "utf8");

  if (flags.stamp) {
    const batchNum = batchId.match(/b(\d+)$/)?.[1] ?? "1";
    const npmVersion = `${todayNpmVersion()}-b${batchNum}`;
    stampPackageJson(repoRoot, npmVersion, batchId);
  }

  return { releaseTag, batchId, roadmapPath };
}

export function governanceRootFromCiOps() {
  return join(here, "../../..");
}
