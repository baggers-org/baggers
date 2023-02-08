import { tlsx } from '../../util/clsx';
import { TableProps } from './table.props';

export function Table(props: TableProps) {
  return (
    <table
      className={tlsx(
        'bg-white',
        'dark:bg-paper-dark',
        'overflow-auto',
        'rounded-lg',
        'shadow-sm',
        'block',
        'table-fixed',
        'border-spacing-0'
      )}
      {...props}
    >
      {props.children}
    </table>
  );
}
