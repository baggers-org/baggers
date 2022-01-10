import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import '../lib/setupAmplify';
import createEmotionCache from '@/styles/createEmotionCache';
import theme from '@/styles/theme';
import { BaggersPageComponent } from '@/views/types';
import { createApolloClient } from '@/lib/ApolloClient';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { LicenseInfo } from '@mui/x-data-grid-pro';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

LicenseInfo.setLicenseKey(
  `4a6b8c9caa0a5fc46de58b6ff509111cT1JERVI6MzUwNTUsRVhQSVJZPTE2NzI0MjUwMzUwMDAsS0VZVkVSU0lPTj0x`,
);

const client = createApolloClient({});
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function Baggers({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & {
  Component: BaggersPageComponent<any>;
  emotionCache?: EmotionCache;
}) {
  const getLayout = Component.getLayout || ((page) => <>{page}</>);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Baggers</title>
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <CssBaseline />
            <ApolloProvider client={client}>
              {getLayout(<Component {...pageProps} />)}
            </ApolloProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(Baggers);
