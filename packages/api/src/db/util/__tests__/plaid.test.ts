import { mapPlaidDataToPortfolios } from '../plaid';
import { mockHoldings, mockTransactions } from './plaid.mocks';

describe(`Plaid Util Functions`, () => {
  describe(`mapPlaidDataToPortfolios`, () => {
    it(`should return an array of portfolios in the correct format`, () => {
      const result = mapPlaidDataToPortfolios(
        mockHoldings as any,
        mockTransactions as any,
      );
      expect(result.length).toBe(2);

      expect(result[0]).toMatchInlineSnapshot(`
        Object {
          "cash": 0,
          "name": "Plaid IRA",
          "plaid": Object {
            "isLinked": true,
            "linkedAccountId": "JqMLm4rJwpF6gMPJwBqdh9ZjjPvvpDcb7kDK1",
          },
          "private": true,
        }
      `);

      expect(result[1]).toMatchInlineSnapshot(`
        Object {
          "cash": 0,
          "name": "Plaid 401k",
          "plaid": Object {
            "isLinked": true,
            "linkedAccountId": "k67E4xKvMlhmleEa4pg9hlwGGNnnEeixPolGm",
          },
          "private": true,
        }
      `);
    });
  });
});
