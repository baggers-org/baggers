import { Transaction } from '@baggers/graphql-types';
import {
  createColumnHelper,
  DataTable,
} from '@baggers/ui-components';
import { formatCurrency, formatDate } from '@baggers/ui-util';

export type TransactionsTableProps = {
  transactions: Transaction[];
};

const column = createColumnHelper<Transaction>();

const columns = [
  column.accessor('date', {
    id: 'date',
    header: 'Date',
    cell: ({ getValue }) => formatDate(getValue()),
    minSize: 500,
  }),
  column.accessor('name', {
    header: 'Name',
    minSize: 500,
  }),
  column.accessor('quantity', {
    header: 'Quantity',
  }),
  column.accessor('price', {
    header: 'Price',
    cell: ({ getValue }) => {
      const value = getValue();

      if (!value) {
        return 'N/A';
      }
      return formatCurrency(value);
    },
  }),
  column.accessor('amount', {
    header: 'Amount',
    cell: ({ getValue }) => formatCurrency(getValue()),
  }),
];

export function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  return <DataTable data={transactions} defaultColumns={columns} />;
}
