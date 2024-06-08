import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jsdoc from "eslint-plugin-jsdoc";

export default [
  {
    ignores: ["dist"],
  },
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: {
      jsdoc,
    },
    rules: {
      "jsdoc/require-description": "warn",
    },
  },
  jsdoc.configs["flat/recommended"],
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
