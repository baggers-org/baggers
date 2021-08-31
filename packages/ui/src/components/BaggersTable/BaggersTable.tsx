import { PropsWithChildren, useEffect, useState, ChangeEvent } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { TableConfig, TableProperties } from './BaggersTableTypes';

import BaggersTableToolbar from './BaggersTableToolbar';
import BaggersTableHead from './BaggersTableHead';
import BaggersTableRow from './BaggersTableRow';

type Props<ObjectType> = {
  objects: ObjectType[];
  properties: TableProperties<ObjectType>;
  showPagination?: boolean;
} & TableConfig<ObjectType>;

const useStyles = makeStyles({
  container: {
    maxHeight: `350px`,
  },
});
function BaggersTable<ObjectType extends { _id: string }>({
  objects,
  properties,
  showPagination,
  onSort,
  ...rest
}: PropsWithChildren<Props<ObjectType>>) {
  const [selectedRows, setSelectedRows] = useState<Array<string>>([]);

  const classes = useStyles();

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(objects.map((r) => r._id));
      return;
    }
    setSelectedRows([]);
  };

  const [sortKey, setSortKey] = useState<string | undefined>(rest.sortKey);
  const [sortDirection, setSortDirection] = useState<
    'asc' | 'desc' | undefined
  >(rest.sortDirection);

  const handleSort = (field: string) => {
    setSortKey((prevOrderBy) => {
      if (prevOrderBy !== field) {
        setSortDirection(`desc`);
      } else {
        setSortDirection((prevOrder) => (prevOrder === `asc` ? `desc` : `asc`));
      }
      return field;
    });
  };

  useEffect(() => {
    if (sortDirection && sortKey && onSort) {
      onSort(sortKey, sortDirection);
    }
  }, [sortDirection, sortKey]);
  return (
    <>
      <BaggersTableToolbar
        onDelete={() => {
          if (rest.onToolbarAction) {
            rest.onToolbarAction(`DELETE_SELECTED`, selectedRows);
            setSelectedRows([]);
          }
        }}
        {...rest}
        numSelected={selectedRows.length}
      />
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <BaggersTableHead
            properties={properties}
            {...rest}
            sortKey={sortKey}
            sortDirection={sortDirection}
            rowCount={objects?.length || 0}
            numSelected={selectedRows?.length || 0}
            // TODO: toggle select all
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleSort}
          />
          <TableBody>
            {objects?.map((obj) => (
              <BaggersTableRow
                object={obj}
                properties={properties}
                {...rest}
                onRowClick={(row, ...onRowClickProps) => {
                  setSelectedRows((prev) => {
                    if (prev.includes(row._id)) {
                      return prev.filter((r) => r !== row._id);
                    }
                    return [...prev, row._id];
                  });
                  if (rest.onRowClick) {
                    rest.onRowClick(row, ...onRowClickProps);
                  }
                }}
                isRowSelected={
                  !!rest.allowRowSelection && selectedRows.includes(obj._id)
                }
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination ? (
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          count={objects.length}
          rowsPerPage={10}
          {...rest}
          component="div"
        />
      ) : null}
    </>
  );
}

export default BaggersTable;
