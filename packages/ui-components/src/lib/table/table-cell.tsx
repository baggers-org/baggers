import { TableCellProps } from './table.props';

export function TableCell(props: TableCellProps) {
  return <td className="p-2 border-separate mr-1" {...props} />;
}
