import React from 'react';
import { Stack, Typography, useTheme } from '@mui/material';

import LogoDark from '../../../../../public/svg/logo_dark_50x50.svg';
import LogoLight from '../../../../../public/svg/logo_light_50x50.svg';

export type AppBarLogoProps = {};
export const AppBarLogo: React.FC<AppBarLogoProps> = () => {
  const {
    palette: { mode },
  } = useTheme();
  return (
    <Stack alignItems="center" display={{ xs: `none`, md: `flex` }}>
      {mode === `dark` ? <LogoDark /> : <LogoLight />}
      <Typography pt={0.4} fontFamily="Archivo Black" fontSize="13px">
        BAGGERS
      </Typography>
    </Stack>
  );
};
