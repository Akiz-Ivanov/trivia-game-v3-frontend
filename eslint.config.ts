import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['tests/**/*.{test,spec}.{ts,tsx,js,jsx}'], // 👈 Matches your test files
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,     // Vitest runs in Node
        ...globals.jest,     // adds describe, it, expect, etc.
      },
    },
    rules: {
      // You can relax some rules in tests if you want
    },
  }
)