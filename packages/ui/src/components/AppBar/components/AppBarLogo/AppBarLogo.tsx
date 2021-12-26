import React from 'react';
import { Typography } from '@mui/material';

import Logo from '../../../../../public/Logo/logo_dark_50x50.svg';

export type AppBarLogoProps = {};
export const AppBarLogo: React.FC<AppBarLogoProps> = () => {
  return (
    <>
      <Logo />
      <Typography
        pt={0.4}
        fontFamily="Archivo Black"
        fontSize="13px"
        color="#FAFAFA"
      >
        BAGGERS
      </Typography>
    </>
  );
};
