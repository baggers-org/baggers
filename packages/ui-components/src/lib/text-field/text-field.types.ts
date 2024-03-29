import { InputWrapperProps } from '../input-wrapper/input-wrapper.props';

export type TextFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputWrapperProps & {
    isMonetaryInput?: boolean;
  } & React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
