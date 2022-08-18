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
          "totalValue": 9873.92,
          "transactions": undefined,
          "updatedAt": "2022-07-22T00:00:00.000Z",
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
          "_id": "62d2cd45c63873e235c99532",
          "averagePrice": 383.9,
          "brokerFees": 0,
          "costBasis": 3839,
          "currency": "USD",
          "dailyProfitLossUsd": -178.9,
          "direction": "long",
          "exposure": 74.98237781954887,
          "importedSecurity": null,
          "institutionValue": null,
          "marketValue": 7403.7,
          "profitLossPercent": 92.8549101328471,
          "profitLossUsd": 3564.7,
          "quantity": 10,
          "security": null,
          "securityType": "equity",
          "source": "broker",
        }
      `);
      expect({ ...portfolio.holdings[1], security: null })
        .toMatchInlineSnapshot(`
        Object {
          "_id": "62d2cd45c63873e235c99531",
          "averagePrice": null,
          "brokerFees": null,
          "costBasis": null,
          "currency": "USD",
          "dailyProfitLossUsd": null,
          "direction": null,
          "exposure": 12.55144866476536,
          "importedSecurity": null,
          "institutionValue": null,
          "marketValue": 1239.32,
          "profitLossPercent": null,
          "profitLossUsd": null,
          "quantity": 1239.32,
          "security": null,
          "securityType": "cash",
          "source": "direct",
        }
      `);

      expect({ ...portfolio.holdings[2], security: null })
        .toMatchInlineSnapshot(`
        Object {
          "_id": "62d2cd45c63873e235c99533",
          "averagePrice": 4794.2,
          "brokerFees": 0,
          "costBasis": 47942,
          "currency": "USD",
          "dailyProfitLossUsd": -44.699999999999996,
          "direction": "long",
          "exposure": 12.466173515685767,
          "importedSecurity": null,
          "institutionValue": null,
          "marketValue": 1230.9,
          "profitLossPercent": -97.43252263151308,
          "profitLossUsd": -46711.1,
          "quantity": 10,
          "security": null,
          "securityType": "equity",
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
        portfolio.holdings.reduce((acc, curr) => acc + curr.exposure, 0)
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
            "averagePrice": null,
            "brokerFees": null,
            "costBasis": null,
            "currency": "USD",
            "dailyProfitLossUsd": null,
            "direction": null,
            "exposure": 6.841904484292802,
            "importedSecurity": null,
            "institutionValue": null,
            "marketValue": 1239.32,
            "profitLossPercent": null,
            "profitLossUsd": null,
            "quantity": 1239.32,
            "security": null,
            "securityType": "cash",
            "source": "direct",
          }
        `);

        const matchedHoldings = portfolio.holdings.filter((h) => h.security);
        expect(matchedHoldings).toHaveLength(2);

        expect(matchedHoldings[0].security.symbol).toBe('TSLA');
        expect({
          ...matchedHoldings[0],
          security: null,
        }).toMatchInlineSnapshot(`
          Object {
            "_id": "62d2cd45c63873e235c99570",
            "averagePrice": 1000,
            "brokerFees": null,
            "costBasis": 42,
            "currency": "USD",
            "dailyProfitLossUsd": -357.8,
            "direction": null,
            "exposure": 81.74710039434306,
            "importedSecurity": null,
            "institutionValue": null,
            "marketValue": 14807.4,
            "profitLossPercent": 35155.71428571428,
            "profitLossUsd": 14765.4,
            "quantity": 20,
            "security": null,
            "securityType": "equity",
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
            "averagePrice": 409,
            "brokerFees": null,
            "costBasis": 49,
            "currency": "USD",
            "dailyProfitLossUsd": -13.750000000000002,
            "direction": null,
            "exposure": 10.835738975039295,
            "importedSecurity": Object {
              "close_price": 34.73,
              "name": "Southside Bancshares Inc.",
              "ticker_symbol": "SBSI",
              "type": "equity",
            },
            "institutionValue": 52300,
            "marketValue": 1962.7500000000002,
            "profitLossPercent": 3905.6122448979595,
            "profitLossUsd": 1913.7500000000002,
            "quantity": 50,
            "security": null,
            "securityType": "equity",
            "source": "broker",
          }
        `);
        expect(matchedHoldings[1].security.symbol).toBe('SBSI');
      });
    });
  });
