import * as React from 'react';
import { AppBar } from '@/components/AppBar';
import { Box, Container } from '@mui/material';

export const BaseLayout: React.FC = ({ children }) => {
  return (
    <AppBar>
      <Box mt={{ xs: 2, md: 4 }} mb={10}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </AppBar>
  );
};
