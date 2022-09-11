import { Stack, Typography, Tabs, Tab, Container } from '@mui/material';
import { Outlet, useLocation } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '~/components/Layouts/PageLayout';

export default function PortfoliosLayout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const activeTab = `/${pathname.split(`/`).pop()}`;

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
