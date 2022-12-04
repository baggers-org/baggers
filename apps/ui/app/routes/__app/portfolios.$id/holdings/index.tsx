import { HoldingsTable } from '~/components/tables/holdings-table';
import { usePortfolio } from '~/hooks/usePortfolio';

export default function Holdings() {
  const portfolio = usePortfolio();

  return <HoldingsTable holdings={portfolio.holdings} />;
}
