import { baggersApiAuthenticator } from '~/auth.server';

export const action = async ({ request }) => {
  return baggersApiAuthenticator.logout(request, { redirectTo: `/` });
};
