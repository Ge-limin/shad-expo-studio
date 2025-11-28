/** @typedef  {import("prettier").Config} PrettierConfig */
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sortImportsPlugin = require.resolve(
  '@trivago/prettier-plugin-sort-imports',
);
const tailwindPlugin = require.resolve('prettier-plugin-tailwindcss');

/** @type { PrettierConfig } */
const config = {
  tabWidth: 2,
  useTabs: false,
  semi: true,
  printWidth: 80,
  singleQuote: true,
  arrowParens: 'always',
  importOrder: [
    '/^(?!.*\\.css).*/',
    '^server-only$',
    '^react$',
    '^react-dom$',
    '^next$',
    '^next/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@studio/(.*)$', // package imports
    '^~/(.*)$', // app-specific imports
    '^[./]', // relative imports
  ],
  tailwindFunctions: ['tw', 'clsx', 'cn', 'cva'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [sortImportsPlugin, tailwindPlugin],
};

export default config;
