import { Combobox } from '@headlessui/react';
import { useState } from 'react';
import { tlsx } from '../../util/clsx';
import { inputCommonClasses } from '../input-wrapper/input-common-classes';
import { InputWrapper } from '../input-wrapper/input-wrapper';
import { AutocompleteProps } from './autocomplete.props';

export function Autocomplete({
  results,
  onQueryChange: searchFn,
  ...props
}: AutocompleteProps) {
  const [selectedResult, setSelectedResult] = useState(
    results?.[0]?.id
  );

  return (
    <InputWrapper {...props}>
      <Combobox value={selectedResult} onChange={setSelectedResult}>
        <Combobox.Input
          autoComplete="off"
          {...props}
          className={tlsx(inputCommonClasses)}
          placeholder={props.placeholder}
          onChange={async (event) =>
            await searchFn?.(event.target.value)
          }
        />
        <Combobox.Options
          className={tlsx(
            'absolute',
            'w-full',
            'mt-24',
            'rounded-xl',
            'dark:bg-dark-grey-600',
            'bg-light-grey-300',
            'shadow-lg',
            'p-2',
            'z-20'
          )}
        >
          {!results?.length ? <div>No results</div> : null}
          {results?.map((result) => (
            <Combobox.Option
              key={result.id}
              value={result.id}
              className={({ active }) =>
                tlsx(
                  'p-2',
                  'rounded-xl',
                  'cursor-pointer',
                  active
                    ? 'bg-primary-transparent-light dark:bg-primary-transparent-dark'
                    : '',
                  active
                    ? 'dark:text-text-dark text-primary-light'
                    : 'dark:text-text-secondary-dark text-text-secondary-light'
                )
              }
            >
              {result.render()}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </InputWrapper>
  );
}
