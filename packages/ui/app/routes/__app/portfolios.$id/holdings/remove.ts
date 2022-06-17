import { ActionFunction, json } from '@remix-run/server-runtime';
import { authenticatedSdk } from '~/graphql/sdk.server';

export const action: ActionFunction = async ({ params, request }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request, headers);
  const { holding_id } = Object.fromEntries(await request.formData());

  const response = sdk.removeHolding({
    portfolio_id: params.id,
    holding_id,
  });

  console.log(response);
  

  return json(response, { headers });
};
