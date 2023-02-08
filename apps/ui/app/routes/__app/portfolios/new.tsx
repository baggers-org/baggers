import { Button, Paper } from '@baggers/ui-components';
import { ActionFunction, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { FaPlusCircle } from 'react-icons/fa';
import { PortfolioDetails } from '~/components/Portfolios/portfolio-forms/portfolio-details';
import { PortfolioType } from '~/components/Portfolios/portfolio-forms/portfolio-type';
import { FormPageHeader } from '~/components/shared/forms/form-page-header';
import { useT } from '~/hooks/useT';
import { authenticatedSdk } from '~/server/sdk.server';

export const action: ActionFunction = async ({ request }) => {
  const headers = new Headers();
  const { portfoliosCreateOne } = await authenticatedSdk(
    request,
    headers
  );
  const formData = Object.fromEntries(await request.formData());

  const {
    portfoliosCreateOne: { _id },
  } = await portfoliosCreateOne({
    input: formData as any,
  });

  return redirect(`/portfolios/${_id}`, {
    headers,
  });
};
export default function NewPortfolio() {
  const t = useT('portfolio_tracker');
  return (
    <div className="max-w-7xl xl:ml-auto xl:mr-auto">
      <FormPageHeader
        title={t('new_portfolio', 'New portfolio')}
        subtitle={t(
          'new_portfolio_subtitle',
          'Enter some basic information about your portfolio - you can add holdings and transactions later.'
        )}
        returnLink={`/portfolios/created`}
      />
      <h2 className="text-lg text-text-secondary-light dark:text-text-secondary-dark"></h2>
      <Form method="post" className="flex flex-col gap-8">
        <PortfolioType />
        <Paper>
          <PortfolioDetails />
        </Paper>
        <div className="flex place-content-center">
          <Button
            variant="primary"
            endIcon={<FaPlusCircle />}
            type="submit"
          >
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
}
