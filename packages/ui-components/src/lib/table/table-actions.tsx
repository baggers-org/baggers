import clsx from 'clsx';
import { TableFilterIcon } from './table-filter-icon';

export type TableActionsProps = {
  tableName?: string;
  isFilterable?: boolean;
};
export function TableActions({
  tableName,
  isFilterable,
}: TableActionsProps) {
  return (
    <section
      className={clsx(
        'flex p-4 place-items-center border-b',
        'gap-4',
        'border-b-[rgba(51,46,60,0.24)]',
        'dark:border-b-[#414549]'
      )}
    >
      {isFilterable ? <TableFilterIcon /> : null}

      <h1 className="text-2xl">{tableName || 'Table'}</h1>
    </section>
  );
}
