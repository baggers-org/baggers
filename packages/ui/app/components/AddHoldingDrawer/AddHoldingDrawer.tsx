import React, { useState } from 'react';

import { Drawer, Grid } from '@mui/material';
import { Symbol } from '~/generated/graphql';
import { DrawerHeader } from './DrawerHeader';
import { SearchSymbols } from './SearchSymbols';
import { HoldingDetails } from './HoldingDetails';

export interface AddHoldingDrawerProps {
  open: boolean;
  onClose: () => void;
}
export const AddHoldingDrawer: React.FC<AddHoldingDrawerProps> = ({
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
          <HoldingDetails addingSymbol={addingSymbol} onClose={onClose} />
        )}
      </Grid>
    </Drawer>
  );
};
