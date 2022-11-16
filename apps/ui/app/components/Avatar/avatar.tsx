import { useState } from 'react';
import { AvatarProps } from './types';
import { clsx } from 'clsx';

export function Avatar({
  src,
  alt,
  fallbackInitials: fallbackContent,
}: AvatarProps) {
  const [loadError, setError] = useState(false);
  const commonClasses = clsx(
    'rounded-full',
    'w-16',
    'hover:cursor-pointer',
    'hover:border-2',
    'hover:primary-light',
    'dark:hover:text-dark'
  );

  if (loadError) {
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
        {fallbackContent}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={commonClasses}
      onError={() => {
        setError(true);
      }}
    />
  );
}
