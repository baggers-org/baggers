import { A } from '@api/securities';
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
          "todaysChange": -1.4799999999999969,
          "todaysChangePercent": -2.643801357627719,
        }
      `);
    });
  });
