import { Fade, Box, Paper, BoxProps } from '@mui/material';
import React from 'react';

export const CentredPaper: React.FC<BoxProps> = ({ children, ...boxProps }) => {
  return (
    <Fade in>
      <Box
        display="flex"
        height="90vh"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Paper style={{ width: `100%` }}>
          <Box {...boxProps}>{children}</Box>
        </Paper>
      </Box>
    </Fade>
  );
};
