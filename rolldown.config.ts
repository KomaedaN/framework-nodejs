import { defineConfig } from "rolldown";

export default defineConfig({
  platform: "node",
  input: "apps/api/src/test.kernel.ts",
  output: {
    file: "dist/index.js",
  },
});
