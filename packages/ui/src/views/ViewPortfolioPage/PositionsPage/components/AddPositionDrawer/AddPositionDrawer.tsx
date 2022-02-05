import { Drawer, Grid } from '@mui/material';
import { useState } from 'react';
import { DrawerHeader } from './DrawerHeader';
import { SearchPositions } from './SearchPositions';
import { PositionDetails } from './PositionDetails';

export interface AddPositionDrawerProps {
  portfolioId: string;
  open: boolean;
  onClose: () => void;
}
export const AddPositionDrawer: React.FC<AddPositionDrawerProps> = ({
  portfolioId,
  open,
  onClose,
}) => {
  const [addingSymbol, setAddingSymbol] = useState();
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Grid container width={{ xs: `100vw`, lg: 600, xl: 600 }} pt={6}>
        <DrawerHeader
          addingSymbol={addingSymbol}
          onBack={() => setAddingSymbol(undefined)}
        />
        <SearchPositions
          addingSymbol={addingSymbol}
          onClickResult={(add) => setAddingSymbol(add)}
        />
        {addingSymbol && (
          <PositionDetails
            portfolioId={portfolioId}
            addingSymbol={addingSymbol}
            onAddPosition={() => {
              onClose();
              setAddingSymbol(undefined);
            }}
          />
        )}
      </Grid>
    </Drawer>
  );
};
