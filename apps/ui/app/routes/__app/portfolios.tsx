import { Outlet } from '@remix-run/react';
import { PageLayout } from 'apps/ui/app/components/Layouts/PageLayout';

export default function PortfoliosLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
