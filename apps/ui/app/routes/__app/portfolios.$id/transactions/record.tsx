import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
} from '@remix-run/node';
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useParams,
} from '@remix-run/react';
import { useT } from '~/hooks/useT';
import {
  authenticatedSdk,
  unauthenticatedSdk,
} from '~/server/sdk.server';
import { SelectTransactionType } from '~/pages/portfolios/record-transaction/select-transaction-type';
import { zfd } from 'zod-form-data';
import { AddTransactionInput } from '@baggers/graphql-types';
import { FormPageHeader } from '~/components/shared/forms/form-page-header';
import { FormSectionHeader, Paper } from '@baggers/ui-components';
import { FaQuestionCircle } from 'react-icons/fa';

export const meta: MetaFunction = ({ data }) => ({
  title: 'Record transaction',
});

export const action: ActionFunction = async ({ request, params }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request, headers);
  const formData = Object.fromEntries(await request.formData());

  const { id } = params;
  try {
    const schema = zfd.formData({
      quantity: zfd.numeric(),
      price: zfd.numeric(),
      security: zfd.text(),
      subType: zfd.text(),
      type: zfd.text(),
    });

    const transaction = schema.parse(formData);
    await sdk.portfoliosAddTransaction({
      input: {
        ...transaction,
        amount: transaction.quantity * transaction.price,
        portfolioId: id,
      } as AddTransactionInput,
    });
    return redirect(`/portfolios/${id}/transactions`);
  } catch (e) {
    console.error(e);
    throw Error(
      'An error ocurred when adding the transaction. Please try again'
    );
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

export default function RecordTransactionLayout() {
  const t = useT('portfolio_tracker');
  const portfolio = useLoaderData<ReturnType<typeof loader>>();

  return (
    <div className="-mt-8 mb-12 max-w-5xl xl:ml-auto xl:mr-auto">
      <FormPageHeader
        title={t('record_transaction', 'Record transaction')}
        returnLink={`/portfolios/${portfolio._id}`}
      />
      <Form method="post">
        <Paper>
          <FormSectionHeader
            icon={<FaQuestionCircle />}
            title={t('type', 'Type')}
          />
          <div className="p-8">
            <SelectTransactionType />
          </div>
        </Paper>
        <Outlet />
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: any) {
  const { id } = useParams();
  console.error(error);
  return (
    <div className="flex place-items-center flex-col">
      <h1 className="text-5xl mb-8">Oops - an error occurred</h1>
      <p className="text-xl text-text-secondary-dark dark:text-text-secondary-dark">
        {/* {error} */}
      </p>

      <Link
        to={`/portfolios/${id}/transactions/record`}
        className="text-secondary-light dark:text-secondary-dark mt-2 underline"
      >
        Take me back
      </Link>
    </div>
  );
}
