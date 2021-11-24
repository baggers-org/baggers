import * as React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import Amplify, { Auth } from 'aws-amplify';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import Head from 'next/head';

import theme from '@/styles/theme';
import { BaggersPageComponent } from '@/views/types';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material';
import { Layout, PageLoadingOverlay } from '@/components';
import { createApolloClient } from '@/lib/ApolloClient';
import { useRouteChangeLoading } from '@/hooks';

Amplify.configure({
  aws_project_region: process.env.NEXT_PUBLIC_AWS_REGION,
  aws_cognito_identity_pool_id: process.env.NEXT_PUBLIC_COGNITO_IDENTITYPOOL_ID,
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID,
  aws_user_pools_web_client_id:
    process.env.NEXT_PUBLIC_COGNITO_USERPOOL_WEBCLIENT_ID,
  oauth: {},
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
