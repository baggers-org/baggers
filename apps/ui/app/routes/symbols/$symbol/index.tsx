import { LoaderFunction } from '@remix-run/server-runtime';
import { unauthenticatedSdk } from 'apps/ui/app/graphql/sdk.server';

export const loader: LoaderFunction = async ({ params, request }) => {
  const sdk = await unauthenticatedSdk(request);
  const { symbol } = params;
  if (!symbol) return null;

  const { securitiesSearch } = await sdk.securitiesSearch({
    searchTerm: symbol,
  });

  return securitiesSearch;
};
