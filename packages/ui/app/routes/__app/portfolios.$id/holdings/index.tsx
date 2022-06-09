import React, { useState } from 'react';

import { Grid, IconButton, Typography } from '@mui/material';
import { Compress, Expand, MoreVert } from '@mui/icons-material';
import { DataGridProProps } from '@mui/x-data-grid-pro';
import { useTranslation } from 'react-i18next';
import {
  useMatches,
  useNavigate,
  useParams,
  useSubmit,
} from '@remix-run/react';
import { HoldingsTable } from '~/components';
import { ErrorBoundaryComponent } from '@remix-run/react/routeModules';
import { Portfolio, PortfolioQuery, Holding } from '~/generated/graphql';
import { HoldingsToolbar } from '~/components/HoldingsToolbar';
import { MissingSecuritiesError } from '~/components/MissingSecuritiesError';
import { AddHoldingWarning } from '~/components/AddHoldingWarning';
import { useAppStore } from '~/hooks/useAppStore';

export default function Holdings() {
  const { portfolio } = useMatches().find(
    (m) => m.id === `routes/__app/portfolios.$id`,
  )?.data as PortfolioQuery;

  const { holdings } = portfolio as Portfolio;
  const { id } = useParams();

  const [density, setDensity] = useState<DataGridProProps['density']>(
    `standard`,
  );

  const submit = useSubmit();
  const navigate = useNavigate();
  const onboarding = useAppStore()?.onboarding;


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
      <Grid
        container
        item
        xs={12}
        gap={2}
        mb={3}
        justifyContent="space-between"
      >
        <HoldingsToolbar
          onAddHolding={() => {
            navigate(`/portfolios/${id}/holdings/add`);
          }}
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
          holdings={holdings as Holding[]}
          density={density}
          onRemoveHolding={(pos) =>
            submit(
              {
                holding_id: pos._id,
              },
              { action: `/portfolios/${id}/remove`, method: `delete` },
            )
          }
        />
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
