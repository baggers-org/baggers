export type ProfitLossOrNeutral = 'profit' | 'loss' | 'neutral';
export const isProfitLossOrNeutral = (value: number): ProfitLossOrNeutral => {
  if (value < 0) return `loss`;
  if (value > 0) return `profit`;
  return `neutral`;
};
