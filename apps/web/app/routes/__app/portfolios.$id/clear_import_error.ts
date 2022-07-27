import { ActionFunction, json } from '@remix-run/server-runtime';
import { authenticatedSdk } from '~/graphql/sdk.server';

export const action: ActionFunction = async ({ params, request }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request, headers);
  const response = sdk.clearImportError({ portfolioId: params.id });
  return json(response, { headers });
};
