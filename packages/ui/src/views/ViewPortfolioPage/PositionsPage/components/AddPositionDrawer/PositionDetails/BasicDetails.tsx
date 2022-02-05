import { BaggersToggleButtonGroup } from '@/components/BaggersToggleButtonGroup';
import { Grid, FormLabel, TextField, ToggleButton } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { PositionDetailsProps } from './types';
import { useTranslatedPositionType } from './util';

export const BasicDetails = ({
  addingSymbol,
  positionDetails,
  setPositionDetails,
}: PositionDetailsProps) => {
  const { t } = useTranslation(`view_portfolio`);

  const { size, direction, type } = positionDetails;

  return (
    <Grid container px={6}>
      <Grid item xs={12}>
        <FormLabel>
          {t(`how_many`, `How many`)} <strong>{addingSymbol.symbol}</strong>
          {` `}
          {useTranslatedPositionType(type)}
          {` `}
          {direction === `long`
            ? t(`did_you_buy?`, `did you buy?`)
            : t(`did_you_sell?`, `did you sell?`)}
        </FormLabel>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            margin="normal"
            value={size}
            onChange={(e) =>
              setPositionDetails((prev) => ({
                ...prev,
                size: parseInt(e?.target?.value, 10),
              }))
            }
            label={t(`number_of_shares`, `Number of shares`)}
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
          <BaggersToggleButtonGroup
            exclusive
            color="primary"
            value={direction}
            onChange={(event, value) =>
              setPositionDetails((prev) => ({
                ...prev,
                direction: value,
              }))
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
