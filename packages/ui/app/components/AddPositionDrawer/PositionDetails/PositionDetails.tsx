import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Button, Collapse, Divider, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from '@remix-run/react';
import {
  AddPositionInput,
  PositionDirection,
  PositionType,
  Symbol,
} from '~/generated/graphql';
import { BasicDetails } from './BasicDetails';
import { BasicSummary } from './BasicSummary';
import { AdvancedDetails } from './AdvancedDetails';
import { AdvancedSummary } from './AdvancedSummary';
import { useOpenPrice } from '../useOpenPrice';

export const PositionDetails = ({
  addingSymbol,
  onClose,
}: {
  addingSymbol: Symbol;
  onClose: () => void;
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [positionDetails, setPositionDetails] = useState<AddPositionInput>({
    symbol: addingSymbol._id,
    direction: PositionDirection.Long,
    positionSize: 1,
    positionType: PositionType.Shares,
    openDate: new Date(),
    brokerFees: 0,
    // Default to market price
    averagePrice: addingSymbol.quote.latestPrice || 0,
  });

  const { t } = useTranslation(`view_portfolio`);

  const { openPrice, loading: loadingOpenPrice } = useOpenPrice(
    positionDetails.openDate,
    addingSymbol.symbol,
  );

  const { submit, data } = useFetcher();

  useEffect(() => {
    setPositionDetails((p) => ({
      ...p,
      averagePrice: openPrice || addingSymbol.quote.latestPrice || 0,
    }));
  }, [openPrice]);

  const handleSubmit = () => {
    submit(positionDetails as any, { method: `post` });
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
        addingPosition={positionDetails}
        setPositionDetails={setPositionDetails}
      />
      <Grid item xs={12} mt={3}>
        <Divider />
      </Grid>
      <Collapse in={showAdvanced}>
        <AdvancedDetails
          addingSymbol={addingSymbol}
          addingPosition={positionDetails}
          setPositionDetails={setPositionDetails}
          loadingOpenPrice={loadingOpenPrice}
        />
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Collapse>
      {showAdvanced ? (
        <AdvancedSummary
          addingSymbol={addingSymbol}
          addingPosition={positionDetails}
          setPositionDetails={setPositionDetails}
          loadingOpenPrice={loadingOpenPrice}
        />
      ) : (
        <BasicSummary
          addingSymbol={addingSymbol}
          addingPosition={positionDetails}
          setPositionDetails={setPositionDetails}
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
          {t(`Add Position`)}
        </Button>
      </Grid>
    </Grid>
  );
};
