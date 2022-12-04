import { Column, Table } from '@tanstack/react-table';

export type DataTableMenuProps<D> = {
  table: Table<D>;
  column: Column<D>;
};
