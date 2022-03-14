import { RemixI18Next, FileSystemBackend } from 'remix-i18next';

// You will need to provide a backend to load your translations, here we use the
// file system one and tell it where to find the translations.
const backend = new FileSystemBackend(`./public/locales`);

export const i18n = new RemixI18Next(backend, {
  fallbackLng: `en`, // here configure your default (fallback) language
  supportedLanguages: [`en`, `es`], // here configure your supported languages
});
