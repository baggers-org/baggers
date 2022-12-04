import { TableProps } from './table.props';

export function Table(props: TableProps) {
  return <table {...props}>{props.children}</table>;
}
