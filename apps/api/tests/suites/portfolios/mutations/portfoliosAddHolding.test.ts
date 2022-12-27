import { Portfolio1 } from '~/portfolios';
import { A, TSLA } from '~/securities';
import { HoldingDirection, AssetClass } from '@baggers/graphql-types';
import { User1Sdk, User2Sdk } from '~test-sdk';

export const portfoliosAddHoldingTest = () =>
  describe('portfoliosAddHoldingTest', () => {
    let _id: string;
    const getPortfolio = async () => {
      const { portfoliosFindById } =
        await User1Sdk().portfoliosFindById({
          _id,
        });
      return portfoliosFindById;
    };
    beforeEach(async () => {
      ({
        portfoliosInitEmpty: { _id },
      } = await User1Sdk().portfoliosInitEmpty());
    });
    it('should allow a user to add new holdings to their portfolio', async () => {
      await User1Sdk().portfoliosAddHolding({
        _id,
        input: {
          direction: HoldingDirection.Long,
          security: A._id,
          quantity: 1,
          costBasis: 105.4,
          currency: 'USD',
        },
      });

      let portfolio = await getPortfolio();

      expect(portfolio.holdings.length).toBe(1);
      expect({ ...portfolio.holdings[0], _id: null })
        .toMatchInlineSnapshot(`
        {
          "_id": null,
          "assetClass": "stock",
          "averagePrice": 105.4,
          "costBasis": 105.4,
          "currency": "USD",
          "dailyProfitLossUsd": -1.4799999999999969,
          "direction": "long",
          "exposure": 100,
          "importedSecurity": null,
          "institutionValue": null,
          "marketValue": 54.5,
          "profitLossPercent": -48.292220113852,
          "profitLossUsd": -50.900000000000006,
          "quantity": 1,
          "security": {
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
          },
          "source": "direct",
        }
      `);

      // Add the same security / direction / type again to check its merged
      await User1Sdk().portfoliosAddHolding({
        _id,
        input: {
          direction: HoldingDirection.Long,
          security: A._id,
          costBasis: 521.36,
          quantity: 4,
          currency: 'USD',
        },
      });

      portfolio = await getPortfolio();

      // Should still be 1
      expect(portfolio.holdings.length).toBe(1);
      expect({ ...portfolio.holdings[0], _id: null })
        .toMatchInlineSnapshot(`
        {
          "_id": null,
          "assetClass": "stock",
          "averagePrice": 125.35,
          "costBasis": 626.76,
          "currency": "USD",
          "dailyProfitLossUsd": -7.399999999999984,
          "direction": "long",
          "exposure": 100,
          "importedSecurity": null,
          "institutionValue": null,
          "marketValue": 272.5,
          "profitLossPercent": -56.522432829153104,
          "profitLossUsd": -354.26,
          "quantity": 5,
          "security": {
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
          },
          "source": "direct",
        }
      `);

      // Lets add TSLA
      await User1Sdk().portfoliosAddHolding({
        _id,
        input: {
          security: TSLA._id,
          costBasis: 300,
          quantity: 3,
          direction: HoldingDirection.Long,
          currency: 'USD',
        },
      });

      portfolio = await getPortfolio();

      expect(portfolio.holdings.length).toBe(2);
      // Exposure should go down on the first holding now
      expect(portfolio.holdings[0].exposure).toMatchInlineSnapshot(
        `56.916996047430835`
      );

      // We should have added the 2 relevant transactions

      expect(portfolio.transactions).toHaveLength(3);

      expect({
        ...portfolio.transactions[0],
        security: null,
        _id: null,
      }).toMatchInlineSnapshot(`
        {
          "_id": null,
          "amount": 105.4,
          "currency": "USD",
          "date": "2022-01-17T00:00:00.000Z",
          "fees": 0,
          "importedSecurity": null,
          "name": "BUY Agilent Technologies Inc.",
          "price": 105.4,
          "quantity": 1,
          "security": null,
          "subType": "Buy",
          "type": "Buy",
        }
      `);
      expect({
        ...portfolio.transactions[1],
        security: null,
        _id: null,
      }).toMatchInlineSnapshot(`
        {
          "_id": null,
          "amount": 521.36,
          "currency": "USD",
          "date": "2022-01-17T00:00:00.000Z",
          "fees": 0,
          "importedSecurity": null,
          "name": "BUY Agilent Technologies Inc.",
          "price": 130.34,
          "quantity": 4,
          "security": null,
          "subType": "Buy",
          "type": "Buy",
        }
      `);
      expect({
        ...portfolio.transactions[2],
        security: null,
        _id: null,
      }).toMatchInlineSnapshot(`
        {
          "_id": null,
          "amount": 300,
          "currency": "USD",
          "date": "2022-01-17T00:00:00.000Z",
          "fees": 0,
          "importedSecurity": null,
          "name": "BUY Tesla Inc",
          "price": 100,
          "quantity": 3,
          "security": null,
          "subType": "Buy",
          "type": "Buy",
        }
      `);
    });

    it('should only allow the portfolio owner to add holdings', async () => {
      try {
        await User2Sdk().portfoliosAddHolding({
          _id: Portfolio1._id,
          input: {
            security: TSLA._id,
            costBasis: 200,
            direction: HoldingDirection.Short,
            currency: 'USD',
            quantity: 1,
          },
        });
      } catch (e) {
        expect(e.response.errors).toMatchInlineSnapshot(`
          [
            {
              "extensions": {
                "code": "404",
                "response": {
                  "error": "Not Found",
                  "message": "Could not find a portfolio to add a transaction to",
                  "statusCode": 404,
                },
              },
              "message": "Could not find a portfolio to add a transaction to",
            },
          ]
        `);
      }
    });

    it.todo(
      'should support adding a holding purchased with other currencies'
    );
  });
