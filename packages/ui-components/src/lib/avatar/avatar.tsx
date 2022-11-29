import { forwardRef, useState } from 'react';
import { AvatarProps } from './types';
import { clsx } from 'clsx';
import { withLabel } from './with-label';

export const Avatar = withLabel(
  forwardRef<HTMLImageElement, AvatarProps>(
    ({ size, src, fallbackInitials, variant, ...rest }, ref) => {
      const [loadError, setError] = useState(false);

      const getSize = () => {
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
        'group-hover:opacity-60',
        'group-hover:cursor-pointer',
        'hover:cursor-pointer',
        'hover:opacity-60',
        'dark:hover:text-dark',
        variant === 'outlined'
          ? 'outline outline-1 outline-offset-2 outline-primary-light dark:outline-primary-dark'
          : null
      );

      if (loadError || !src) {
        return (
          <div
            className={clsx(
              'bg-secondary-light',
              'dark:bg-secondary-dark',
              'text-text-dark',
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
          src={`/image?url=${src}`}
          onError={() => setError(true)}
          {...rest}
        />
      );
    }
  )
);
