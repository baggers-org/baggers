import { Listbox } from '@headlessui/react';
import { tlsx } from '../../util/clsx';
import { inputCommonClasses } from '../input-wrapper/input-common-classes';
import { InputWrapper } from '../input-wrapper/input-wrapper';
import { SelectProps } from './select.props';
import { useCategories } from './useCategories';
import { useRenderOptions } from './useRenderOptions';

export function Select({ options, ...props }: SelectProps) {
  const optionsWithCategories = useCategories(options);
  const renderOptions = useRenderOptions();

  return (
    <InputWrapper {...props}>
      <Listbox
        name={props.name}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      >
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
            return (
              <span className="text-text-secondary-light dark:text-text-secondary-dark">
                {props.placeholder}
              </span>
            );
          }}
        </Listbox.Button>
        <Listbox.Options
          className={tlsx(
            'absolute',
            'overflow-auto',
            'max-h-96',
            'mt-16',
            'z-50',
            'w-full',
            'rounded-xl',
            'shadow-lg',
            'dark:bg-d-neutral-3',
            'bg-white'
          )}
        >
          {renderOptions(optionsWithCategories || options)}
        </Listbox.Options>
      </Listbox>
    </InputWrapper>
  );
}
