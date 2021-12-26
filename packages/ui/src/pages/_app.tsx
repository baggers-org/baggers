import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material';
import Head from 'next/head';

import theme from '@/styles/theme';
import { BaggersPageComponent } from '@/views/types';
import { Layout, PageLoadingOverlay } from '@/components';
import { createApolloClient } from '@/lib/ApolloClient';
import { useRouteChangeLoading } from '@/hooks';
import { appWithTranslation } from 'next-i18next';
import '../lib/setupAmplify';

const client = createApolloClient({});

function Baggers({
  Component,
  pageProps,
}: AppProps & { Component: BaggersPageComponent<any> }) {
  const routeChangeLoading = useRouteChangeLoading();

  const getComponent = () => {
    if (routeChangeLoading) {
      return <PageLoadingOverlay />;
    }

    return <Component {...pageProps} />;
  };

  return (
    <>
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
    </>
  );
}

export default appWithTranslation(Baggers);
