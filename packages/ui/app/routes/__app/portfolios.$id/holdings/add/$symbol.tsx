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
import { alpha, Box } from '@mui/system';
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
import { AddHoldingSymbolCard } from '~/components/AddHoldingSymbolCard';
import { AreaChart } from '~/components/Charts/AreaChart';
import { SymbolSearchModal } from '~/components/SearchModal';
import { HistoricalRange, Symbol } from '~/generated/graphql';
import { authenticatedSdk } from '~/graphql/sdk.server';
import { useIdParam } from '~/hooks';
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
  const { chartPriceRange } = await sdk.chartPriceRange({
    symbolId,
    range: HistoricalRange.LastYear,
  });

  // map chart data to proper format
  const chart = chartPriceRange.map((interval) => ({
    time: interval.date,
    value: interval.close,
  }));

  return { symbol, chart };
};
export default function AddHolding() {
  const { t } = useTranslation(`holdings`);

  const { symbol, chart } = useLoaderData<{
    symbol: Symbol;
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
        <AddHoldingSymbolCard
          addingSymbol={symbol}
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
          {t(`change_ticker`, `Change ticker`)}
        </Button>
      </Grid>
      <Grid item xs={12} display={{ xs: `grid`, md: `none` }} mb={2}>
        <Divider orientation="horizontal" />
      </Grid>
      <Grid item xs md display="flex" flexDirection="column" gap={3}>
        <Typography variant="h5" color="textSecondary">
          {t(`holding_information`, `Holding information`)}
        </Typography>
        <ValidatedForm validator={AddHoldingValidator} method="post">
          <AddHoldingForm addingSymbol={symbol} />
        </ValidatedForm>
      </Grid>

      <SymbolSearchModal
        open={isTickerSearchOpen}
        defaultValue={symbol.symbol}
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
