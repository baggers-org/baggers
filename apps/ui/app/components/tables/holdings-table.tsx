import { Holding } from '@baggers/graphql-types';
import {
  createColumnHelper,
  DataTable,
  ProfitLoss,
} from '@baggers/ui-components';
import { formatCurrency, formatNumber } from '@baggers/ui-util';

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
    minSize: 500,
  }),
  column.accessor('marketValue', {
    id: 'marketValue',
    header: 'Mkt Value',
    cell: ({ getValue }) => formatCurrency(getValue()),
  }),
  column.accessor('exposure', {
    id: 'exposure',
    header: '% of Portfolio',
    cell: ({ getValue }) => formatNumber(getValue()),
  }),
  column.accessor('costBasis', {
    id: 'costBasis',
    header: 'Cost Basis',
    cell: ({ getValue }) => formatCurrency(getValue()),
  }),
  column.accessor('quantity', {
    id: 'quantity',
    header: 'Quantity',
    cell: ({ getValue }) => formatNumber(getValue()),
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
  column.accessor('profitLossPercent', {
    id: 'profitLossPercent',
    header: 'P/L %',
    cell: ({ getValue }) => {
      return <ProfitLoss value={getValue()} isPercent />;
    },
  }),
  column.accessor('profitLossUsd', {
    id: 'profitLossUsd',
    header: 'P/L $',

    cell: ({ getValue }) => {
      return <ProfitLoss value={getValue()} />;
    },
  }),
  column.accessor('dailyProfitLossUsd', {
    id: 'dailtyProfitLossUsd',
    header: 'Todays P/L $',
    cell: ({ getValue }) => {
      return <ProfitLoss value={getValue()} />;
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
