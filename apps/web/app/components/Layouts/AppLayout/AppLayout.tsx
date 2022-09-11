import { Box } from '@mui/system';
import React, { PropsWithChildren } from 'react';

import { Sidebar } from '~/components/AppBar/Sidebar';
import { useSubMenu } from '~/components/AppBar/useSubMenu';
import { Footer } from '~/components/Footer';

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const subMenu = useSubMenu();
  return (
    <Box
      display="grid"
      gridAutoFlow="column"
      gridColumn="auto"
      gridTemplateColumns={
        subMenu ? 'min-content min-content auto' : 'min-content auto'
      }
    >
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
    </Box>
  );
};
