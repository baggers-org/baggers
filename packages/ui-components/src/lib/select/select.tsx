import { Listbox } from '@headlessui/react';
import { tlsx } from '../../util/clsx';
import { inputCommonClasses } from '../input-wrapper/input-common-classes';
import { InputWrapper } from '../input-wrapper/input-wrapper';
import { SelectProps } from './select.props';

export function Select({ options, ...props }: SelectProps) {
  return (
    <InputWrapper {...props}>
      <Listbox defaultValue={options[0].id} name={props.name}>
        <Listbox.Button
          className={tlsx(
            inputCommonClasses,
            'text-left',
            'flex',
            'place-items-center',
            'gap-2'
          )}
        >
          {({ value }) => {
            const selected = options.find((o) => o.id === value);
            if (selected) {
              return (
                <>
                  {selected.renderIcon?.()}
                  {selected.label}
                </>
              );
            }

            return value;
          }}
        </Listbox.Button>
        <Listbox.Options
          className={tlsx(
            'absolute',
            'overflow-auto',
            'mt-24',
            'z-50',
            'w-full',
            'rounded-xl',
            'shadow-sm',
            'dark:bg-dark-grey-600',
            'bg-light-grey-300'
          )}
        >
          {options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option.id}
              className={tlsx(
                'p-3',
                'cursor-pointer',
                'hover:bg-primary-transparent-light',
                'flex',
                'place-items-center',
                'gap-2'
              )}
            >
              {option.renderIcon?.()}
              {option.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </InputWrapper>
  );
}
