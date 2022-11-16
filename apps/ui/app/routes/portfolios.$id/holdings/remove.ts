import { ActionFunction, json } from '@remix-run/node';
import { authenticatedSdk } from '~/server/sdk.server';

export const action: ActionFunction = async ({ params, request }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request, headers);
  const { holding_id } = Object.fromEntries(await request.formData());

  const response = await sdk.portfoliosRemoveHolding({
    portfolioId: params.id,
    holdingId: holding_id,
  });

  return json(response, { headers });
};
