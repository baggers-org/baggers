const app = require('./app');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const {
  RunScriptWebpackPlugin,
} = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...app,
    entry: [options.entry],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(
                process.cwd(),
                'tsconfig.build.json'
              ),
              getCustomTransformers: (program) => ({
                before: [
                  require('@nestjs/graphql/plugin').before(
                    {},
                    program
                  ),
                ],
              }),
            },
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: 'tsconfig.build.json',
        }),
      ],
    },
    externals: [
      /^(?!\.|\/|@baggers|~).+/i,
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [...options.plugins],
  };
};
