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
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
      sx={{
        width: `100%`,
        '& .MuiOutlinedInput-root': {
          borderRadius: `10px`,
          '& input': {
            '&::placeholder': {
              color: `rgba(0,0,0,0.23)`,
            },
            borderBottomColor: `red`,
            border: `none`,
          },
          '& fieldset': {
            borderColor: `rgba(0,0,0,0.1)`,
          },
        },
        ...textFieldProps.sx,
      }}
    />
  );
};
