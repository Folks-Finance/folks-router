import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  splitting: true,
  clean: true,
  dts: true,
  sourcemap: true,
  skipNodeModulesBundle: true,
  format: ["cjs", "esm"],
  target: "es2020",
});
