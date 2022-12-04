import {
  DetailedHTMLProps,
  PropsWithChildren,
  ThHTMLAttributes,
} from 'react';
import { HTMLProps } from '../../util/html-props';

export type TableProps = PropsWithChildren<
  HTMLProps<HTMLTableElement>
>;

export type TableHeadProps = PropsWithChildren<
  HTMLProps<HTMLTableSectionElement>
>;

export type TableHeaderProps = PropsWithChildren<
  DetailedHTMLProps<
    ThHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >
>;
export type TableBodyProps = PropsWithChildren<
  HTMLProps<HTMLTableSectionElement>
>;

export type TableRowProps = PropsWithChildren<
  HTMLProps<HTMLTableRowElement>
>;
export type TableCellProps = PropsWithChildren<
  HTMLProps<HTMLTableCellElement>
>;
