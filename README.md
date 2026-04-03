# Vector — static landing (GitHub Pages)

**GitHub Pages has no Node.js.** Serving the site only requires static files (HTML, JS, images). **`node_modules` is never needed** for hosting or for previewing the built site—only run `npm install` inside `source/` when you want to **rebuild** the static output.

## What actually gets deployed

These paths at the **`VECTOR_LANDING/` root** are the full site:

| Path | Purpose |
|------|--------|
| `index.html` | Entry |
| `assets/` | Bundled JS and images referenced by the app |
| `vector-logo.png` | Favicon (also duplicated under `assets/` as needed) |
| `.nojekyll` | Disables Jekyll on GitHub Pages |

Everything else here is optional for deployment:

- **`source/`** — Vite + React project used only to regenerate the files above. It is **not** served by GitHub Pages. Do not copy `source/` into a minimal Pages-only repo unless you want to keep rebuild tooling there.

- **`source/node_modules/`** and **`source/site/`** — Created by `npm install` / `npm run build`. They are gitignored and should not be committed; they are not part of the static site.

## Preview the static site (no npm required)

From this folder, serve over HTTP (matches how Pages behaves better than `file://` alone):

```bash
cd VECTOR_LANDING
npx --yes serve .
```

Or: `python3 -m http.server 8080` then open `http://localhost:8080`.

### Why `file://` used to break

The published `index.html` uses a classic `<script defer src="./assets/index.js">` and an IIFE bundle so the site can work when opened from disk. Raw Vite `type="module"` output does not run from `file://` in most browsers.

## Rebuild from source (developers only)

```bash
cd VECTOR_LANDING/source
npm install
npm run build
```

That writes to `source/site/` briefly, then copies the published files to `VECTOR_LANDING/` (see `source/scripts/publish-static.mjs`). Commit the updated root `index.html` and `assets/` if you want Pages to update.

## Repo layout vs GitHub Pages settings

Pages can publish from the repo **root** or **`/docs`**. This monorepo keeps the static tree under **`VECTOR_LANDING/`**. To use Pages on `main`, either point Pages at this folder (if your host allows subfolder deploy), copy these static files to `/docs` or a dedicated repo root, or use an Action that uploads only the root files above.
