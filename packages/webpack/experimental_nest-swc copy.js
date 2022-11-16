const base = require('./base');

// TODO: this was just a test with the swc-loader and NestJS
// It works perfectly, but we cannot use the graphql cli plugin

module.exports = {
  ...base,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: 'swc-loader',
          options: {
            jsc: {
              target: 'es2020',
              paths: {
                '~/*': ['./src/*'],
                '~test-sdk': ['tests/test-sdk.ts'],
              },
              parser: {
                syntax: 'typescript',
                decorators: true,
                decoratorsBeforeExport: true,
              },
              transform: {
                legacyDecorator: true,
                decoratorMetadata: true,
              },
            },
          },
        },
      },
    ],
  },
};
