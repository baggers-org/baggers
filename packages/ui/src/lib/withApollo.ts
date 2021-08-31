import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { NextPageContext } from 'next';
import { createApolloClient } from './ApolloClient';

let globalApolloClient;

/**
 * Allows you to access a property apolloClient when defining a NextPage function
 * @param innerHandler getServerSideProps or getStaticProps etc.
 * @returns Callback to allow you to define your getServerSideProps, with access to apolloClient
 */
export const injectApolloToNextPageFunction = (
  innerHandler: (context: any) => any,
) => {
  return async (args: NextPageContext) => {
    const apolloClient = createApolloClient({});

    return innerHandler({ apolloClient, ...args });
  };
};
