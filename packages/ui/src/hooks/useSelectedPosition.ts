import * as React from 'react';
import { makeVar, useReactiveVar } from '@apollo/client';
import { Position } from '@/graphql/Queries.document.gql';

export const selectedPositionVar = makeVar<Position | undefined>(undefined);
const useSelectedPosition = () => {
  const selectedPosition = useReactiveVar(selectedPositionVar);
  const toggleSelectedPosition = React.useCallback((position: Position) => {
    if (position.symbol !== selectedPositionVar()?.symbol) {
      selectedPositionVar(position);
    } else {
      selectedPositionVar(undefined);
    }
  }, []);

  return {
    toggleSelectedPosition,
    selectedPosition,
  };
};

export default useSelectedPosition;
