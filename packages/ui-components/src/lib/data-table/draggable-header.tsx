import {
  Column,
  ColumnOrderState,
  flexRender,
  Header,
  Table,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useDrag, useDrop } from 'react-dnd';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { tlsx } from '../../util/clsx';
import { TableHeader } from '../table';
import { DataTableMenu } from './data-table-menu';

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
            'opacity-0 group-hover:opacity-50 transition-all hover:bg-primary-transparent-light',
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
        'border-collapse'
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
          header.column.getIsPinned()
            ? 'bg-primary-transparent-light'
            : '',
          'bg-primary-transparent-light',
          'dark:bg-primary-transparent-dark',

          'group',
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
                'p-2',
                'flex-nowrap'
              )}
              onClick={(e) => {
                console.log(e);

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
              <div
                className="opacity-0 group-hover:opacity-100 transition-all ml-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                <DataTableMenu table={table} column={header.column} />
              </div>
            </div>
          )}
        </div>
      </div>
    </TableHeader>
  );
}
