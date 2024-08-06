// @ts-check

import eslint from "@eslint/js";
import globals from "globals";
import tsEslint from "typescript-eslint";
import vueEslint from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import styleEslint from "@stylistic/eslint-plugin";

export default tsEslint.config(
  {
    files: ["resources/js/**/*.{js,ts,vue}"],
    plugins: {
      stylistic: styleEslint
    },
    rules: {
      "stylistic/linebreak-style": ["error", "unix"],
      "stylistic/no-trailing-spaces": "error",
      "stylistic/indent": ["error", 2],
      "stylistic/quotes": "error",
      "stylistic/semi": "error",
      "stylistic/key-spacing": "error",
      "stylistic/max-len": ["error", { "code": 120 }],
    }
  },
  {
    files: ["resources/js/**/*.js"],
    extends: [eslint.configs.recommended],
  },
  {
    files: ["resources/js/**/*.vue", "resources/js/**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommended
    ],
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    }
  },
  {
    files: ["resources/js/**/*.vue"],
    languageOptions: { // - Substitute the TS Parser for the Vue parser
      parser: vueParser,
      parserOptions: { // - THEN use the TS parser here to handle the `<script>` section
        parser: tsEslint.parser,
        sourceType: "module"
      }
    },
    extends: [...vueEslint.configs["flat/recommended"]], // - Not technically type-compatible BUT it will be, and works for now
    rules: {
      "vue/first-attribute-linebreak": ["error", { "singleline": "ignore", "multiline": "beside" }],
      "vue/html-closing-bracket-newline": ["error", {
        "singleline": "never", "multiline": "never", "selfClosingTag": { "singleline": "never", "multiline": "never" }
      }],
      "vue/key-spacing": "error",
      "vue/max-attributes-per-line": "off",
      "vue/no-unused-emit-declarations": "error",
      "vue/no-unused-properties": ["error", {
        "groups": ["props", "data", "computed", "methods", "setup"], "deepData": false,
        "ignorePublicMembers": false, "unreferencedOptions": []
      }],
      "vue/object-curly-spacing": ["error", "always"],
      "vue/v-bind-style": ["error", "shorthand", { "sameNameShorthand": "always" }],
      "vue/singleline-html-element-content-newline": "off",
      "vue/block-order": ["error", { "order": ["template", "script", "style"] }],
      "vue/padding-line-between-blocks": ["error", "always"],
      "vue/require-typed-object-prop": "error"
    }
  },
  { // - Test-specific overridden config
    files: ["resources/Tests/**/*.spec.ts"],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off"
    }
  },
  { // - Global ignore
    ignores: ["public", "vendor", "*.d.ts"]
  }
);