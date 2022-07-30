import { Dispatch, SetStateAction } from 'react';
import { Ticker } from '@baggers/sdk';

export interface HoldingDetailsProps {
  addingSymbol: Ticker;

  // addingHolding: AddHoldingInput;

  // setHoldingDetails: Dispatch<SetStateAction<AddHoldingInput>>;

  loadingOpenPrice?: boolean;
}
