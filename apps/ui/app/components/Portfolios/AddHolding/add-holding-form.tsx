import { HoldingDirection, Security } from '@baggers/graphql-types';
import { BiLineChartDown, BiLineChart } from 'react-icons/bi';
import {
  Autocomplete,
  Button,
  Select,
  TextField,
} from '@baggers/ui-components';
import { Form, useFetcher } from '@remix-run/react';
import { useT } from '~/hooks/useT';

export function AddHoldingForm() {
  const t = useT('portfolio_tracker');

  const fetcher = useFetcher();

  return (
    <Form className="flex flex-col gap-8" method="post">
      <Autocomplete
        name="security"
        label="Security"
        results={
          fetcher.data
            ? fetcher.data.map((ticker: Security) => ({
                id: ticker._id,
                render: () => (
                  <span className="flex place-content-between">
                    {ticker._id}{' '}
                    <span className="">{ticker.name}</span>
                  </span>
                ),
              }))
            : []
        }
        onQueryChange={(query) => {
          fetcher.load(`/search-securities/${query}?index`);
        }}
        placeholder="Start typing to search for a security"
        type="search"
        required
        autoFocus
      />
      <Select
        name="direction"
        label="Direction"
        required
        options={[
          {
            id: HoldingDirection.Long,
            label: t('long', 'Long'),
            renderIcon: () => (
              <BiLineChart className="text-profit-light dark:text-profit-dark" />
            ),
          },
          {
            id: HoldingDirection.Short,
            label: t('short', 'Short'),
            renderIcon: () => (
              <BiLineChartDown className="text-loss-light dark:text-loss-dark" />
            ),
          },
        ]}
      />
      <TextField name="quantity" label="Quantity" required />
      <TextField
        name="costBasis"
        label="Cost Basis"
        required
        helperText="The original value of the holding, ie. the amount you spent purchasing the security."
      />
      <Select
        required
        name="currency"
        label="Purchasing currency"
        helperText="What currency did you use to purchase the security? This may affect FX returns"
        options={[
          {
            id: 'USD',
            label: 'USD (U.S Dollar)',
          },
        ]}
      />
      <div className="flex place-content-end">
        <Button type="submit">
          {t('add_holding', 'Add holding')}
        </Button>
      </div>
    </Form>
  );
}
