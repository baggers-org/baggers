const base = require('./app');
const process = require('process');
const path = require('path');

module.exports = {
  ...base,
  entry: path.resolve(process.cwd(), 'src/index.ts'),
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs',
    path: path.resolve(process.cwd(), 'build'),
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(
              process.cwd(),
              'tsconfig.lib.json'
            ),
          },
        },
      },
    ],
  },
};
