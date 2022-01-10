import { DateTimePicker } from '@mui/lab';
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
import { useTranslation } from 'next-i18next';

import { BaggersToggleButtonGroup } from '@/components/BaggersToggleButtonGroup';
import { PositionDetailsProps } from './types';
import { PositionType } from '../types';
import { useTranslatedPositionType } from './util';

export const AdvancedDetails: React.FC<PositionDetailsProps> = ({
  addingSymbol,
  positionDetails,
  setPositionDetails,
}) => {
  const { t } = useTranslation(`view_portfolio`);
  const { type, closeDate, openDate, isStillOpen } = positionDetails;
  return (
    <>
      <Grid container item xs={12} px={6} py={3} overflow="auto">
        <Grid item xs={12}>
          <FormLabel>
            {t(`tell_us_about_your`, `Tell us about your`)}
            {` `}
            <strong>{addingSymbol.symbol} </strong>
            {t(`position`, `position.`)}
          </FormLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl margin="normal" fullWidth>
            <InputLabel id="instrument-label">
              {t(`instrument`, `Instrument`)}
            </InputLabel>
            <Select
              labelId="instrument-label"
              value={type}
              label={t(`instrument`, `Instrument`)}
              onChange={(event) =>
                setPositionDetails((prev) => ({
                  ...prev,
                  type: event.target.value as PositionType,
                }))
              }
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
              `when_did_you_open_your_position`,
              `When did you open your position?`,
            )}
          </FormLabel>
        </Grid>
        <Grid item xs={12} md={6} mt={2}>
          <DateTimePicker
            label={t(`open_date`, `Open date`)}
            value={openDate}
            onChange={(newDate) =>
              setPositionDetails((prev) => ({
                ...prev,
                openDate: newDate || new Date(),
              }))
            }
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>
        <Grid item xs={12} mt={3}>
          <FormLabel>
            {t(`is_this_position_still_open`, `Is this position still open?`)}
          </FormLabel>
        </Grid>
        <Grid item xs={12} mt={2}>
          <BaggersToggleButtonGroup
            value={isStillOpen ? `yes` : `no`}
            color="primary"
            onChange={(event, value) => {
              if (value === undefined) return;
              setPositionDetails((prev) => ({
                ...prev,
                isStillOpen: value === `yes`,
              }));
            }}
          >
            <ToggleButton value="yes">{t(`common:yes`, `Yes`)}</ToggleButton>
            <ToggleButton value="no">{t(`common:no`, `No`)}</ToggleButton>
          </BaggersToggleButtonGroup>
        </Grid>

        {!isStillOpen && (
          <Grow in>
            <Box width="100%">
              <Grid item xs={12} mt={2}>
                <FormLabel>
                  {t(
                    `when_did_you_close_the_position`,
                    `When did you close the position?`,
                  )}
                </FormLabel>
              </Grid>
              <Grid item xs={12} md={6} mt={2}>
                <DateTimePicker
                  label={t(`close_date`, `Close date`)}
                  value={closeDate}
                  onChange={(newDate) =>
                    setPositionDetails((prev) => ({
                      ...prev,
                      closeDate: newDate || new Date(),
                    }))
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Box>
          </Grow>
        )}
      </Grid>
    </>
  );
};
