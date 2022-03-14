import { LoaderFunction } from '@remix-run/server-runtime';
import { sdk } from '~/graphql/sdk.server';

export const loader: LoaderFunction = ({ params }) => {
  const { search } = params;
  if (!search) return null;
  return sdk.searchSymbols({ search });
};
