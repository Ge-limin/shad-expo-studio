import eslintConfigBase from '@studio/eslint-config/base.js';

export default [
  ...eslintConfigBase,
  {
    ignores: ['**/node_modules', 'dist', 'build', 'ios', 'android'],
    languageOptions: {
      globals: {
        __DEV__: true,
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      // React Native Image components do not support `alt`, so disable the web-focused rule.
      'jsx-a11y/alt-text': 'off',
    },
  },
];
