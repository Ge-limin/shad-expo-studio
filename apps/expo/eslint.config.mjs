// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import eslintConfigBase from '@studio/eslint-config/base.js';

export default [
  // Global ignores: generated/build output. Must stay a pure `ignores` object
  // — adding any other key makes the ignores file-scoped instead of global.
  {
    ignores: [
      '**/.rnstorybook/storybook.requires.ts',
      '**/node_modules',
      'dist',
      'build',
      'ios',
      'android',
      'storybook-static',
      '.expo',
    ],
  },
  ...eslintConfigBase,
  {
    languageOptions: {
      globals: {
        __DEV__: true,
      },
    },
  },
  ...storybook.configs["flat/recommended"],
];
