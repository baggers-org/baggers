import { Grid } from '@mui/material';
import { Outlet, useLoaderData } from '@remix-run/react';
import { LoaderFunction, ActionFunction } from '@remix-run/server-runtime';
import { PortfolioHeader, PortfolioTabs } from '~/components';
import { Portfolio, PortfolioQuery } from '~/generated/graphql';
import { sdk } from '~/graphql/sdk.server';

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  return sdk.portfolio({ id });
};

export const action: ActionFunction = async ({ params, request }) => {
  return sdk.updatePortfolio({
    id: params.id,
    input: {
      ...Object.fromEntries(await request.formData()),
    },
  });
};

export default function PortfoloLayout() {
  const { portfolio } = useLoaderData<PortfolioQuery>();

  const needsToSetName = !portfolio?.name;

  const needsToAddFirstHolding = portfolio?.totalValue === 0;

  return (
    <Grid container>
      <PortfolioHeader portfolio={portfolio as Portfolio} />
      {!needsToAddFirstHolding && !needsToSetName ? (
        <Grid item xs={12} mb={5}>
          <PortfolioTabs />
        </Grid>
      ) : null}
      {!needsToSetName ? <Outlet /> : null}
    </Grid>
  );
}
