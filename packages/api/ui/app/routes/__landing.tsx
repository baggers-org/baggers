import { Outlet } from '@remix-run/react';
import { LandingPageLayout } from '~/components/Layouts/LandingPageLayout';

export default function LandingLayout() {
  return (
    <LandingPageLayout>
      <Outlet />
    </LandingPageLayout>
  );
}
