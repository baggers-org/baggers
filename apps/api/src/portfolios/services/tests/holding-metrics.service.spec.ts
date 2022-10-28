import { A, SecuritiesService, SecuritiesServiceMock } from '~/securities';
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

    service = module.get<HoldingMetricsService>(HoldingMetricsService);
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
        `"Tried to calculate exposure for holding{\\"averagePrice\\":2} and total value 0"`
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
        `"Tried to calculate profitLossUsd for holding{\\"averagePrice\\":2}"`
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
        `"Tried to calculate profitLossPercent for holding{\\"averagePrice\\":2}"`
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
        Array [
          Object {
            "_id": "62d2cd45c63873e235c99531",
            "assetClass": "Cash",
            "currency": "USD",
            "dailyProfitLossUsd": null,
            "exposure": 41.52771820716276,
            "marketValue": 1239.32,
            "profitLossPercent": null,
            "profitLossUsd": null,
            "quantity": 1239.32,
            "security": undefined,
            "source": "direct",
          },
          Object {
            "_id": "62d2cd45c63873e235c99532",
            "assetClass": "Stock",
            "averagePrice": 383.9,
            "brokerFees": 0,
            "costBasis": 3839,
            "currency": "USD",
            "dailyProfitLossUsd": null,
            "direction": "long",
            "exposure": 40.210165129744794,
            "marketValue": 1200,
            "profitLossPercent": -68.74185985933838,
            "profitLossUsd": -2639,
            "quantity": 10,
            "security": undefined,
            "source": "broker",
          },
          Object {
            "_id": "62d2cd45c63873e235c99533",
            "assetClass": "Stock",
            "averagePrice": 4794.2,
            "brokerFees": 0,
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
      expect(service.calculateHoldingMetrics(getPopulated(ImportedPortfolio)))
        .toMatchInlineSnapshot(`
        Array [
          Object {
            "_id": "62d2cd45c63873e235c99531",
            "assetClass": "Cash",
            "currency": "USD",
            "dailyProfitLossUsd": null,
            "exposure": 22.975813956937493,
            "marketValue": 1239.32,
            "profitLossPercent": null,
            "profitLossUsd": null,
            "quantity": 1239.32,
            "security": undefined,
            "source": "direct",
          },
          Object {
            "_id": "62d2cd45c63873e235c99567",
            "assetClass": "Stock",
            "averagePrice": 10,
            "costBasis": 100,
            "currency": "USD",
            "dailyProfitLossUsd": null,
            "exposure": 8.008869080945194,
            "importedSecurity": Object {
              "assetClass": "Stock",
              "close_price": 10.42,
              "close_price_as_of": null,
              "currency": "USD",
              "cusip": "258620103",
              "institution_id": null,
              "institution_security_id": null,
              "is_cash_equivalent": false,
              "isin": "US2586201038",
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
          Object {
            "_id": "62d2cd45c63873e235c99569",
            "assetClass": "Stock",
            "averagePrice": 409,
            "costBasis": 49,
            "currency": "USD",
            "dailyProfitLossUsd": null,
            "exposure": 30.598700041898248,
            "importedSecurity": Object {
              "assetClass": "Stock",
              "close_price": 34.73,
              "close_price_as_of": null,
              "currency": "USD",
              "cusip": "84470P109",
              "institution_id": null,
              "institution_security_id": null,
              "is_cash_equivalent": false,
              "isin": "US84470P1093",
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
            "security": Object {
              "_id": "SBSI",
              "assetClass": "Stock",
              "currency": "USD",
              "exchange": "XNAS",
              "figi": "BBG000BGVC19",
              "name": "Southside Bancshares Inc",
              "region": "US",
              "tickerSnapshot": Object {
                "day": Object {
                  "c": 0,
                  "h": 0,
                  "l": 0,
                  "o": 0,
                  "v": 0,
                  "vw": 0,
                },
                "lastQuote": null,
                "lastTrade": null,
                "min": Object {
                  "av": 0,
                  "c": 0,
                  "h": 0,
                  "l": 0,
                  "o": 0,
                  "v": 0,
                  "vw": 0,
                },
                "prevDay": Object {
                  "c": 33.01,
                  "h": 33.69,
                  "l": 32.49,
                  "o": 32.49,
                  "v": 155895,
                  "vw": 33.2222,
                },
                "ticker": "SBSI",
                "todaysChange": 0,
                "todaysChangePerc": 0,
                "updated": 0,
              },
            },
            "source": "broker",
          },
          Object {
            "_id": "62d2cd45c63873e235c99570",
            "assetClass": "Stock",
            "averagePrice": 1000,
            "costBasis": 42,
            "currency": "USD",
            "dailyProfitLossUsd": null,
            "exposure": 44.49371711636219,
            "marketValue": 2400,
            "profitLossPercent": 5614.285714285715,
            "profitLossUsd": 2358,
            "quantity": 20,
            "security": Object {
              "_id": "TSLA",
              "assetClass": "Stock",
              "currency": "USD",
              "exchange": "XNAS",
              "figi": "BBG000N9MNX3",
              "name": "Tesla Inc",
              "region": "US",
              "tickerSnapshot": Object {
                "day": Object {
                  "c": 0,
                  "h": 0,
                  "l": 0,
                  "o": 0,
                  "v": 0,
                  "vw": 0,
                },
                "lastQuote": null,
                "lastTrade": null,
                "min": Object {
                  "av": 2323,
                  "c": 120,
                  "h": 3,
                  "l": 23,
                  "o": 2,
                  "v": 2,
                  "vw": 23,
                },
                "prevDay": Object {
                  "c": 3.84,
                  "h": 4.03,
                  "l": 3.75,
                  "o": 4.03,
                  "v": 383336,
                  "vw": 3.8402,
                },
                "ticker": "ONDS",
                "todaysChange": 0,
                "todaysChangePerc": 0,
                "updated": 0,
              },
            },
            "source": "broker",
          },
        ]
      `);
    });
  });
});
