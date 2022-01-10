import React from 'react';
import { PortfolioCard } from '@/components/PortfolioCard';
import { useMyPortfoliosSummaryQuery } from '@/graphql/Queries.document.gql';
import { BaggersPageComponent } from '@/views/types';
import { Grid } from '@mui/material';
import { Portfolio } from '@/graphql/Mutations.document.gql';
import { PageLoadingOverlay } from '@/components';
import { CreatePortfolioCard, NoPortfoliosMessage } from './components';

export const CreatedPortfoliosPage: BaggersPageComponent = () => {
  const { data, loading } = useMyPortfoliosSummaryQuery({
    fetchPolicy: `cache-and-network`,
  });

  if (!data) return <PageLoadingOverlay />;

  if (!loading && !data?.myPortfolios?.length) {
    return <NoPortfoliosMessage />;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
        <CreatePortfolioCard />
      </Grid>
      {data?.myPortfolios?.map((portfolio) => (
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <PortfolioCard portfolio={portfolio as Portfolio} />
        </Grid>
      ))}
    </Grid>
  );
};
