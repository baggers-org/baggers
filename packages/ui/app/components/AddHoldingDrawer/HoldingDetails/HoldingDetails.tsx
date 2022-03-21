import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Button, Collapse, Divider, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from '@remix-run/react';
import {
  AddHoldingInput,
  HoldingDirection,
  HoldingType,
  Symbol,
} from '~/generated/graphql';
import { BasicDetails } from './BasicDetails';
import { BasicSummary } from './BasicSummary';
import { AdvancedDetails } from './AdvancedDetails';
import { AdvancedSummary } from './AdvancedSummary';
import { usePriceAtDate } from '../usePriceAtDate';

export const HoldingDetails = ({
  addingSymbol,
  onClose,
}: {
  addingSymbol: Symbol;
  onClose: () => void;
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [holdingDetails, setHoldingDetails] = useState<AddHoldingInput>({
    symbol: addingSymbol._id,
    direction: HoldingDirection.Long,
    quantity: 1,
    holdingType: HoldingType.Shares,
    brokerFees: 0,
    // Default to market price
    averagePrice: addingSymbol.quote.latestPrice || 0,
  });

  const { t } = useTranslation(`view_portfolio`);

  const { openPrice, loading: loadingOpenPrice } = usePriceAtDate(
    new Date(),
    addingSymbol.symbol,
  );

  const { submit, data } = useFetcher();

  useEffect(() => {
    setHoldingDetails((p) => ({
      ...p,
      averagePrice: openPrice || addingSymbol.quote.latestPrice || 0,
    }));
  }, [openPrice]);

  const handleSubmit = () => {
    submit(holdingDetails as any, { method: `post` });
  };

  useEffect(() => {
    if (data) {
      onClose();
    }
  });

  return (
    <Grid container py={2} mb={10}>
      <BasicDetails
        addingSymbol={addingSymbol}
        addingHolding={holdingDetails}
        setHoldingDetails={setHoldingDetails}
      />
      <Grid item xs={12} mt={3}>
        <Divider />
      </Grid>
      <Collapse in={showAdvanced}>
        <AdvancedDetails
          addingSymbol={addingSymbol}
          addingHolding={holdingDetails}
          setHoldingDetails={setHoldingDetails}
          loadingOpenPrice={loadingOpenPrice}
        />
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Collapse>
      {showAdvanced ? (
        <AdvancedSummary
          addingSymbol={addingSymbol}
          addingHolding={holdingDetails}
          setHoldingDetails={setHoldingDetails}
          loadingOpenPrice={loadingOpenPrice}
        />
      ) : (
        <BasicSummary
          addingSymbol={addingSymbol}
          addingHolding={holdingDetails}
          setHoldingDetails={setHoldingDetails}
        />
      )}
      <Grid item xs={12} mt={3}>
        <Divider />
      </Grid>

      <Grid container item xs={12} mt={4} justifyContent="center">
        <Button
          endIcon={showAdvanced ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          onClick={() => setShowAdvanced((a) => !a)}
        >
          {showAdvanced
            ? t(`hide_advanced`, `Hide advanced`)
            : t(`show_advanced`, `Show advanced`)}
        </Button>
      </Grid>
      <Grid
        container
        item
        position="fixed"
        bottom={0}
        width={{ xs: `100vw`, lg: `600px` }}
        height={60}
      >
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          onClick={handleSubmit}
        >
          {t(`Add Holding`)}
        </Button>
      </Grid>
    </Grid>
  );
};
