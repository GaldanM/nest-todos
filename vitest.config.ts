import swc from "unplugin-swc"
import { defineConfig } from "vitest/config"

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  test: {
    globals: true,
    root: "./",
    reporters: ["basic"],
  },
  plugins: [swc.vite()],
})
