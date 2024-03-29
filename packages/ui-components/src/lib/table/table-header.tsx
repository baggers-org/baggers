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
            'border-none',
            'flex-nowrap',

            'border-spacing-0'
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
