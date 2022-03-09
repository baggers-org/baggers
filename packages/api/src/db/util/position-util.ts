export const calculateDailyProfitLossUsd = (
  positionSize: number,
  change: number,
) => {
  return positionSize * change;
};

export const calculateExposure = (marketValue: number, totalValue: number) => {
  return (marketValue / totalValue) * 100;
};

export const calculateMarketValue = (
  positionSize: number,
  currentPrice: number,
) => {
  return positionSize * currentPrice;
};

export const calculateProfitLossPercent = (
  costBasis: number,
  marketValue: number,
) => {
  const pl = marketValue - costBasis;
  const percent = (pl / costBasis) * 100;

  return parseFloat(percent.toFixed(2));
};

export const calculateProfitLossUsd = (
  costBasis: number,
  marketValue: number,
) => {
  return marketValue - costBasis;
};
