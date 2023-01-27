import { tlsx } from '../../util/clsx';
import { TableCellProps } from './table.props';

export function TableCell(props: TableCellProps) {
  return (
    <td
      className={tlsx(
        'py-5 px-3  mr-1 text-md font-light',
        'border-b ',
        'border-b-[rgba(51,46,60,0.24)]',
        'dark:border-b-[#414549]'
      )}
      {...props}
    />
  );
}
