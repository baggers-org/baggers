import { Dispatch, SetStateAction } from 'react';
import { AddHoldingInput, Symbol } from '~/generated/graphql';

export interface HoldingDetailsProps {
  addingSymbol: Symbol;

  addingHolding: AddHoldingInput;

  setHoldingDetails: Dispatch<SetStateAction<AddHoldingInput>>;

  loadingOpenPrice?: boolean;
}
