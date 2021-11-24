import { Backdrop, CircularProgress } from '@mui/material';
import * as React from 'react';

export const PageLoadingOverlay = () => {
  return (
    <Backdrop open>
      <CircularProgress size="60px" color="secondary" />
    </Backdrop>
  );
};
