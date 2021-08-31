import { Button, ButtonProps, LinearProgress } from '@material-ui/core';
import React from 'react';

type Props = {
  loading?: boolean;
};
const BaggersButton: React.FC<ButtonProps & Props> = ({
  children,
  loading,
  ...externalProps
}) => {
  const defaultProps: ButtonProps = {
    variant: `contained`,
    color: `secondary`,
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
export default BaggersButton;
