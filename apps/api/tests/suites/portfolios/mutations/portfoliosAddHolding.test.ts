import { Portfolio1 } from '~/portfolios';
import { A, TSLA } from '~/securities';
import { HoldingDirection, AssetClass } from '@baggers/graphql-types';
import { User1Sdk, User2Sdk } from '~test-sdk';

export const portfoliosAddHoldingTest = () =>
  describe('portfoliosAddHoldingTest', () => {
    let _id: string;
    const getPortfolio = async () => {
      const { portfoliosFindById } = await User1Sdk().portfoliosFindById({
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
          averagePrice: 105.4,
          currency: 'USD',
          assetClass: AssetClass.Stock as any,
        },
      });

      let portfolio = await getPortfolio();

      expect(portfolio.holdings.length).toBe(1);
      expect({ ...portfolio.holdings[0], _id: null }).toMatchInlineSnapshot(`
        Object {
          "_id": null,
          "assetClass": "Stock",
          "averagePrice": 105.4,
          "brokerFees": 0,
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
          "security": Object {
            "_id": "A",
            "assetClass": "Stock",
            "currency": "USD",
            "exchange": "XNAS",
            "figi": "BBG000C2V3D6",
            "name": "Agilent Technologies Inc.",
            "region": "US",
            "tickerDetails": null,
            "tickerSnapshot": Object {
              "day": Object {
                "c": 0,
                "h": 0,
                "l": 0,
                "o": 0,
                "v": 0,
                "vw": 0,
              },
              "lastQuote": null,
              "lastTrade": null,
              "min": Object {
                "av": 12516,
                "c": 54.5,
                "h": 54.5,
                "l": 54.5,
                "o": 54.5,
                "v": 560,
                "vw": 54.5,
              },
              "prevDay": Object {
                "c": 55.98,
                "h": 58.06,
                "l": 55.12,
                "o": 56.38,
                "v": 3414924,
                "vw": 56.0815,
              },
              "ticker": "NET",
              "todaysChange": -1.4799999999999969,
              "todaysChangePerc": -2.643801357627719,
              "updated": 1666959600000000000,
            },
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
          quantity: 4,
          averagePrice: 130.34,
          assetClass: AssetClass.Stock as any,
          currency: 'USD',
        },
      });

      portfolio = await getPortfolio();

      // Should still be 1
      expect(portfolio.holdings.length).toBe(1);
      expect({ ...portfolio.holdings[0], _id: null }).toMatchInlineSnapshot(`
        Object {
          "_id": null,
          "assetClass": "Stock",
          "averagePrice": 125.35,
          "brokerFees": 0,
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
          "security": Object {
            "_id": "A",
            "assetClass": "Stock",
            "currency": "USD",
            "exchange": "XNAS",
            "figi": "BBG000C2V3D6",
            "name": "Agilent Technologies Inc.",
            "region": "US",
            "tickerDetails": null,
            "tickerSnapshot": Object {
              "day": Object {
                "c": 0,
                "h": 0,
                "l": 0,
                "o": 0,
                "v": 0,
                "vw": 0,
              },
              "lastQuote": null,
              "lastTrade": null,
              "min": Object {
                "av": 12516,
                "c": 54.5,
                "h": 54.5,
                "l": 54.5,
                "o": 54.5,
                "v": 560,
                "vw": 54.5,
              },
              "prevDay": Object {
                "c": 55.98,
                "h": 58.06,
                "l": 55.12,
                "o": 56.38,
                "v": 3414924,
                "vw": 56.0815,
              },
              "ticker": "NET",
              "todaysChange": -1.4799999999999969,
              "todaysChangePerc": -2.643801357627719,
              "updated": 1666959600000000000,
            },
          },
          "source": "direct",
        }
      `);

      // Lets add TSLA
      await User1Sdk().portfoliosAddHolding({
        _id,
        input: {
          security: TSLA._id,
          averagePrice: 100,
          quantity: 3,
          direction: HoldingDirection.Long,
          assetClass: AssetClass.Stock as any,
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
        Object {
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
        Object {
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
        Object {
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
            averagePrice: 200,
            direction: HoldingDirection.Short,
            assetClass: AssetClass.Stock as any,
            currency: 'USD',
            quantity: 1,
          },
        });
      } catch (e) {
        expect(e.response.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "extensions": Object {
                "code": "404",
                "response": Object {
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

    it.todo('should support adding a holding purchased with other currencies');
  });
