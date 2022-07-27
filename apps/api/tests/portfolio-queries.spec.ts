import { PopulatedPortfolioWithMetrics } from 'src/portfolios/entities/portfolio.entity';
import { Portfolio1, PublicPortfolio } from './data/portfolio.test-data';
import { User2 } from './data/user.test-data';
import { setupTestApp, setUser } from './jest/setup';
import { CreatedPortfoliosQuery } from './queries/created-portfolios.test-query';
import { FullPortfolioQuery } from './queries/full-portfolio.test-query';
import { appRequest } from './util/appRequest';

describe('Portfolio Queries', () => {
  beforeAll(async () => {
    await setupTestApp();
  });
  describe('portfolio', () => {
    it('should return a portfolio complete with holdings and all metrics', async () => {
      const { data } = await appRequest()
        .query(FullPortfolioQuery)
        .variables({
          id: Portfolio1._id,
        })
        .expectNoErrors();

      const portfolio: PopulatedPortfolioWithMetrics = data.portfolio;

      // Remove holdings and transactions for the first snapshot
      expect({
        ...portfolio,
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
          "dailyProfitLossUsd": -41946.479999999996,
          "direction": "long",
          "exposure": 23.9230425481903,
          "marketValue": 1155076.56,
          "profitLossPercent": -98.63880107511797,
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
          "exposure": 0.1533396453946191,
          "marketValue": 7403.7,
          "profitLossPercent": 92.8549101328471,
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
          .toFixed(2),
      ).toEqual('99.97');

      expect(portfolio.holdings.length).toBe(4);
    });

    it('should return a NotFound exception if the requested portfolio is private', async () => {
      const app = await setUser({
        sub: User2._id,
      });

      // Portfolio 1 is private so it should throw an exception
      const { errors } = await appRequest(app)
        .query(FullPortfolioQuery)
        .variables({ id: Portfolio1._id });

      expect(errors).toMatchInlineSnapshot(`
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
    });

    it('should allow any user to view a public portfolio', () => {
      return (
        appRequest()
          .query(FullPortfolioQuery)
          // Belongs to user2, so if it was private, it would not be allowed to view
          .variables({ id: PublicPortfolio._id })
          .expectNoErrors()
      );
    });
  });

  describe('portfoliosCreated', () => {
    it('should return a PortfolioSummary for all the portfolios where you are the owner', async () => {
      const { data } = await appRequest()
        .query(CreatedPortfoliosQuery)
        .expectNoErrors();

      expect(data.portfoliosCreated).toHaveLength(2);
      expect(data.portfoliosCreated[1].top5Holdings).toMatchInlineSnapshot(`
        Array [
          Object {
            "costBasis": 389493,
            "exposure": 75.87245654125755,
            "marketValue": 3663350.7600000002,
          },
          Object {
            "costBasis": 84857293,
            "exposure": 23.9230425481903,
            "marketValue": 1155076.56,
          },
          Object {
            "costBasis": 3839,
            "exposure": 0.1533396453946191,
            "marketValue": 7403.7,
          },
          Object {
            "costBasis": 47942,
            "exposure": 0.02549343835058642,
            "marketValue": 1230.9,
          },
        ]
      `);

      // It should sort them by updatedAt - most recent
      expect(data.portfoliosCreated[0].updatedAt).toMatchInlineSnapshot(
        `"2022-12-12T00:00:00.000Z"`,
      );
      expect(data.portfoliosCreated[1].updatedAt).toMatchInlineSnapshot(
        `"2022-07-22T00:00:00.000Z"`,
      );

      expect(
        new Date(data.portfoliosCreated[0].updatedAt) >
          new Date(data.portfoliosCreated[1].updatedAt),
      );
    });
  });
});
