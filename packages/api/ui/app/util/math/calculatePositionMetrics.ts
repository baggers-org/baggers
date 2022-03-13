import { AddPositionInput, Portfolio, Quote } from '~/sdk/types';
import { roundTo2Decimal } from '.';

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

export const calculatePositionMetrics = (
  portfolio: Pick<Portfolio, 'totalValue'>,
  position: AddPositionInput,
  positionMarketData: Pick<Quote, 'latestPrice' | 'change'>,
) => {
  if (!positionMarketData) {
    throw Error(`No market data was passed for new position added`);
  }
  const { latestPrice, change } = positionMarketData;

  const { averagePrice, positionSize, brokerFees } = position;

  const costBasis = roundTo2Decimal(
    averagePrice * positionSize + (brokerFees || 0),
  );
  const marketValue = roundTo2Decimal(
    calculateMarketValue(positionSize, latestPrice),
  );

  // Add this new positions value to the total portfolio value, as it will be required for the calculation
  const portfolioTotalValue = portfolio.totalValue + marketValue;

  const profitLossUsd = roundTo2Decimal(
    calculateProfitLossUsd(costBasis, marketValue),
  );
  const profitLossPercent = roundTo2Decimal(
    calculateProfitLossPercent(costBasis, marketValue),
  );
  const dailyProfitLossUsd = roundTo2Decimal(
    calculateDailyProfitLossUsd(positionSize, change),
  );

  const exposure = roundTo2Decimal(
    calculateExposure(marketValue, portfolioTotalValue),
  );

  return {
    marketValue,
    costBasis,
    profitLossUsd,
    profitLossPercent,
    dailyProfitLossUsd,
    exposure,
  };
};
