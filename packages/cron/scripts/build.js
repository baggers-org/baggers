const path = require('path');

// TODO: remove when architect supports running cron with their sandbox
require('esbuild')
  .build({
    entryPoints: [path.join(__dirname, '../src/run.js')],
    bundle: true,
    outfile: path.join(__dirname, '../build/index.js'),
    platform: 'node',
    watch: process.argv.includes('--watch'),
  })
  .catch(() => process.exit(1));
