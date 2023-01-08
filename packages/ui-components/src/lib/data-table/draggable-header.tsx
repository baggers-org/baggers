import {
  Column,
  ColumnOrderState,
  flexRender,
  Header,
  Table,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { tlsx } from '../../util/clsx';
import { TableHeader } from '../table';

export type DraggableColumnHeaderProps<D> = {
  table: Table<D>;
  header: Header<D, unknown>;
};
export function DraggableColumnHeader<D>({
  table,
  header,
}: DraggableColumnHeaderProps<D>) {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const reorderColumn = (
    draggedColumnId: string,
    targetColumnId: string,
    columnOrder: string[]
  ): ColumnOrderState => {
    columnOrder.splice(
      columnOrder.indexOf(targetColumnId),
      0,
      columnOrder.splice(
        columnOrder.indexOf(draggedColumnId),
        1
      )[0] as string
    );
    return [...columnOrder];
  };

  const renderSortChevrons = (header: Header<D, unknown>) => {
    const isSorted = header.column.getIsSorted();
    if (!isSorted)
      return (
        <FaChevronDown
          className={clsx(
            'opacity-0 group-hover:opacity-50 transition-all hover:bg-light-purple-100',
            'rounded-full'
          )}
        />
      );
    if (isSorted === 'asc') {
      return <FaChevronUp />;
    }
    return <FaChevronDown />;
  };

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'column',
    hover: (draggedColumn: Column<D>) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      );

      setColumnOrder(newColumnOrder);
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });

  const [, dragRef, previewRef] = useDrag({
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
    item: () => column,
    type: 'column',
  });

  const isNumeric = useMemo(() => {
    if (header.column.id) {
      const originalRow = table.getRowModel().rows[0]?.original;

      const value = header.column.accessorFn?.(originalRow, 0);

      return typeof value === 'number';
    }
  }, [header.column.id, table.getRow]);

  console.log(isNumeric);

  return (
    <TableHeader
      key={header.id}
      colSpan={header.colSpan}
      ref={dropRef}
      id={header.id}
      style={{ width: header.getSize() }}
      className={tlsx(
        isOver && canDrop
          ? 'outline outline-1 border-primary-light'
          : '',
        'whitespace-nowrap',
        'border-none',
        isNumeric ? 'text-right' : 'text-left',
        'dark:text-text-secondary-dark',
        'text-text-secondary-light',
        'tracking-wider',
        'uppercase'
      )}
    >
      <div
        ref={dragRef}
        style={{
          background: header.column.getIsPinned()
            ? 'rgba(116 47 246, 0.5)'
            : undefined,
        }}
        className={tlsx(
          header.column.getIsPinned() ? 'bg-light-purple-100' : '',
          'group',
          'border-none',
          'font-normal',
          'py-2',
          'transition-transform'
        )}
      >
        <div ref={previewRef}>
          {header.isPlaceholder ? null : (
            <div
              className={tlsx(
                header.column.getCanSort() &&
                  'cursor-pointer select-none',
                'flex w-full place-items-center gap-3',
                isNumeric ? 'flex-row-reverse' : 'flex-row',
                isNumeric ? 'place-content-end' : 'place-items-start',
                'p-2',
                header.column.getIsSorted()
                  ? 'font-bold '
                  : 'font-normal',
                'border-none',
                'flex-nowrap'
              )}
              onClick={(e) => {
                header.column.getToggleSortingHandler?.()?.(e);
              }}
            >
              {flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}
              <div className="relative">
                {renderSortChevrons(header)}
              </div>

              {/* TODO: find out a nice way to display this menu with right-aligned headers*/}
              {/* <div
                className="opacity-0 group-hover:opacity-100 transition-all ml-auto "
                onClick={(e) => e.stopPropagation()}
              >
                <DataTableMenu table={table} column={header.column} />
              </div> */}
            </div>
          )}
        </div>
      </div>
    </TableHeader>
  );
}
