import { ActionFunction } from '@remix-run/server-runtime';
import { sdk } from '~/graphql/sdk.server';

export const action: ActionFunction = async ({ params }) => {
  return sdk.clearImportError({ portfolioId: params.id });
};
