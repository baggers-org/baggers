import { Ticker1 } from '@baggers/api-tickers';
import { TestSdk } from '../../../test-sdk';

export const tickersFindByIdTest = () =>
  describe('tickersFindById', () => {
    it('should return a single ticker', async () => {
      // Should allow unauth
      const sdk = TestSdk().build();

      const { tickersFindById } = await sdk.tickersFindById({
        _id: Ticker1._id,
      });

      expect(tickersFindById).toMatchInlineSnapshot(`
        Object {
          "_id": "62988fced38076b635386a91",
          "cik": "0001090872",
          "createdAt": "2001-01-01T00:00:00.000Z",
          "currency": "USD",
          "exchange": "XNYS",
          "exchangeName": "New York Stock Exchange Inc",
          "figi": "BBG000C2V3D6",
          "iexId": "IEX_46574843354B2D52",
          "name": "Agilent Technologies Inc.",
          "quote": Object {
            "avgTotalVolume": 2116779,
            "calculationPrice": "close",
            "change": -4.47,
            "changePercent": -0.03504,
            "close": 123.09,
            "closeSource": "official",
            "closeTime": 1654113785978,
            "companyName": "Agilent Technologies Inc.",
            "currency": "USD",
            "delayedPrice": 123.1,
            "delayedPriceTime": 1654113587763,
            "extendedChange": -1.98,
            "extendedChangePercent": -0.01609,
            "extendedPrice": 121.11,
            "extendedPriceTime": 1654157819307,
            "high": 128.98,
            "highSource": "15 minute delayed price",
            "highTime": 1654113599921,
            "iexAskPrice": 0,
            "iexAskSize": 0,
            "iexBidPrice": 0,
            "iexBidSize": 0,
            "iexClose": 123.07,
            "iexCloseTime": 1654113598069,
            "iexLastUpdated": 1654113598069,
            "iexMarketPercent": 8656,
            "iexOpen": 127.78,
            "iexOpenTime": 1654090201575,
            "iexRealtimePrice": 123.07,
            "iexRealtimeSize": 4,
            "iexVolume": 60592,
            "isUSMarketOpen": false,
            "lastTradeTime": 1654113599921,
            "latestPrice": 123.09,
            "latestSource": "Close",
            "latestTime": "June 1, 2022",
            "latestUpdate": 1654113785978,
            "latestVolume": 1304417,
            "low": 122.405,
            "lowSource": "IEX real time price",
            "lowTime": 1654102274750,
            "marketCap": 36767974613,
            "oddLotDelayedPrice": 123.1,
            "oddLotDelayedPriceTime": 1654113586784,
            "open": 128.91,
            "openSource": "official",
            "openTime": 1654003800794,
            "peRatio": 31.24,
            "previousClose": 127.56,
            "previousVolume": 3403072,
            "primaryExchange": "NEW YORK STOCK EXCHANGE INC.",
            "symbol": "62988fced38076b635386a91",
            "volume": 0,
            "week52High": 178.83,
            "week52Low": 112.64,
            "ytdChange": -0.2618135242329768,
          },
          "region": "US",
          "symbol": "A",
          "symbolType": "cs",
          "updatedAt": "2001-01-01T00:00:00.000Z",
        }
      `);
    });
  });
