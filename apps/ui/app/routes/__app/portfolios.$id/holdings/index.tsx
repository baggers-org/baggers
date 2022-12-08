import { Holding } from '@baggers/graphql-types';
import { useParams } from '@remix-run/react';
import { useMemo } from 'react';
import { useSubscribe } from 'remix-sse/client';
import { HoldingsTable } from '~/components/tables/holdings-table';
import { usePortfolio } from '~/hooks/usePortfolio';

export default function Holdings() {
  const { id } = useParams();
  const portfolio = usePortfolio();

  const holdings = useSubscribe(
    `/portfolios/${id}/subscribe`,
    'holdings',
    {
      returnLatestOnly: true,
      deserialize: (raw) => JSON.parse(raw) as Holding[],
    }
  );

  const realtimeHoldings = useMemo(() => {
    if (!holdings) return portfolio.holdings;

    return portfolio.holdings.map((holding, index) => {
      const realtimeHolding = holdings[index];

      return {
        ...holding,
        ...realtimeHolding,
        security: {
          ...holding.security,
          ...realtimeHolding.security,
        },
      };
    });
  }, [holdings, portfolio.holdings]);

  return <HoldingsTable holdings={realtimeHoldings} />;
}
