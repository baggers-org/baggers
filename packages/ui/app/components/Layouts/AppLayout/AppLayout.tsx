import { Box } from '@mui/system';
import { useLocation } from '@remix-run/react';
import React from 'react';

import { AppBar } from '~/components/AppBar';
import { Footer } from '~/components/Footer';

export const AppLayout: React.FC = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <>
      <AppBar />
      <Box
        sx={{
          mt: pathname === `/` ? 0 : 12,
          minHeight: `100vh`,
          mb: 32,
        }}
      >
        <main>{children}</main>
      </Box>
      <Footer />
    </>
  );
};
