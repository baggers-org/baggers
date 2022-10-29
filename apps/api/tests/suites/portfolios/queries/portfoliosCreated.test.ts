import { ImportedPortfolio } from '~/portfolios';
import { User1 } from '~/users';
import { TestSdk } from '~test-sdk';

export const portfoliosCreatedTests = () =>
  describe('portfoliosCreated', () => {
    it('should return a PortfolioSummary for all the portfolios where you are the owner', async () => {
      const sdk = TestSdk().setAuthHeader(User1._id).build();

      const { portfoliosCreated } = await sdk.portfoliosCreated();

      expect(portfoliosCreated).toHaveLength(3);
      expect(portfoliosCreated[1].top5Holdings).toMatchInlineSnapshot(`
        Array [
          Object {
            "assetClass": "cash",
            "costBasis": null,
            "exposure": 41.52771820716276,
            "importedSecurity": null,
            "marketValue": 1239.32,
            "security": null,
          },
          Object {
            "assetClass": "stock",
            "costBasis": 3839,
            "exposure": 40.210165129744794,
            "importedSecurity": null,
            "marketValue": 1200,
            "security": Object {
              "_id": "TSLA",
              "latestPrice": 120,
              "name": "Tesla Inc",
              "region": "US",
            },
          },
          Object {
            "assetClass": "stock",
            "costBasis": 47942,
            "exposure": 18.262116663092428,
            "importedSecurity": null,
            "marketValue": 545,
            "security": Object {
              "_id": "A",
              "latestPrice": 54.5,
              "name": "Agilent Technologies Inc.",
              "region": "US",
            },
          },
        ]
      `);

      expect(
        new Date(portfoliosCreated[0].updatedAt) >
          new Date(portfoliosCreated[1].updatedAt)
      );

      const importedPortfolio = portfoliosCreated.find(
        (p) => p.name === ImportedPortfolio.name
      );
      expect(importedPortfolio.top5Holdings).toMatchInlineSnapshot(`
        Array [
          Object {
            "assetClass": "stock",
            "costBasis": 42,
            "exposure": 44.49371711636219,
            "importedSecurity": null,
            "marketValue": 2400,
            "security": Object {
              "_id": "TSLA",
              "latestPrice": 120,
              "name": "Tesla Inc",
              "region": "US",
            },
          },
          Object {
            "assetClass": "stock",
            "costBasis": 49,
            "exposure": 30.598700041898248,
            "importedSecurity": Object {
              "assetClass": "stock",
              "currency": "USD",
              "latestPrice": 34.73,
              "name": "Southside Bancshares Inc.",
              "ticker_symbol": "SBSI",
            },
            "marketValue": 1650.5,
            "security": Object {
              "_id": "SBSI",
              "latestPrice": 33.01,
              "name": "Southside Bancshares Inc",
              "region": "US",
            },
          },
          Object {
            "assetClass": "cash",
            "costBasis": null,
            "exposure": 22.975813956937493,
            "importedSecurity": null,
            "marketValue": 1239.32,
            "security": null,
          },
          Object {
            "assetClass": "stock",
            "costBasis": 100,
            "exposure": 8.008869080945194,
            "importedSecurity": Object {
              "assetClass": "stock",
              "currency": "USD",
              "latestPrice": 10.42,
              "name": "DoubleLine Total Return Bond Fund",
              "ticker_symbol": "DBLTX",
            },
            "marketValue": 432,
            "security": null,
          },
        ]
      `);
    });
  });
