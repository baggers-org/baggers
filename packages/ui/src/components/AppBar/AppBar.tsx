import React from 'react';
import { Box, Grid, Paper, Stack, Tabs } from '@mui/material';
import { Dashboard, FolderOpen, WaterfallChart } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';
import { useActiveTab, usePrefetch } from '@/hooks';
import { useBreakpointValue } from '@/hooks/useBreakpointValue';
import { AppBarLogo } from './components';
import { AppBarTab } from './components/AppBarTab';
import { AppBarHeader } from './components/AppBarHeader';

export const AppBar: React.FC = ({ children }) => {
  const { t } = useTranslation();

  const { push } = useRouter();
  const activeTab = useActiveTab();

  usePrefetch(`/portfolios/created`);
  usePrefetch(`/dashboard`);

  const orientation = useBreakpointValue({ xs: `horizontal`, md: `vertical` });

  return (
    <>
      <nav>
        <Grid container>
          <Grid xs={0} md={1} item>
            <Paper
              sx={{
                position: { xs: `fixed`, md: `relative` },
                bottom: { xs: 0 },
                zIndex: 999,
                width: { xs: `100%` },
                height: { xs: `74px`, md: `100%` },
              }}
              square
              elevation={1}
            >
              <Stack height="100vh" alignItems="center" pt={{ xs: 0, md: 3 }}>
                <AppBarLogo />
                <Box
                  width={{ xs: undefined, md: `100%` }}
                  pt={{ xs: 0, md: 6 }}
                >
                  {orientation && (
                    <Tabs orientation={orientation} value={activeTab}>
                      <AppBarTab
                        value="/dashboard"
                        label={t(`dashboard`, `Dashboard`)}
                        onClick={() => push(`/dashboard`)}
                        icon={<Dashboard />}
                      />
                      <AppBarTab
                        value="/portfolios"
                        label={t(`portfolios`, `Portfolios`)}
                        onClick={() => push(`/portfolios/created`)}
                        icon={<FolderOpen />}
                      />
                      <AppBarTab
                        value="/charts"
                        label={t(`charts`, `Charts`)}
                        onClick={() => push(`/charts`)}
                        icon={<WaterfallChart />}
                      />
                    </Tabs>
                  )}
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs container>
            <Grid item xs={12}>
              <AppBarHeader />
              {children}
            </Grid>
          </Grid>
        </Grid>
      </nav>
    </>
  );
};
