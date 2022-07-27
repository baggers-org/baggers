import { DatePicker } from '@mui/lab';
import {
  Grid,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  ToggleButton,
  Grow,
  Box,
} from '@mui/material';

import { BaggersToggleButtonGroup } from '~/components/BaggersToggleButtonGroup';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { HoldingDetailsProps } from './types';

export const AdvancedDetails: React.FC<HoldingDetailsProps> = ({
  addingSymbol,
  addingHolding: holdingDetails,
  setHoldingDetails,
  loadingOpenPrice,
}) => {
  const { t } = useTranslation(`view_portfolio`);

  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (isClosed) {
      setHoldingDetails((p) => ({ ...p, closeDate: new Date() }));
    }
  }, [isClosed]);

  return (
    <Grid container item xs={12} px={6} py={3} overflow="auto">
      <Grid item xs={12}>
        <FormLabel>
          {t(`tell_us_about_your`, `Tell us about your`)}
          {` `}
          <strong>{addingSymbol.symbol} </strong>
          {t(`holding`, `holding.`)}
        </FormLabel>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl margin="normal" fullWidth>
          <InputLabel id="instrument-label">
            {t(`instrument`, `Instrument`)}
          </InputLabel>
          <Select
            labelId="instrument-label"
            name="type"
            value={holdingDetails?.type}
            label={t(`instrument`, `Instrument`)}
          >
            <MenuItem value="shares">{t(`shares`, `Shares`)}</MenuItem>
            <MenuItem value="calls" disabled>
              {t(`call_options`, `Call options (coming soon)`)}
            </MenuItem>
            <MenuItem value="puts" disabled>
              {t(`put_options`, `Put options (coming soong)`)}
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} mt={2}>
        <FormLabel>
          {t(
            `when_did_you_open_your_holding`,
            `When did you open your holding?`,
          )}
        </FormLabel>
      </Grid>
      <Grid item xs={12} md={6} mt={2}>
        <DatePicker
          value={new Date()}
          disabled={loadingOpenPrice}
          label={t(`open_date`, `Open date`)}
          onChange={(newDate) =>
            setHoldingDetails((p) => ({ ...p, openDate: newDate }))
          }
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </Grid>
      <Grid item xs={12} mt={3}>
        <FormLabel>
          {t(`is_this_holding_still_open`, `Is this holding still open?`)}
        </FormLabel>
      </Grid>
      <Grid item xs={12} mt={2}>
        <BaggersToggleButtonGroup
          value={isClosed}
          color="primary"
          onChange={(event, value) => {
            setIsClosed(value);
          }}
        >
          <ToggleButton value={false}>{t(`common:yes`, `Yes`)}</ToggleButton>
          <ToggleButton value>{t(`common:no`, `No`)}</ToggleButton>
        </BaggersToggleButtonGroup>
      </Grid>

      {isClosed && (
        <Grow in>
          <Box width="100%">
            <Grid item xs={12} mt={2}>
              <FormLabel>
                {t(
                  `when_did_you_close_the_holding`,
                  `When did you close the holding?`,
                )}
              </FormLabel>
            </Grid>
            <Grid item xs={12} md={6} mt={2}>
              <DatePicker
                label={t(`close_date`, `Close date`)}
                value={new Date()}
                renderInput={(params) => <TextField {...params} fullWidth />}
                onChange={(newDate) =>
                  setHoldingDetails((p) => ({ ...p, closeDate: newDate }))
                }
              />
            </Grid>
          </Box>
        </Grow>
      )}
    </Grid>
  );
};
