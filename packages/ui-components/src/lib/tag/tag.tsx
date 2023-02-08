import React, { PropsWithChildren } from 'react';
import { FaCross } from 'react-icons/fa';
import { tlsx } from '../../util/clsx';

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
        'dark:bg-primary-transparent-dark bg-light-purple-200 p-2',
        'rounded-3xl',
        'font-normal',
        'text-sm',
        'flex',
        'px-5',
        'place-items-center',
        'gap-1',
        'max-w-fit',
        'max-h-fit'
      )}
    >
      {children}
      {removable ? (
        <FaCross
          className="hover:pointer:cursor"
          onClick={onRemove}
        />
      ) : null}
    </span>
  );
}
