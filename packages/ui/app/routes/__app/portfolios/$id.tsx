import { Grid } from '@mui/material';
import { Outlet, useLoaderData } from '@remix-run/react';
import { LoaderFunction, ActionFunction } from '@remix-run/server-runtime';
import { PortfolioHeader, PortfolioTabs } from '~/components';

// export const loader: LoaderFunction = async ({ request, params }) => {
//   const sdk = await new SDK().login(request, { allowUnauthenticated: true });
//   return sdk.portfolios.findById(params.id);
// };

// export const action: ActionFunction = async ({ params, request }) => {
//   const entries = Object.fromEntries(await request.formData());
//   const sdk = await new SDK().login(request);

//   const mutations = await sdk.portfolios.mutate(params.id);
//   return mutations.updatePortfolio(entries);
// };

export default function PortfoloLayout() {
  const portfolio = useLoaderData();

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
