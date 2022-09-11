import { Fade, useTheme } from '@mui/material';
import { Box, darken } from '@mui/system';
import React, { useMemo } from 'react';

export type GradientBackgroundProps = {};
export const GradientBackground: React.FC<GradientBackgroundProps> = () => {
  const theme = useTheme();
  const gradient = useMemo(() => {
    if (theme.palette.mode === 'dark') {
      return `linear-gradient(${darken(
        theme.palette.primary.main,
        0.75
      )}, ${darken(theme.palette.primary.main, 0.82)})`;
    }
    return `linear-gradient(${darken(theme.palette.primary.main, 0.6)}, ${
      theme.palette.primary.dark
    })`;
  }, [theme]);
  return (
    <Fade in>
      <Box
        width="100%"
        height={{ xs: `420px` }}
        zIndex={-1}
        sx={{ background: gradient }}
      />
    </Fade>
  );
};
