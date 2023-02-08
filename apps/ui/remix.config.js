/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  watchPaths: [
    '../../packages/ui-components/**/*.{ts,tsx}',
    '../../packages/tailwind/tailwind.config.js',
    '../../packages/ui-util/**/*.{ts,tsx}',
    '../../packages/sdk/**/*.{ts,tsx}',
  ],
  serverDependenciesToBundle: [
    /^@baggers\/.*/,
    'react-dnd',
    '@react-dnd/invariant',
    '@react-dnd/asap',
    '@react-dnd/shallowequal',
    'dnd-core',
    'react-dnd-html5-backend',
  ],
};
