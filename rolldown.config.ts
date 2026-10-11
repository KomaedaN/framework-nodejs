import { defineConfig } from "rolldown";
import run from "@rollup/plugin-run";

const isDev = process.env["ROLLDOWN_WATCH"] === "true";

export default defineConfig({
  platform: "node",
  input: "apps/api/src/test.kernel.ts",
  output: {
    file: "dist/index.js",
  },
  plugins: [isDev && run()],
});
