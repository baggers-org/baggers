import { tlsx } from '../../util/clsx';
import { inputCommonClasses } from '../input-wrapper/input-common-classes';
import { InputWrapper } from '../input-wrapper/input-wrapper';
import { TextFieldProps } from './text-field.types';

export function TextField(props: TextFieldProps) {
  return (
    <InputWrapper {...props}>
      <input className={tlsx(inputCommonClasses)} {...props} />
    </InputWrapper>
  );
}
