import {
  A,
  SecuritiesService,
  SecuritiesServiceMock,
} from '~/securities';
import { Test } from '@nestjs/testing';
import { HoldingSource } from '../../enums/holding-source.enum';
import { HoldingMetricsService } from '../holding-metrics.service';
import { PortfolioMetricsService } from '../portfolio-metrics.service';
import {
  getPopulated,
  ImportedPortfolio,
  PublicPortfolio,
} from '~/portfolios/data';
import { SecuritiesUtilService } from '~/securities/securities-util.service';
import { OpenFigiModule } from '~/open-figi';
import { AssetClass } from '~/securities/enums/asset-class.enum';

describe('HoldingMetricsService', () => {
  let service: HoldingMetricsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [OpenFigiModule],
      providers: [
        HoldingMetricsService,
        PortfolioMetricsService,
        SecuritiesService,
        SecuritiesUtilService,
      ],
    })
      .overrideProvider(SecuritiesService)
      .useClass(SecuritiesServiceMock)
      .compile();

    service = module.get<HoldingMetricsService>(
      HoldingMetricsService
    );
  });

  describe('marketValue', () => {
    it('should calculate marketValue correctly', () => {
      expect(
        service.calculateMarketValue({
          _id: null,
          averagePrice: 1,
          costBasis: 1,
          quantity: 10,
          source: HoldingSource.broker,
          security: A,
          assetClass: AssetClass.stock,
          currency: 'USD',
        })
      ).toMatchInlineSnapshot(`545`);
    });
    it('should throw an error if the input is invalid', () => {
      expect(() =>
        service.calculateMarketValue({ averagePrice: 2 } as any)
      ).toThrowErrorMatchingInlineSnapshot(
        `"Holding does not have a quote / or it is imported and does not have an institution value"`
      );
    });
  });

  describe('exposure', () => {
    it('should calculate exposure correctly', () => {
      expect(
        service.calculateExposure(
          {
            _id: null,
            averagePrice: 1,
            costBasis: 1,
            quantity: 10,
            source: HoldingSource.broker,
            security: A,
            assetClass: AssetClass.stock,
            currency: 'USD',
          },

          12039
        )
      ).toMatchInlineSnapshot(`4.526954065952322`);
    });
    it('should throw an error if the input is invalid', () => {
      expect(() =>
        service.calculateExposure({ averagePrice: 2 } as any, 0)
      ).toThrowErrorMatchingInlineSnapshot(
        `"Tried to calculate exposure for holding{"averagePrice":2} and total value 0"`
      );
    });
  });

  describe('profitLossUsd', () => {
    it('should calculate profitLossUsd correctly', () => {
      expect(
        service.calculateProfitLossUsd({
          _id: null,
          averagePrice: 1,
          costBasis: 1,
          quantity: 10,
          source: HoldingSource.broker,
          security: A,
          assetClass: AssetClass.stock,
          currency: 'USD',
        })
      ).toMatchInlineSnapshot(`544`);
    });
    it('should throw an error if the input is invalid', () => {
      expect(() =>
        service.calculateProfitLossUsd({ averagePrice: 2 } as any)
      ).toThrowErrorMatchingInlineSnapshot(
        `"Tried to calculate profitLossUsd for holding{"averagePrice":2}"`
      );
    });
  });

  describe('profitLossPercent', () => {
    it('should calculate profitLossPercent correctly', () => {
      expect(
        service.calculateProfitLossPercent({
          _id: null,
          averagePrice: 1,
          costBasis: 1,
          quantity: 10,
          source: HoldingSource.broker,
          security: A,
          assetClass: AssetClass.stock,
          currency: 'USD',
        })
      ).toMatchInlineSnapshot(`54400`);
    });
    it('should throw an error if the input is invalid', () => {
      expect(() =>
        service.calculateProfitLossPercent({ averagePrice: 2 } as any)
      ).toThrowErrorMatchingInlineSnapshot(
        `"Tried to calculate profitLossPercent for holding{"averagePrice":2}"`
      );
    });
  });

  describe('dailyProfiLossUsd', () => {
    it('should calculate dailyProfitLossUsd correctly', () => {
      expect(
        service.calculateDailyProfitLossUsd({
          _id: null,
          averagePrice: 1,
          costBasis: 1,
          quantity: 10,
          source: HoldingSource.broker,
          security: A,
          assetClass: AssetClass.stock,
          currency: 'USD',
        })
      ).toMatchInlineSnapshot(`-14.799999999999969`);
    });
  });

  describe('calculateHoldingMetrics', () => {
    it('should calculate all holding metrics correctly', () => {
      expect(
        service
          .calculateHoldingMetrics(getPopulated(PublicPortfolio))
          .map((h) => ({ ...h, security: undefined }))
      ).toMatchInlineSnapshot(`
        [
          {
            "_id": "62d2cd45c63873e235c99531",
            "assetClass": "cash",
            "averagePrice": 1,
            "costBasis": 1239.32,
            "currency": "USD",
            "dailyProfitLossUsd": 0,
            "exposure": 41.52771820716276,
            "marketValue": 1239.32,
            "profitLossPercent": 0,
            "profitLossUsd": 0,
            "quantity": 1239.32,
            "security": undefined,
            "source": "direct",
          },
          {
            "_id": "62d2cd45c63873e235c99532",
            "assetClass": "stock",
            "averagePrice": 383.9,
            "costBasis": 3839,
            "currency": "USD",
            "dailyProfitLossUsd": 0,
            "direction": "long",
            "exposure": 40.210165129744794,
            "marketValue": 1200,
            "profitLossPercent": -68.74185985933838,
            "profitLossUsd": -2639,
            "quantity": 10,
            "security": undefined,
            "source": "broker",
          },
          {
            "_id": "62d2cd45c63873e235c99533",
            "assetClass": "stock",
            "averagePrice": 4794.2,
            "costBasis": 47942,
            "currency": "USD",
            "dailyProfitLossUsd": -14.799999999999969,
            "direction": "long",
            "exposure": 18.262116663092428,
            "marketValue": 545,
            "profitLossPercent": -98.86320971173501,
            "profitLossUsd": -47397,
            "quantity": 10,
            "security": undefined,
            "source": "broker",
          },
        ]
      `);
    });

    it('should calculate all metrics correctly for imported securities that have not been matched', () => {
      expect(
        service.calculateHoldingMetrics(
          getPopulated(ImportedPortfolio)
        )
      ).toMatchInlineSnapshot(`
        [
          {
            "_id": "62d2cd45c63873e235c99531",
            "assetClass": "cash",
            "averagePrice": 1,
            "costBasis": 1239.32,
            "currency": "USD",
            "dailyProfitLossUsd": 0,
            "exposure": 22.975813956937493,
            "marketValue": 1239.32,
            "profitLossPercent": 0,
            "profitLossUsd": 0,
            "quantity": 1239.32,
            "security": undefined,
            "source": "direct",
          },
          {
            "_id": "62d2cd45c63873e235c99567",
            "assetClass": "stock",
            "averagePrice": 10,
            "costBasis": 100,
            "currency": "USD",
            "dailyProfitLossUsd": 0,
            "exposure": 8.008869080945194,
            "importedSecurity": {
              "assetClass": "stock",
              "close_price_as_of": null,
              "currency": "USD",
              "cusip": "258620103",
              "institution_id": null,
              "institution_security_id": null,
              "isImported": true,
              "is_cash_equivalent": false,
              "isin": "US2586201038",
              "latestPrice": 10.42,
              "name": "DoubleLine Total Return Bond Fund",
              "proxy_security_id": null,
              "security_id": "NDVQrXQoqzt5v3bAe8qRt4A7mK7wvZCLEBBJk",
              "sedol": null,
              "ticker_symbol": "DBLTX",
              "unofficial_currency_code": null,
              "update_datetime": null,
            },
            "institutionValue": 432,
            "marketValue": 432,
            "profitLossPercent": 332,
            "profitLossUsd": 332,
            "quantity": 10,
            "security": undefined,
            "source": "broker",
          },
          {
            "_id": "62d2cd45c63873e235c99569",
            "assetClass": "stock",
            "averagePrice": 409,
            "costBasis": 49,
            "currency": "USD",
            "dailyProfitLossUsd": 0,
            "exposure": 30.598700041898248,
            "importedSecurity": {
              "assetClass": "stock",
              "close_price_as_of": null,
              "currency": "USD",
              "cusip": "84470P109",
              "institution_id": null,
              "institution_security_id": null,
              "isImported": true,
              "is_cash_equivalent": false,
              "isin": "US84470P1093",
              "latestPrice": 34.73,
              "name": "Southside Bancshares Inc.",
              "proxy_security_id": null,
              "security_id": "eW4jmnjd6AtjxXVrjmj6SX1dNEdZp3Cy8RnRQ",
              "sedol": null,
              "ticker_symbol": "SBSI",
              "unofficial_currency_code": null,
              "update_datetime": null,
            },
            "institutionValue": 52300,
            "marketValue": 1650.5,
            "profitLossPercent": 3268.3673469387754,
            "profitLossUsd": 1601.5,
            "quantity": 50,
            "security": {
              "_id": "SBSI",
              "assetClass": "stock",
              "currency": "USD",
              "exchange": "XNAS",
              "figi": "BBG000BGVC19",
              "latestPrice": 33.01,
              "name": "Southside Bancshares Inc",
              "region": "US",
              "todaysChange": 0,
              "todaysChangePercent": 0,
            },
            "source": "broker",
          },
          {
            "_id": "62d2cd45c63873e235c99570",
            "assetClass": "stock",
            "averagePrice": 1000,
            "costBasis": 42,
            "currency": "USD",
            "dailyProfitLossUsd": 0,
            "exposure": 44.49371711636219,
            "marketValue": 2400,
            "profitLossPercent": 5614.285714285715,
            "profitLossUsd": 2358,
            "quantity": 20,
            "security": {
              "_id": "TSLA",
              "assetClass": "stock",
              "currency": "USD",
              "exchange": "XNAS",
              "figi": "BBG000N9MNX3",
              "latestPrice": 120,
              "name": "Tesla Inc",
              "region": "US",
              "todaysChange": 0,
              "todaysChangePercent": 0,
            },
            "source": "broker",
          },
        ]
      `);
    });
  });
});
