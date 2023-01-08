import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
} from '@remix-run/node';
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
} from '@remix-run/react';
import { useT } from '~/hooks/useT';
import {
  authenticatedSdk,
  unauthenticatedSdk,
} from '~/server/sdk.server';
import { tlsx } from '~/util/clsx';
import {
  MenuDivider,
  Paper,
  RadioCard,
  RadioGroup,
  Step,
} from '@baggers/ui-components';
import { FaCalendar, FaChevronLeft, FaClock } from 'react-icons/fa';
import {
  TransactionSubtype,
  TransactionType,
} from '@baggers/graphql-types';
import { RecordTransactionForm } from '~/pages/portfolios/record-transaction/record-transaction-form';
import { SelectTransactionType } from '~/pages/portfolios/record-transaction/select-transaction-type';

export const meta: MetaFunction = ({ data }) => ({
  title: 'Record transaction',
});

export const action: ActionFunction = async ({ request, params }) => {
  try {
    await sdk.portfoliosAddTransaction({
      input: {
        ...recordTransactionSchema.parse(formData),
        portfolioId: id,
      },
    });
    return redirect(`/portfolios/${id}/transactions`);
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

export default function RecordTransactionLayout() {
  const portfolio = useLoaderData<ReturnType<typeof loader>>();

  const { pathname } = useLocation();
  const t = useT('portfolio_tracker');

  return (
    <div className="-mt-8 mb-12 max-w-5xl xl:ml-auto xl:mr-auto">
      <Link
        tabIndex={-1}
        to={`/portfolios/${portfolio._id}/transactions`}
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
        {t('record_transaction', 'Record transaction')}
      </h1>
      <h2 className="text-text-secondary-light dark:text-text-secondary-dark mb-6">
        {t(
          'record_transaction_description',
          'Tell us about the transaction you would like to record, your portfolio will be updated accordingly.'
        )}
      </h2>
      <div className="flex flex-col mt-12 gap-8">
        <Step
          number={1}
          title={t(
            'transaction_date',
            'When did this transaction occur?'
          )}
          subtitle={t(
            'transaction_date_subtitle',
            'Start by telling us if this transaction should be added in the past, or present.'
          )}
          active={pathname.endsWith('/record')}
        />
        <RadioGroup
          options={[
            {
              id: 'now',
              renderOption: ({ checked }) => (
                <RadioCard
                  title={t('this_moment', 'This moment')}
                  className="heropattern-wiggle-light-purple-200"
                  selected={checked}
                  icon={<FaClock />}
                  description={t(
                    'this_moment_description',
                    'This transaction will be added using the current date/time'
                  )}
                />
              ),
            },
            {
              id: 'historical',
              renderOption: ({ checked }) => (
                <RadioCard
                  title={t('historical', 'Historical')}
                  className="heropattern-charliebrown-light-purple-200"
                  selected={checked}
                  icon={<FaCalendar />}
                  description={t(
                    'historical_description',
                    'Choose a specific date/time in the past for this transaction'
                  )}
                />
              ),
            },
          ]}
        />
        <Outlet />
      </div>
    </div>
  );
}
