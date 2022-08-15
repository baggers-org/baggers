import { User1 } from '~/users';
import { TestSdk } from '~test-sdk';

export const portfoliosCreatedTests = () =>
  describe('portfoliosCreated', () => {
    it('should return a PortfolioSummary for all the portfolios where you are the owner', async () => {
      const sdk = TestSdk().setAuthHeader(User1._id).build();

      const { portfoliosCreated } = await sdk.portfoliosCreated();

      expect(portfoliosCreated).toHaveLength(2);
      expect(portfoliosCreated[1].top5Holdings).toMatchInlineSnapshot(`
        Array [
          Object {
            "costBasis": 389493,
            "exposure": 75.87,
            "marketValue": 3663350.76,
            "security": Object {
              "symbol": "TSLA",
            },
          },
          Object {
            "costBasis": 84857293,
            "exposure": 23.92,
            "marketValue": 1155076.56,
            "security": Object {
              "symbol": "A",
            },
          },
          Object {
            "costBasis": 3839,
            "exposure": 0.15,
            "marketValue": 7403.7,
            "security": Object {
              "symbol": "TSLA",
            },
          },
          Object {
            "costBasis": 47942,
            "exposure": 0.03,
            "marketValue": 1230.9,
            "security": Object {
              "symbol": "A",
            },
          },
        ]
      `);

      // It should sort them by updatedAt - most recent
      expect(portfoliosCreated[0].updatedAt).toMatchInlineSnapshot(
        `"2022-12-12T00:00:00.000Z"`
      );
      expect(portfoliosCreated[1].updatedAt).toMatchInlineSnapshot(
        `"2022-07-22T00:00:00.000Z"`
      );

      expect(
        new Date(portfoliosCreated[0].updatedAt) >
          new Date(portfoliosCreated[1].updatedAt)
      );
    });
  });
