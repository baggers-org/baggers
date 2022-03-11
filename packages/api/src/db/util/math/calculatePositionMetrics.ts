import { Portfolio, Quote } from '@/db/entities';
import { AddPositionInput } from '@/db/inputs/portfolio-inputs';
import { roundTo2Decimal } from '.';
import {
  calculateMarketValue,
  calculateProfitLossUsd,
  calculateProfitLossPercent,
  calculateDailyProfitLossUsd,
  calculateExposure,
} from '../position-util';

export const calculatePositionMetrics = (
  portfolio: Pick<Portfolio, 'totalValue'>,
  position: Omit<AddPositionInput, 'symbol_id' | 'portfolio_id'>,
  positionMarketData: Pick<Quote, 'latestPrice' | 'change'>,
) => {
  if (!positionMarketData) {
    throw Error(`No market data was passed for new position added`);
  }
  const { latestPrice, change } = positionMarketData;

  const size = roundTo2Decimal(position.positionSize);
  const costBasis = roundTo2Decimal(size * position.averagePrice);
  const marketValue = roundTo2Decimal(calculateMarketValue(size, latestPrice));

  // Add this new positions value to the total portfolio value, as it will be required for the calculation
  const portfolioTotalValue = portfolio?.totalValue + marketValue;

  const profitLossUsd = roundTo2Decimal(
    calculateProfitLossUsd(costBasis, marketValue),
  );
  const profitLossPercent = roundTo2Decimal(
    calculateProfitLossPercent(costBasis, marketValue),
  );
  const dailyProfitLossUsd = roundTo2Decimal(
    calculateDailyProfitLossUsd(size, change),
  );

  const exposure = roundTo2Decimal(
    calculateExposure(marketValue, portfolioTotalValue),
  );

  return {
    marketValue,
    profitLossUsd,
    profitLossPercent,
    dailyProfitLossUsd,
    exposure,
  };
};
