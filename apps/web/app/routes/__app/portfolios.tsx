import { Stack, Typography, Tabs, Tab, Container } from '@mui/material';
import { Outlet, useLocation } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

export default function PortfoliosLayout() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const activeTab = `/${pathname.split(`/`).pop()}`;

  return (
    <Container maxWidth="xl">
      <Stack spacing={5}>
        <Stack direction="row">
          <Typography variant="h2" fontSize={{ xs: `30px`, md: undefined }}>
            {t(`created_portfolios`, `Your portfolios`)}
          </Typography>
          <Tabs
            value={activeTab}
            sx={{
              ml: `auto`,
              maxHeight: `50px`,
              display: { xs: `none`, md: `flex` },
            }}
          >
            <Tab value="/discover" label={t(`discover`, `Discover`)} />
            <Tab value="/created" label={t(`created`, `Created`)} />
            <Tab value="/favourites" label={t(`favourites`, `Favourites`)} />
            <Tab
              value="/collaborating"
              label={t(`collaborating`, `Collaborating`)}
            />
          </Tabs>
        </Stack>
        <Outlet />
      </Stack>
    </Container>
  );
}
