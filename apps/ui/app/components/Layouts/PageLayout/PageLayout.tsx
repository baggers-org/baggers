import { Container } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { useSubMenu } from 'apps/ui/app/components/Sidebar/useSubMenu';

export const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const subMenu = useSubMenu();
  return (
    <Container
      maxWidth="xl"
      sx={{ mt: { xs: subMenu?.options.length ? 20 : 10, md: 2 } }}
    >
      {children}
    </Container>
  );
};
