// @ts-check

import eslint from "@eslint/js";
import globals from "globals";
import tsEslint from "typescript-eslint";
import vueEslint from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

export default tsEslint.config(
  {
    files: ["resources/js/**/*.js"],
    extends: [eslint.configs.recommended],
    rules: {
      "linebreak-style": ["error", "unix"],
      "no-trailing-spaces": "error",
      "indent": ["error", 2],
      "quotes": "error",
      "semi": "error"
    }
  },
  // @ts-ignore
  ...vueEslint.configs["flat/recommended"], // - Not currently type-compatible with Typescript-Eslint but otherwise works
  {
    files: ["resources/js/**/*.vue", "resources/js/**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.recommended
    ],
    rules: {
      "max-len": ["error", { "code": 120 }],
      "no-trailing-spaces": "error",
      "quotes": "off",
      "@typescript-eslint/quotes": "error",
      "semi": "off",
      "@typescript-eslint/semi": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    }
  },
  {
    files: ["resources/js/**/*.vue"],
    rules: {
      "vue/first-attribute-linebreak": ["error", { "singleline": "ignore", "multiline": "beside" }],
      "vue/html-closing-bracket-newline": ["error", {
        "singleline": "never", "multiline": "never", "selfClosingTag": { "singleline": "never", "multiline": "never" }
      }],
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/block-order": ["error", { "order": ["template", "script", "style"] }],
      "vue/padding-line-between-blocks": ["error", "always"],
      "vue/require-typed-object-prop": "error"
    }
  },
  {
    files: ["resources/js/**/*.ts"],
    rules: {
      "linebreak-style": ["error", "unix"],
      "indent": "off",
      "@typescript-eslint/indent": ["error", 2]
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
  {
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsEslint.parser,
        sourceType: "module"
      }
    }
  },
  { // - Global ignore
    ignores: ["public", "vendor", "*.d.ts"]
  }
);