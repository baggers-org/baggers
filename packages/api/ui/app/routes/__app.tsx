import { Outlet, useLoaderData } from '@remix-run/react';
import { baggersApiAuthenticator } from '~/auth.server';
import { AppLayout } from '~/components';

export const loader = async ({ request }) => {
  const user = await baggersApiAuthenticator.isAuthenticated(request);
  return user;
};
export default function LandingLayout() {
  useLoaderData();

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
