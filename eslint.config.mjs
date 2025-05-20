import js from "@eslint/js";
// import globals from "globals";
import tseslint from "typescript-eslint";
import angular from 'angular-eslint';
// import { defineConfig } from "eslint/config";
import prettier from 'eslint-plugin-prettier/recommended';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config({
  files: [
    "projects/byteark-player-angular/src/**/*.ts",
    "projects/sample/src/**/*.ts"
  ],
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    ...angular.configs.tsRecommended,
    prettier,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
  ],
  processor: angular.processInlineTemplates,
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreTrailingComments: true,
      },
    ],
    'newline-before-return': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
    'import/extensions': [
      'error',
      'never',
      {
        json: 'always',
      },
    ],
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/consistent-type-specifier-style.md
    // https://typescript-eslint.io/blog/consistent-type-imports-and-exports-why-and-how/
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md
    'import/newline-after-import': ['error'],
    'import/no-unresolved': [2, { commonjs: true }],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: [
          'projects/byteark-player-angular/tsconfig.lib.json',
          'projects/sample/tsconfig.app.json',
        ]
      },
      node: {
        typescript: true,
        extensions: ['.ts', '.json'],
      },
    },
  },
},
{
  files: [
    "projects/byteark-player-angular/src/**/*.html",
    "projects/sample/src/**/*.html"
  ],
  extends: [
    ...angular.configs.templateRecommended,
    ...angular.configs.templateAccessibility,
  ],
  rules: {
  },
});

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
//   tseslint.configs.recommended,
// ]);
