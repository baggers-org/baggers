import { tlsx } from '../../util/clsx';
import { TableRowProps } from './table.props';

export function TableRow(props: TableRowProps) {
  return (
    <tr
      className={tlsx(
        'border-collapse border-b',
        'border-b-[rgba(51,46,60,0.07)]',
        'dark:border-b-[rgba(96,96,96,0.2)]'
      )}
      {...(props as any)}
    />
  );
}
