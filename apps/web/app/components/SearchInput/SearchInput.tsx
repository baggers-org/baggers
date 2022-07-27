import React from 'react';
import { Search } from '@mui/icons-material';
import {
  TextField,
  InputAdornment,
  TextFieldProps,
  CircularProgress,
} from '@mui/material';

export type SearchInputProps = {
  loading?: boolean;
} & TextFieldProps;
export const SearchInput: React.FC<SearchInputProps> = ({
  loading,
  ...textFieldProps
}) => {
  return (
    <TextField
      size="small"
      variant="outlined"
      InputProps={{
        endAdornment: loading ? (
          <CircularProgress />
        ) : (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
      sx={{
        fieldset: {
          borderRadius: `10px`,
        },
      }}
      {...textFieldProps}
    />
  );
};
