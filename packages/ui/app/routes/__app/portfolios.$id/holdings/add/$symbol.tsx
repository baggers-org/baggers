import { Grid, Paper, Typography } from '@mui/material';
import { useLoaderData } from '@remix-run/react';
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from '@remix-run/server-runtime';
import { useTranslation } from 'react-i18next';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { AddHoldingForm } from '~/components/AddHoldingForm';
import { Symbol } from '~/generated/graphql';
import { authenticatedSdk } from '~/graphql/sdk.server';
import { AddHoldingValidator } from '~/validation/portfolios/AddHolding.schema';

export const action: ActionFunction = async ({ request, params }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request, headers);
  const formData = Object.fromEntries(await request.formData());

  const { symbol, id } = params;

  const { data, error } = await AddHoldingValidator.validate(formData);

  if (error) return validationError(error);

  await sdk.addHolding({
    portfolioId: id,
    record: {
      ...data,
      symbol,
    },
  });

  return redirect(`/portfolios/${id}/holdings`, { headers });
};
export const loader: LoaderFunction = async ({ request, params }) => {
  const { symbol: symbolId } = params;

  const sdk = await authenticatedSdk(request);

  const { symbol } = await sdk.symbol({ symbolId });

  return symbol;
};
export default function AddHolding() {
  const { t } = useTranslation(`holdings`);

  const symbol = useLoaderData<Symbol>();

  return (
    <Grid container spacing={3}>
      <Grid display="flex" item xs={12} md={6} gap={3} flexDirection="column">
        <Typography variant="h5" color="textSecondary">
          {t(`adding_holding_in`, `Adding holding in`)}
        </Typography>
        <Paper sx={{ height: 100 }}>{symbol.symbol}</Paper>
        <Paper sx={{ height: 300, display: { xs: `none`, md: `flex` } }}>
          Graph
        </Paper>
      </Grid>
      <Grid item xs md display="flex" flexDirection="column" gap={3}>
        <Typography variant="h5" color="textSecondary">
          {t(`holding_information`, `Holding information`)}
        </Typography>
        <ValidatedForm validator={AddHoldingValidator} method="post">
          <AddHoldingForm addingSymbol={symbol} />
        </ValidatedForm>
      </Grid>
    </Grid>
  );
}
