import { A } from '~/securities';
import { TestSdk } from '../../../test-sdk';

export const securitiesFindByIdTest = () =>
  describe('securitiesFindById', () => {
    it('should return a single security', async () => {
      // Should allow unauth
      const sdk = TestSdk().build();

      const { securitiesFindById } = await sdk.securitiesFindById({
        _id: A._id,
      });

      expect(securitiesFindById).toMatchInlineSnapshot(`
        Object {
          "_id": "A",
          "assetClass": "stock",
          "currency": "USD",
          "exchange": "XNAS",
          "figi": "BBG000C2V3D6",
          "latestPrice": 54.5,
          "name": "Agilent Technologies Inc.",
          "region": "US",
          "tickerDetails": null,
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
            "lastTrade": Object {
              "c": null,
              "i": null,
              "p": 54.5,
              "s": null,
              "t": null,
              "x": null,
            },
            "min": Object {
              "av": 12516,
              "c": 54.5,
              "h": 54.5,
              "l": 54.5,
              "o": 54.5,
              "v": 560,
              "vw": 54.5,
            },
            "prevDay": Object {
              "c": 55.98,
              "h": 58.06,
              "l": 55.12,
              "o": 56.38,
              "v": 3414924,
              "vw": 56.0815,
            },
            "ticker": "NET",
            "todaysChange": -1.4799999999999969,
            "todaysChangePerc": -2.643801357627719,
            "updated": 1666959600000000000,
          },
        }
      `);
    });
  });
