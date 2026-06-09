import js from '@eslint/js';
import globals from 'globals';
import configPrettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  { ignores: ['public/build/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    plugins: { prettier: pluginPrettier },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prettier/prettier': 'warn',
    },
  },
  configPrettier,
];
