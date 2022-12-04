import {
  ColumnOrderState,
  ColumnResizeMode,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '../table';
import { DataTableProps } from './data-table.props';
import { DraggableColumnHeader } from './draggable-header';

export function DataTable<
  D extends object = Record<string, unknown>
>({ defaultColumns, data, defaultSort }: DataTableProps<D>) {
  const [columns] = useState(() => [...defaultColumns]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((column) => column.id as string)
  );
  const [columnResizeMode] = useState<ColumnResizeMode>('onChange');
  const [columnPinning, setColumnPinning] = useState({});

  const [sorting, setSorting] = useState<SortingState>(
    defaultSort || []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    sortDescFirst: true,
    columnResizeMode,
    state: {
      sorting,
      columnOrder,
      columnPinning,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
  });

  return (
    <Table>
      <TableHead>
        {table.getHeaderGroups().map((group) => (
          <TableRow key={group.id}>
            {group.headers.map((header) => (
              <DraggableColumnHeader
                table={table}
                header={header}
                key={header.id}
              />
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody className="transition-all">
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
