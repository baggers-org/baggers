import React from 'react';
import { Stack, Typography } from '@mui/material';

import Logo from '../../../../../public/svg/logo_dark_50x50.svg';

export type AppBarLogoProps = {};
export const AppBarLogo: React.FC<AppBarLogoProps> = () => {
  return (
    <Stack
      alignItems="center"
      display={{ xs: `none`, md: `flex` }}
      color="white"
    >
      <Logo />
      <Typography pt={0.4} fontFamily="Archivo Black" fontSize="13px">
        BAGGERS
      </Typography>
    </Stack>
  );
};
