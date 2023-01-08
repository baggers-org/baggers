import { PropsWithChildren } from 'react';
import { InputWrapperProps } from './input-wrapper.props';

export function InputWrapper({
  children,
  label,
  helperText,
  id,
}: PropsWithChildren<InputWrapperProps>) {
  return (
    <div className="flex flex-col gap-1 relative">
      <label htmlFor={id}>{label}</label>
      <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-1">
        {helperText}
      </span>
      {children}
    </div>
  );
}
