import { usePortfolio } from '~/hooks/usePortfolio';

export default function Transactions() {
  const { transactions } = usePortfolio();
  return <div>{JSON.stringify(transactions)}</div>;
}
