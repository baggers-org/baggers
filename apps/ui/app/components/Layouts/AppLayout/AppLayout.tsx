import { Box } from '@mui/system';
import React, { PropsWithChildren } from 'react';

import { Sidebar } from 'apps/ui/app/components/Sidebar/Sidebar';
import { useSubMenu } from 'apps/ui/app/components/Sidebar/useSubMenu';
import { Footer } from 'apps/ui/app/components/Footer';
import { useIsMobile } from 'apps/ui/app/hooks';
import { MobileNavbar } from 'apps/ui/app/components/MobileNavbar';
import { MobileSubNavbar } from 'apps/ui/app/components/MobileNavbar/MobileSubNavbar';

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
