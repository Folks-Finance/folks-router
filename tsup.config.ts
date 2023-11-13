import { defineConfig } from 'tsup'



export default defineConfig({
  entry: ["src/**/*"],
  splitting: true,
  clean: true,
  dts: true,
  sourcemap: true,
  skipNodeModulesBundle: true,
  format: ["cjs", "esm"],
  target: "es2020",
});