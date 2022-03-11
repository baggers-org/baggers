import { Grid } from '@mui/material';
import { Outlet, useLoaderData } from '@remix-run/react';
import { LoaderFunction, ActionFunction } from '@remix-run/server-runtime';
import { PortfolioHeader, PortfolioTabs } from '~/components';
import { PortfolioQuery } from '~/generated/graphql';
import { sdk } from '~/graphql/sdk.server';

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  const t = Date.now();
  const test = await sdk.portfolio({ id });
  console.log(`Retrieved results in `, Date.now() - t);

  return test;
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

  const needsToAddFirstPosition = portfolio?.totalValue === 0;

  return (
    <Grid container>
      <PortfolioHeader portfolio={portfolio} />
      {!needsToAddFirstPosition && !needsToSetName ? (
        <Grid item xs={12} mb={5}>
          <PortfolioTabs />
        </Grid>
      ) : null}
      {!needsToSetName ? <Outlet /> : null}
    </Grid>
  );
}
