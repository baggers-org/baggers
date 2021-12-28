import React, { useMemo, useEffect } from 'react';
import { Paper } from '@mui/material';
import { useRouter } from 'next/router';
import Error from 'next/error';

import { Portfolio } from '@/graphql/Mutations.document.gql';
import { useGetPortfolioByIdLazyQuery } from '@/graphql/Queries.document.gql';
import { PageLoadingOverlay } from '@/components';

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

  // TODO: replace with skeleton
  if (!portfolioId) {
    return <PageLoadingOverlay />;
  }
  return <Paper>Placeholder</Paper>;
};
export default ViewPortfolioPage;
