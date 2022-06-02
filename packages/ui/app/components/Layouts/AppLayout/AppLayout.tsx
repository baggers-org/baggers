import { Container, Fade } from '@mui/material';
import React from 'react';

import { AppBar } from '~/components/AppBar';

export const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <AppBar />
      <Container maxWidth="xl" sx={{ mt: 15}}>
        <main>{children}</main>
      </Container>
    </>
  );
};
