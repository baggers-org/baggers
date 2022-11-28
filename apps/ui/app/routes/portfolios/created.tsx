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
import { Form, useLoaderData } from '@remix-run/react';
import { PortfolioCard } from '~/components/Portfolios/PortfolioCard';
import { authenticatedSdk } from '~/server/sdk.server';
import { tlsx } from '~/util/clsx';

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

  return (
    <Form method="post">
      <button type="submit" name="intent" value="create">
        Create Portfolio
      </button>

      <div
        className={tlsx(
          'grid grid-cols-1 gap-3',
          'md:grid-cols-2',
          'xl:grid-cols-3',
          '2xl:grid-cols-4'
        )}
      >
        {portfoliosCreated.map((portfolio) => (
          <PortfolioCard portfolio={portfolio as PortfolioSummary} />
        ))}
      </div>
    </Form>
  );
}
