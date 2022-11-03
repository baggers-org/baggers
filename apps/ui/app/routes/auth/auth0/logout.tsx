import { ActionFunction } from '@remix-run/server-runtime';
import { baggersApiAuthenticator } from 'apps/ui/app/auth.server';

export const action: ActionFunction = async ({ request }) => {
  return baggersApiAuthenticator.logout(request, { redirectTo: `/` });
};
