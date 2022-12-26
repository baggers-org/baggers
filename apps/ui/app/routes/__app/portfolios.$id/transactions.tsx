import { TransactionsTable } from '~/components/tables/transactions-table';
import { usePortfolio } from '~/hooks/usePortfolio';

export default function Transactions() {
  const { transactions } = usePortfolio();

  return <TransactionsTable transactions={transactions} />;
}
