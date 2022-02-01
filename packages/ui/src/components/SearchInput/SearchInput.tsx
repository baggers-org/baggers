import React from 'react';
import { Search } from '@mui/icons-material';
import { TextField, InputAdornment, TextFieldProps } from '@mui/material';

export type SearchInputProps = TextFieldProps;
export const SearchInput: React.FC<SearchInputProps> = ({
  ...textFieldProps
}) => {
  return (
    <TextField
      {...textFieldProps}
      size="small"
      variant="outlined"
      InputProps={{
        endAdornment: (
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
    />
  );
};
