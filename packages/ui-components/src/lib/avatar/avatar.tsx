import { forwardRef, useState } from 'react';
import { AvatarProps } from './types';
import { clsx } from 'clsx';
import { withLabel } from './with-label';

export const Avatar = withLabel(
  forwardRef<HTMLImageElement, AvatarProps>((props, ref) => {
    const { fallbackInitials, src } = props;
    const [loadError, setError] = useState(false);

    const getSize = () => {
      const { size } = props;

      switch (size) {
        case 'sm': {
          return ['w-8', 'h-8', 'text-sm'];
        }
        case 'lg': {
          return ['w-16', 'h-16', 'text-xl'];
        }
        default: {
          return ['w-12', 'h-12', 'text-md'];
        }
      }
    };
    const commonClasses = clsx(
      'rounded-full',
      ...getSize(),
      'hover:cursor-pointer',
      'hover:border-2',
      'hover:primary-light',
      'dark:hover:text-dark'
    );

    if (loadError || !src) {
      return (
        <div
          className={clsx(
            'bg-secondary-light',
            'dark:bg-secondary-dark',
            'place-content-center',
            'place-items-center',
            'flex',
            commonClasses
          )}
        >
          {fallbackInitials}
        </div>
      );
    }
    return (
      <img
        ref={ref}
        className={commonClasses}
        onError={() => {
          setError(true);
        }}
        {...props}
      />
    );
  })
);
