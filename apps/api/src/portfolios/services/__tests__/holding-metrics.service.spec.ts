import { Test } from '@nestjs/testing';
import { HoldingSource } from 'src/portfolios/enums/holding-source.enum';
import { HoldingType } from 'src/portfolios/enums/holding-type.enum';
import { Ticker1 } from 'tests/data/ticker.test-data';
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
          ticker: Ticker1,
          type: HoldingType.shares,
        }),
      ).toEqual(1230.9);
    });
    it('should throw an error if the input is invalid', () => {
      expect(() =>
        service.calculateMarketValue({ averagePrice: 2 } as any),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Tried to calculate market value for holding{\\"averagePrice\\":2} and ticker undefined"`,
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
            ticker: Ticker1,
            type: HoldingType.shares,
          },
          12039,
        ),
      ).toEqual(10.224271118863694);
    });
    it('should throw an error if the input is invalid', () => {
      expect(() =>
        service.calculateExposure({ averagePrice: 2 } as any, 0),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Tried to calculate exposure for holding{\\"averagePrice\\":2} and total value 0"`,
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
          ticker: Ticker1,
          type: HoldingType.shares,
        }),
      ).toMatchInlineSnapshot(`1229.9`);
    });
    it('should throw an error if the input is invalid', () => {
      expect(() =>
        service.calculateProfitLossUsd({ averagePrice: 2 } as any),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Tried to calculate profitLossUsd for holding{\\"averagePrice\\":2}"`,
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
          ticker: Ticker1,
          type: HoldingType.shares,
        }),
      ).toMatchInlineSnapshot(`122990.00000000001`);
    });
    it('should throw an error if the input is invalid', () => {
      expect(() =>
        service.calculateProfitLossPercent({ averagePrice: 2 } as any),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Tried to calculate profitLossPercent for holding{\\"averagePrice\\":2}"`,
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
          ticker: Ticker1,
          type: HoldingType.shares,
        }),
      ).toMatchInlineSnapshot(`-44.699999999999996`);
    });
    it('should throw an error if the input is invalid', () => {
      expect(() =>
        service.calculateDailyProfitLossUsd({ averagePrice: 2 } as any),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Tried to calculate dailyProfitLossUsd for holding{\\"averagePrice\\":2}"`,
      );
    });
  });
});
