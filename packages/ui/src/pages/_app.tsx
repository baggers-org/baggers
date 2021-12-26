import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import { useRouteChangeLoading } from '@/hooks';
import '../lib/setupAmplify';
import createEmotionCache from '@/styles/createEmotionCache';
import theme from '@/styles/theme';
import { BaggersPageComponent } from '@/views/types';
import { Layout, PageLoadingOverlay } from '@/components';
import { createApolloClient } from '@/lib/ApolloClient';
import { CacheProvider, EmotionCache } from '@emotion/react';

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
  const routeChangeLoading = useRouteChangeLoading();

  const getComponent = () => {
    if (routeChangeLoading) {
      return <PageLoadingOverlay />;
    }

    return <Component {...pageProps} />;
  };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Baggers</title>
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <ApolloProvider client={client}>
            {Component.withoutAppBar ? (
              getComponent()
            ) : (
              <Layout>{getComponent()}</Layout>
            )}
          </ApolloProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(Baggers);
