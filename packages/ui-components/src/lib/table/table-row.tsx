import { TableRowProps } from './table.props';

export function TableRow(props: TableRowProps) {
  return (
    <tr
      className="border-collapse border-b border-b-[rgba(51,46,60,0.24)] dark:border-b-[rgba(96,96,96,0.4)]"
      {...(props as any)}
    />
  );
}
