import { Box } from '@mui/system';
import React from 'react';

import { AppBar } from '~/components/AppBar';

export const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <AppBar />
      <Box sx={{ mt: 8 }}>
        <main>{children}</main>
      </Box>
    </>
  );
};
