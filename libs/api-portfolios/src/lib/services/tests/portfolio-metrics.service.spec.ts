import {
  getPopulated,
  Portfolio1,
  PublicPortfolio,
} from '../../../../data/portfolio.test-data';
import { PortfolioMetricsService } from '../portfolio-metrics.service';

describe('Portfolio metrics service', () => {
  describe('calculateTotalValue', () => {
    it('should return the correct value for a porfolio given its holdings and cash', () => {
      const service = new PortfolioMetricsService();

      expect(service.calculateTotalValue(getPopulated(Portfolio1))).toBe(
        4828301.24
      );

      expect(service.calculateTotalValue(getPopulated(PublicPortfolio))).toBe(
        239129.93
      );
    });
  });
});
