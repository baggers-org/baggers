import { TransactionsTable } from '~/components/tables/transactions-table';
import { usePortfolio } from '~/hooks/usePortfolio';
import { TransactionsHeader } from '~/pages/portfolios/transactions/transactions-header';

export default function Transactions() {
  const { transactions } = usePortfolio();

  return (
    <div>
      <TransactionsHeader />
      <TransactionsTable transactions={transactions} />;
    </div>
  );
}
