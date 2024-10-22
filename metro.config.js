/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('expo/metro-config');

// Get the default Metro configuration
const config = getDefaultConfig(__dirname);
const { transformer, resolver } = config;

// Update the transformer to handle SVG files using 'react-native-svg-transformer'
config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

// Update the resolver to include TTF files and handle SVGs correctly
config.resolver = {
  ...resolver,
  assetExts: [...resolver.assetExts, 'ttf'], // Include TTF files
  sourceExts: [...resolver.sourceExts, 'svg'], // Handle SVG files
};

module.exports = config;