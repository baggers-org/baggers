import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { PropsWithChildren } from 'react';
import { TableConfig, TableProperties } from './BaggersTableTypes';

type Props<ObjectType> = {
  properties: TableProperties<ObjectType>;
  rowCount: number;
  numSelected: number;
  onRequestSort: (field: string, event: any) => void;
} & TableConfig<ObjectType>;
function BaggersTableHead<ObjectType>({
  allowRowSelection,
  numSelected,
  rowCount,
  properties,
  disableSorting,
  onSelectAllClick,
  onRequestSort,
  sortKey,
  sortDirection,
}: PropsWithChildren<Props<ObjectType>>) {
  const createSortHandler = (property: string) => (event: any) => {
    if (onRequestSort) {
      onRequestSort(property, event);
    }
  };
  return (
    <TableHead>
      <TableRow>
        {allowRowSelection ? (
          <TableCell padding={allowRowSelection ? `checkbox` : `none`}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': `select all` }}
            />
          </TableCell>
        ) : null}
        {properties.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? `right` : `left`}
            padding={headCell.disablePadding ? `none` : `default`}
            sortDirection={sortKey === headCell.sortKey ? sortDirection : false}
          >
            {!disableSorting && headCell.sortKey ? (
              <TableSortLabel
                active={sortKey === headCell.sortKey}
                direction={sortKey === headCell.sortKey ? sortDirection : `asc`}
                onClick={createSortHandler(headCell.sortKey)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              <>{headCell.label}</>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default BaggersTableHead;
