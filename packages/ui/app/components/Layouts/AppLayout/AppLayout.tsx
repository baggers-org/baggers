import { Box } from '@mui/system';
import { useLocation } from '@remix-run/react';
import React from 'react';

import { AppBar } from '~/components/AppBar';
import { Footer } from '~/components/Footer';
import { useIsMobile } from '~/hooks';

export const AppLayout: React.FC = ({ children }) => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  return (
    <>
      <AppBar />
      <Box
        sx={{
          mt: pathname === `/` || isMobile ? 12 : 16,
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
