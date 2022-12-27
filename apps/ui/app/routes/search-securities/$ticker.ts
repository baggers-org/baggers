import { LoaderFunction, Response } from '@remix-run/node';
import { unauthenticatedSdk } from '~/server/sdk.server';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { ticker } = params;

  if (!ticker) {
    throw new Response('No ticker', { status: 400 });
  }

  const sdk = await unauthenticatedSdk(request);

  const { securitiesSearch } = await sdk.securitiesSearch({
    searchTerm: ticker,
  });

  return securitiesSearch;
};
