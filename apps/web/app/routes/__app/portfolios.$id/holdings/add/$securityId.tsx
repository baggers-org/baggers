import { Search } from '@mui/icons-material';
import {
  Button,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/system';
import { useLoaderData, useNavigate, useTransition } from '@remix-run/react';
import {
  ActionFunction,
  LoaderFunction,
  redirect,
} from '@remix-run/server-runtime';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { AddHoldingForm } from '~/components/AddHoldingForm';
import { AreaChart } from '~/components/Charts/AreaChart';
import { SecuritySearchModal } from '~/components/SearchModal';
import { HistoricalRange, Security, AssetClass } from '@baggers/graphql-types';
import { authenticatedSdk } from '~/graphql/sdk.server';
import { useIdParam } from '~/hooks';
import { AddHoldingValidator } from '~/validation/portfolios/AddHolding.schema';
import { AddHoldingSecurityCard } from '~/components/AddHoldingSecurityCard';

export const action: ActionFunction = async ({ request, params }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request, headers);
  const formData = Object.fromEntries(await request.formData());

  const { securityId, id } = params;

  const { data, error } = await AddHoldingValidator.validate(formData);

  if (error) return validationError(error);
  if (!securityId) throw Error('No ID passed');

  await sdk.portfoliosAddHolding({
    _id: id,
    input: {
      security: securityId,
      assetClass: AssetClass.Stock,
      ...data,
    },
  });

  return redirect(`/portfolios/${id}/holdings`, { headers });
};
export const loader: LoaderFunction = async ({ request, params }) => {
  const { securityId } = params;

  const sdk = await authenticatedSdk(request);
  if (!securityId) throw redirect('/portfolios');

  const { securitiesFindById: security } = await sdk.securitiesFindById({
    _id: securityId,
  });
  const { chartSecurityPrice } = await sdk.chartSecurityPrice({
    securityId,
    range: HistoricalRange.LastYear,
  });

  const chart = chartSecurityPrice.map((interval) => ({
    time: interval.date,
    value: interval.close,
  }));

  return { security, chart };
};
export default function AddHolding() {
  const { t } = useTranslation(`holdings`);

  const { security, chart } = useLoaderData<{
    security: Security;
    chart: { time: string; value: number }[];
  }>();

  const { state } = useTransition();

  const [isTickerSearchOpen, setIsTickerSearchOpen] = useState(false);
  const navigate = useNavigate();
  const id = useIdParam();

  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid display="flex" item xs={12} md={6} gap={3} flexDirection="column">
        <Typography variant="h5" color="textSecondary">
          {t(`adding_holding_in`, `Adding holding in`)}
        </Typography>
        <AddHoldingSecurityCard
          addingSecurity={security as Security}
          loading={state === `loading`}
        />
        <Paper
          sx={{
            height: { xs: 250, md: 300 },
            width: `100%`,
          }}
        >
          {state !== `loading` ? (
            <AreaChart
              fitContent
              data={chart}
              options={{
                layout: {
                  background: {
                    color: `transparent`,
                  },
                  fontFamily: theme.typography.h5.fontFamily,
                  textColor: theme.palette.text.primary,
                },
                handleScale: false,
                rightPriceScale: {
                  borderColor: `transparent`,
                },
                timeScale: {
                  borderColor: `transparent`,
                },
                grid: {
                  horzLines: {
                    visible: false,
                  },
                  vertLines: {
                    visible: false,
                  },
                },
              }}
              seriesOptions={{
                priceLineColor: theme.palette.primary.light,

                lineType: 0,
                lineWidth: 2,
                lineColor: alpha(theme.palette.primary.light, 0.9),
                topColor: alpha(theme.palette.primary.light, 0.3),
                bottomColor: alpha(theme.palette.primary.light, 0),
              }}
            />
          ) : (
            <Skeleton width="100%" height={300} animation="wave" />
          )}
        </Paper>
        <Button
          endIcon={<Search />}
          onClick={() => {
            setIsTickerSearchOpen(true);
          }}
        >
          {t(`change_security`, `Change security`)}
        </Button>
      </Grid>
      <Grid item xs={12} display={{ xs: `grid`, md: `none` }} mb={2}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid item xs md display="flex" flexDirection="column" gap={3}>
        <Typography variant="h5" color="textSecondary">
          {t(`holding_information`, `Holding information`)}
        </Typography>
        <ValidatedForm
          validator={AddHoldingValidator}
          method="post"
          defaultValues={{ transactionDate: new Date().toISOString() }}
        >
          <AddHoldingForm addingSecurity={security as Security} />
        </ValidatedForm>
      </Grid>

      <SecuritySearchModal
        open={isTickerSearchOpen}
        defaultValue={security._id as string}
        onResultSelect={(s) => {
          if (s) {
            setIsTickerSearchOpen(false);
            navigate(`/portfolios/${id}/holdings/add/${s._id}`);
          }
        }}
        modalTitle={t(`add_a_holding_in`, `Add a holding in`)}
        onClose={() => {
          setIsTickerSearchOpen(false);
          navigate(`/portfolios/${id}/holdings`);
        }}
      />
    </Grid>
  );
}
