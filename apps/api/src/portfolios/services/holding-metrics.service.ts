import { Injectable } from '@nestjs/common';
import { AssetClass } from '~/securities/enums/asset-class.enum';
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
    if (holding.assetClass === AssetClass.cash) return holding.quantity;

    if (holding.security) {
      return holding.quantity * holding.security.tickerSnapshot.min.c;
    }

    if (holding.institutionValue) {
      return holding.institutionValue;
    }
    throw Error(
      'Holding does not have a quote / or it is imported and does not have an institution value'
    );
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
      if (!holding.security) return null;
      return holding.quantity * holding.security.tickerSnapshot.todaysChange;
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
    // Remove all cash holdings from
    const totalValue =
      this.portfolioMetricsService.calculateTotalValue(portfolio);
    return portfolio.holdings.map((holding) => {
      return {
        ...holding,
        marketValue: +this.calculateMarketValue(holding) || null,
        exposure: +this.calculateExposure(holding, totalValue),
        profitLossUsd: +this.calculateProfitLossUsd(holding) || null,
        profitLossPercent: +this.calculateProfitLossPercent(holding) || null,
        dailyProfitLossUsd: +this.calculateDailyProfitLossUsd(holding) || null,
      };
    });
  }
}
