import React, { useEffect, useState } from 'react';
import { useField } from 'remix-validated-form';
import { BaggersSelect, BaggersSelectProps } from 'apps/ui/app/components';

export type ValidatedSelectProps = BaggersSelectProps & { name: string };
export const ValidatedSelect: React.FC<ValidatedSelectProps> = ({
  name,
  children,
  ...selectProps
}) => {
  const { error, getInputProps, validate, setTouched } = useField(name);

  const [value, setValue] = useState<any>();

  useEffect(() => {
    validate();
    setTouched(true);
  }, [value]);

  const inputProps = getInputProps(selectProps);

  return (
    <BaggersSelect
      {...inputProps}
      onChange={(e) => {
        setValue(e.target.value);
        inputProps?.onChange?.(e);
      }}
      error={!!error}
      helperText={error}
      autoComplete={name}
    >
      {children}
    </BaggersSelect>
  );
};
