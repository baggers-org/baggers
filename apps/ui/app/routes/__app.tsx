import { Outlet, useLoaderData } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/server-runtime';
import { AppLayout } from 'apps/ui/app/components';
import { onboardingCookie } from 'apps/ui/app/cookies';
import { AppStore } from 'apps/ui/app/hooks/useAppStore';
import { isAuthenticated } from 'apps/ui/app/policy.server';

export const loader: LoaderFunction = async ({
  request,
}): Promise<AppStore> => {
  const user = await isAuthenticated(request);
  const onboarding = await onboardingCookie.parse(
    request.headers.get(`Cookie`)
  );
  return {
    user,
    onboarding,
    url: request?.url,
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
