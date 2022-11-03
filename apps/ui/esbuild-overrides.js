/* eslint-disable */
const esbuild = require(`esbuild`);
const Module = require(`module`);
const svgrPlugin = require(`esbuild-plugin-svgr`);

const originalRequire = Module.prototype.require;
const originalBuild = esbuild.build;

const build = (options) =>
  originalBuild({
    ...options,
    // add in your overrides here, making sure to preserve original nested options., e.g.
    plugins: [...options.plugins, svgrPlugin()],
  });

Module.prototype.require = function (id) {
  // when remix requires esbuild, it will get our modified build function from above
  if (id === `esbuild`) {
    return { ...esbuild, build };
  }
  return originalRequire.apply(this, arguments);
};
