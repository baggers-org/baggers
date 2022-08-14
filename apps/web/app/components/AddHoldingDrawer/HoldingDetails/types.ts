import { Dispatch, SetStateAction } from 'react';
import { Security } from '@baggers/sdk';

export interface HoldingDetailsProps {
  addingSymbol: Security;

  addingHolding: AddHoldingInput;

  setHoldingDetails: Dispatch<SetStateAction<AddHoldingInput>>;

  loadingOpenPrice?: boolean;
}
