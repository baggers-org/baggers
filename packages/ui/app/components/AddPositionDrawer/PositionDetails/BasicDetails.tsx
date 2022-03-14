import { BaggersToggleButtonGroup } from '~/components/BaggersToggleButtonGroup';
import { Grid, FormLabel, TextField, ToggleButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PositionDetailsProps } from './types';
import { useTranslatedPositionType } from './util';

export const BasicDetails = ({
  addingSymbol,
  setPositionDetails,
  addingPosition: positionDetails,
}: PositionDetailsProps) => {
  const { t } = useTranslation(`view_portfolio`);

  return (
    <Grid container px={6}>
      <Grid item xs={12}>
        <FormLabel>
          {t(`how_many`, `How many`)} <strong>{addingSymbol.symbol}</strong>
          {` `}
          {useTranslatedPositionType(positionDetails.positionType)}
          {` `}
          {positionDetails?.direction === `long`
            ? t(`did_you_buy?`, `did you buy?`)
            : t(`did_you_sell?`, `did you sell?`)}
        </FormLabel>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            name="positionSize"
            margin="normal"
            value={positionDetails?.positionSize}
            label={t(`number_of_shares`, `Number of shares`)}
            onChange={(e) =>
              setPositionDetails((p) => ({
                ...p,
                positionSize: parseFloat(e.target.value),
              }))
            }
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          justifyContent={{ xs: `none`, sm: `end` }}
          alignSelf={{ xs: `none`, sm: `flex-end` }}
          pb={2}
        >
          <input
            type="hidden"
            name="direction"
            value={positionDetails.direction}
          />
          <BaggersToggleButtonGroup
            exclusive
            color="primary"
            value={positionDetails?.direction}
            onChange={(event, value) =>
              setPositionDetails((p) => ({ ...p, direction: value }))
            }
          >
            <ToggleButton value="long">{t(`long`, `Long`)}</ToggleButton>
            <ToggleButton value="short">{t(`short`, `Short`)}</ToggleButton>
          </BaggersToggleButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};
