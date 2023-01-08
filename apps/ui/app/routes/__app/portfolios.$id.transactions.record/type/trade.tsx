import {
  TransactionSubtype,
  TransactionType,
} from '@baggers/graphql-types';
import { Paper, Select, TextField } from '@baggers/ui-components';
import { z } from 'zod';
import { BiLineChart, BiLineChartDown } from 'react-icons/bi';
import { Form } from '@remix-run/react';
import { SecuritySearch } from '~/components/search-inputs/security-search';
import { useT } from '~/hooks/useT';
import { SecondStep } from '~/pages/portfolios/record-transaction/second-step';
import { MdAttachMoney } from 'react-icons/md';
import { ActionFunction } from '@remix-run/node';
import { AddTransactionInput } from '@baggers/sdk/src/generated';

export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params;

  const formData = Object.fromEntries(await request.formData());
  const recordTradeSchema = z.object({
    subType: z.nativeEnum(TransactionSubtype),
    price: z.string().transform((amount) => parseFloat(amount)),
    quantity: z
      .string()
      .transform((quantity) => parseFloat(quantity)),
    security: z.string(),
  });
};

export default function RecordTrade() {
  const t = useT('portfolio_tracker');
  return (
    <Form>
      <SecondStep
        title={t('trade', 'Trade information')}
        subtitle={t(
          'trade_info_subtitle',
          'Enter information about the trade you would like to record'
        )}
      />
      <Paper className="p-8 mt-4 flex flex-col gap-8">
        <SecuritySearch
          label={t('security_traded', 'Security traded')}
          required
        />
        <Select
          label={t('trade_type', 'Trade type')}
          name="subType"
          required
          defaultValue={TransactionSubtype.Buy}
          options={[
            {
              id: TransactionSubtype.Buy,
              label: 'Buy',
              renderIcon: () => (
                <BiLineChart className="text-profit-light dark:text-profit-dark" />
              ),
            },
            {
              id: TransactionSubtype.Sell,
              label: 'Sell',
              renderIcon: () => <MdAttachMoney />,
            },
            {
              id: TransactionSubtype.SellShort,
              label: 'Sell short',
              renderIcon: () => (
                <BiLineChartDown className="text-loss-light dark:text-loss-dark" />
              ),
            },
          ]}
        />
        <TextField
          label={t('quantity', 'Quantity')}
          name="quantity"
          required
          helperText={t(
            'quantity_helper',
            'Enter the number of units you traded'
          )}
        />
        <TextField
          label={t('average_price', 'Average price')}
          isMonetaryInput
          name="price"
          required
          helperText={t(
            'average_price_helper',
            'Enter the average price per unit'
          )}
        />
        <TextField
          label={t('fees', 'Additional fees')}
          name="fees"
          defaultValue={0}
          isMonetaryInput
          helperText={t(
            'average_price_helper',
            'Enter additional fees (if any) that you were charged to make this trade'
          )}
        />
      </Paper>
    </Form>
  );
}
