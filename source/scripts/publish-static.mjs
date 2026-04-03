/**
 * Copies `source/site/` (Vite output) to `VECTOR_LANDING/` root so GitHub Pages
 * can serve static files only — no Node on the host.
 *
 * Rewrites the script tag: Vite emits `type="module"`, which most browsers refuse
 * to run from `file://`. The bundle is IIFE — use a classic `defer` script instead.
 */
import { cp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceDir = join(__dirname, "..");
const siteDir = join(sourceDir, "site");
const landingRoot = join(sourceDir, "..");

const rootOnly = ["index.html", "assets", "vector-logo.png", ".nojekyll"];

for (const name of rootOnly) {
  await rm(join(landingRoot, name), { recursive: true, force: true });
}

const entries = await readdir(siteDir, { withFileTypes: true });
for (const e of entries) {
  await cp(join(siteDir, e.name), join(landingRoot, e.name), { recursive: true });
}

const indexPath = join(landingRoot, "index.html");
let html = await readFile(indexPath, "utf8");
html = html.replace(
  /<script\s+type="module"\s+crossorigin\s+src="([^"]+)"><\/script>/,
  '<script defer src="$1"></script>',
);
await writeFile(indexPath, html, "utf8");

console.log("Published static files to VECTOR_LANDING/ (classic script for file:// + HTTPS).");
