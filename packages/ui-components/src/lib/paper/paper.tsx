import { PropsWithChildren } from 'react';
import { tlsx } from '../../util/clsx';

export function Paper({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={tlsx(
        'bg-white dark:bg-d-neutral-600 shadow-md rounded-xl',
        className
      )}
    >
      {children}
    </div>
  );
}
