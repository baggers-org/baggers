import { useState } from 'react';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Skeleton from 'react-loading-skeleton';

export type BaggersTextFieldProps = {
  loading?: boolean;
  isMonetaryInput?: boolean;
  secret?: boolean;
};
export const BaggersTextField: React.FC<
  TextFieldProps & BaggersTextFieldProps
> = ({ loading, isMonetaryInput, secret, ...muiProps }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  if (loading) {
    let height = 55;
    if (muiProps.rows && muiProps.multiline) {
      height = Number(muiProps.rows) * 23.6;
    }
    return <Skeleton height={height} style={{ marginTop: `20px` }} />;
  }
  const additionalProps: TextFieldProps = {};

  const defaultProps: TextFieldProps = {
    variant: `outlined`,
    fullWidth: true,
  };

  if (isMonetaryInput) {
    additionalProps.InputProps = {
      startAdornment: <InputAdornment position="start">$</InputAdornment>,
    };
  }

  if (secret) {
    additionalProps.InputProps = {
      type: showPassword ? `text` : `password`,
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      ),
    };
  }

  return <TextField {...defaultProps} {...muiProps} {...additionalProps} />;
};
