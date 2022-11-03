import { Paper } from '@mui/material';
import { TransactionsTable } from 'apps/ui/app/components/TransactionsTable';
import { usePortfolio } from 'apps/ui/app/hooks/usePortfolio';

export default function Transactions() {
  const { transactions } = usePortfolio();
  return (
    <Paper sx={{ height: 600, width: '100%' }}>
      <TransactionsTable transactions={transactions} />
    </Paper>
  );
}
