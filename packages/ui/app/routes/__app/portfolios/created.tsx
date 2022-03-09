import React from 'react';
import { Grid } from '@mui/material';
import { CreatePortfolioCard, PortfolioCard } from '~/components';
import { useLoaderData } from '@remix-run/react';
import {
  LoaderFunction,
  ActionFunction,
  redirect,
} from '@remix-run/server-runtime';
import { getSdk, MyPortfoliosSummaryQuery } from '~/generated/graphql';
import { sdk } from '~/graphql/sdk.server';
// import { SDK } from '~/sdk/sdk.server';

export const loader: LoaderFunction = async ({ request }) => {
  return sdk.myPortfoliosSummary()
};

// export const action: ActionFunction = async ({ request }) => {
//   const sdk = await new SDK().login(request);
//   const newPortfolio = await sdk.portfolios.create();
//   return redirect(`/portfolios/${newPortfolio._id}/positions`);
// };
export default function CreatedPortfoliosPage() {
  const data = useLoaderData<MyPortfoliosSummaryQuery>();


  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
        <CreatePortfolioCard />
      </Grid>
      {data?.myPortfolios?.map((portfolio) => (
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={portfolio._id}>
          <PortfolioCard portfolio={portfolio} />
        </Grid>
      ))}
    </Grid>
  );
}
