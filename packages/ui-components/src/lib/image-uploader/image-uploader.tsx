import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import { InputWrapper } from '../input-wrapper/input-wrapper';
import { ImageUploaderProps } from './image-uploader.props';
import { usePatterns } from './usePatterns';

const imageIconClasses = [
  'w-[64px] h-[64px]',
  'hover:opacity-50',
  'cursor-pointer',
  'rounded-full',
];
export function ImageUploader({
  name,
  ...inputWrapperProps
}: ImageUploaderProps) {
  const patterns = usePatterns();
  return (
    <InputWrapper {...inputWrapperProps}>
      <RadioGroup
        name={name}
        className="rounded-xl grid-cols-12 grid p-2"
      >
        {patterns.map((url) => (
          <RadioGroup.Option
            value={url}
            className={({ checked }) =>
              clsx(
                imageIconClasses,
                'bg-light-purple-300 dark:bg-primary-dark',
                'transition-opacity',
                checked
                  ? 'outline  outline-secondary-light dark:outline-secondary-dark'
                  : ''
              )
            }
            style={{
              backgroundImage: `url(${url})`,
            }}
          />
        ))}
      </RadioGroup>
    </InputWrapper>
  );
}
