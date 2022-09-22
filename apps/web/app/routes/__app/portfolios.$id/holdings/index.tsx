import { useState } from 'react';

import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { Compress, Expand, MoreVert } from '@mui/icons-material';
import { DataGridProProps } from '@mui/x-data-grid-pro';
import { useTranslation } from 'react-i18next';
import { useFetcher, useNavigate, useParams } from '@remix-run/react';
import { HoldingsTable } from '~/components';
import { Holding } from '@baggers/sdk';
import { HoldingsToolbar } from '~/components/HoldingsToolbar';
import { usePortfolio } from '~/hooks/usePortfolio';
import { ErrorBoundaryComponent } from '@remix-run/server-runtime';
import { useIsPortfolioOwner } from '~/hooks/useIsPortfolioOwner';

export default function Holdings() {
  const portfolio = usePortfolio();

  const { holdings } = portfolio;

  const { id } = useParams();

  const [density, setDensity] =
    useState<DataGridProProps['density']>(`standard`);

  const navigate = useNavigate();
  const fetcher = useFetcher();

  const isOwner = useIsPortfolioOwner();

  const handleSwitchDensity = () => {
    if (density === `compact`) {
      setDensity(`standard`);
      return;
    }

    setDensity(`compact`);
  };

  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        gap={2}
        mb={3}
        justifyContent="space-between"
      >
        {isOwner ? (
          <HoldingsToolbar
            onAddHolding={() => {
              navigate(`/portfolios/${id}/holdings/add`);
            }}
            portfolio={portfolio}
          />
        ) : null}

        <Grid item ml="auto">
          <IconButton size="small" onClick={handleSwitchDensity}>
            {density === `compact` ? <Expand /> : <Compress />}
          </IconButton>
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ height: 500 }}>
          <HoldingsTable
            holdings={holdings as Holding[]}
            density={density}
            onRemoveHolding={(pos) =>
              fetcher.submit(
                {
                  holding_id: pos._id,
                },
                { action: `/portfolios/${id}/holdings/remove`, method: `post` }
              )
            }
          />
        </Paper>
      </Grid>
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
