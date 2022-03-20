import React from 'react';
import { Box, Grid, Paper, Stack, Tabs, useTheme } from '@mui/material';
import { Dashboard, FolderOpen, WaterfallChart } from '@mui/icons-material';

import { useActiveTab, useBreakpointValue } from '~/hooks';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@remix-run/react';
import { AppBarLogo } from './components';
import { AppBarTab } from './components/AppBarTab';
import { AppBarHeader } from './components/AppBarHeader';

export const AppBar: React.FC = ({ children }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const activeTab = useActiveTab();

  const theme = useTheme();

  const orientation = useBreakpointValue<'horizontal' | 'vertical'>({
    xs: `horizontal`,
    md: `vertical`,
  });

  return (
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
              <Box width={{ xs: undefined, md: `100%` }} pt={{ xs: 0, md: 6 }}>
                <Tabs orientation={orientation || `vertical`} value={activeTab}>
                  <AppBarTab
                    value="/dashboard"
                    label={t(`dashboard`, `Dashboard`)}
                    onClick={() => navigate(`/dashboard`)}
                    icon={<Dashboard />}
                  />
                  <AppBarTab
                    value="/portfolios"
                    label={t(`portfolios`, `Portfolios`)}
                    onClick={() => navigate(`/portfolios/created`)}
                    icon={<FolderOpen />}
                  />
                  <AppBarTab
                    value="/charts"
                    label={t(`charts`, `Charts`)}
                    onClick={() => navigate(`/charts`)}
                    icon={<WaterfallChart />}
                  />
                </Tabs>
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
  );
};
