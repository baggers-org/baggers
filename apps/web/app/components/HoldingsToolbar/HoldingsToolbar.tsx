import { Add } from '@mui/icons-material';
import { Grid, Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Portfolio } from '~/generated/graphql';

export type HoldingsToolbarProps = {
  portfolio: Portfolio;
  onAddHolding: () => void;
};
export const HoldingsToolbar: React.FC<HoldingsToolbarProps> = ({
  onAddHolding,
}) => {
  const { t } = useTranslation(`portfolios`);

  return (
    <Grid item container maxWidth="max-content" gap={3}>
      <Button
        variant="contained"
        size="small"
        endIcon={<Add />}
        onClick={() => onAddHolding()}
      >
        {t(`add_holding`, `Add holding`)}
      </Button>
    </Grid>
  );
};
