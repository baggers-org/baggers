import Backend from 'i18next-fs-backend';
import { join, resolve } from 'path';
import { RemixI18Next } from 'remix-i18next';
import { i18nConfig } from '../i18n';

export const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18nConfig.supportedLanguages,
    fallbackLanguage: i18nConfig.fallbackLng,
  },
  i18next: {
    ...i18nConfig,
    backend: {
      loadPath: resolve(
        join(__dirname, '../public/locales/{{lng}}/{{ns}}.json')
      ),
    },
  },
  backend: Backend,
});
