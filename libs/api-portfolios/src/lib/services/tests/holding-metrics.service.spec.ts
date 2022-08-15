import { A } from '@baggers/api-securities';
import { Test } from '@nestjs/testing';
import {
  getPopulated,
  PublicPortfolio,
} from 'libs/api-portfolios/data/portfolio.test-data';
import { HoldingSource } from '../../enums/holding-source.enum';
import { HoldingType } from '../../enums/holding-type.enum';
import { HoldingMetricsService } from '../holding-metrics.service';
import { PortfolioMetricsService } from '../portfolio-metrics.service';

describe('HoldingMetricsService', () => {
  let service: HoldingMetricsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [HoldingMetricsService, PortfolioMetricsService],
    }).compile();

    service = module.get<HoldingMetricsService>(HoldingMetricsService);
  });

  describe('marketValue', () => {
    it('should calculate marketValue correctly', () => {
      expect(
        service.calculateMarketValue({
          averagePrice: 1,
          costBasis: 1,
          quantity: 10,
          source: HoldingSource.broker,
          security: A,
          type: HoldingType.shares,
        })
      ).toEqual(1230.9);
    });
    it('should throw an error if the input is invalid', () => {
      expect(() =>
        service.calculateMarketValue({ averagePrice: 2 } as any)
      ).toThrowErrorMatchingInlineSnapshot(
        `"Tried to calculate market value for holding{\\"averagePrice\\":2} and security undefined"`
      );
    });
  });

  describe('exposure', () => {
    it('should calculate exposure correctly', () => {
      expect(
        service.calculateExposure(
          {
            averagePrice: 1,
            costBasis: 1,
            quantity: 10,
            source: HoldingSource.broker,
            security: A,
            type: HoldingType.shares,
          },
          12039
        )
      ).toEqual(10.224271118863694);
    });
    it('should throw an error if the input is invalid', () => {
      expect(() =>
        service.calculateExposure({ averagePrice: 2 } as any, 0)
      ).toThrowErrorMatchingInlineSnapshot(
        `"Tried to calculate exposure for holding{\\"averagePrice\\":2} and total value 0"`
      );
    });
  });

  describe('profitLossUsd', () => {
    it('should calculate profitLossUsd correctly', () => {
      expect(
        service.calculateProfitLossUsd({
          averagePrice: 1,
          costBasis: 1,
          quantity: 10,
          source: HoldingSource.broker,
          security: A,
          type: HoldingType.shares,
        })
      ).toMatchInlineSnapshot(`1229.9`);
    });
    it('should throw an error if the input is invalid', () => {
      expect(() =>
        service.calculateProfitLossUsd({ averagePrice: 2 } as any)
      ).toThrowErrorMatchingInlineSnapshot(
        `"Tried to calculate profitLossUsd for holding{\\"averagePrice\\":2}"`
      );
    });
  });

  describe('profitLossPercent', () => {
    it('should calculate profitLossPercent correctly', () => {
      expect(
        service.calculateProfitLossPercent({
          averagePrice: 1,
          costBasis: 1,
          quantity: 10,
          source: HoldingSource.broker,
          security: A,
          type: HoldingType.shares,
        })
      ).toMatchInlineSnapshot(`122990.00000000001`);
    });
    it('should throw an error if the input is invalid', () => {
      expect(() =>
        service.calculateProfitLossPercent({ averagePrice: 2 } as any)
      ).toThrowErrorMatchingInlineSnapshot(
        `"Tried to calculate profitLossPercent for holding{\\"averagePrice\\":2}"`
      );
    });
  });

  describe('dailyProfiLossUsd', () => {
    it('should calculate dailyProfitLossUsd correctly', () => {
      expect(
        service.calculateDailyProfitLossUsd({
          averagePrice: 1,
          costBasis: 1,
          quantity: 10,
          source: HoldingSource.broker,
          security: A,
          type: HoldingType.shares,
        })
      ).toMatchInlineSnapshot(`-44.699999999999996`);
    });
    it('should throw an error if the input is invalid', () => {
      expect(() =>
        service.calculateDailyProfitLossUsd({ averagePrice: 2 } as any)
      ).toThrowErrorMatchingInlineSnapshot(
        `"Tried to calculate dailyProfitLossUsd for holding{\\"averagePrice\\":2}"`
      );
    });
  });

  describe('calculateHoldingMetrics', () => {
    it('should calculate all holding metrics correctly', () => {
      expect(
        service
          .calculateHoldingMetrics(getPopulated(PublicPortfolio))
          .map((h) => ({ ...h, security: undefined }))
      ).toMatchInlineSnapshot(`
        Array [
          Object {
            "averagePrice": 383.9,
            "brokerFees": 0,
            "costBasis": 3839,
            "currency": "USD",
            "dailyProfitLossUsd": -178.9,
            "direction": "long",
            "exposure": 3.1,
            "marketValue": 7403.7,
            "profitLossPercent": 92.85,
            "profitLossUsd": 3564.7,
            "quantity": 10,
            "security": undefined,
            "source": "direct",
            "type": "shares",
          },
          Object {
            "averagePrice": 4794.2,
            "brokerFees": 0,
            "costBasis": 47942,
            "currency": "USD",
            "dailyProfitLossUsd": -44.7,
            "direction": "long",
            "exposure": 0.51,
            "marketValue": 1230.9,
            "profitLossPercent": -97.43,
            "profitLossUsd": -46711.1,
            "quantity": 10,
            "security": undefined,
            "source": "direct",
            "type": "shares",
          },
        ]
      `);
    });
  });
});
