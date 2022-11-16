const process = require('process');
const path = require('path');

module.exports = {
  target: 'node',
  entry: path.resolve(process.cwd(), 'src/main.ts'),
  output: {
    filename: 'main.js',
    libraryTarget: 'commonjs',
    path: path.resolve(process.cwd(), 'build'),
  },
  mode:
    process.env.NODE_ENV === 'production'
      ? 'production'
      : 'development',
  externals: [/^(?!\.|\/|@baggers).+/i],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
              'tsconfig.build.json'
            ),
          },
        },
      },
    ],
  },
};
