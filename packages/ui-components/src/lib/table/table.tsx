import { tlsx } from '../../util/clsx';
import { TableProps } from './table.props';

export function Table(props: TableProps) {
  return (
    <table
      className={tlsx(
        'bg-light-grey-100',
        'dark:bg-dark-grey-700',
        'overflow-auto',
        'block',
        'shadow-xl',
        'table-fixed',
        'rounded-xl',
        'border-spacing-0'
      )}
      {...props}
    >
      {props.children}
    </table>
  );
}
