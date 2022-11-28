import React, { PropsWithChildren } from 'react';
import { tlsx } from '../../util/clsx';
import { X } from 'tabler-icons-react';

export type TagProps = {
  removable?: boolean;
  onRemove?: () => void;
};
export function Tag({
  removable,
  onRemove,
  children,
}: PropsWithChildren<TagProps>) {
  return (
    <span
      className={tlsx(
        'dark:bg-primary-transparent-dark bg-primary-transparent-light p-2',
        'rounded-lg',
        'font-normal',
        'text-sm',
        'flex',
        'place-items-center',
        'gap-1',
        'max-w-fit',
        'max-h-fit'
      )}
    >
      {children}
      {removable ? (
        <X className="hover:pointer:cursor" onClick={onRemove} />
      ) : null}
    </span>
  );
}
