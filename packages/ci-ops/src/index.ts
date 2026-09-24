/**
 * @subterra/ci-ops — shared versioning helpers for SubTerra product repos.
 * R0: rollover stamp + manifest validate. Expand as apps adopt governance.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

export interface LocalDate {
  year: number;
  month: number;
  day: number;
}

export function todayLocalDate(now: Date = new Date()): LocalDate {
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
}

/** e.g. v26.08.03 */
export function todayReleaseTag(now: Date = new Date()): string {
  const d = todayLocalDate(now);
  const yy = String(d.year).slice(-2);
  const mm = String(d.month).padStart(2, "0");
  const dd = String(d.day).padStart(2, "0");
  return `v${yy}.${mm}.${dd}`;
}

/** e.g. 26.8.3 */
export function todayNpmVersion(now: Date = new Date()): string {
  const d = todayLocalDate(now);
  return `${d.year % 100}.${d.month}.${d.day}`;
}

export interface BatchRow {
  batch: string;
}

/**
 * Parse batch rows from ROADMAP markdown (`| v26.08.03b1 |` style).
 */
export function parseBatchLogRows(roadmap: string): BatchRow[] {
  const rows: BatchRow[] = [];
  const re = /\|\s*(v\d+\.\d+\.\d+b\d+)\s*\|/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(roadmap)) !== null) {
    rows.push({ batch: m[1]! });
  }
  return rows;
}

export function maxBatchIndexForRelease(
  releaseTag: string,
  rows: BatchRow[],
): number {
  const prefix = releaseTag.replace(/^v/, "");
  let max = 0;
  for (const row of rows) {
    const match = row.batch.match(/^v([\d.]+)b(\d+)$/);
    if (!match || match[1] !== prefix) continue;
    max = Math.max(max, parseInt(match[2]!, 10));
  }
  return max;
}

export function nextBatchId(releaseTag: string, rows: BatchRow[]): string {
  const next = maxBatchIndexForRelease(releaseTag, rows) + 1;
  const prefix = releaseTag.replace(/^v/, "");
  return `v${prefix}b${next}`;
}

/**
 * Sync **Release:** line and optional Active sprint paren tag.
 */
export function syncRoadmapRelease(roadmap: string, releaseTag: string): string {
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
 */
export function ensureBatchLogRow(
  roadmap: string,
  batchId: string,
  note = "R0 scaffold",
): string {
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

export interface StampPackageJsonOpts {
  shellVersionKey?: string;
}

/**
 * Stamp package.json version fields for a product repo root.
 */
export function stampPackageJson(
  repoRoot: string,
  npmVersion: string,
  batchId: string,
  opts: StampPackageJsonOpts = {},
): void {
  const pkgPath = join(repoRoot, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as Record<
    string,
    unknown
  >;
  pkg.version = npmVersion;
  const key = opts.shellVersionKey ?? "subterraShellVersion";
  pkg[key] = batchId;
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
}

export interface RolloverFlags {
  stamp?: boolean;
  nextBatch?: boolean;
}

export interface RolloverResult {
  releaseTag: string;
  batchId: string;
  roadmapPath: string;
}

/**
 * Full rollover for a product repo that has ROADMAP + package.json.
 */
export function runRollover(
  repoRoot: string,
  flags: RolloverFlags = {},
): RolloverResult {
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

export function governanceRootFromCiOps(): string {
  return join(here, "../../..");
}

export type {
  FleetApp,
  FleetSnapshot,
  ManifestItem,
} from "./collect-versions.ts";

export {
  buildFleet,
  collectRow,
  parseManifestItems,
  renderVersionsMarkdown,
  resolveLocalCheckout,
} from "./collect-versions.ts";
