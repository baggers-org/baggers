import React from 'react';
import { Box, Fade, Paper, Stack, Tabs } from '@mui/material';
import {
  Dashboard,
  FolderOpen,
  WaterfallChart,
  Search,
} from '@mui/icons-material';

import theme from '@/styles/theme';
import { AppBarLogo } from './components';
import { AppBarTab } from './components/AppBarTab';

export const AppBar: React.FC = ({ children }) => {
  return (
    <Fade in>
      <Stack direction="row">
        <nav>
          <Paper sx={{ background: theme.palette.appBar }} square elevation={8}>
            <Stack height="100vh" alignItems="center" pt={3}>
              <AppBarLogo />
              <Box pt={6} width={theme.spacing(12)}>
                <Tabs orientation="vertical" value={0}>
                  <AppBarTab label="Dashboard" icon={<Dashboard />} />
                  <AppBarTab label="Portfolios" icon={<FolderOpen />} />
                  <AppBarTab label="Charts" icon={<WaterfallChart />} />
                  <AppBarTab label="Search" icon={<Search />} />
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
