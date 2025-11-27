/* eslint-disable @typescript-eslint/no-require-imports */
// This file normally doesn't exist
// This file is used to configure the Metro bundler
// So what is that? If you want to use react-native-svg-transformer with Expo,
// you need to configure the Metro bundler to use the transformer provided by react-native-svg-transformer.

const { getDefaultConfig } = require('expo/metro-config');
const { withStorybook } = require('@storybook/react-native/metro/withStorybook');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  // Wrap Metro with Storybook so we can serve the on-device UI alongside the app.
  return withStorybook(config, {
    // Flip this to true to include Storybook in the bundle; keep false for pure app builds.
    enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true',
    configPath: './.rnstorybook',
  });
})();
