const path = require(`path`);
const {esbuildDecorators } = require('@anatine/esbuild-decorators')

require(`esbuild`)
  .build({
    entryPoints: [path.join(__dirname, `../src/index.ts`)],
    bundle: true,
    outfile: path.join(__dirname, `../build/index.js`),
    platform: `node`,
    watch: process.argv.includes('--watch'),
    plugins: [
      esbuildDecorators()
    ]

  })
  .catch(() => process.exit(1));
