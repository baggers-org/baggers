import { Injectable } from '@nestjs/common';
import {
  PopulatedHolding,
  PopulatedHoldingWithMetrics,
} from '../entities/holding.entity';
import { PopulatedPortfolio } from '../entities/portfolio.entity';
import { PortfolioMetricsService } from './portfolio-metrics.service';

@Injectable()
export class HoldingMetricsService {
  constructor(private portfolioMetricsService: PortfolioMetricsService) {}

  calculateMarketValue(holding: PopulatedHolding) {
    try {
      return holding.quantity * holding.ticker.quote.latestPrice;
    } catch (e) {
      throw new Error(
        'Tried to calculate market value for holding' +
          JSON.stringify(holding) +
          ' and ticker ' +
          JSON.stringify(holding.ticker)
      );
    }
  }

  calculateExposure(holding: PopulatedHolding, portfolioTotalValue: number) {
    try {
      return (this.calculateMarketValue(holding) / portfolioTotalValue) * 100;
    } catch (e) {
      throw new Error(
        'Tried to calculate exposure for holding' +
          JSON.stringify(holding) +
          ' and total value ' +
          portfolioTotalValue
      );
    }
  }

  calculateProfitLossUsd(holding: PopulatedHolding) {
    try {
      return this.calculateMarketValue(holding) - holding.costBasis;
    } catch (e) {
      throw new Error(
        'Tried to calculate profitLossUsd for holding' + JSON.stringify(holding)
      );
    }
  }

  calculateProfitLossPercent(holding: PopulatedHolding) {
    try {
      return (this.calculateProfitLossUsd(holding) / holding.costBasis) * 100;
    } catch (e) {
      throw new Error(
        'Tried to calculate profitLossPercent for holding' +
          JSON.stringify(holding)
      );
    }
  }

  calculateDailyProfitLossUsd(holding: PopulatedHolding) {
    try {
      return holding.quantity * holding.ticker.quote.change;
    } catch (e) {
      throw new Error(
        'Tried to calculate dailyProfitLossUsd for holding' +
          JSON.stringify(holding)
      );
    }
  }

  calculateHoldingMetrics(
    portfolio: PopulatedPortfolio
  ): PopulatedHoldingWithMetrics[] {
    const totalValue =
      this.portfolioMetricsService.calculateTotalValue(portfolio);
    return portfolio.holdings.map((holding) => {
      return {
        ...holding,
        marketValue: +this.calculateMarketValue(holding).toFixed(2),
        exposure: +this.calculateExposure(holding, totalValue).toFixed(2),
        profitLossUsd: +this.calculateProfitLossUsd(holding).toFixed(2),
        profitLossPercent: +this.calculateProfitLossPercent(holding).toFixed(2),
        dailyProfitLossUsd:
          +this.calculateDailyProfitLossUsd(holding).toFixed(2),
      };
    });
  }
}
