import { mapPlaidDataToPortfolios } from '../plaid-util';
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
          "holdings": Array [],
          "name": "Plaid IRA",
          "plaid": Object {
            "isLinked": true,
            "linkedAccountId": "joK1zG7xdosewdGDod6Pf6WwJRjEopfvgNn4W",
          },
          "private": true,
          "transactions": Array [],
        }
      `);

      expect(result[1].holdings).toMatchInlineSnapshot(`
        Array [
          Object {
            "costBasis": 1.5,
            "holdingType": "shares",
            "quantity": 1,
          },
          Object {
            "costBasis": 30,
            "holdingType": "shares",
            "quantity": 213,
          },
        ]
      `);

      expect(result[1].transactions).toHaveLength(24);
      expect(result[1].transactions[0]).toMatchInlineSnapshot(`
        Object {
          "currency": "USD",
          "date": 2022-03-16T00:00:00.000Z,
          "name": "BUY Achillion Pharmaceuticals Inc.",
          "price": 2.16,
          "quantity": 0.520877874205698,
          "subType": "buy",
          "type": "buy",
        }
      `);
    });
  });
});
