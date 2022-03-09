import { Position } from '~/sdk/types';

export const getTotalPositionValue = (positions: Partial<Position>[]) =>
  positions.reduce((prev, curr) => prev + (curr.marketValue || 0), 0);
