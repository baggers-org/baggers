import {
  ColumnDef,
  RowData,
  SortingState,
} from '@tanstack/react-table';
import { TableActionsProps } from '../table/table-actions';

export type DataTableProps<D extends RowData> = {
  defaultColumns: ColumnDef<D, any>[];
  defaultSort?: SortingState;
  data: D[];
} & TableActionsProps;
