module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'inline-import',
      'react-native-reanimated/plugin',
      '@babel/plugin-transform-runtime', // Add this line
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            "@common": "./src/common",
            "@containers": "./src/containers",
            "@components": "./src/components",
            "@navigation": "./src/navigation",
            "@images": "./src/images",
            "@services": "./src/services",
            "@selectors": "./src/selectors",
            "@store": "./src/store",
            "@utils": "./src/utils",
            "@ExpoCustom": "./src/Expo",
            "@redux": "./src/redux-store",
            "@assets": "./assets",
            "@custom": "./src/components/Custom",
            "@cart": "./src/containers/Cart",
            "@app/*": "./src"
          },
        },
      ],
    ],
    env: {
      production: {
        plugins: [
          'transform-remove-console',
          [
            'babel-plugin-inline-import',
            {
              extensions: ['.svg'],
            },
          ],
        ],
      },
    },
  };
};
