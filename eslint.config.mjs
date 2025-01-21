import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'], // Проверяем только файлы в папке src
    ignores: ['./build/**'], // Игнорируем папку build
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': ts,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        React: true,
        JSX: true,
      },
    },
    rules: {
      'react/prop-types': 0,
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'indent': ['error', 2],
      'quotes': ['off', 'single'],
      'semi': ['off', 'always'],
      'no-console': 'off',
      'no-alert': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];