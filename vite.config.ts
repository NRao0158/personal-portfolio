import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// A Vite MPA: each project receives actual, crawlable HTML metadata.
// React still powers every page; no Next.js or client-side router required.
export default defineConfig({
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
});
