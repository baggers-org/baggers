import { Backdrop, CircularProgress } from '@material-ui/core';
import * as React from 'react';

const PageLoadingOverlay = () => {
  return (
    <Backdrop open>
      <CircularProgress size="60px" color="secondary" />
    </Backdrop>
  );
};

export default PageLoadingOverlay;
