import React, { useState } from 'react';

import { Grid, IconButton, Typography } from '@mui/material';
import { Compress, Expand, MoreVert } from '@mui/icons-material';
import { DataGridProProps } from '@mui/x-data-grid-pro';
import { useTranslation } from 'react-i18next';
import { useMatches, useSubmit } from '@remix-run/react';
import { HoldingsTable } from '~/components';
import { AddHoldingDrawer } from '~/components/AddHoldingDrawer';
import { ActionFunction, json } from '@remix-run/server-runtime';
import { NoHoldings } from '~/components/NoHoldings';
import { ErrorBoundaryComponent } from '@remix-run/react/routeModules';
import {
  AddHoldingInput,
  Portfolio,
  PortfolioQuery,
  Holding,
  HoldingDirection,
  HoldingType,
} from '~/generated/graphql';
import { valueOrError } from '~/util/valueOrError';
import { HoldingsToolbar } from '~/components/HoldingsToolbar';
import { MissingSecuritiesError } from '~/components/MissingSecuritiesError';
import { authenticatedSdk } from '~/graphql/sdk.server';

export const action: ActionFunction = async ({ request, params }) => {
  const headers = new Headers();
  const sdk = await authenticatedSdk(request, headers);
  if (request.method === `POST`) {
    const formData = Object.fromEntries(await request.formData());

    const input: AddHoldingInput = {
      averagePrice: parseFloat(
        valueOrError(formData, `averagePrice`).toString(),
      ),
      direction: formData?.direction as HoldingDirection,
      quantity: parseFloat(valueOrError(formData, `quantity`).toString()),
      symbol: valueOrError(formData, `symbol`).toString(),
      holdingType: formData?.holdingType?.toString() as HoldingType,
      brokerFees: parseFloat(formData?.brokerFees?.toString()),
    };
    const response = sdk.addHolding({
      portfolioId: params.id,
      record: input,
    });

    return json(response, { headers });
  }

  if (request.method === `DELETE`) {
    const { holding_id } = Object.fromEntries(await request.formData());

    const response = sdk.removeHolding({
      portfolio_id: params.id,
      holding_id,
    });

    return json(response, { headers });
  }
  return json({ message: `method unsupported` }, { status: 400, headers });
};
export default function Holdings() {
  const { portfolio } = useMatches().find(
    (m) => m.id === `routes/__app/portfolios.$id`,
  )?.data as PortfolioQuery;
  const { holdings } = portfolio as Portfolio;

  const [density, setDensity] = useState<DataGridProProps['density']>(
    `standard`,
  );
  const [isAddingHolding, setIsAddingHolding] = useState(false);

  const submit = useSubmit();

  const handleSwitchDensity = () => {
    if (density === `compact`) {
      setDensity(`standard`);
      return;
    }

    setDensity(`compact`);
  };

  return (
    <Grid container>
      <MissingSecuritiesError portfolio={portfolio} />
      {holdings?.length === 0 ? (
        <NoHoldings
          onAddHoldingManuallyClick={() => setIsAddingHolding(true)}
        />
      ) : (
        <>
          <Grid
            container
            item
            xs={12}
            gap={2}
            mb={3}
            justifyContent="space-between"
          >
            <HoldingsToolbar
              onAddHolding={() => setIsAddingHolding(true)}
              portfolio={portfolio}
            />

            <Grid item>
              <IconButton size="small" onClick={handleSwitchDensity}>
                {density === `compact` ? <Expand /> : <Compress />}
              </IconButton>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Grid>
          </Grid>

          <Grid item xs={12} height={500}>
            <HoldingsTable
              holdings={portfolio.holdings as Holding[]}
              density={density}
              onRemoveHolding={(pos) =>
                submit(
                  {
                    holding_id: pos._id,
                  },
                  { method: `delete` },
                )
              }
            />
          </Grid>
        </>
      )}
      <AddHoldingDrawer
        onClose={() => setIsAddingHolding(false)}
        open={isAddingHolding}
      />
    </Grid>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);

  const { t } = useTranslation();
  return (
    <Typography>
      {t(`holdings_error`, `There was an error fetching your holdings.`)}
    </Typography>
  );
};
