// You will need to provide a backend to load your translations, here we use the
// file system one and tell it where to find the translations.
export const i18nConfig = {
  fallbackLng: `en`, // here configure your default (fallback) language
  supportedLanguages: [`en`, `es`], // here configure your supported languages
  react: { useSuspense: false },
};
