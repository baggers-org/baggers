import React from 'react';
import { Fade, Stack } from '@mui/material';

import { useIsMobile } from '@/hooks';
import { DesktopHeader } from './components/DesktopHeader';
import { MobileHeader } from './components/MobileHeader';

export const LandingPageLayout: React.FC = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <>
      <Fade in>
        <Stack
          direction="row"
          alignItems="center"
          p={2}
          position="absolute"
          width="100%"
          zIndex={1}
        >
          {!isMobile ? <DesktopHeader /> : <MobileHeader />}
        </Stack>
      </Fade>
      {children}
    </>
  );
};
