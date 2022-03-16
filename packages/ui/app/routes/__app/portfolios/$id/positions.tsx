import React, { useEffect, useState } from 'react';

import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { Compress, Expand, MoreVert } from '@mui/icons-material';
import { DataGridProProps } from '@mui/x-data-grid-pro';
import { useTranslation } from 'react-i18next';
import { useMatches, useSubmit } from '@remix-run/react';
import { PositionsTable } from '~/components';
import { AddPositionDrawer } from '~/components/AddPositionDrawer';
import { ActionFunction, json } from '@remix-run/server-runtime';
import { NoPositions } from '~/components/NoPositions';
import { ErrorBoundaryComponent } from '@remix-run/react/routeModules';
import {
  AddPositionInput,
  Portfolio,
  PortfolioQuery,
  Position,
  PositionDirection,
  PositionType,
} from '~/generated/graphql';
import { sdk } from '~/graphql/sdk.server';
import { valueOrError } from '~/util/valueOrError';
import { useImportPortfolios } from '~/hooks';
import { PositionsToolbar } from '~/components/PositionsToolbar';

export const action: ActionFunction = async ({ request, params }) => {
  if (request.method === `POST`) {
    const formData = Object.fromEntries(await request.formData());

    const input: AddPositionInput = {
      averagePrice: parseFloat(
        valueOrError(formData, `averagePrice`).toString(),
      ),
      direction: formData?.direction as PositionDirection,
      positionSize: parseFloat(
        valueOrError(formData, `positionSize`).toString(),
      ),
      symbol: valueOrError(formData, `symbol`).toString(),
      positionType: formData?.positionType?.toString() as PositionType,
      brokerFees: parseFloat(formData?.brokerFees?.toString()),
      openDate: new Date(formData?.openDate.toString()),
    };
    return sdk.addPosition({
      portfolioId: params.id,
      record: input,
    });
  }

  if (request.method === `DELETE`) {
    const { position_id } = Object.fromEntries(await request.formData());

    return sdk.removePosition({
      portfolio_id: params.id,
      position_id,
    });
  }
  return json({ message: `method unsupported` }, { status: 400 });
};
export default function Positions() {
  const { t } = useTranslation(`view_portfolio`);

  const { portfolio } = useMatches().find(
    (m) => m.id === `routes/__app/portfolios/$id`,
  )?.data as PortfolioQuery;
  const { positions } = portfolio as Portfolio;

  const [density, setDensity] = useState<DataGridProProps['density']>(
    `standard`,
  );
  const [isAddingPosition, setIsAddingPosition] = useState(false);

  const submit = useSubmit();

  const { openLink, syncWithBroker } = useImportPortfolios(portfolio._id);

  const handleSwitchDensity = () => {
    if (density === `compact`) {
      setDensity(`standard`);
      return;
    }

    setDensity(`compact`);
  };

  return (
    <Grid container>
      {positions?.length === 0 ? (
        <NoPositions
          onAddPositionManuallyClick={() => setIsAddingPosition(true)}
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
            <PositionsToolbar
              onAddPosition={() => setIsAddingPosition(true)}
              onLinkBroker={() => openLink()}
              portfolio={portfolio}
              onSyncPositions={() => syncWithBroker()}
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
            <Paper sx={{ height: `100%` }} elevation={1}>
              <PositionsTable
                positions={portfolio.positions as Position[]}
                density={density}
                onRemovePosition={(pos) =>
                  submit(
                    {
                      position_id: pos._id,
                    },
                    { method: `delete` },
                  )
                }
              />
            </Paper>
          </Grid>
        </>
      )}
      <AddPositionDrawer
        onClose={() => setIsAddingPosition(false)}
        open={isAddingPosition}
      />
    </Grid>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);

  const { t } = useTranslation();
  return (
    <Typography>
      {t(`positions_error`, `There was an error fetching your positions.`)}
    </Typography>
  );
};
