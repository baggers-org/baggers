import { forwardRef, useState } from 'react';
import { AvatarProps } from './types';
import { clsx } from 'clsx';

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  (props, ref) => {
    const { fallbackInitials, src } = props;
    const [loadError, setError] = useState(false);
    const commonClasses = clsx(
      'rounded-full',
      'w-12',
      'h-12',
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
            'h-16',
            'text-3xl',
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
  }
);
