import eslint from '@eslint/js';
import turboConfig from 'eslint-config-turbo/flat';
import tsEsLint from 'typescript-eslint';

export default tsEsLint.config(
  eslint.configs.recommended,
  tsEsLint.configs.recommended,
  turboConfig,
  {
    settings: {
      react: {
        version: '19.0',
      },
    },
    languageOptions: {
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  },
  {
    rules: {
      // TypeScript owns undefined-identifier checking; CJS config scripts use node globals.
      'no-undef': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      'turbo/no-undeclared-env-vars': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    ignores: [
      '**/node_modules',
      '**/database.types.ts',
      '**/public',
      '**/.cache',
      '**/.cache/**',
      'dist',
      'pnpm-lock.yaml',
    ],
  },
);
