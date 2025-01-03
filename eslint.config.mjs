import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"], // Include .mjs files along with js, ts, cjs
    languageOptions: {
      globals: globals.browser, // Enable browser globals
    },
    plugins: ["@typescript-eslint"], // Add TypeScript plugin to support TypeScript linting
    rules: {
      // Allow any type in TypeScript files
      "@typescript-eslint/no-explicit-any": "off", // Disable the rule disallowing 'any'
    },
  },
  pluginJs.configs.recommended, // Recommended configuration for JavaScript
  ...tseslint.configs.recommended, // Recommended configuration for TypeScript
];
