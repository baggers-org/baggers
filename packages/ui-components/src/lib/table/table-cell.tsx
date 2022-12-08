import { TableCellProps } from './table.props';

export function TableCell(props: TableCellProps) {
  return (
    <td className="py-5 px-3  mr-1 text-md font-light " {...props} />
  );
}
