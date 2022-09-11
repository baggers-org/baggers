import { Grid } from '@mui/material';
import { Outlet, useLoaderData } from '@remix-run/react';
import {
  LoaderFunction,
  ActionFunction,
  json,
} from '@remix-run/server-runtime';
import { PortfolioHeader, PortfolioTabs } from '~/components';
import { Portfolio, PortfoliosFindByIdQuery } from '@baggers/sdk';
import { authenticatedSdk, unauthenticatedSdk } from '~/graphql/sdk.server';
import { PageLayout } from '~/components/Layouts/PageLayout';

export const loader: LoaderFunction = async ({ params, request }) => {
  const { id } = params;
  const sdk = await unauthenticatedSdk(request);

  return sdk.portfoliosFindById({ _id: id });
};

export const action: ActionFunction = async ({ params, request }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request, headers);

  if (request.method === `PATCH`) {
    const response = await sdk.portfoliosUpdateOne({
      _id: params.id,
      input: {
        ...Object.fromEntries(await request.formData()),
      },
    });
    return json(response, { headers });
  }

  return json({ error: `method not support` }, { status: 405 });
};

export default function PortfoloLayout() {
  const { portfoliosFindById } = useLoaderData<PortfoliosFindByIdQuery>();

  const needsToSetName = !portfoliosFindById?.name;

  return (
    <PageLayout>
      <Grid container>
        <PortfolioHeader portfolio={portfoliosFindById as Portfolio} />
        {!needsToSetName ? (
          <>
            <Grid item xs={12} mb={5}>
              <PortfolioTabs />
            </Grid>
            <Outlet />
          </>
        ) : null}
      </Grid>
    </PageLayout>
  );
}
