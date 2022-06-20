import { Container, Grid } from '@mui/material';
import { Outlet, useLoaderData } from '@remix-run/react';
import {
  LoaderFunction,
  ActionFunction,
  json,
} from '@remix-run/server-runtime';
import { PortfolioHeader, PortfolioTabs } from '~/components';
import { Portfolio, PortfolioQuery } from '~/generated/graphql';
import { authenticatedSdk, unauthenticatedSdk } from '~/graphql/sdk.server';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { id } = params;
  const sdk = await unauthenticatedSdk(request);

  return sdk.portfolio({ id });
};

export const action: ActionFunction = async ({ params, request }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request, headers);
  const response = sdk.updatePortfolio({
    id: params.id,
    input: {
      ...Object.fromEntries(await request.formData()),
    },
  });
  return json(response, { headers });
};

export default function PortfoloLayout() {
  const { portfolio } = useLoaderData<PortfolioQuery>();

  const needsToSetName = !portfolio?.name;

  return (
    <Container maxWidth="xl">
      <Grid container>
        <PortfolioHeader portfolio={portfolio as Portfolio} />
        {!needsToSetName ? (
          <>
            <Grid item xs={12} mb={5}>
              <PortfolioTabs />
            </Grid>
            <Outlet />
          </>
        ) : null}
      </Grid>
    </Container>
  );
}
