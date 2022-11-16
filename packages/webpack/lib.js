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
};
