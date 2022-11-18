import { RemixBrowser } from '@remix-run/react';
import i18next from 'i18next';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { i18nConfig } from './i18n';
import { getInitialNamespaces } from 'remix-i18next';

function hydrate() {
  i18next
    .use(initReactI18next) // Tell i18next to use the react-i18next plugin
    .use(LanguageDetector) // Setup a client-side language detector
    .use(Backend) // Setup your backend
    .init({
      // This function detects the namespaces your routes rendered while SSR use
      ...i18nConfig,
      ns: getInitialNamespaces(),
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      detection: {
        // Here only enable htmlTag detection, we'll detect the language only
        // server-side with remix-i18next, by using the `<html lang>` attribute
        // we can communicate to the client the language detected server-side
        order: ['htmlTag'],
        // Because we only use htmlTag, there's no reason to cache the language
        // on the browser, so we disable it
        caches: [],
      },
    })
    .then(() => {
      // After i18next has been initialized, we can hydrate the app
      // We need to wait to ensure translations are loaded before the hydration
      // Here wrap RemixBrowser in I18nextProvider from react-i18next
      return startTransition(() => {
        hydrateRoot(
          document,
          <StrictMode>
            <I18nextProvider i18n={i18next}>
              <RemixBrowser />
            </I18nextProvider>
          </StrictMode>
        );
      });
    });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
