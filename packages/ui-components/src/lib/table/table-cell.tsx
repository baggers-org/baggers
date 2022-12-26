import { tlsx } from '../../util/clsx';
import { TableCellProps } from './table.props';

export function TableCell(props: TableCellProps) {
  return (
    <td
      className={tlsx(
        'py-5 px-3  mr-1 text-md font-light',
        'border-collapse',

        'border-spacing-0'
      )}
      {...props}
    />
  );
}
