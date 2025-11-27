/* eslint-disable @typescript-eslint/no-require-imports */
// This file normally doesn't exist
// This file is used to configure the Metro bundler
// So what is that? If you want to use react-native-svg-transformer with Expo,
// you need to configure the Metro bundler to use the transformer provided by react-native-svg-transformer.

const { getDefaultConfig } = require('expo/metro-config');

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

  return config;
})();
