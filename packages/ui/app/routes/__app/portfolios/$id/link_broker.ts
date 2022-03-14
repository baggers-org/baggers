import { ActionFunction } from '@remix-run/server-runtime';
import { sdk } from '~/graphql/sdk.server';

export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params;
  const { public_token } = Object.fromEntries(await request.formData());
  return sdk.portfolioLinkBroker({
    input: { public_token: public_token.toString() },
    portfolioId: id,
  });
};
