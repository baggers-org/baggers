import { ActionFunction, redirect } from '@remix-run/server-runtime';
import { onboardingCookie } from '~/cookies';

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  const { id } = params;

  const headers = new Headers();
  if (formData.get(`hide`) === `true`) {
    const cookie =
      (await onboardingCookie.parse(request.headers.get(`Cookie`))) || {};

    cookie.hideDirectHoldingAddWarning = true;

    headers.append(`Set-Cookie`, await onboardingCookie.serialize(cookie));
  }

  return redirect(`/portfolios/${id}/holdings/add`, { headers });
};
