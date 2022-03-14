import { Dispatch, SetStateAction } from 'react';
import { AddPositionInput, Symbol } from '~/generated/graphql';

export interface PositionDetailsProps {
  addingSymbol: Symbol;

  addingPosition: AddPositionInput;

  setPositionDetails: Dispatch<SetStateAction<AddPositionInput>>;

  loadingOpenPrice?: boolean;
}
