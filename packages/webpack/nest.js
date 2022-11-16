const lib = require('./lib');
module.exports = function (options) {
  return {
    ...options,
    externals: [...options.externals, ...lib.externals],
  };
};
