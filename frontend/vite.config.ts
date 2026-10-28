import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// A Vite MPA: each project receives actual, crawlable HTML metadata.
// React still powers every page; no Next.js or client-side router required.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const base = process.env.VITE_BASE_PATH || env.VITE_BASE_PATH || "/";
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(base)) {
    throw new Error("VITE_BASE_PATH must be / or a path such as /personal-portfolio/");
  }
  return {
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    rolldownOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        sentinel: resolve(import.meta.dirname, "projects/sentinel/index.html"),
        interceptiq: resolve(import.meta.dirname, "projects/interceptiq/index.html"),
        focusmate: resolve(import.meta.dirname, "projects/focusmate/index.html"),
      },
    },
  },
  };
});
