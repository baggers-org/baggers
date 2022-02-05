import { EnumPositionDirection, Symbol } from '@/graphql/Queries.document.gql';
import { Dispatch, SetStateAction } from 'react';
import { PositionType } from '../types';

export interface PositionToAdd {
  size: number;
  direction: EnumPositionDirection;
  type: PositionType;
  openDate: Date;
  closeDate?: Date;
  isStillOpen: boolean;
  isChargedBrokerFees: boolean;
  brokerFees?: number;
}
export interface PositionDetailsProps {
  addingSymbol: Symbol;

  positionDetails: PositionToAdd;

  setPositionDetails: Dispatch<SetStateAction<PositionToAdd>>;
}
