const { i18n } = require('../next-i18next.config');

module.exports = {
  defaultNamespace: 'common',
  locales: i18n.locales,
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  sort: true,
  failOnWarnings: true,
};
