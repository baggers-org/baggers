import React from 'react';
import { Button, ButtonProps, LinearProgress } from '@mui/material';

export type BaggersButtonProps = {
  loading?: boolean;
} & ButtonProps;

export const BaggersButton: React.FC<BaggersButtonProps> = ({
  children,
  loading,
  ...externalProps
}) => {
  const defaultProps: ButtonProps = {
    variant: `contained`,
    color: `primary`,
    fullWidth: true,
  };
  return (
    <>
      {loading ? <LinearProgress color="secondary" /> : null}
      <Button {...defaultProps} {...externalProps}>
        {children}
      </Button>
      {loading ? <LinearProgress color="secondary" /> : null}
    </>
  );
};
