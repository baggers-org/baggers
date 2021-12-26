import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Auth } from 'aws-amplify';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';

export const APOLLO_STATE_PROP_NAME = `__APOLLO_STATE__`;

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

const authLink = setContext(async (_, { headers }) => {
  try {
    const session = await Auth.currentSession();
    const jwt = session.getIdToken().getJwtToken();
    return {
      headers: {
        ...headers,
        authorization: jwt ? `Bearer ${jwt}` : ``,
      },
    };
  } catch (e) {
    return {
      headers: {
        ...headers,
      },
    };
  }
});

let apolloClient: any = null;
export const createApolloClient = (initialState: NormalizedCacheObject) => {
  const ssrMode = typeof window === `undefined`;
  apolloClient = new ApolloClient({
    ssrMode,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Portfolio: {
          fields: {
            name: {
              read(name) {
                return name || `Untitled Portfolio`;
              },
            },
          },
        },
        Query: {
          fields: {
            getPortfolioById(_, { args, toReference }) {
              return toReference({
                __typename: `Portfolio`,
                _id: args?._id,
              });
            },
          },
        },
      },
    }).restore(initialState),
    defaultOptions: {
      query: {
        errorPolicy: `all`,
      },
    },
  });

  return apolloClient;
};

export function initializeApollo(
  initialState = null,
): ApolloClient<InMemoryCache> {
  const _apolloClient = apolloClient ?? createApolloClient({});

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState as any, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: any, sourceArray: any) => [
        ...sourceArray,
        ...destinationArray.filter((d: any) =>
          sourceArray.every((s: any) => !isEqual(d, s)),
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === `undefined`) return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client: any, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
