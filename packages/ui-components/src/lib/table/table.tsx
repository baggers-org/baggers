import { TableProps } from './table.props';

export function Table(props: TableProps) {
  return (
    <table
      className="border border-1 dark:border-[rgba(250,250,250,0.6)] rounded-xl"
      {...props}
    >
      {props.children}
    </table>
  );
}
