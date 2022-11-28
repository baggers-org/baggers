import { EntryContext } from '@remix-run/node';
import { createInstance } from 'i18next';
import Backend from 'i18next-fs-backend';
import { join, resolve } from 'path';
import { initReactI18next } from 'react-i18next';
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
        join(__dirname, '../../public/locales/{{lng}}/{{ns}}.json')
      ),
    },
  },
  backend: Backend as any,
});

export const setupI18nServer = async (
  request: Request,
  context: EntryContext
) => {
  // First, we create a new instance of i18next so every request will have a
  // completely unique instance and not share any state
  const instance = createInstance();

  // Then we could detect locale from the request
  const lng = await i18next.getLocale(request);
  // And here we detect what namespaces the routes about to render want to use
  const ns = i18next.getRouteNamespaces(context);

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .use(Backend) // Setup our backend
    .init({
      ...i18nConfig, // spread the configuration
      lng, // The locale we detected above
      ns, // The namespaces the routes about to render wants to use
      backend: {
        loadPath: resolve('../public/locales/{{lng}}/{{ns}}.json'),
      },
    });

  return instance;
};
