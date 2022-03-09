import { Drawer, Grid } from '@mui/material';
import { useState } from 'react';
import { Symbol } from '~/sdk/types';
import { DrawerHeader } from './DrawerHeader';
import { SearchSymbols } from './SearchSymbols';
import { PositionDetails } from './PositionDetails';

export interface AddPositionDrawerProps {
  open: boolean;
  onClose: () => void;
}
export const AddPositionDrawer: React.FC<AddPositionDrawerProps> = ({
  open,
  onClose,
}) => {
  const [addingSymbol, setAddingSymbol] = useState<Symbol>();
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Grid container width={{ xs: `100vw`, lg: 600, xl: 600 }} pt={6}>
        <DrawerHeader
          addingSymbol={addingSymbol}
          onBack={() => setAddingSymbol(undefined)}
        />
        <SearchSymbols
          addingSymbol={addingSymbol}
          onClickResult={(add) => setAddingSymbol(add)}
        />
        {addingSymbol && (
          <PositionDetails addingSymbol={addingSymbol} onClose={onClose} />
        )}
      </Grid>
    </Drawer>
  );
};
