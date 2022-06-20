import { LoaderFunction } from '@remix-run/server-runtime';
import { unauthenticatedSdk } from '~/graphql/sdk.server';

export const loader: LoaderFunction = async ({ params, request }) => {
  const sdk = await unauthenticatedSdk(request);
  const { symbol } = params;
  if (!symbol) return null;

  const { searchSymbols } = await sdk.searchSymbols({ search: symbol });

  return searchSymbols;
};
