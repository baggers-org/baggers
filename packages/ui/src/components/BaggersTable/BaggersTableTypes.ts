import {
  SortDirection,
  TableCellProps,
  TablePaginationProps,
} from '@material-ui/core';
import { ChangeEvent, ReactElement, SyntheticEvent } from 'react';

export interface TablePropertyBase {
  id: string;
  label: string;
  sortKey?: string;
  numeric?: boolean;
  disablePadding?: boolean;
  align?: TableCellProps['align'];
}
export interface TablePropertyWithKey<ObjectType> extends TablePropertyBase {
  key: keyof ObjectType;
}
export interface TablePropertyWithRender<ObjectType> extends TablePropertyBase {
  renderCell: (renderCell: ObjectType) => ReactElement | null;
}

export type TableProperty<ObjectType> =
  | TablePropertyWithKey<ObjectType>
  | TablePropertyWithRender<ObjectType>;

export type TableProperties<ObjectType> = Array<TableProperty<ObjectType>>;

export function isRenderCell<ObjectType>(
  property: TableProperty<ObjectType>,
): property is TablePropertyWithRender<ObjectType> {
  return `renderCell` in property;
}

export type TableAction = `DELETE_SELECTED`;
export type TableConfig<ObjectType> = {
  allowRowSelection?: boolean;
  disableSorting?: boolean;
  onSelectAllClick?: (event: ChangeEvent<HTMLInputElement>) => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  tableTitle?: string;
  onToolbarAction?: (action: TableAction, payload: any) => void;
  onSort?: (sortField: string, sortDirection: 'asc' | 'desc') => void;
  onRowClick?: (row: ObjectType, event: SyntheticEvent) => void;
  page: number;
  // TODO: remove any
  onChangePage: any;
  onChangeRowsPerPage?: (event: any) => void;
};
