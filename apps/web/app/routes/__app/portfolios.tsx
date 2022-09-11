import { Outlet } from '@remix-run/react';
import { PageLayout } from '~/components/Layouts/PageLayout';

export default function PortfoliosLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
