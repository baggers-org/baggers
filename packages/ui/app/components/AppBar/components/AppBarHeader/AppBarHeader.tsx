import React from 'react';
import { Box, Grid, useTheme } from '@mui/material';

import { SearchInput, Clock, ThemeToggle } from '~/components';
import { useTranslation } from 'react-i18next';
import { NotificationsButton } from '../NotificationsButton';
import { ProfileButton } from '../ProfileButton';

export type AppBarHeaderProps = {};
export const AppBarHeader: React.FC<AppBarHeaderProps> = () => {
  const { t } = useTranslation();

  const theme = useTheme();
  return (
    <Box
      display={{ xs: `none`, md: `flex` }}
      p={2}
      px={{ sm: 2, md: 4, lg: 10 }}
      bgcolor={theme.palette.background.paper}
      borderBottom={`1px solid ${theme.palette.divider}`}
    >
      <Grid container>
        <Grid item sm={4}>
          <SearchInput
            placeholder={t(`search_baggers`, `Search Baggers...`)}
            sx={{
              maxWidth: `400px`,
            }}
          />
        </Grid>
        <Grid item sm={3} m="auto">
          <Clock />
        </Grid>
        <Grid
          container
          item
          sm={3}
          maxWidth="max-content"
          justifyContent="flex-end"
        >
          <Grid display="flex" item alignItems="center" gap={1}>
            <ThemeToggle />
            <NotificationsButton />
            <ProfileButton />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
