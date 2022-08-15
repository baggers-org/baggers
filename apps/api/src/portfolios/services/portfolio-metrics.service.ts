import { Injectable } from '@nestjs/common';
import { PopulatedPortfolio } from '../entities/portfolio.entity';

@Injectable()
export class PortfolioMetricsService {
  calculateTotalValue(portfolio: PopulatedPortfolio): number {
    return (
      portfolio.holdings.reduce((acc, curr) => {
        const marketValue = curr.quantity * curr.security.quote.latestPrice;
        return acc + marketValue;
      }, 0) + portfolio.cash
    );
  }
}
