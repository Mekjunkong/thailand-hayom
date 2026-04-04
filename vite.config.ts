import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
// vite-plugin-manus-runtime removed — not needed outside Manus AI environment

const plugins = [react(), tailwindcss(), jsxLocPlugin()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    allowedHosts: [
      // Manus AI hosts removed — not needed outside Manus AI environment
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    watch: {
      usePolling: false,
      interval: 1000,
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/attached_assets/**']
    },
  },
});
