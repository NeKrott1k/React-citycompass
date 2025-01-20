import globals from "globals"
import pluginJs from "@eslint/js"
import pluginReact from "eslint-plugin-react"
import pluginPrettier from "eslint-plugin-prettier"
/** @type {import('eslint').Linter.config[]}  */
export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["/*.js", "/*.jsx"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "prettier/prettier": "error",
    },
    plugins: {
      prettier: pluginPrettier,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]
