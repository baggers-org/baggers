import { Stack, Typography, Tabs, Tab, Container } from '@mui/material';
import { Outlet, useLocation } from '@remix-run/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from 'tabler-icons-react';
import { useSidebarContext } from '~/components/AppBar/Sidebar.context';
import { PageLayout } from '~/components/Layouts/PageLayout';

export default function PortfoliosLayout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const activeTab = `/${pathname.split(`/`).pop()}`;

  const { setSubMenuOptions } = useSidebarContext();
  useEffect(() => {
    setSubMenuOptions?.([
      {
        label: t('your_portfolios', 'Your portfolios'),
        href: '/portfolios/created',
        icon: <User />,
      },
    ]);
  }, [setSubMenuOptions]);

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
