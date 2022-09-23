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
            "costBasis": 3839,
            "exposure": 74.98237781954887,
            "importedSecurity": null,
            "marketValue": 7403.7,
            "security": Object {
              "_id": "62989022d38076b6353967c3",
              "exchangeName": "Nasdaq All Markets",
              "name": "Tesla Inc",
              "quote": Object {
                "latestPrice": 740.37,
              },
              "region": "US",
              "symbol": "TSLA",
            },
            "securityType": "equity",
          },
          Object {
            "costBasis": null,
            "exposure": 12.55144866476536,
            "importedSecurity": null,
            "marketValue": 1239.32,
            "security": null,
            "securityType": "cash",
          },
          Object {
            "costBasis": 47942,
            "exposure": 12.466173515685767,
            "importedSecurity": null,
            "marketValue": 1230.9,
            "security": Object {
              "_id": "62988fced38076b635386a91",
              "exchangeName": "New York Stock Exchange Inc",
              "name": "Agilent Technologies Inc.",
              "quote": Object {
                "latestPrice": 123.09,
              },
              "region": "US",
              "symbol": "A",
            },
            "securityType": "equity",
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
            "costBasis": 42,
            "exposure": 81.74710039434306,
            "importedSecurity": null,
            "marketValue": 14807.4,
            "security": Object {
              "_id": "62989022d38076b6353967c3",
              "exchangeName": "Nasdaq All Markets",
              "name": "Tesla Inc",
              "quote": Object {
                "latestPrice": 740.37,
              },
              "region": "US",
              "symbol": "TSLA",
            },
            "securityType": "equity",
          },
          Object {
            "costBasis": 49,
            "exposure": 10.835738975039295,
            "importedSecurity": Object {
              "close_price": 34.73,
              "currency": "USD",
              "name": "Southside Bancshares Inc.",
              "ticker_symbol": "SBSI",
              "type": "equity",
            },
            "marketValue": 1962.7500000000002,
            "security": Object {
              "_id": "62a23959e5a9e9b88f85457a",
              "exchangeName": "Nasdaq All Markets",
              "name": "Southside Bancshares Inc",
              "quote": Object {
                "latestPrice": 39.255,
              },
              "region": "US",
              "symbol": "SBSI",
            },
            "securityType": "equity",
          },
          Object {
            "costBasis": null,
            "exposure": 6.841904484292802,
            "importedSecurity": null,
            "marketValue": 1239.32,
            "security": null,
            "securityType": "cash",
          },
          Object {
            "costBasis": 100,
            "exposure": 2.3849391095233603,
            "importedSecurity": Object {
              "close_price": 10.42,
              "currency": "USD",
              "name": "DoubleLine Total Return Bond Fund",
              "ticker_symbol": "DBLTX",
              "type": "mutual_fund",
            },
            "marketValue": 432,
            "security": null,
            "securityType": "equity",
          },
        ]
      `);
    });
  });
