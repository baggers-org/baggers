import {
  Symbol,
  EnumPositionDirection,
} from '@/graphql/Mutations.document.gql';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Button, Collapse, Divider, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useEditPortfolio } from '@/hooks';
import { BasicDetails } from './BasicDetails';
import { PositionToAdd } from './types';
import { BasicSummary } from './BasicSummary';
import { AdvancedDetails } from './AdvancedDetails';
import { AdvancedSummary } from './AdvancedSummary';

export const PositionDetails = ({
  addingSymbol,
  portfolioId,
  onAddPosition,
}: {
  addingSymbol: Symbol;
  portfolioId: string;
  onAddPosition: () => void;
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [positionDetails, setPositionDetails] = useState<PositionToAdd>({
    direction: EnumPositionDirection.Long,
    size: 1,
    type: `shares`,
    isStillOpen: true,
    openDate: new Date(),
    isChargedBrokerFees: false,
  });

  const { t } = useTranslation(`view_portfolio`);

  const { addPosition } = useEditPortfolio(portfolioId);
  const handleAddPosition = () => {
    addPosition({
      averagePrice: 123,
      symbol: addingSymbol,
      positionSize: positionDetails.size,
      direction: positionDetails.direction,
      openDate: positionDetails.openDate,
      closeDate: positionDetails.closeDate,
    });

    onAddPosition();
  };

  return (
    <Grid container py={2} mb={10}>
      <BasicDetails
        addingSymbol={addingSymbol}
        positionDetails={positionDetails}
        setPositionDetails={setPositionDetails}
      />
      <Grid item xs={12} mt={3}>
        <Divider />
      </Grid>
      <Collapse in={showAdvanced}>
        <AdvancedDetails
          addingSymbol={addingSymbol}
          positionDetails={positionDetails}
          setPositionDetails={setPositionDetails}
        />
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Collapse>
      {showAdvanced ? (
        <AdvancedSummary
          addingSymbol={addingSymbol}
          positionDetails={positionDetails}
          setPositionDetails={setPositionDetails}
        />
      ) : (
        <BasicSummary
          addingSymbol={addingSymbol}
          positionDetails={positionDetails}
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
          onClick={handleAddPosition}
        >
          {t(`Add Position`)}
        </Button>
      </Grid>
    </Grid>
  );
};
