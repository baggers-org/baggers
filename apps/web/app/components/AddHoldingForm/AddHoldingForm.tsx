import { HoldingDirection, Security, SecurityType } from '@baggers/sdk';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  FormLabel,
  Grid,
  Paper,
  ToggleButton,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'remix-validated-form';

import { ValidatedTextField } from '~/validation/components/ValidatedTextField';
import { BaggersTextField } from '../BaggersTextField';
import { BaggersToggleButtonGroup } from '../BaggersToggleButtonGroup';
import { PriceTag } from '../PriceTag';
import { ValidatedDateTimePicker } from '~/validation/components/ValidatedDateTimePicker';

export type AddHoldingFormProps = {
  addingSecurity: Security;
};
export const AddHoldingForm: React.FC<AddHoldingFormProps> = ({
  addingSecurity,
}) => {
  const { t } = useTranslation(`holdings`);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [holdingDetails, setHoldingDetails] = useState({
    security: addingSecurity._id,
    direction: HoldingDirection.Long,
    quantity: 1,
    currency: 'USD',
    securityType: SecurityType.Equity,
    brokerFees: 0,
    averagePrice: 0,
  });

  const { isValid } = useFormContext();

  const { profitLossPercent, profitLossUsd } = useMemo(() => {
    if (!addingSecurity?.quote?.latestPrice || !holdingDetails.averagePrice)
      return { holdingReturn: 0, fxReturn: 0 };

    const costBasis =
      holdingDetails.averagePrice * holdingDetails.quantity +
      holdingDetails.brokerFees;
    const marketValue =
      addingSecurity.quote.latestPrice * holdingDetails.quantity;

    const plUsd = marketValue - costBasis;
    const plPercent = (plUsd / costBasis) * 100;

    // TODO: FX
    return {
      fxReturn: 0,
      profitLossUsd: plUsd,
      profitLossPercent: plPercent,
    };
  }, [holdingDetails, addingSecurity]);

  return (
    <>
      <Paper sx={{ py: 3, mb: 3 }}>
        <Grid container px={{ xs: 2, sm: 6 }} spacing={1}>
          <Grid item xs={12}>
            <FormLabel>
              {t(`how_many`, `How many`)}{' '}
              <strong>{addingSecurity.symbol}</strong>
              {` `}
              {` `}
              {holdingDetails?.direction === `long`
                ? t(`did_you_buy?`, `units did you buy?`)
                : t(`did_you_sell?`, `units did you sell?`)}
            </FormLabel>
          </Grid>
          <Grid item xs={12} sm={6}>
            <BaggersTextField
              type="number"
              name="quantity"
              autoFocus
              label={t(`number_of_shares`, `Number of shares`)}
              onChange={(e) =>
                setHoldingDetails((p) => ({
                  ...p,
                  quantity: parseFloat(e.target.value),
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
              value={holdingDetails.direction}
            />
            <BaggersToggleButtonGroup
              exclusive
              tabIndex={-1}
              value={holdingDetails.direction}
              color="primary"
              onChange={(event, value) =>
                setHoldingDetails((p) => ({ ...p, direction: value }))
              }
            >
              <ToggleButton tabIndex={-1} value="long">
                {t(`long`, `Long`)}
              </ToggleButton>
              <ToggleButton tabIndex={-1} value="short">
                {t(`short`, `Short`)}
              </ToggleButton>
            </BaggersToggleButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <FormLabel>
              {t(
                `what_is_your_average_price_per_unit`,
                `What is your average price per unit?`
              )}
            </FormLabel>
          </Grid>
          <Grid item xs={12} mt={1}>
            <ValidatedTextField
              isMonetaryInput
              fullWidth={false}
              name="averagePrice"
              label={t(`average_price`, `Average price`)}
              onChange={(e) =>
                setHoldingDetails((p) => ({
                  ...p,
                  averagePrice: parseFloat(e.target.value),
                }))
              }
            />
          </Grid>
          <Grid item xs={12} my={1}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <FormLabel>
              {t(
                `what_date_did_this_transaction_occur`,
                `When did this transaction occur?`
              )}
            </FormLabel>
          </Grid>
          <Grid item xs={12}>
            <Alert color="info">
              <AlertTitle>
                {t('transaction_date_warning_title', 'Transaction date')}
              </AlertTitle>
              {t(
                'transaction_date_message',
                'We will assume the transaction date is right now, unless you tell us otherwise.'
              )}
            </Alert>
          </Grid>
          <Grid item xs={12} md={8} mt={1}>
            <ValidatedDateTimePicker name="transactionDate" />
          </Grid>
          <Grid item xs={12} md={8}></Grid>
        </Grid>

        <Grid container item xs={12} mt={4} justifyContent="center">
          <Button
            tabIndex={-1}
            endIcon={showAdvanced ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            onClick={() => setShowAdvanced((a) => !a)}
          >
            {showAdvanced
              ? t(`hide_advanced`, `Hide advanced`)
              : t(`show_advanced`, `Show advanced`)}
          </Button>
        </Grid>
        {showAdvanced ? (
          <Grid
            container
            item
            xs={12}
            px={{ xs: 2, sm: 6 }}
            py={3}
            overflow="auto"
          >
            <Grid item xs={12}>
              <FormLabel>
                {t(
                  `broker_fees_label`,
                  `Did your broker charge you a fee for this transaction?`
                )}
              </FormLabel>
            </Grid>
            <Grid item xs={12} md={4} mt={2}>
              <ValidatedTextField
                name="brokerFees"
                onChange={(e) =>
                  setHoldingDetails((p) => ({
                    ...p,
                    brokerFees: parseFloat(e.target.value),
                  }))
                }
                isMonetaryInput
                label={t('broker_fees', 'Broker fees')}
              />
            </Grid>
          </Grid>
        ) : null}
      </Paper>
      <Paper sx={{ px: 6, py: 2 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <KeyboardArrowDown /> {t(`return`, `Return`)}
          <Box ml="auto" display="flex" gap={3}>
            <PriceTag
              value={profitLossUsd || 0}
              aria-label={t(`return_usd`, `Return USD`)}
            />
            {` `}
            <PriceTag
              value={profitLossPercent || 0}
              isPercent
              aria-label={t(`return_percent`, `Return percent`)}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={1} ml={3}>
          <KeyboardArrowDown /> {t(`profit_loss`, `Profit/Loss`)}
          <Box ml="auto" display="flex" gap={3}>
            <PriceTag
              value={profitLossUsd || 0}
              aria-label={t(`profit_loss_usd`, `Profit/Loss USD`)}
            />
            {` `}
            <PriceTag
              value={profitLossPercent || 0}
              isPercent
              aria-label={t(`profit_loss_percent`, `Profit/Loss percent`)}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          ml={3}
          color="lowEmphasis"
        >
          <KeyboardArrowDown /> {t(`fx_impact`, `FX Impact (coming soon)`)}
          <Box ml="auto" display="flex" gap={3}>
            <PriceTag value={0} />
            {` `}
            <PriceTag value={0} isPercent />
          </Box>
        </Box>
      </Paper>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        size="large"
        disabled={!isValid}
        sx={{
          mt: 3,
        }}
      >
        {t(`add_holding`, `Add holding`)}
      </Button>
    </>
  );
};
