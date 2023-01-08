import React from 'react';
import { HTMLProps } from '../../util/html-props';
import { InputWrapperProps } from '../input-wrapper/input-wrapper.props';

export type RenderOptionOptions = {
  active?: boolean;
  checked?: boolean;
};
export type RadioGroupOption = {
  id: string;
  title?: string;
  renderOption: (options: RenderOptionOptions) => React.ReactElement;
};
export type RadioGroupProps = {
  options: RadioGroupOption[];
} & HTMLProps<HTMLDivElement> &
  InputWrapperProps & {
    onChange?: (val: string) => void;
  };
