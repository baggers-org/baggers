import * as React from 'react';
import { Box, LinearProgress } from '@mui/material';
import { alpha } from '@mui/system';

import theme from '@/styles/theme';

export const PageLoadingOverlay = () => {
  return (
    <Box
      position="absolute"
      bottom={{ xs: 76, md: undefined }}
      top={{ xs: undefined, md: 70 }}
      width="100%"
    >
      <LinearProgress />
      <Box
        position="absolute"
        width="100%"
        height="100%"
        pt={{ xs: undefined, md: 100 }}
        pb={{ xs: 76, md: undefined }}
        bgcolor={alpha(theme.palette.grey[50], 0.9)}
      />
    </Box>
  );
};
