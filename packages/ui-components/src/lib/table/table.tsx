import { tlsx } from '../../util/clsx';
import { TableProps } from './table.props';

export function Table(props: TableProps) {
  return (
    <table
      className={tlsx(
        'border border-[rgba(51,46,60,0.14)]',
        'dark:border-[rgba(96,96,96,0.4)]'
      )}
      {...props}
    >
      {props.children}
    </table>
  );
}
