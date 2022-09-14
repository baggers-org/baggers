import { TextField } from '@mui/material';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { useField } from 'remix-validated-form';

export type ValidatedDateTimePickerProps = Partial<
  DateTimePickerProps<Date, string>
> & {
  name: string;
};
export const ValidatedDateTimePicker: React.FC<
  ValidatedDateTimePickerProps
> = ({ name, ...datePickerProps }) => {
  const { error, getInputProps, validate, defaultValue } = useField(name);

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    validate();
  }, [value]);

  const inputProps = getInputProps(datePickerProps);

  return (
    <DateTimePicker
      {...inputProps}
      value={value}
      onChange={(val) => {
        setValue(val);
        inputProps?.onChange?.(val);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          error={!!error}
          helperText={error}
          {...inputProps}
        />
      )}
      {...datePickerProps}
    />
  );
};
