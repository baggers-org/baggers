import { forwardRef } from 'react';
import { tlsx } from '../../util/clsx';
import { TableHeaderProps } from './table.props';

export const TableHeader = forwardRef(
  (props: TableHeaderProps, ref: any) => {
    return (
      <th
        className={
          tlsx(
            'group',
            'font-heading',
            'shadow-sm',

            'bg-paper-light',
            'dark:bg-paper-dark'
          ) + props.className
        }
        {...props}
        ref={ref}
      >
        {props.children}
      </th>
    );
  }
);
