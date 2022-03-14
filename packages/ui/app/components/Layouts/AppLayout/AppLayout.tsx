import * as React from 'react';
import { Box, Container } from '@mui/material';
import { AppBar } from '~/components/AppBar';

export const AppLayout: React.FC = ({ children }) => {
  return (
    <AppBar>
      <Box mt={{ xs: 2, md: 4 }} mb={10} px={6}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </AppBar>
  );
};
