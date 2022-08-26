import { Fade, useTheme } from '@mui/material';
import { Box, darken } from '@mui/system';
import React, { useMemo } from 'react';

export type GradientBackgroundProps = {};
export const GradientBackground: React.FC<GradientBackgroundProps> = () => {
  const theme = useTheme();
  const gradient = useMemo(() => {
    return `linear-gradient(${darken(theme.palette.primary.dark, 0.9)},${
      theme.palette.primary.main
    } , ${theme.palette.background.default})`;
  }, [theme]);
  return (
    <Fade in>
      <Box
        width="100%"
        height={{ xs: `60vh` }}
        position="absolute"
        zIndex={-1}
        sx={{ background: gradient }}
      />
    </Fade>
  );
};
