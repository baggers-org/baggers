import React from 'react';
import { Box, Fade, Paper, Stack, Tabs } from '@mui/material';
import {
  Dashboard,
  FolderOpen,
  WaterfallChart,
  Search,
} from '@mui/icons-material';
import { useTranslation } from 'next-i18next';

import theme from '@/styles/theme';
import { AppBarLogo } from './components';
import { AppBarTab } from './components/AppBarTab';

export const AppBar: React.FC = ({ children }) => {
  const { t } = useTranslation();
  return (
    <Fade in>
      <Stack direction="row">
        <nav>
          <Paper sx={{ background: theme.palette.appBar }} square elevation={8}>
            <Stack height="100vh" alignItems="center" pt={3}>
              <AppBarLogo />
              <Box pt={6} width={theme.spacing(12)}>
                <Tabs orientation="vertical" value={0}>
                  <AppBarTab
                    label={t(`dashboard`, `Dashboard`)}
                    icon={<Dashboard />}
                  />
                  <AppBarTab
                    label={t(`portfolios`, `Portfolios`)}
                    icon={<FolderOpen />}
                  />
                  <AppBarTab
                    label={t(`charts`, `Charts`)}
                    icon={<WaterfallChart />}
                  />
                  <AppBarTab label={t(`search`, `Search`)} icon={<Search />} />
                </Tabs>
              </Box>
            </Stack>
          </Paper>
        </nav>
        <main>{children}</main>
      </Stack>
    </Fade>
  );
};
