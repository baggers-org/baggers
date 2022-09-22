import { Grid } from '@mui/material';
import { Outlet, useLoaderData } from '@remix-run/react';
import {
  LoaderFunction,
  ActionFunction,
  json,
  MetaFunction,
} from '@remix-run/server-runtime';
import { PortfolioHeader, PortfolioTabs } from '~/components';
import { Portfolio, PortfoliosFindByIdQuery } from '@baggers/sdk';
import { authenticatedSdk, unauthenticatedSdk } from '~/graphql/sdk.server';
import { PageLayout } from '~/components/Layouts/PageLayout';
import { useEffect } from 'react';
import { useSidebarContext } from '~/components/Sidebar/Sidebar.context';

export const meta: MetaFunction = ({ data }) => ({
  title: data
    ? `${(data as PortfoliosFindByIdQuery)?.portfoliosFindById?.name}`
    : 'Not found',
});
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

  const { setIsExpanded } = useSidebarContext();

  useEffect(() => {
    setIsExpanded?.(false);
  }, []);
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
