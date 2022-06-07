import { Box, Divider, Link, Typography } from '@mui/material';
import React from 'react';

export type FooterProps = {};
export const Footer: React.FC<FooterProps> = () => {
  return (
    <Box>
      <Divider />
      <Box
        display="flex"
        p={6}
        width="100%"
        justifyContent="center"
        flexDirection="column"
        textAlign="center"
      >
        <Typography variant="caption">
          This site is under development
        </Typography>

        <Typography variant="caption">Email any enquiries to:</Typography>
        <Link href="mailto: dan@baggers.app">dan@baggers.app</Link>
        <Typography variant="caption">Baggers Ltd.</Typography>
        <Typography variant="caption">
          © Copyright {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};
