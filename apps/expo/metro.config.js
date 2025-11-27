/* eslint-disable @typescript-eslint/no-require-imports */
// This file normally doesn't exist
// This file is used to configure the Metro bundler
// So what is that? If you want to use react-native-svg-transformer with Expo,
// you need to configure the Metro bundler to use the transformer provided by react-native-svg-transformer.

const path = require('path');
// Patch the Node tty module so debug (pulled in by expo-router/Storybook) doesn't explode.
try {
  const tty = require('tty');
  if (tty && typeof tty.isatty !== 'function') {
    tty.isatty = () => false;
  }
} catch {
  // Best-effort; Metro will fall back to the stub below.
}
const { getDefaultConfig } = require('expo/metro-config');
const { withStorybook } = require('@storybook/react-native/metro/withStorybook');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;
  const originalResolveRequest = resolver?.resolveRequest;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  };
  config.resolver = {
    ...resolver,
    extraNodeModules: {
      ...resolver?.extraNodeModules,
      // Ensure modules that expect Node's tty (e.g., debug) have a harmless stub.
      tty: path.join(__dirname, 'metro.tty.js'),
      // Force debug to use its browser build, which avoids tty entirely.
      debug: require.resolve('debug/src/browser.js'),
    },
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  // Wrap Metro with Storybook so we can serve the on-device UI alongside the app.
  const storybookConfig = withStorybook(config, {
    // Flip this to true to include Storybook in the bundle; keep false for pure app builds.
    enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true',
    configPath: './.rnstorybook',
  });

  // withStorybook can override resolver; ensure tty stub stays applied.
  storybookConfig.resolver = {
    ...storybookConfig.resolver,
    extraNodeModules: {
      ...(storybookConfig.resolver?.extraNodeModules ?? {}),
      tty: path.join(__dirname, 'metro.tty.js'),
      debug: require.resolve('debug/src/browser.js'),
    },
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName === 'tty' || moduleName === 'node:tty') {
        return {
          type: 'sourceFile',
          filePath: path.join(__dirname, 'metro.tty.js'),
        };
      }
      if (originalResolveRequest) {
        return originalResolveRequest(context, moduleName, platform);
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  };

  return storybookConfig;
})();
