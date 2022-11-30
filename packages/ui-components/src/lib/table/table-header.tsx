import { TableHeaderProps } from './table.props';

export function TableHeader(props: TableHeaderProps) {
  return (
    <th className="py-2 px-16 " {...props}>
      {props.children}
    </th>
  );
}
