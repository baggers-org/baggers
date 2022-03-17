import { Add, Link, Sync } from '@mui/icons-material';
import { Grid, Button, Tooltip, IconButton } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Portfolio } from '~/generated/graphql';
import { MissingSecuritiesError } from '../MissingSecuritiesError';

export type HoldingsToolbarProps = {
  portfolio: Portfolio;
  onAddHolding: () => void;
  onLinkBroker: () => void;
  onUnlinkBroker: () => void;
  onSyncHoldings: () => void;
};
export const HoldingsToolbar: React.FC<HoldingsToolbarProps> = ({
  portfolio,
  onAddHolding,
  onLinkBroker,
  onUnlinkBroker,
  onSyncHoldings,
}) => {
  const { t } = useTranslation(`portfolios`);

  const isLinked = portfolio?.plaid?.isLinked;
  return (
    <Grid item container maxWidth="max-content" gap={3}>
      <Button
        disabled={!!isLinked}
        variant="contained"
        size="small"
        endIcon={<Add />}
        onClick={() => onAddHolding()}
      >
        {t(`add_holding`, `Add holding`)}
      </Button>
      <Button
        disableElevation
        size="small"
        variant="outlined"
        color={isLinked ? `error` : `success`}
        endIcon={<Link />}
        onClick={() => (isLinked ? onUnlinkBroker() : onLinkBroker())}
      >
        {isLinked
          ? t(`unlink_broker`, `Unlink broker`)
          : t(`link_broker`, `Link broker`)}
      </Button>
    </Grid>
  );
};
