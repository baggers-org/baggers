import { TableCellProps } from './table.props';

export function TableCell(props: TableCellProps) {
  return <td className="border" {...props} />;
}
