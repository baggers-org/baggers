import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  withStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useState } from 'react';

import Skeleton from 'react-loading-skeleton';

const StyledTextField = withStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: theme.palette.secondary.contrastText,
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.light,
      },
    },
  },
}))(TextField);

type Props = {
  loading?: boolean;
  isMonetaryInput?: boolean;
  secret?: boolean;
};
const BaggersTextField: React.FC<TextFieldProps & Props> = ({
  loading,
  isMonetaryInput,
  secret,
  ...muiProps
}) => {
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

  return (
    <StyledTextField {...defaultProps} {...muiProps} {...additionalProps} />
  );
};

export default BaggersTextField;
