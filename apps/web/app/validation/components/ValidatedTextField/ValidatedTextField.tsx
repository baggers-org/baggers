import React from 'react';
import { useField, useFormContext } from 'remix-validated-form';
import {
  BaggersTextField,
  BaggersTextFieldProps,
} from '~/components/BaggersTextField';

export type ValidatedTextFieldProps = BaggersTextFieldProps & { name: string };
export const ValidatedTextField: React.FC<ValidatedTextFieldProps> = ({
  name,
  ...textFieldProps
}) => {
  const { error, getInputProps } = useField(name);

  const { hasBeenSubmitted } = useFormContext();
  return (
    <BaggersTextField
      {...getInputProps(textFieldProps)}
      error={!!error && hasBeenSubmitted}
      helperText={error && hasBeenSubmitted}
    />
  );
};
