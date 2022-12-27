import { tlsx } from '../../util/clsx';
import { TableRowProps } from './table.props';

export function TableRow(props: TableRowProps) {
  return <tr className={tlsx()} {...(props as any)} />;
}
