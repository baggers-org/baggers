import { Box, Stack } from '@mui/system';
import React, { PropsWithChildren } from 'react';

import { Sidebar } from '~/components/AppBar/Sidebar';
import { Footer } from '~/components/Footer';

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack direction="row" spacing={0}>
      <Sidebar />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <main>{children}</main>
        <Footer />
      </Box>
    </Stack>
  );
};
