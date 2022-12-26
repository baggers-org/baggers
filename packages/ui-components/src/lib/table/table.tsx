import { tlsx } from '../../util/clsx';
import { TableProps } from './table.props';

export function Table(props: TableProps) {
  return (
    <table
      className={tlsx(
        'bg-paper-light',
        'dark:bg-paper-dark',
        'overflow-auto',
        'block',
        'table-fixed',
        'border-collapse',
        'border-spacing-0'
      )}
      {...props}
    >
      {props.children}
    </table>
  );
}
