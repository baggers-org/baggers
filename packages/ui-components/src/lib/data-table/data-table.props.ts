import {
  ColumnDef,
  RowData,
  SortingState,
} from '@tanstack/react-table';

export type DataTableProps<D extends RowData> = {
  defaultColumns: ColumnDef<D, any>[];
  defaultSort?: SortingState;
  data: D[];
};
