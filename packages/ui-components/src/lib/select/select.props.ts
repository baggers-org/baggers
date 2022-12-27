import { ReactElement } from 'react';
import { InputWrapperProps } from '../input-wrapper/input-wrapper.props';

export type SelectOption = {
  id: string;
  label: string;
  renderIcon?: () => ReactElement;
};
export type SelectProps = {
  options: SelectOption[];
} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> &
  InputWrapperProps;
