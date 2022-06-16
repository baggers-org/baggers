import { useState } from 'react';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export type BaggersTextFieldProps = {
  loading?: boolean;
  isMonetaryInput?: boolean;
  secret?: boolean;
};
export const BaggersTextField: React.FC<
  BaggersTextFieldProps & TextFieldProps
> = ({ isMonetaryInput, secret, ...muiProps }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const additionalProps: TextFieldProps = {};

  const defaultProps: TextFieldProps = {
    variant: `outlined`,
    fullWidth: true,
  };

  if (isMonetaryInput) {
    additionalProps.InputProps = {
      ...(muiProps.InputProps || {}),
      startAdornment: <InputAdornment position="start">$</InputAdornment>,
    };
  }

  if (secret) {
    additionalProps.InputProps = {
      ...(muiProps.InputProps || {}),
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
