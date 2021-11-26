module.exports = function (api) {
  api.cache(true);
  const presets = [
    'next/babel',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
      },
    ],
  ];

  const plugins = [];

  if (process.env.CYPRESS === 'true') {
    plugins.push([
      'istanbul',
      {
        include: ['**/*.ts', '**/*.tsx'],
      },
    ]);
  }

  return {
    presets,
    plugins,
  };
};
