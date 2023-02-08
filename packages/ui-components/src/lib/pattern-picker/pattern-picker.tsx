import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';
import { InputWrapper } from '../input-wrapper/input-wrapper';
import { ImageUploaderProps } from './pattern-picker.props';
import { usePatterns } from './usePatterns';

const imageIconClasses = [
  'w-full h-[64px]',
  'hover:opacity-50',
  'cursor-pointer',
  'rounded-lg',
];
export function PatternPicker({
  name,
  ...inputWrapperProps
}: ImageUploaderProps) {
  const patterns = usePatterns();
  const [value, setValue] = useState();
  return (
    <InputWrapper {...inputWrapperProps}>
      <RadioGroup
        name={name}
        onChange={setValue}
        className="rounded-xl grid grid-cols-2 gap-2 p-2 dark:bg-dark-grey-900 bg-background-light"
      >
        {patterns.map((className) => (
          <RadioGroup.Option
            value={className}
            className={({ checked }) =>
              clsx(
                imageIconClasses,
                'transition-opacity',
                value && !checked ? 'opacity-30' : '',
                className,
                'dark:bg-[rgba(154,106,255,0.03)]',
                'bg-light-purple-100'
              )
            }
          />
        ))}
      </RadioGroup>
    </InputWrapper>
  );
}
