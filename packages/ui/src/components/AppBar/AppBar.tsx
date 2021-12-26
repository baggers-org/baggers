import React from 'react';
import { Box, Grid, Paper, Stack, Tabs } from '@mui/material';
import {
  Dashboard,
  FolderOpen,
  WaterfallChart,
  Search,
} from '@mui/icons-material';
import { useTranslation } from 'next-i18next';

import theme from '@/styles/theme';
import { useRouter } from 'next/router';
import { usePrefetch } from '@/hooks';
import { useBreakpointValue } from '@/hooks/useBreakpointValue';
import { AppBarLogo } from './components';
import { AppBarTab } from './components/AppBarTab';

export const AppBar: React.FC = ({ children }) => {
  const { t } = useTranslation();

  const { push, pathname } = useRouter();
  usePrefetch(`/portfolios`);

  const orientation = useBreakpointValue({ xs: `horizontal`, md: `vertical` });

  return (
    <Grid container>
      <Grid item>
        <nav>
          <Paper
            sx={{
              background: theme.palette.appBar,
              position: `fixed`,
              width: { xs: `100%`, md: `92px` },
              bottom: { xs: 0 },
              height: { xs: `74px`, md: `100%` },
            }}
            square
            elevation={8}
          >
            <Stack height="100vh" alignItems="center" pt={{ xs: 0, md: 3 }}>
              <AppBarLogo />
              <Box pt={{ xs: 0, md: 6 }}>
                {orientation && (
                  <Tabs orientation={orientation} value={pathname}>
                    <AppBarTab
                      value="/dashboard"
                      label={t(`dashboard`, `Dashboard`)}
                      onClick={() => push(`/dashboard`)}
                      icon={<Dashboard />}
                    />
                    <AppBarTab
                      value="/portfolios"
                      label={t(`portfolios`, `Portfolios`)}
                      onClick={() => push(`/portfolios`)}
                      icon={<FolderOpen />}
                    />
                    <AppBarTab
                      value="/charts"
                      label={t(`charts`, `Charts`)}
                      onClick={() => push(`/charts`)}
                      icon={<WaterfallChart />}
                    />
                    <AppBarTab
                      label={t(`search`, `Search`)}
                      icon={<Search />}
                    />
                  </Tabs>
                )}
              </Box>
            </Stack>
          </Paper>
        </nav>
      </Grid>
      <Box ml={{ xs: `0`, md: `92px` }} component="main">
        {children}
      </Box>
    </Grid>
  );
};
