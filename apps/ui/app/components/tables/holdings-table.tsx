import { Holding } from '@baggers/graphql-types';
import {
  createColumnHelper,
  DataTable,
} from '@baggers/ui-components';
import { formatCurrency } from '~/util/format-currency';

export type HoldingsTableProps = {
  holdings: Holding[];
};

const column = createColumnHelper<Holding>();

// NOTE: You need to pass an id to get draggable columns to work
const columns = [
  column.accessor('security._id', {
    id: 'symbol',
    header: 'Symbol',
  }),
  column.accessor('security.name', {
    id: 'name',
    header: 'Name',
  }),
  column.accessor('marketValue', {
    id: 'marketValue',
    header: 'Market value',
    cell: ({ getValue }) => formatCurrency(getValue()),
  }),
  column.accessor('costBasis', {
    id: 'costBasis',
    header: 'Cost Basis',
    cell: ({ getValue }) => formatCurrency(getValue()),
  }),
  column.accessor('quantity', {
    id: 'quantity',
    header: 'Quantity',
  }),
  column.accessor('security.latestPrice', {
    id: 'price',
    header: 'Latest Price',
    cell: ({ getValue }) => {
      const val = getValue();
      if (!val) return 'N/A';
      return formatCurrency(val);
    },
  }),
];
export function HoldingsTable({ holdings }: HoldingsTableProps) {
  return (
    <DataTable
      data={holdings}
      defaultColumns={columns}
      defaultSort={[{ id: 'marketValue', desc: true }]}
    />
  );
}
