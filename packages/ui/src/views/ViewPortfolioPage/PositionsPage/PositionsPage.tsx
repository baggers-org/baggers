import React, { useEffect, useState } from 'react';

import { BaggersPageComponent } from '@/views/types';
import { Button, Grid, IconButton, Paper, Tooltip } from '@mui/material';
import { PositionsTable } from '@/components/PositionsTable';
import {
  Position,
  useGetPortfolioByIdQuery,
  useGetPortfolioSummaryByIdQuery,
  useGetPositionsLazyQuery,
} from '@/graphql/Queries.document.gql';
import { useTranslation } from 'next-i18next';
import {
  Add,
  Compress,
  Expand,
  Link,
  More,
  MoreVert,
} from '@mui/icons-material';
import { Box } from '@mui/material/node_modules/@mui/system';
import { DataGridProProps } from '@mui/x-data-grid-pro';
import { useEditPortfolio } from '@/hooks';
import { PageLoadingOverlay } from '@/components';
import { usePortfolioIdFromURL } from '../hooks';
import { AddPositionDrawer } from './components';
import { NoPositions } from './components/NoPositions';

export type PositionsPageProps = {};
export const PositionsPage: BaggersPageComponent<PositionsPageProps> = () => {
  const portfolioId = usePortfolioIdFromURL();
  const [getPositions, { data }] = useGetPositionsLazyQuery({
    returnPartialData: true,
  });
  const { data: portfolioData } = useGetPortfolioSummaryByIdQuery({
    variables: {
      id: portfolioId,
    },
    fetchPolicy: `cache-only`,
  });
  const numberOfPositions = portfolioData?.getPortfolioById?.numberOfPositions;

  const positions = data?.getPositions?.items as Position[];

  const { t } = useTranslation(`view_portfolio`);

  const [density, setDensity] = useState<DataGridProProps['density']>(
    `compact`,
  );
  const [isAddingPosition, setIsAddingPosition] = useState(false);

  const handleSwitchDensity = () => {
    if (density === `compact`) {
      setDensity(`standard`);
      return;
    }

    setDensity(`compact`);
  };

  const { removePosition } = useEditPortfolio(portfolioId);

  useEffect(() => {
    if (portfolioId) {
      getPositions({
        variables: {
          filter: {
            portfolio: portfolioId,
          },
        },
      });
    }
  }, [portfolioId]);

  if (!portfolioId) {
    return <PageLoadingOverlay />;
  }

  return (
    <>
      {numberOfPositions === 0 ? (
        <NoPositions
          onAddPositionManuallyClick={() => setIsAddingPosition(true)}
        />
      ) : (
        <Grid container>
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
            <Paper sx={{ height: `100%` }} elevation={0}>
              <PositionsTable
                numberOfPositions={numberOfPositions}
                positions={positions}
                density={density}
                onRemovePosition={(pos) => removePosition(pos._id)}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
      <AddPositionDrawer
        open={isAddingPosition}
        portfolioId={portfolioId}
        onClose={() => setIsAddingPosition(false)}
      />
    </>
  );
};
