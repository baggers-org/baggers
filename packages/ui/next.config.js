const { i18n } = require(`./next-i18next.config`);

module.exports = {
  async redirects() {
    return [
      {
        source: `/portfolios`,
        destination: `/portfolios/created`,
        permanent: true,
      },
    ];
  },
  webpack: (config, { defaultLoaders }) => {
    // GraphQL let
    // Uses graphql-codegen to produce Apollo client queries
    config.module.rules.push({
      test: /\.document.gql$/,
      exclude: /node_modules/,
      use: [defaultLoaders.babel, `graphql-let/loader`],
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: `@svgr/webpack`,
    });
    return config;
  },
  i18n,
};
