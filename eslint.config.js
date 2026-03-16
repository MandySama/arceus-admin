import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

import pluginPrettier from 'eslint-plugin-prettier'
import autoImport from './.eslintrc-auto-import.js'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,

  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      // https://prettier.io/docs/options
      'prettier/prettier': [
        'warn',
        {
          printWidth: 120,
          semi: false,
          singleQuote: true,
          trailingComma: 'es5',
          endOfLine: 'auto',
        },
      ],
      // https://eslint.vuejs.org/rules
      'vue/multi-word-component-names': 'off',
      'vue/valid-template-root': 'off',
      // https://eslint.org/docs/latest/rules
      'no-undef': 'error',
      'no-unused-vars': 'off',
    },
  },

  {
    languageOptions: {
      globals: {
        ...autoImport.globals,
        process: true,
      },
    },
  },
])
