import { getSecurityPrice } from '@baggers/security-util';
import { Injectable } from '@nestjs/common';
import { AssetClass } from '~/securities/enums/asset-class.enum';
import { SecuritiesUtilService } from '~/securities/securities-util.service';
import { PopulatedPortfolio } from '../entities';

@Injectable()
export class PortfolioMetricsService {
  constructor(private securitiesUtil: SecuritiesUtilService) {}

  calculateCash(portfolio: PopulatedPortfolio): number {
    const { holdings } = portfolio;
    return (
      holdings.reduce((totalCash, holding) => {
        if (holding.assetClass === AssetClass.Cash)
          return totalCash + holding.quantity;
        return totalCash;
      }, 0) ||
      portfolio.plaidAccount?.balances?.available ||
      0
    );
  }

  calculateTotalValue(portfolio: PopulatedPortfolio): number {
    return (
      Number(
        portfolio.holdings
          .reduce((acc, curr) => {
            const marketValue =
              curr.quantity *
              getSecurityPrice(curr.security || curr.importedSecurity);

            return acc + marketValue;
          }, 0)
          .toFixed(2)
      ) ||
      portfolio.plaidAccount?.balances?.current ||
      0
    );
  }
}
