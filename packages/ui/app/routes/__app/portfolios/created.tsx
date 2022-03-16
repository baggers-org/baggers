import { Divider, Grid } from '@mui/material';
import { CreatePortfolioCard, PortfolioCard } from '~/components';
import { useLoaderData } from '@remix-run/react';
import {
  ActionFunction,
  LoaderFunction,
  redirect,
} from '@remix-run/server-runtime';
import { MyPortfoliosSummaryQuery } from '~/generated/graphql';
import { sdk } from '~/graphql/sdk.server';
import { authenticated } from '~/policy.server';
import { ImportPortfoliosCard } from '~/components/ImportPortfoliosCard';

export const loader: LoaderFunction = async ({ request }) => {
  return authenticated(request, () => {
    return sdk.myPortfoliosSummary();
  });
};

export const action: ActionFunction = async () => {
  const { createPortfolio } = await sdk.createPortfolio();

  return redirect(`/portfolios/${createPortfolio.record._id}/positions`);
};
export default function CreatedPortfoliosPage() {
  const data = useLoaderData<MyPortfoliosSummaryQuery>();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
        <CreatePortfolioCard />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
        <ImportPortfoliosCard />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid container item xs={12} spacing={3}>
        {data?.myPortfolios?.map((portfolio) => (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={portfolio._id}>
            <PortfolioCard portfolio={portfolio} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
