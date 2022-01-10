import { PositionDocumentPopulated } from '../mongoose/interfaces';
import calculateDailyProfitLossUsd from './util/calculateDailyProfitLossUsd';
import calculateMarketValue from './util/calculateMarketValue';
import calculateProfitLossPercent from './util/calculateProfitLossPercent';
import calculateProfitLossUsd from './util/calculateProfitLossUsd';
import { roundTo2Decimal } from './util/roundTo2Decimal';

const calculatePositionMetrics = (position: PositionDocumentPopulated) => {
  // TODO: decide on UX for showing outside RTH prices
  const latestPrice = position.symbol.quote.latestPrice;
  const marketValue = roundTo2Decimal(
    calculateMarketValue(position.positionSize, latestPrice),
  );
  // Backup incase a position has somehow got no cost basis - this should never happen though
  const costBasis = roundTo2Decimal(
    position.costBasis || position.positionSize * position.averagePrice,
  );

  const profitLossUsd = roundTo2Decimal(
    calculateProfitLossUsd(costBasis, marketValue),
  );
  const profitLossPercent = roundTo2Decimal(
    calculateProfitLossPercent(costBasis, marketValue),
  );
  const dailyProfitLossUsd = roundTo2Decimal(
    calculateDailyProfitLossUsd(
      position.positionSize,
      position.symbol.quote.change,
    ),
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
