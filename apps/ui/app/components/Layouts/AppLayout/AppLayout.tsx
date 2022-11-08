import { Box } from '@mui/system';
import React, { PropsWithChildren } from 'react';

import { Sidebar } from '~/components/Sidebar/Sidebar';
import { useSubMenu } from '~/components/Sidebar/useSubMenu';
import { Footer } from '~/components/Footer';
import { useIsMobile } from '~/hooks';
import { MobileNavbar } from '~/components/MobileNavbar';
import { MobileSubNavbar } from '~/components/MobileNavbar/MobileSubNavbar';

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const subMenu = useSubMenu();

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Box display={{ xs: 'block', md: 'none' }}>
        <MobileSubNavbar />
        <main>{children}</main>
        <MobileNavbar />
      </Box>
    );
  }

  return (
    <Box
      display={{ xs: 'none', md: 'grid' }}
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
