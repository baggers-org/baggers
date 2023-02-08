import { PropsWithChildren } from 'react';
import { tlsx } from '../../util/clsx';

export function Paper({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={tlsx(
        'bg-white dark:bg-paper-dark shadow-md rounded-xl',
        className
      )}
    >
      {children}
    </div>
  );
}
