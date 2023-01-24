import { ReactElement } from 'react';
import { InputWrapperProps } from '../input-wrapper/input-wrapper.props';

export type SelectOption = {
  id: string;
  category?: string;
  label: string;
  renderIcon?: () => ReactElement;
  defaultValue?: string;
};
export type SelectProps = {
  options: SelectOption[];
} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> &
  InputWrapperProps & {
    onChange?: (val: string) => void;
  };

export type OptionWithCategories = {
  category: string;
  options: SelectOption[];
};
