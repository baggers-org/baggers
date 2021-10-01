import dynamic from 'next/dynamic';
import { Container, Paper } from '@material-ui/core';
import { useRouter } from 'next/router';
import Error from 'next/error';

import React, { useMemo, useEffect } from 'react';
import PositionsTable from '@/components/PositionsTable';
import { Portfolio } from '@/graphql/Mutations.document.gql';
import { useGetPortfolioByIdLazyQuery } from '@/graphql/Queries.document.gql';
import PageLoadingOverlay from '@/components/PageLoadingOverlay/PageLoadingOverlay';
import ViewPortfolioHeader from './components/ViewPortfolioHeader/ViewPortfolioHeader';

type Props = {};
const ViewPortfolioPage: React.FC<Props> = () => {
  const { query } = useRouter();
  const portfolioId = useMemo(() => {
    if (Array.isArray(query.id)) {
      return query.id[0];
    }
    return query.id;
  }, [query]);

  const [fetchPortfolio, { data }] = useGetPortfolioByIdLazyQuery({
    returnPartialData: true,
    errorPolicy: `all`,
  });

  useEffect(() => {
    if (portfolioId) {
      fetchPortfolio({
        variables: {
          id: portfolioId,
        },
      });
    }
  }, [portfolioId]);
  const portfolio = data?.getPortfolioById as Portfolio;

  if (data && !portfolio?._id) {
    return <Error statusCode={404} title="Porfolio not found" />;
  }

  if (!portfolioId) {
    return <PageLoadingOverlay />;
  }
  return (
    <Container maxWidth="lg">
      <ViewPortfolioHeader portfolio={portfolio} />
      <Paper>
        <PositionsTable
          filter={{
            portfolio: portfolioId,
          }}
          defaultSortDirection="desc"
          defaultSortKey="MARKET_VALUE"
        />
      </Paper>
    </Container>
  );
};
export default ViewPortfolioPage;
