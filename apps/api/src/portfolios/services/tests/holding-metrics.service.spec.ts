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
          AssetClass: AssetClass.stock,
          currency: 'USD',
        })
      ).toEqual(1230.9);
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
            AssetClass: AssetClass.stock,
            currency: 'USD',
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
          _id: null,
          averagePrice: 1,
          costBasis: 1,
          quantity: 10,
          source: HoldingSource.broker,
          security: A,
          AssetClass: AssetClass.stock,
          currency: 'USD',
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
          _id: null,
          averagePrice: 1,
          costBasis: 1,
          quantity: 10,
          source: HoldingSource.broker,
          security: A,
          AssetClass: AssetClass.stock,
          currency: 'USD',
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
          _id: null,
          averagePrice: 1,
          costBasis: 1,
          quantity: 10,
          source: HoldingSource.broker,
          security: A,
          AssetClass: AssetClass.stock,
          currency: 'USD',
        })
      ).toMatchInlineSnapshot(`-44.699999999999996`);
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
            "currency": "USD",
            "dailyProfitLossUsd": null,
            "exposure": 12.55144866476536,
            "marketValue": 1239.32,
            "profitLossPercent": null,
            "profitLossUsd": null,
            "quantity": 1239.32,
            "security": undefined,
            "AssetClass": "cash",
            "source": "direct",
          },
          Object {
            "_id": "62d2cd45c63873e235c99532",
            "averagePrice": 383.9,
            "brokerFees": 0,
            "costBasis": 3839,
            "currency": "USD",
            "dailyProfitLossUsd": -178.9,
            "direction": "long",
            "exposure": 74.98237781954887,
            "marketValue": 7403.7,
            "profitLossPercent": 92.8549101328471,
            "profitLossUsd": 3564.7,
            "quantity": 10,
            "security": undefined,
            "AssetClass": "equity",
            "source": "broker",
          },
          Object {
            "_id": "62d2cd45c63873e235c99533",
            "averagePrice": 4794.2,
            "brokerFees": 0,
            "costBasis": 47942,
            "currency": "USD",
            "dailyProfitLossUsd": -44.699999999999996,
            "direction": "long",
            "exposure": 12.466173515685767,
            "marketValue": 1230.9,
            "profitLossPercent": -97.43252263151308,
            "profitLossUsd": -46711.1,
            "quantity": 10,
            "security": undefined,
            "AssetClass": "equity",
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
            "currency": "USD",
            "dailyProfitLossUsd": null,
            "exposure": 6.841904484292802,
            "marketValue": 1239.32,
            "profitLossPercent": null,
            "profitLossUsd": null,
            "quantity": 1239.32,
            "security": undefined,
            "AssetClass": "cash",
            "source": "direct",
          },
          Object {
            "_id": "62d2cd45c63873e235c99567",
            "averagePrice": 10,
            "costBasis": 100,
            "currency": "USD",
            "dailyProfitLossUsd": null,
            "exposure": 2.3849391095233603,
            "importedSecurity": Object {
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
              "type": "mutual fund",
              "unofficial_currency_code": null,
              "update_datetime": null,
            },
            "institutionValue": 432,
            "marketValue": 432,
            "profitLossPercent": 332,
            "profitLossUsd": 332,
            "quantity": 10,
            "security": undefined,
            "AssetClass": "equity",
            "source": "broker",
          },
          Object {
            "_id": "62d2cd45c63873e235c99569",
            "averagePrice": 409,
            "costBasis": 49,
            "currency": "USD",
            "dailyProfitLossUsd": -13.750000000000002,
            "exposure": 10.835738975039295,
            "importedSecurity": Object {
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
              "type": "equity",
              "unofficial_currency_code": null,
              "update_datetime": null,
            },
            "institutionValue": 52300,
            "marketValue": 1962.7500000000002,
            "profitLossPercent": 3905.6122448979595,
            "profitLossUsd": 1913.7500000000002,
            "quantity": 50,
            "security": Object {
              "_id": "62a23959e5a9e9b88f85457a",
              "cik": "0000705432",
              "currency": "USD",
              "exchange": "XNAS",
              "exchangeName": "Nasdaq All Markets",
              "figi": "BBG000BGVC19",
              "iexId": "IEX_473930304A432D52",
              "name": "Southside Bancshares Inc",
              "quote": Object {
                "avgTotalVolume": 83484,
                "calculationPrice": "tops",
                "change": -0.275,
                "changePercent": -0.00696,
                "close": null,
                "closeSource": "official",
                "closeTime": null,
                "companyName": "Southside Bancshares Inc",
                "currency": "USD",
                "delayedPrice": null,
                "delayedPriceTime": null,
                "extendedChange": null,
                "extendedChangePercent": null,
                "extendedPrice": null,
                "extendedPriceTime": null,
                "high": 39.74,
                "highSource": "IEX real time price",
                "highTime": 1654781402361,
                "iexAskPrice": 42.64,
                "iexAskSize": 125,
                "iexBidPrice": 36.14,
                "iexBidSize": 102,
                "iexClose": 39.255,
                "iexCloseTime": 1654798407594,
                "iexLastUpdated": 1654798407594,
                "iexMarketPercent": 0.06131365422036201,
                "iexOpen": 39.74,
                "iexOpenTime": 1654781402361,
                "iexRealtimePrice": 39.255,
                "iexRealtimeSize": 10,
                "iexVolume": 1670,
                "isUSMarketOpen": true,
                "lastTradeTime": 1654798407594,
                "latestPrice": 39.255,
                "latestSource": "IEX real time price",
                "latestTime": "2:13:27 PM",
                "latestUpdate": 1654798407594,
                "latestVolume": 27237,
                "low": 39.04,
                "lowSource": "IEX real time price",
                "lowTime": 1654791235063,
                "marketCap": 1260946087,
                "oddLotDelayedPrice": null,
                "oddLotDelayedPriceTime": null,
                "open": null,
                "openSource": "official",
                "openTime": null,
                "peRatio": 12.27,
                "previousClose": 39.53,
                "previousVolume": 62544,
                "primaryExchange": "NASDAQ",
                "symbol": "62a23959e5a9e9b88f85457a",
                "volume": 27237,
                "week52High": 44.55,
                "week52Low": 33.61,
                "ytdChange": -0.04593114239175359,
              },
              "region": "US",
              "symbol": "SBSI",
              "type": "equity",
            },
            "AssetClass": "equity",
            "source": "broker",
          },
          Object {
            "_id": "62d2cd45c63873e235c99570",
            "averagePrice": 1000,
            "costBasis": 42,
            "currency": "USD",
            "dailyProfitLossUsd": -357.8,
            "exposure": 81.74710039434306,
            "marketValue": 14807.4,
            "profitLossPercent": 35155.71428571428,
            "profitLossUsd": 14765.4,
            "quantity": 20,
            "security": Object {
              "_id": "62989022d38076b6353967c3",
              "cik": "0001318605",
              "createdAt": 2001-01-01T00:00:00.000Z,
              "currency": "USD",
              "exchange": "XNAS",
              "exchangeName": "Nasdaq All Markets",
              "figi": "BBG000N9MNX3",
              "iexId": "IEX_5132594E314E2D52",
              "name": "Tesla Inc",
              "quote": Object {
                "avgTotalVolume": 31432975,
                "calculationPrice": "close",
                "change": -17.89,
                "changePercent": -0.02359,
                "close": 740.37,
                "closeSource": "official",
                "closeTime": 1654113601016,
                "companyName": "Tesla Inc",
                "currency": "USD",
                "delayedPrice": 740.72,
                "delayedPriceTime": 1654113585343,
                "extendedChange": null,
                "extendedChangePercent": null,
                "extendedPrice": null,
                "extendedPriceTime": null,
                "high": null,
                "highSource": null,
                "highTime": null,
                "iexAskPrice": 0,
                "iexAskSize": 0,
                "iexBidPrice": 0,
                "iexBidSize": 0,
                "iexClose": 740.23,
                "iexCloseTime": 1654113599715,
                "iexLastUpdated": 1654114848317,
                "iexMarketPercent": 9.869173652694611,
                "iexOpen": 755.57,
                "iexOpenTime": 1654090200486,
                "iexRealtimePrice": 738.1,
                "iexRealtimeSize": 1,
                "iexVolume": 618057,
                "isUSMarketOpen": false,
                "lastTradeTime": 1654113599716,
                "latestPrice": 740.37,
                "latestSource": "Close",
                "latestTime": "June 1, 2022",
                "latestUpdate": 1654113601016,
                "latestVolume": 24657295,
                "low": null,
                "lowSource": null,
                "lowTime": null,
                "marketCap": 767030668172,
                "oddLotDelayedPrice": 740.43,
                "oddLotDelayedPriceTime": 1654113587235,
                "open": 773.61,
                "openSource": "official",
                "openTime": 1654003802079,
                "peRatio": 100.05,
                "previousClose": 758.26,
                "previousVolume": 33971457,
                "primaryExchange": "NASDAQ",
                "symbol": "62989022d38076b6353967c3",
                "volume": 0,
                "week52High": 1243.49,
                "week52Low": 571.22,
                "ytdChange": -0.3229995270538807,
              },
              "region": "US",
              "symbol": "TSLA",
              "type": "equity",
              "updatedAt": 2001-01-01T00:00:00.000Z,
            },
            "AssetClass": "equity",
            "source": "broker",
          },
        ]
      `);
    });
  });
});
