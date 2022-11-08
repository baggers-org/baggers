import { Box, Divider, Link, Typography } from '@mui/material';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <Box display={{ xs: `none`, md: `flex` }} mt={50} mb={5}>
      <Divider />
      <Box
        display="flex"
        width="100%"
        justifyContent="center"
        flexDirection="column"
        textAlign="center"
      >
        <Typography variant="caption">
          This site is under development
        </Typography>

        <Typography variant="caption">Email any enquiries to:</Typography>
        <Link href="mailto: dan@baggers.app" tabIndex={-1}>
          dan@baggers.app
        </Link>
        <Typography variant="caption">Baggers Ltd.</Typography>
        <Typography variant="caption">
          © Copyright {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};
