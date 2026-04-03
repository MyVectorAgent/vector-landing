import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * IIFE bundle + classic script tags so the built site works when opened as `file://`
 * (browsers block or mishandle `type="module"` for local files).
 * https://bugs.chromium.org/p/chromium/issues/detail?id=824646
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  build: {
    outDir: "site",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        format: "iife",
        name: "VectorLanding",
        inlineDynamicImports: true,
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
