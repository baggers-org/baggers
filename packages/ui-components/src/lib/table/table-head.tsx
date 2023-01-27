import { tlsx } from '../../util/clsx';
import { TableHeadProps } from './table.props';

export function TableHead(props: TableHeadProps) {
  return (
    <thead
      className={tlsx(
        'dark:',
        'text-center',
        'border-b ',
        'border-b-[rgba(51,46,60,0.24)]',
        'dark:border-b-[#414549]'
      )}
      {...props}
    />
  );
}
