import { Container } from '@mui/material';
import React, { PropsWithChildren } from 'react';

export const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container maxWidth="xl" sx={{ mt: 6 }}>
      {children}
    </Container>
  );
};
