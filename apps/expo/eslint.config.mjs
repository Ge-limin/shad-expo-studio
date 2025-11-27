// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import eslintConfigBase from '@studio/eslint-config/base.js';

export default [
  // Drop the generated Storybook requires file from lint entirely.
  { ignores: ['**/.rnstorybook/storybook.requires.ts'] },
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
  ...storybook.configs["flat/recommended"],
];
