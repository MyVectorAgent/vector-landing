# Vector — static landing (GitHub Pages)

**GitHub Pages serves only static files** (HTML, CSS, JS, images). There is no Node or npm on the server.

## What to deploy

The **deployable site** is everything in this folder **except** `source/`:

| Path | Purpose |
|------|--------|
| `index.html` | Entry |
| `assets/` | Single IIFE bundle (`index.js`); Tailwind/CSS is injected at runtime from JS |
| `vector-logo.png` | Favicon (from `source/public/`) |
| `.nojekyll` | Tells GitHub Pages not to run Jekyll on the build |

Push that tree to any static host or point GitHub Pages at a branch/folder that contains these files.

### Why double‑clicking `index.html` used to show a blank page

Vite’s default build uses `<script type="module">`. **Browsers block or ignore ES modules for `file://` URLs**, so nothing ran. The build uses an **IIFE** bundle and the publish step rewrites the tag to `<script defer src="./assets/index.js">` so opening the file from disk works. **GitHub Pages** serves over `https://`, where modules would work too — the classic script is fine either way.

If anything still fails locally, serve the folder over HTTP: `cd VECTOR_LANDING && npx --yes serve .` (or `python3 -m http.server 8080`).

**GitHub Pages branch settings** only allow publishing from the repository **root** or the **`/docs`** folder on `main` (or `gh-pages` branch). This repo keeps the static site under `VECTOR_LANDING/`. Typical options:

1. **Dedicated repo** — copy only the static files above (not `source/`) into a new repo’s root and enable Pages on that repo.
2. **`docs/` workflow** — copy those files into `/docs` at the repo root (or symlink/copy in your workflow), if you use the `/docs` Pages source.
3. **Keep `source/` in git** — it is only for rebuilding; it is not required at runtime.

## Rebuild from source (optional)

`source/` holds the Vite + React project used to regenerate the static files.

```bash
cd VECTOR_LANDING/source
npm install
npm run build
```

That runs `tsc`, `vite build`, then copies `source/site/` to the parent `VECTOR_LANDING/` root (`index.html`, `assets/`, etc.). Commit the updated static files if you want Pages to pick them up.

Local preview of the last build:

```bash
cd VECTOR_LANDING/source
npm run preview
```
