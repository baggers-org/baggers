import { PositionDocumentPopulated } from '../mongoose/interfaces';
import calculateDailyProfitLossUsd from './util/calculateDailyProfitLossUsd';
import calculateMarketValue from './util/calculateMarketValue';
import calculateProfitLossPercent from './util/calculateProfitLossPercent';
import calculateProfitLossUsd from './util/calculateProfitLossUsd';

const calculatePositionMetrics = (position: PositionDocumentPopulated) => {
  // TODO: decide on UX for showing outside RTH prices
  const latestPrice = position.symbol.quote.latestPrice;
  const marketValue = calculateMarketValue(
    position.numberOfShares,
    latestPrice,
  );
  // Backup incase a position has somehow got no cost basis - this should never happen though
  const costBasis =
    position.costBasis || position.numberOfShares * position.averagePrice;

  const profitLossUsd = calculateProfitLossUsd(costBasis, marketValue);
  const profitLossPercent = calculateProfitLossPercent(costBasis, marketValue);
  const dailyProfitLossUsd = calculateDailyProfitLossUsd(
    position.numberOfShares,
    position.symbol.quote.change,
  );
  return {
    marketValue,
    profitLossUsd,
    profitLossPercent,
    dailyProfitLossUsd,

    // TODO: exposure calculation
    // exposure: calculateExposure(marketValue, position.portfolio.cash),
  };
};

export default calculatePositionMetrics;
