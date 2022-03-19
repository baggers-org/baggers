import {
  calculatePortfolioTotalValue,
  populateHoldingData,
} from './portfolios';
import { analysePortfolio } from './portfolios/analysePortfolio';
import { calculateHoldingExposure } from './portfolios/calculateHoldingExposure';
import { withPortfolioPerformance } from './portfolios/withPortfolioPerformance';

export const withHoldingData = [
  ...populateHoldingData(),
  // Now we have market value etc. work out the total portfolio value
  ...calculatePortfolioTotalValue(),
  // Finally work out the exposure of every holding
  ...calculateHoldingExposure(),
];

export const withAnalysis = analysePortfolio;

export const withPerformance = withPortfolioPerformance;
