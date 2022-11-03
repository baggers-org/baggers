import { Container, Fade, Paper, PaperProps } from '@mui/material';
import React from 'react';

export type CentredPaperProps = PaperProps;
export const CentredPaper: React.FC<CentredPaperProps> = ({
  children,
  ...paperProps
}) => {
  return (
    <Fade in>
      <Container maxWidth="sm" sx={{ height: `100vh` }}>
        <Paper
          {...paperProps}
          sx={{ mt: `40%`, p: 2, px: 8, ...paperProps.sx }}
        >
          {children}
        </Paper>
      </Container>
    </Fade>
  );
};
