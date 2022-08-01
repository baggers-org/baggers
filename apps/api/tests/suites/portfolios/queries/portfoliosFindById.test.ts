import { Portfolio1, PublicPortfolio } from '@baggers/api-portfolios';
import { User1, User2 } from '@baggers/api-users';
import { TestSdk } from '../../../test-sdk';

export const portfoliosFindByIdTests = () =>
  describe('portfoliosFindById', () => {
    it('should return a portfolio complete with holdings and all metrics', async () => {
      const sdk = TestSdk().setAuthHeader(User1._id).build();

      const { portfoliosFindById } = await sdk.portfoliosFindById({
        _id: Portfolio1._id,
      });

      const portfolio = portfoliosFindById;

      // Remove holdings and transactions for the first snapshot
      expect({
        ...portfoliosFindById,
        holdings: undefined,
        transactions: undefined,
      }).toMatchInlineSnapshot(`
        Object {
          "_id": "62d2cd45c63873e235c99532",
          "cash": 1239.32,
          "createdAt": "2001-01-01T00:00:00.000Z",
          "description": "",
          "holdings": undefined,
          "name": "Wells Fargo - Plaid isa",
          "owner": Object {
            "_id": "google-oauth1-233838",
            "createdAt": "2001-01-01T00:00:00.000Z",
            "displayName": "Warren Buffet",
            "emails": Array [
              "wbuffet666@berkshire.com",
            ],
            "photos": Array [
              "https://link.come/warrens_face.png",
            ],
            "updatedAt": "2001-01-01T00:00:00.000Z",
          },
          "private": true,
          "totalValue": 4828301.240000001,
          "transactions": undefined,
          "updatedAt": "2022-07-22T00:00:00.000Z",
        }
      `);

      // Remove tickers for smaller snapshots
      expect({ ...portfolio.holdings[1], ticker: null }).toMatchInlineSnapshot(`
        Object {
          "averagePrice": 9042.763533674339,
          "brokerFees": 0,
          "costBasis": 84857293,
          "currency": "USD",
          "dailyProfitLossUsd": -41946.48,
          "direction": "long",
          "exposure": 23.92,
          "marketValue": 1155076.56,
          "profitLossPercent": -98.64,
          "profitLossUsd": -83702216.44,
          "quantity": 9384,
          "source": "broker",
          "ticker": null,
          "type": "shares",
        }
      `);

      expect({ ...portfolio.holdings[2], ticker: null }).toMatchInlineSnapshot(`
        Object {
          "averagePrice": 383.9,
          "brokerFees": 0,
          "costBasis": 3839,
          "currency": "USD",
          "dailyProfitLossUsd": -178.9,
          "direction": "long",
          "exposure": 0.15,
          "marketValue": 7403.7,
          "profitLossPercent": 92.85,
          "profitLossUsd": 3564.7,
          "quantity": 10,
          "source": "broker",
          "ticker": null,
          "type": "shares",
        }
      `);

      // Check exposure is correct, with respesct to the cash levels
      expect(
        portfolio.holdings
          .reduce((acc, curr) => acc + curr.exposure, 0)
          .toFixed(2)
      ).toEqual('99.97');

      expect(portfolio.holdings.length).toBe(4);
    });

    it('should return a NotFound exception if the requested portfolio is private', async () => {
      const sdk = TestSdk().setAuthHeader(User2._id).build();

      try {
        await sdk.portfoliosFindById({
          _id: Portfolio1._id,
        });
      } catch (e) {
        expect(e.response.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "extensions": Object {
                "code": "404",
                "response": Object {
                  "error": "Not Found",
                  "message": "Could not find a portfolio with this id",
                  "statusCode": 404,
                },
              },
              "message": "Could not find a portfolio with this id",
            },
          ]
        `);
      }
      expect.assertions(1);
    });

    it('should allow any user to view a public portfolio', async () => {
      const sdk = TestSdk().setAuthHeader(User1._id).build();

      const { portfoliosFindById } = await sdk.portfoliosFindById({
        _id: PublicPortfolio._id,
      });
      expect(portfoliosFindById.owner).toMatchInlineSnapshot(`
        Object {
          "_id": "fb-something123",
          "createdAt": "2001-01-01T00:00:00.000Z",
          "displayName": "Daniel Cooke",
          "emails": null,
          "photos": Array [
            "https://link.come/dans_face.png",
          ],
          "updatedAt": "2001-01-01T00:00:00.000Z",
        }
      `);
    });
  });
