import { Button, ButtonProps, LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { PropsWithChildren } from 'react';

export type BaggersButtonProps = {
  loading?: boolean;
} & ButtonProps;
export const BaggersButton: React.FC<PropsWithChildren<BaggersButtonProps>> = ({
  loading,
  children,
  ...buttonProps
}) => {
  return (
    <Box width="max-content">
      <LinearProgress
        sx={{
          transform: 'translateY(4px)',
          borderRadius: '4px',
          zIndex: 9,
          opacity: loading ? 1 : 0,
        }}
      />
      <Button {...buttonProps}>{children}</Button>
      <LinearProgress
        sx={{
          transform: 'translateY(-4px)',
          borderRadius: '4px',
          opacity: loading ? 1 : 0,
        }}
      />
    </Box>
  );
};
