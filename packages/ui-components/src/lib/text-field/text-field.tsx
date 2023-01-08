import { tlsx } from '../../util/clsx';
import { inputCommonClasses } from '../input-wrapper/input-common-classes';
import { MdAttachMoney } from 'react-icons/md';
import { InputWrapper } from '../input-wrapper/input-wrapper';
import { TextFieldProps } from './text-field.types';

export function TextField(props: TextFieldProps) {
  return (
    <InputWrapper {...props}>
      <input className={tlsx(inputCommonClasses)} {...props} />
      {props.isMonetaryInput ? (
        <MdAttachMoney
          className={tlsx(
            'relative pointer-events-none -translate-y-9 translate-x-2',
            'text-text-secondary-light dark:text-text-secondary-dark',
            'font-bold'
          )}
        />
      ) : null}
    </InputWrapper>
  );
}
