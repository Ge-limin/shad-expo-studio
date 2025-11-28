import type {
  AliasOptions,
  StorybookConfig,
} from '@storybook/react-native-web-vite';
import { createRequire } from 'module';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const require = createRequire(import.meta.url);

// Resolve react-native-web relative to the Expo app, so Vite can load it when bundling package stories.
const expoRoot = fileURLToPath(new URL('..', import.meta.url));
const reactNativeWebEntry = require.resolve('react-native-web', {
  paths: [expoRoot],
});

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../.rnstorybook/stories/auto/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: getAbsolutePath('@storybook/react-native-web-vite'),
  viteFinal: async (config) => {
    const existingAlias = config.resolve?.alias ?? [];
    const aliasArray: AliasOptions[] = Array.isArray(existingAlias)
      ? existingAlias
      : Object.entries(existingAlias).map(([find, replacement]) => ({
          find,
          replacement,
        }));

    aliasArray.push(
      { find: 'react-native', replacement: reactNativeWebEntry },
      { find: 'react-native-web', replacement: reactNativeWebEntry },
    );

    // Ensure workspace packages resolve react-native/react-native-web to the Expo-installed copy,
    // since their imports are outside the app root where node resolution would otherwise fail.
    const reactNativeWebPlugin = {
      name: 'force-react-native-web-alias',
      enforce: 'pre' as const,
      resolveId(source: string) {
        if (source === 'react-native' || source === 'react-native-web') {
          return reactNativeWebEntry;
        }
        return null;
      },
    };

    return {
      ...config,
      plugins: [...(config.plugins ?? []), reactNativeWebPlugin],
      resolve: {
        ...(config.resolve ?? {}),
        alias: aliasArray,
      },
    };
  },
};
export default config;
