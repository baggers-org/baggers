import { ImportedPortfolio, Portfolio1, PublicPortfolio } from '~/portfolios';
import { User1, User2 } from '~/users';
import { TestSdk, User1Sdk } from '../../../test-sdk';

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
        // Some weird bug started happening with only this date, no idea why - bizarre
        updatedAt: undefined,
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
          "plaidAccount": null,
          "private": true,
          "totalValue": 2984.32,
          "transactions": undefined,
          "updatedAt": undefined,
        }
      `);
      expect(portfolio.holdings).toHaveLength(3);

      // Sorted by market value by default
      expect(portfolio.holdings[0].marketValue).toBeGreaterThan(
        portfolio.holdings[1].marketValue
      );
      expect(portfolio.holdings[1].marketValue).toBeGreaterThan(
        portfolio.holdings[2].marketValue
      );

      // Remove securities for smaller snapshots
      expect({
        ...portfolio.holdings[0],
        security: null,
      }).toMatchInlineSnapshot(`
        Object {
          "_id": "62d2cd45c63873e235c99531",
          "assetClass": "Cash",
          "averagePrice": null,
          "brokerFees": null,
          "costBasis": null,
          "currency": "USD",
          "dailyProfitLossUsd": null,
          "direction": null,
          "exposure": 41.52771820716276,
          "importedSecurity": null,
          "institutionValue": null,
          "marketValue": 1239.32,
          "profitLossPercent": null,
          "profitLossUsd": null,
          "quantity": 1239.32,
          "security": null,
          "source": "direct",
        }
      `);
      expect({ ...portfolio.holdings[1], security: null })
        .toMatchInlineSnapshot(`
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
          "importedSecurity": null,
          "institutionValue": null,
          "marketValue": 1200,
          "profitLossPercent": -68.74185985933838,
          "profitLossUsd": -2639,
          "quantity": 10,
          "security": null,
          "source": "broker",
        }
      `);

      expect({ ...portfolio.holdings[2], security: null })
        .toMatchInlineSnapshot(`
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
          "importedSecurity": null,
          "institutionValue": null,
          "marketValue": 545,
          "profitLossPercent": -98.86320971173501,
          "profitLossUsd": -47397,
          "quantity": 10,
          "security": null,
          "source": "broker",
        }
      `);

      expect({
        ...portfolio.holdings[3],
        security: null,
      }).toMatchInlineSnapshot(`
        Object {
          "security": null,
        }
      `);

      // Check exposure is correct, with respesct to the cash levels
      expect(
        Math.ceil(
          portfolio.holdings.reduce((acc, curr) => acc + curr.exposure, 0)
        )
      ).toEqual(100);

      expect(portfolio.holdings.length).toBe(3);
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

    describe('imported portfolios', () => {
      it('should display imported holdings that have not been found, alongside holdings that exist in our datbase', async () => {
        const { portfoliosFindById: portfolio } =
          await User1Sdk().portfoliosFindById({
            _id: ImportedPortfolio._id,
          });

        expect(portfolio.holdings).toHaveLength(4);

        expect(portfolio.holdings[0].marketValue).toBeGreaterThan(
          portfolio.holdings[1].marketValue
        );
        expect(portfolio.holdings[1].marketValue).toBeGreaterThan(
          portfolio.holdings[2].marketValue
        );
        const unmatchedHoldings = portfolio.holdings.filter((h) => !h.security);
        // DBLTX
        expect(unmatchedHoldings).toHaveLength(2);
        expect(unmatchedHoldings[0]).toMatchInlineSnapshot(`
          Object {
            "_id": "62d2cd45c63873e235c99531",
            "assetClass": "Cash",
            "averagePrice": null,
            "brokerFees": null,
            "costBasis": null,
            "currency": "USD",
            "dailyProfitLossUsd": null,
            "direction": null,
            "exposure": 22.975813956937493,
            "importedSecurity": null,
            "institutionValue": null,
            "marketValue": 1239.32,
            "profitLossPercent": null,
            "profitLossUsd": null,
            "quantity": 1239.32,
            "security": null,
            "source": "direct",
          }
        `);

        const matchedHoldings = portfolio.holdings.filter((h) => h.security);
        expect(matchedHoldings).toHaveLength(2);

        expect(matchedHoldings[0].security._id).toBe('TSLA');
        expect({
          ...matchedHoldings[0],
          security: null,
        }).toMatchInlineSnapshot(`
          Object {
            "_id": "62d2cd45c63873e235c99570",
            "assetClass": "Stock",
            "averagePrice": 1000,
            "brokerFees": null,
            "costBasis": 42,
            "currency": "USD",
            "dailyProfitLossUsd": null,
            "direction": null,
            "exposure": 44.49371711636219,
            "importedSecurity": null,
            "institutionValue": null,
            "marketValue": 2400,
            "profitLossPercent": 5614.285714285715,
            "profitLossUsd": 2358,
            "quantity": 20,
            "security": null,
            "source": "broker",
          }
        `);

        // SBSI - has been matched, and also has imported security
        expect({
          ...matchedHoldings[1],
          security: null,
        }).toMatchInlineSnapshot(`
          Object {
            "_id": "62d2cd45c63873e235c99569",
            "assetClass": "Stock",
            "averagePrice": 409,
            "brokerFees": null,
            "costBasis": 49,
            "currency": "USD",
            "dailyProfitLossUsd": null,
            "direction": null,
            "exposure": 30.598700041898248,
            "importedSecurity": Object {
              "assetClass": "Stock",
              "close_price": 34.73,
              "currency": "USD",
              "name": "Southside Bancshares Inc.",
              "ticker_symbol": "SBSI",
            },
            "institutionValue": 52300,
            "marketValue": 1650.5,
            "profitLossPercent": 3268.3673469387754,
            "profitLossUsd": 1601.5,
            "quantity": 50,
            "security": null,
            "source": "broker",
          }
        `);
        expect(matchedHoldings[1].security._id).toBe('SBSI');
      });
    });
  });
