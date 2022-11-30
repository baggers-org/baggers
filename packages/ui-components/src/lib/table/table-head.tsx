import { TableHeadProps } from './table.props';

export function TableHead(props: TableHeadProps) {
  return <thead className="bg-primary-transparent-dark" {...props} />;
}
