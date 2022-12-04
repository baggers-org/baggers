import {
  PortfoliosCreatedQuery,
  PortfolioSummary,
} from '@baggers/graphql-types';
import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { CreatedPortfolios } from '~/pages';
import { authenticatedSdk } from '~/server/sdk.server';

export const loader: LoaderFunction = async ({ request }) => {
  const sdk = await authenticatedSdk(request);
  return sdk.portfoliosCreated();
};

export const meta: MetaFunction = () => ({
  title: `Your portfolios`,
});

export const action: ActionFunction = async ({ request }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request, headers);
  const formData = await request.formData();
  const intent = formData.get(`intent`);

  if (intent === `delete`) {
    const _ids = formData.getAll(`portfolio`);
    await sdk.portfoliosRemoveMultiple({ _ids });
    return json({}, { headers });
  }

  if (intent === `create`) {
    const { portfoliosInitEmpty } = await sdk.portfoliosInitEmpty();
    return redirect(
      `/portfolios/${portfoliosInitEmpty._id}/holdings`,
      {
        headers,
      }
    );
  }

  return json({ error: `method not supported ` }, { status: 405 });
};
export default function CreatedPortfoliosPage() {
  const { portfoliosCreated } =
    useLoaderData<PortfoliosCreatedQuery>();

  if (!portfoliosCreated) {
    return <></>;
  }
  return (
    <CreatedPortfolios
      portfolios={portfoliosCreated as PortfolioSummary[]}
    />
  );
}
