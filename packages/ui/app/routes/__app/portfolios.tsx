import { Stack, Typography, Tabs, Tab, useTheme } from '@mui/material';
import { Outlet, useLocation } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

export default function PortfoliosLayout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const activeTab = `/${pathname.split(`/`).pop()}`;

  const theme = useTheme();
  return (
    <Stack spacing={5}>
      <Stack direction="row">
        <Typography variant="h2">
          {t(`created_portfolios`, `Your portfolios`)}
        </Typography>
        <Tabs value={activeTab} sx={{ ml: `auto`, maxHeight: `50px` }}>
          <Tab value="/discover" label={t(`discover`, `Discover`)} />
          <Tab
            value="/created"
            label={t(`created`, `Created`)}
          />
          <Tab value="/favourites" label={t(`favourites`, `Favourites`)} />
          <Tab
            value="/collaborating"
            label={t(`collaborating`, `Collaborating`)}
          />
        </Tabs>
      </Stack>
      <Outlet />
    </Stack>
  );
}
