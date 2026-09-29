#!/usr/bin/env -S node --experimental-strip-types --disable-warning=ExperimentalWarning
/**
 * Fleet version dashboard — local meta-workspace only.
 *
 * Reads sibling checkouts via subterra.manifest.yaml localPath (+ path fallbacks),
 * writes versions/fleet.json and Docs/VERSIONS.md.
 *
 * Usage:
 *   node --experimental-strip-types --disable-warning=ExperimentalWarning packages/ci-ops/src/collect-versions.ts
 *   node --experimental-strip-types --disable-warning=ExperimentalWarning packages/ci-ops/src/collect-versions.ts --check
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const govRoot = join(here, "../../..");
const metaRoot = resolve(govRoot, "..");
const fleetPath = join(govRoot, "versions/fleet.json");
const mdPath = join(govRoot, "Docs/VERSIONS.md");

interface BatchRow {
  batch: string;
}

/** Local copy — avoid circular import with index.ts */
function parseBatchLogRows(roadmap: string): BatchRow[] {
  const rows: BatchRow[] = [];
  const re = /\|\s*(v\d+\.\d+\.\d+b\d+)\s*\|/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(roadmap)) !== null) {
    rows.push({ batch: m[1]! });
  }
  return rows;
}

/** Junction / legacy Package folder fallbacks when manifest localPath is empty. */
const PATH_FALLBACKS: Record<string, readonly string[]> = {
  "apps/blocks": ["apps/blocks", "Packages/Blocks"],
  "apps/mailbot": ["apps/mailbot", "Packages/Mail Bot"],
  "apps/billbot": ["apps/billbot", "Packages/Bill Bot"],
  "apps/subtoken": ["apps/subtoken", "Packages/Subtoken"],
  "integrations/anytype": [
    "integrations/anytype",
    "Packages/Integrations/Anytype",
  ],
  shell: ["shell"],
  governance: ["governance", "."],
};

export interface ManifestItem {
  id: string;
  appCode: string | null;
  name: string | null;
  repo: string | null;
  localPath: string | null;
  role: string | null;
  status: string;
}

export interface FleetApp {
  appCode: string | null;
  id: string;
  name: string | null;
  role: string | null;
  repo: string | null;
  localPath: string | null;
  status: string;
  display: string | null;
  npm: string | number | boolean | null;
  branch: string | null;
  checkout: string | null;
  note: string | null;
}

export interface FleetSnapshot {
  schemaVersion: 1;
  generatedAt: string;
  source: "local-meta-workspace";
  metaRoot: string;
  apps: FleetApp[];
}

interface PackageJson {
  version?: unknown;
  subterraShellVersion?: unknown;
  blocksVersion?: unknown;
  subterraVersion?: unknown;
  governanceVersion?: unknown;
}

/**
 * Minimal YAML item-block parser for subterra.manifest.yaml `items:`.
 */
export function parseManifestItems(text: string): ManifestItem[] {
  const items: ManifestItem[] = [];
  const chunk = text.split(/\nitems:\s*\n/)[1];
  if (!chunk) return items;

  // Normalize CRLF so ^/$ line anchors behave consistently.
  const normalized = chunk.replace(/\r\n/g, "\n");
  const blocks = normalized.split(/\n(?=  - id:)/);
  for (const block of blocks) {
    if (!/^\s*- id:/.test(block) && !block.includes("- id:")) continue;
    const get = (key: string): string | null => {
      const pattern =
        key === "id"
          ? /^[ \t]*-[ \t]+id:[ \t]*(.+)$/m
          : new RegExp(`^[ \\t]+${key}:[ \\t]*(.+)$`, "m");
      const m = block.match(pattern);
      if (!m) return null;
      let v = m[1]!.trim();
      // strip inline comments
      const hash = v.indexOf(" #");
      if (hash >= 0) v = v.slice(0, hash).trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      if (v === "null") return null;
      return v;
    };
    const id = get("id");
    if (!id) continue;
    items.push({
      id,
      appCode: get("appCode"),
      name: get("name"),
      repo: get("repo"),
      localPath: get("localPath"),
      role: get("role"),
      status: get("status") ?? "unknown",
    });
  }
  return items;
}

/**
 * Resolve a manifest item to a local checkout directory.
 *
 * Tries, in order: the manifest `localPath`, its junction/legacy fallbacks,
 * and the repo-name directory. Cloud multi-repo environments clone each repo
 * under its own repo name (e.g. `Blocks`, `subterra-shell`) as a sibling of
 * governance, which never matches the `apps/…` / `Packages/…` layouts, so the
 * `repo` slug is the reliable fallback there.
 *
 * @returns absolute path to a directory that exists, or null
 */
export function resolveLocalCheckout(
  localPath: string,
  repo: string | null = null,
): string | null {
  if (localPath === "governance" || localPath === ".") {
    return govRoot;
  }
  const candidates: string[] = [];
  if (localPath) {
    candidates.push(...(PATH_FALLBACKS[localPath] ?? [localPath]));
  }
  const repoName = repo?.split("/").pop();
  if (repoName) candidates.push(repoName);
  for (const rel of candidates) {
    const abs = rel === "." ? govRoot : join(metaRoot, rel);
    if (existsSync(abs)) return abs;
  }
  return null;
}

function readPackageJson(repoRoot: string): PackageJson | null {
  const p = join(repoRoot, "package.json");
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, "utf8")) as PackageJson;
  } catch {
    return null;
  }
}

function readDisplayBatch(
  repoRoot: string,
  pkg: PackageJson | null,
): string | null {
  // Prefer ROADMAP (human source of truth) over possibly stale package fields.
  const roadmapPath = join(
    repoRoot,
    "Docs/Working Docs-Features-Incidents/ROADMAP.md",
  );
  if (existsSync(roadmapPath)) {
    const roadmap = readFileSync(roadmapPath, "utf8");
    const release = roadmap.match(/\*\*Release:\*\*\s*(v[\d.]+)/)?.[1];
    const rows = parseBatchLogRows(roadmap);
    if (release) {
      const prefix = release.replace(/^v/, "");
      let best: string | null = null;
      let bestN = -1;
      for (const row of rows) {
        const m = row.batch.match(/^v([\d.]+)b(\d+)$/);
        if (!m || m[1] !== prefix) continue;
        const n = parseInt(m[2]!, 10);
        if (n > bestN) {
          bestN = n;
          best = row.batch;
        }
      }
      if (best) return best;
      return release;
    }
    if (rows[0]?.batch) return rows[0].batch;
  }

  const displayKeys = [
    "subterraShellVersion",
    "blocksVersion",
    "subterraVersion",
    "governanceVersion",
  ] as const;
  for (const key of displayKeys) {
    const v = pkg?.[key];
    if (typeof v === "string" && /^v\d+\.\d+\.\d+/.test(v)) return v;
  }

  // Derive vYY.MM.DD from npm 26.8.4 or 26.8.4-b1
  const npm = pkg?.version;
  if (typeof npm === "string") {
    const m = npm.match(/^(\d+)\.(\d+)\.(\d+)(?:-b(\d+))?/);
    if (m) {
      const yy = String(m[1]).padStart(2, "0");
      const mm = String(m[2]).padStart(2, "0");
      const dd = String(m[3]).padStart(2, "0");
      const batch = m[4] ? `b${m[4]}` : "";
      return `v${yy}.${mm}.${dd}${batch}`;
    }
  }

  // Python products (e.g. Mailbot) — pyproject.toml
  const pyproject = join(repoRoot, "pyproject.toml");
  if (existsSync(pyproject)) {
    const text = readFileSync(pyproject, "utf8");
    const ver =
      text.match(/^version\s*=\s*"([^"]+)"/m)?.[1] ??
      text.match(/\[project\][\s\S]*?^version\s*=\s*"([^"]+)"/m)?.[1];
    if (ver) {
      const m = ver.match(/^(\d+)\.(\d+)\.(\d+)/);
      if (m) {
        return `v${String(m[1]).padStart(2, "0")}.${String(m[2]).padStart(2, "0")}.${String(m[3]).padStart(2, "0")}`;
      }
      return ver;
    }
  }

  return null;
}

function readGitBranch(repoRoot: string): string | null {
  try {
    return (
      execFileSync("git", ["-C", repoRoot, "branch", "--show-current"], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim() || null
    );
  } catch {
    return null;
  }
}

export function collectRow(item: ManifestItem): FleetApp {
  const checkout = resolveLocalCheckout(item.localPath ?? "", item.repo);
  if (!checkout) {
    return {
      appCode: item.appCode,
      id: item.id,
      name: item.name,
      role: item.role,
      repo: item.repo,
      localPath: item.localPath,
      status: item.status,
      display: null,
      npm: null,
      branch: null,
      checkout: null,
      note: "local checkout not found",
    };
  }

  const pkg = readPackageJson(checkout);
  let npm: unknown = pkg?.version ?? null;
  if (!npm) {
    const pyproject = join(checkout, "pyproject.toml");
    if (existsSync(pyproject)) {
      const text = readFileSync(pyproject, "utf8");
      npm =
        text.match(/^version\s*=\s*"([^"]+)"/m)?.[1] ??
        text.match(/\[project\][\s\S]*?^version\s*=\s*"([^"]+)"/m)?.[1] ??
        null;
    }
  }
  return {
    appCode: item.appCode,
    id: item.id,
    name: item.name,
    role: item.role,
    repo: item.repo,
    localPath: item.localPath,
    status: item.status,
    display: readDisplayBatch(checkout, pkg),
    npm: npm as string | number | boolean | null,
    branch: readGitBranch(checkout),
    checkout,
    note: pkg || npm ? null : "no package.json / pyproject version",
  };
}

export function buildFleet(): FleetSnapshot {
  const manifestPath = join(govRoot, "subterra.manifest.yaml");
  const manifestText = readFileSync(manifestPath, "utf8");
  const items = parseManifestItems(manifestText);

  const byCode = new Map<string, FleetApp>();

  // Governance is not a marketplace item — always first.
  byCode.set(
    "GV",
    collectRow({
      id: "governance",
      appCode: "GV",
      name: "Governance",
      repo: "SubTerraCo/subterra-governance",
      localPath: "governance",
      role: "governance",
      status: "linked",
    }),
  );

  for (const item of items) {
    if (!item.appCode) continue;
    // Prefer first occurrence (shell ST before duplicate paths)
    if (byCode.has(item.appCode)) continue;
    byCode.set(item.appCode, collectRow(item));
  }

  const preferredOrder = [
    "GV",
    "ST",
    "NX",
    "BK",
    "MB",
    "BB",
    "TK",
    "AT",
    "WL",
  ];
  const apps: FleetApp[] = [];
  for (const code of preferredOrder) {
    const row = byCode.get(code);
    if (row) {
      apps.push(row);
      byCode.delete(code);
    }
  }
  for (const row of byCode.values()) apps.push(row);

  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    source: "local-meta-workspace",
    metaRoot,
    apps,
  };
}

export function renderVersionsMarkdown(fleet: FleetSnapshot): string {
  const lines = [
    "# SubTerra fleet versions",
    "",
    "> Generated by `pnpm versions:fleet` from local meta-workspace checkouts.",
    `> **Generated:** ${fleet.generatedAt}`,
    "> Each repo stamps independently (constitution §4). This file is an aggregate dashboard only.",
    "",
    "| APP | Name | Display | npm | Branch | Status | Repo |",
    "|-----|------|---------|-----|--------|--------|------|",
  ];

  for (const a of fleet.apps) {
    lines.push(
      `| ${a.appCode ?? "—"} | ${a.name ?? "—"} | ${a.display ?? "—"} | ${a.npm ?? "—"} | ${a.branch ?? "—"} | ${a.status ?? "—"} | ${a.repo ?? "—"} |`,
    );
  }

  lines.push(
    "",
    "## Notes",
    "",
    "- **Display** is `vYY.MM.DDbX` from package display field or ROADMAP batch log.",
    "- **npm** is `package.json` `version` (Electron / npm semver form).",
    "- Rows with Display/npm `—` usually mean the local checkout is missing or not yet on the SubTerra stamp.",
    "- Refresh: `pnpm versions:fleet` from `governance/`.",
    "",
  );
  return `${lines.join("\n")}`;
}

interface FleetFile {
  schemaVersion?: unknown;
  apps?: Array<Record<string, unknown>>;
}

function validateFleetFile(path: string): void {
  if (!existsSync(path)) {
    console.error(`Missing ${path} — run pnpm versions:fleet`);
    process.exit(1);
  }
  const fleet = JSON.parse(readFileSync(path, "utf8")) as FleetFile;
  if (fleet.schemaVersion !== 1) {
    console.error("fleet.json schemaVersion must be 1");
    process.exit(1);
  }
  if (!Array.isArray(fleet.apps) || fleet.apps.length === 0) {
    console.error("fleet.json apps[] is empty");
    process.exit(1);
  }
  const required = ["appCode", "name", "status"] as const;
  for (const row of fleet.apps) {
    for (const key of required) {
      if (row[key] == null || row[key] === "") {
        console.error(`fleet.json row missing ${key}:`, row);
        process.exit(1);
      }
    }
  }
  const gv = fleet.apps.find((a) => a.appCode === "GV");
  if (!gv) {
    console.error("fleet.json must include APP GV");
    process.exit(1);
  }
  console.log(`versions/fleet.json OK (${fleet.apps.length} apps)`);
}

function main(): void {
  const check = process.argv.includes("--check");
  if (check) {
    validateFleetFile(fleetPath);
    return;
  }

  const fleet = buildFleet();
  mkdirSync(dirname(fleetPath), { recursive: true });
  writeFileSync(fleetPath, `${JSON.stringify(fleet, null, 2)}\n`, "utf8");
  writeFileSync(mdPath, renderVersionsMarkdown(fleet), "utf8");

  console.log(`Wrote ${fleetPath}`);
  console.log(`Wrote ${mdPath}`);
  for (const a of fleet.apps) {
    const mark = a.display || a.npm ? "ok" : "—";
    console.log(
      `  ${a.appCode!.padEnd(3)}  ${mark.padEnd(4)}  display=${a.display ?? "—"}  npm=${a.npm ?? "—"}  branch=${a.branch ?? "—"}`,
    );
  }
}

const invokedPath = process.argv[1];
const isMain =
  invokedPath !== undefined &&
  resolve(invokedPath) === resolve(fileURLToPath(import.meta.url));

if (isMain) {
  main();
}
