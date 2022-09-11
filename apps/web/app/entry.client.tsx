import i18next from 'i18next';
import { hydrate } from 'react-dom';
import { initReactI18next } from 'react-i18next';
import { RemixBrowser } from '@remix-run/react';
import { ThemeProvider } from '~/styles/ThemeProvider';
import { CssBaseline } from '@mui/material';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ClientCacheProvider } from './styles/ClientCacheProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { GlobalStyles } from './styles';
import { getInitialNamespaces } from 'remix-i18next';
import Backend from 'i18next-fs-backend';
import { i18nConfig } from './i18n';
import { SidebarProvider } from './components/AppBar/Sidebar.context';

// intialize i18next using initReactI18next and configuring it
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ns: getInitialNamespaces(),
    backend: {
      ...i18nConfig,
    },
    detection: {
      order: ['htmlTag'],
    },
    supportedLngs: [`en`, `es`],
    defaultNS: `common`,
    fallbackLng: `en`,
    // I recommend you to always disable react.useSuspense for i18next
    react: { useSuspense: false },
  })
  .then(() => {
    const ClientApp = (
      <ClientCacheProvider>
        <ThemeProvider>
          <SidebarProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              <GlobalStyles />
              <RemixBrowser />
            </LocalizationProvider>
          </SidebarProvider>
        </ThemeProvider>
      </ClientCacheProvider>
    );
    // TODO: switch to hydrateRoot when remix works with, as we get hydration errors currently in cypress
    return hydrate(ClientApp, document);
  });
