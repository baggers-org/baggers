import React from 'react';
import { Box, Grid, InputAdornment, TextField } from '@mui/material';

import theme from '@/styles/theme';
import { useTranslation } from 'next-i18next';
import { Search } from '@mui/icons-material';
import { NotificationsButton } from '../NotificationsButton';
import { ProfileButton } from '../ProfileButton';

export type AppBarHeaderProps = {};
export const AppBarHeader: React.FC<AppBarHeaderProps> = () => {
  const { t } = useTranslation();

  return (
    <Box
      display={{ xs: `none`, md: `flex` }}
      p={2}
      bgcolor={theme.palette.background.paper}
      borderBottom={`1px solid ${theme.palette.divider}`}
    >
      <Grid container>
        <Grid item sm={4}>
          <TextField
            placeholder={t(`search_baggers`, `Search Baggers...`)}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              width: `300px`,
              '& .MuiOutlinedInput-root': {
                borderRadius: `10px`,
                '& input': {
                  '&::placeholder': {
                    color: `rgba(0,0,0,0.23)`,
                  },
                  borderBottomColor: `red`,
                  border: `none`,
                },
                '& fieldset': {
                  borderColor: `rgba(0,0,0,0.1)`,
                },
              },
            }}
          />
        </Grid>
        <Grid container item sm justifyContent="flex-end">
          <Grid display="flex" item alignItems="center" gap={1}>
            <NotificationsButton />
            <ProfileButton />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
