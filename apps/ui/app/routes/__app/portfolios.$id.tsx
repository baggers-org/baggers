import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';

import { Outlet, useLoaderData, useParams } from '@remix-run/react';
import {
  authenticatedSdk,
  unauthenticatedSdk,
} from '~/server/sdk.server';
import { ViewPortfolioHeader } from '~/pages/portfolios/view-portfolio/header/view-portfolio-header';
import { useEventSource } from 'remix-sse/client';

export const meta: MetaFunction = ({ data }) => ({
  title: data ? `${data?.name}` : 'Not found',
  description:
    data?.description ||
    'This stock portfolio does not have a description',
});

export const loader: LoaderFunction = async ({ params, request }) => {
  const { id } = params;
  const sdk = await unauthenticatedSdk(request);

  const { portfoliosFindById } = await sdk.portfoliosFindById({
    _id: id,
  });

  return portfoliosFindById;
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
  const { id } = useParams();
  const portfolio = useLoaderData();

  useEventSource(`/portfolios/${id}/subscribe`);

  return (
    <div className="mb-12">
      <ViewPortfolioHeader portfolio={portfolio} />
      <Outlet />
    </div>
  );
}
