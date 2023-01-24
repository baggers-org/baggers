import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { useCallback } from 'react';
import { tlsx } from '../../util/clsx';
import { SelectOption, OptionWithCategories } from './select.props';

export function useRenderOptions() {
  return useCallback(
    (options: SelectOption[] | OptionWithCategories[]) => {
      const render = (options: SelectOption[]) => {
        return options.map((option) => (
          <Listbox.Option
            key={option.id}
            value={option.id}
            className={tlsx(
              'p-3',
              'cursor-pointer',
              'hover:bg-light-purple-200',
              'dark:hover:bg-primary-transparent-dark',
              'flex',
              'place-items-center',
              'gap-2'
            )}
          >
            {option.renderIcon?.()}
            {option.label}
          </Listbox.Option>
        ));
      };
      function isWithCategories(
        options: SelectOption[] | OptionWithCategories[]
      ): options is OptionWithCategories[] {
        return !!options[0].category;
      }

      if (isWithCategories(options)) {
        return options.map((o) => (
          <>
            <div
              className={clsx(
                'p-3 text-text-secondary-light dark:text-text-secondary-dark',
                'dark:bg-dark-grey-800',
                'w-full',
                'uppercase'
              )}
            >
              {o.category}
            </div>
            {render(o.options)}
          </>
        ));
      }
      return render(options);
    },
    []
  );
}
