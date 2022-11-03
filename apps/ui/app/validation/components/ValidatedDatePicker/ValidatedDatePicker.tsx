import { TextField } from '@mui/material';
import { DatePickerProps, DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { useField } from 'remix-validated-form';

export type ValidatedDatePickerProps = Partial<
  DatePickerProps<Date, string>
> & {
  name: string;
};
export const ValidatedDatePicker: React.FC<ValidatedDatePickerProps> = ({
  name,
  ...datePickerProps
}) => {
  const { error, getInputProps, validate, defaultValue } = useField(name);

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    validate();
  }, [value]);

  const inputProps = getInputProps(datePickerProps);

  return (
    <DatePicker
      {...inputProps}
      value={value}
      inputFormat="MM/dd/yyyy"
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
