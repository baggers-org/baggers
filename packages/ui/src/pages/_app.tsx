import * as React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from '@/lib/ApolloClient';
import Amplify, { Auth } from 'aws-amplify';
import theme from '@/styles/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import GlobalCss from '@/styles/globals';
import { SnackbarProvider } from 'notistack';
import Head from 'next/head';
import useRouteChangeLoading from '@/hooks/useRouteChangeLoading/useRouteChangeLoading';
import PageLoadingOverlay from '@/components/PageLoadingOverlay/PageLoadingOverlay';
import { BaggersPageComponent } from '@/views/types';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import awsconfig from '../aws-exports';

Amplify.configure({
  ...awsconfig,
  ssr: true,
});

const client = createApolloClient({});
export default function MyApp({
  Component,
  pageProps,
}: AppProps & { Component: BaggersPageComponent<any> }) {
  const performClientAuthCheck = async () => Auth.currentAuthenticatedUser();

  const { push } = useRouter();
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector(`#jss-server-side`);
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    if (typeof window !== `undefined`) {
      if (Component?.clientAuthenticatedRouteConfig) {
        performClientAuthCheck().catch(() => {
          push(
            Component?.clientAuthenticatedRouteConfig?.redirectTo || `/login`,
          );
        });
      }
    }
  }, []);

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
          <GlobalCss />
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
