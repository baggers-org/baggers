import { LoaderFunction } from 'remix';
import { sdk } from '~/graphql/sdk.server';

export const loader: LoaderFunction = ({ params }) => {
  const { search } = params;
  if (!search) return null;
  return sdk.searchSymbols({ search });
};
