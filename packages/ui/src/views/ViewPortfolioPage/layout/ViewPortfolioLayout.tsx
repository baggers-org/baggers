import { Fade, Grid } from '@mui/material';

import { Portfolio } from '@/graphql/Mutations.document.gql';
import { useGetPortfolioSummaryByIdQuery } from '@/graphql/Queries.document.gql';
import { useEditPortfolio } from '@/hooks';
import { ViewPortfolioTabs } from './ViewPortfolioTabs';
import { usePortfolioIdFromURL } from '../hooks';
import { PortfolioHeader } from '../PortfolioHeader';

export const ViewPortfolioLayout: React.FC = ({ children }) => {
  const portfolioId = usePortfolioIdFromURL();

  const { data, loading } = useGetPortfolioSummaryByIdQuery({
    variables: {
      id: portfolioId,
    },
    errorPolicy: `all`,
  });

  useEditPortfolio(portfolioId);

  const portfolio = data?.getPortfolioById as Portfolio;
  const needsToSetName = !portfolio?.name;

  const needsToAddFirstPosition = !loading && portfolio?.totalValue === 0;

  return (
    <Fade in>
      <Grid container>
        <PortfolioHeader
          portfolio={portfolio}
          loading={loading}
          isCreating={needsToSetName || needsToAddFirstPosition}
        />
        {!needsToAddFirstPosition && !needsToSetName ? (
          <Grid item xs={12} mb={5}>
            <ViewPortfolioTabs />
          </Grid>
        ) : null}
        {!needsToSetName ? children : null}
      </Grid>
    </Fade>
  );
};
