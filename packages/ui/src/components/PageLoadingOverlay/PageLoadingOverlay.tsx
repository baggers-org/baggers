import React from 'react';
import { Box, LinearProgress, useTheme } from '@mui/material';
import { alpha } from '@mui/system';

export const PageLoadingOverlay = () => {
  const theme = useTheme();
  return (
    <Box
      position="absolute"
      bottom={{ xs: 76, md: undefined }}
      top={{ xs: undefined, md: 70 }}
      width="100%"
      zIndex={999}
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
