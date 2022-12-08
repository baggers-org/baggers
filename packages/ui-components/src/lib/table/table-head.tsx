import { tlsx } from '../../util/clsx';
import { TableHeadProps } from './table.props';

export function TableHead(props: TableHeadProps) {
  return (
    <thead
      className={tlsx(
        'border-b-2 border-b-[rgba(51,46,60,0.24)]',
        'dark:border-b-[rgba(96,96,96,0.4)]'
      )}
      {...props}
    />
  );
}
