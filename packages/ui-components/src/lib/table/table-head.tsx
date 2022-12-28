import { tlsx } from '../../util/clsx';
import { TableHeadProps } from './table.props';

export function TableHead(props: TableHeadProps) {
  return (
    <thead
      className={tlsx(
        'dark:bg-dark-grey-800',
        'bg-[#F0F2F5]',
        'text-center'
      )}
      {...props}
    />
  );
}
