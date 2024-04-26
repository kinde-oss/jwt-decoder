import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es", "cjs"],
      name: "@kinde/jwt-decoder",
      fileName: "jwt-decoder",
    },
    target: "modules",
    outDir: "../dist",
    emptyOutDir: true,
  },
  root: "lib",
  base: "",
  resolve: { alias: { src: resolve(__dirname, "./lib") } },
  plugins: [dts({ insertTypesEntry: true, outDir: "../dist" })],
});
