import React, { useState } from 'react';

import {
  Button,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { Add, Compress, Expand, Link, MoreVert } from '@mui/icons-material';
import { DataGridProProps } from '@mui/x-data-grid-pro';
import { useTranslation } from 'react-i18next';
import { useMatches } from '@remix-run/react';
import { PositionsTable } from '~/components';
import { AddPositionDrawer } from '~/components/AddPositionDrawer';
import { ActionFunction, json } from '@remix-run/server-runtime';
import { NoPositions } from '~/components/NoPositions';
import { ErrorBoundaryComponent } from '@remix-run/react/routeModules';
import {
  AddPositionInput,
  PortfolioQuery,
  PositionDirection,
  PositionType,
} from '~/generated/graphql';
import { sdk } from '~/graphql/sdk.server';
import { valueOrError } from '~/util/valueOrError';

export const action: ActionFunction = async ({ request, params }) => {
  const formData = Object.fromEntries(await request.formData());

  const input: AddPositionInput = {
    averagePrice: parseFloat(valueOrError(formData, `averagePrice`).toString()),
    direction: formData?.direction as PositionDirection,
    positionSize: parseFloat(valueOrError(formData, `positionSize`).toString()),
    symbol_id: valueOrError(formData, `symbol_id`).toString(),
    positionType: formData?.positionType?.toString() as PositionType,
    brokerFees: parseFloat(formData?.brokerFees?.toString()),
    openDate: new Date(formData?.openDate.toString()),
  };

  if (request.method === `POST`) {
    return sdk.addPosition({
      portfolioId: params.id,
      record: input,
    });
  }
  return json({ message: `method unsupported` }, { status: 400 });
};
export default function Positions() {
  const { t } = useTranslation(`view_portfolio`);

  const { portfolio } = useMatches().find(
    (m) => m.id === `routes/__app/portfolios/$id`,
  )?.data as PortfolioQuery;
  const { positions } = portfolio;

  const [density, setDensity] =
    useState<DataGridProProps['density']>(`standard`);
  const [isAddingPosition, setIsAddingPosition] = useState(false);

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
            <Grid item container maxWidth="max-content" gap={3}>
              <Button
                variant="contained"
                size="small"
                endIcon={<Add />}
                onClick={() => setIsAddingPosition(true)}
              >
                {t(`add_position`, `Add position`)}
              </Button>
              <Tooltip title="Coming soon">
                <Button
                  disableElevation
                  size="small"
                  variant="outlined"
                  endIcon={<Link />}
                >
                  {t(`link_broker`, `Link broker`)}
                </Button>
              </Tooltip>
            </Grid>
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
                positions={portfolio.positions}
                density={density}
                //     onRemovePosition={(pos) => removePosition(pos._id)}
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
