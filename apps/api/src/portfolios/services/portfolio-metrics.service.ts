import { Injectable } from '@nestjs/common';
import { SecuritiesUtilService } from '~/securities/securities-util.service';
import { PopulatedPortfolio } from '../entities';

@Injectable()
export class PortfolioMetricsService {
  constructor(private securitiesUtil: SecuritiesUtilService) {}

  calculateTotalValue(portfolio: PopulatedPortfolio): number {
    return Number(
      (
        portfolio.holdings.reduce((acc, curr) => {
          const marketValue =
            curr.quantity *
            this.securitiesUtil.getPrice(
              curr.security || curr.importedSecurity
            );

          return acc + marketValue;
        }, 0) + portfolio.cash
      ).toFixed(2)
    );
  }
}
