import i18next from 'i18next';
import { hydrate } from 'react-dom';
import { initReactI18next } from 'react-i18next';
import { RemixBrowser } from '@remix-run/react';
import { RemixI18NextProvider } from 'remix-i18next';
import { ThemeProvider } from '~/styles/ThemeProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import { ClientCacheProvider } from './styles/ClientCacheProvider';
import { GlobalStyles } from './styles';

// intialize i18next using initReactI18next and configuring it
i18next
  .use(initReactI18next)
  .init({
    supportedLngs: [`en`, `es`],
    defaultNS: `common`,
    fallbackLng: `en`,
    // I recommend you to always disable react.useSuspense for i18next
    react: { useSuspense: false },
  })
  .then(() =>
    // then hydrate your app wrapped in the RemixI18NextProvider
    hydrate(
      <ClientCacheProvider>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <GlobalStyles />
            <RemixI18NextProvider i18n={i18next}>
              <RemixBrowser />
            </RemixI18NextProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </ClientCacheProvider>,
      document,
    ),
  );
