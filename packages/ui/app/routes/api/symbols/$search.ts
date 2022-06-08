import { LoaderFunction } from '@remix-run/server-runtime';
import { unauthenticatedSdk } from '~/graphql/sdk.server';

export const loader: LoaderFunction = async ({ params, request }) => {
  const sdk = await unauthenticatedSdk(request);
  const { search } = params;
  if (!search) return null;
  return sdk.searchSymbols({ search });
};
