import { Outlet, useLoaderData } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/server-runtime';
import { AppLayout } from '~/components';
import { onboardingCookie } from '~/cookies';
import { AppStore } from '~/hooks/useAppStore';

export const loader: LoaderFunction = async ({
  request,
}): Promise<AppStore> => {
  const user = await baggersApiAuthenticator.isAuthenticated(request);
  const onboarding = await onboardingCookie.parse(
    request.headers.get(`Cookie`),
  );
  return {
    user,
    onboarding,
  };
};
export default function LandingLayout() {
  useLoaderData();

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
