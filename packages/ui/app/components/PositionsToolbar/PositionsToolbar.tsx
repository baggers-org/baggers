import { Add, Link, Sync } from '@mui/icons-material';
import { Grid, Button, Tooltip, IconButton } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Portfolio } from '~/generated/graphql';

export type PositionsToolbarProps = {
  portfolio: Portfolio;
  onAddPosition: () => void;
  onLinkBroker: () => void;
  onUnlinkBroker: () => void;
  onSyncPositions: () => void;
};
export const PositionsToolbar: React.FC<PositionsToolbarProps> = ({
  portfolio,
  onAddPosition,
  onLinkBroker,
  onUnlinkBroker,
  onSyncPositions,
}) => {
  const { t } = useTranslation(`portfolios`);

  const isLinked = portfolio?.plaid?.isLinked;
  const AddPositionButton = (
    <Button
      disabled={!!isLinked}
      variant="contained"
      size="small"
      endIcon={<Add />}
      onClick={() => onAddPosition()}
    >
      {t(`add_position`, `Add position`)}
    </Button>
  );
  return (
    <Grid item container maxWidth="max-content" gap={3}>
      {isLinked ? (
        <Tooltip
          title={
            t(
              `unlink_broker_tooltip`,
              `Unlink broker to add manual positions`,
            ) || `Unlink broker to add manual positions`
          }
        >
          <span>{AddPositionButton}</span>
        </Tooltip>
      ) : (
        AddPositionButton
      )}
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
      <Tooltip
        title={`${t(`sync_tooltip`, `Sync with broker. Last synced:`)} today`}
      >
        <IconButton
          variant="text"
          color="primary"
          onClick={() => onSyncPositions()}
        >
          <Sync />
        </IconButton>
      </Tooltip>
    </Grid>
  );
};
