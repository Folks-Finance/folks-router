const path = require("path");

const commonTypescriptRules = {
  "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
  "@typescript-eslint/dot-notation": "error",
  "@typescript-eslint/no-inferrable-types": "error",
  "@typescript-eslint/no-unnecessary-condition": "error",
  "@typescript-eslint/no-unnecessary-type-assertion": "error",
  "@typescript-eslint/no-unused-vars": "error",
  "@typescript-eslint/prefer-as-const": "error",
  "@typescript-eslint/prefer-ts-expect-error": "error",
};

/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  env: { node: true, browser: true, es2022: true },
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  extends: [
    "eslint:recommended",
    "plugin:astro/recommended",
    "plugin:astro/jsx-a11y-recommended",
    "plugin:tailwindcss/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "prettier",
  ],
  plugins: ["import", "simple-import-sort", "unicorn"],
  rules: {
    "import/extensions": ["error", "ignorePackages", { js: "never", jsx: "never", ts: "never", tsx: "never" }],
    "import/no-cycle": "warn",
    "import/no-duplicates": ["error"],
    "import/no-named-as-default": "off",
    "import/no-unresolved": ["error", { ignore: ["~icons/*", "astro:assets", "astro:transitions"] }],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "type"],
        "newlines-between": "always",
        alphabetize: { order: "asc" },
      },
    ],
    "import/prefer-default-export": "off",
    "unicorn/filename-case": ["error", { case: "kebabCase" }],
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
        sourceType: "module",
      },
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        ...commonTypescriptRules,
      },
    },
    {
      files: ["*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        ...commonTypescriptRules,
      },
    },
    {
      files: ["*.d.ts"],
      rules: {
        "@typescript-eslint/triple-slash-reference": "off",
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ["**/*.astro/*.js", "*.astro/*.js"],
      parser: "@typescript-eslint/parser",
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      [require.resolve("eslint-import-resolver-node")]: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      [require.resolve("eslint-import-resolver-typescript")]: {
        alwaysTryTypes: true,
      },
    },
    tailwindcss: {
      callees: ["cn"],
      config: path.join(__dirname, "tailwind.config.ts"),
      whitelist: ["card", "card\\-content"],
    },
  },
};

module.exports = config;
