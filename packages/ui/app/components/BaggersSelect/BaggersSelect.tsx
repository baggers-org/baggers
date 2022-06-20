import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  Select,
  SelectProps,
} from '@mui/material';
import React from 'react';

export type BaggersSelectProps = SelectProps & {
  helperText?: string;
  formLabel?: string;
};
export const BaggersSelect: React.FC<BaggersSelectProps> = ({
  children,
  helperText,
  ...selectProps
}) => {
  const labelId = `${selectProps.name}-label`;
  return (
    <FormControl fullWidth error={selectProps.error}>
      <FormLabel>{selectProps.formLabel}</FormLabel>
      <InputLabel id={labelId} htmlFor={selectProps.name}>
        {selectProps?.label}
      </InputLabel>
      <Select
        id={selectProps.name}
        labelId={labelId}
        {...selectProps}
        fullWidth
      >
        {children}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
