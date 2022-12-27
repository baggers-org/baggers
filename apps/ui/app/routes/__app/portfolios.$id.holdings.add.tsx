import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
} from '@remix-run/node';
import { z } from 'zod';
import { Link, useLoaderData } from '@remix-run/react';
import { AddHoldingForm } from '~/components/Portfolios/AddHolding/add-holding-form';
import { useT } from '~/hooks/useT';
import {
  authenticatedSdk,
  unauthenticatedSdk,
} from '~/server/sdk.server';
import { tlsx } from '~/util/clsx';
import { HoldingDirection } from '@baggers/graphql-types';
import { Paper } from '@baggers/ui-components';
import { FaChevronLeft } from 'react-icons/fa';

export const meta: MetaFunction = ({ data }) => ({
  title: 'Add holding',
});

export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params;
  const sdk = await authenticatedSdk(request);

  const addHoldingSchema = z.object({
    security: z.string(),
    quantity: z.string().transform((t) => parseInt(t)),
    costBasis: z.string().transform((t) => parseInt(t)),
    currency: z.string(),
    direction: z.enum([
      HoldingDirection.Long,
      HoldingDirection.Short,
    ]),
  });

  const formData = Object.fromEntries(await request.formData());

  try {
    await sdk.portfoliosAddHolding({
      _id: id,
      input: addHoldingSchema.parse(formData),
    });
    return redirect(`/portfolios/${id}/holdings`);
  } catch (e) {
    console.error(e);
    return e;
  }
};
export const loader: LoaderFunction = async ({ params, request }) => {
  const { id } = params;
  const sdk = await unauthenticatedSdk(request);

  const { portfoliosFindById } = await sdk.portfoliosFindById({
    _id: id,
  });

  return portfoliosFindById;
};

export default function AddHolding() {
  const portfolio = useLoaderData<ReturnType<typeof loader>>();

  const t = useT('portfolio_tracker');
  return (
    <div className="-mt-8 mb-12">
      <Link
        tabIndex={-1}
        to={`/portfolios/${portfolio._id}/holdings`}
        className={tlsx(
          'text-secondary-light dark:text-secondary-dark',
          'flex place-items-center',
          'mb-3'
        )}
      >
        <FaChevronLeft />
        Return
      </Link>
      <h1 className={tlsx('font-semibold text-4xl')}>
        {t('add_holding', 'Add holding')}
      </h1>
      <h2 className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
        {t(
          'add_holding_description',
          'Add a holding manually to your portfolio'
        )}
      </h2>
      <Paper>
        <div className="p-12 lg:w-1/2">
          <AddHoldingForm />
        </div>
      </Paper>
    </div>
  );
}
