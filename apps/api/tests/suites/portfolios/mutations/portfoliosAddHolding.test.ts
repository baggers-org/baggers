import { Portfolio1 } from '~/portfolios';
import { A, TSLA } from '~/securities';
import { HoldingDirection, SecurityType } from '@baggers/sdk';
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
          securityType: SecurityType.Equity,
        },
      });

      let portfolio = await getPortfolio();

      expect(portfolio.holdings.length).toBe(1);
      expect(portfolio.holdings[0].quantity).toBe(1);
      expect(portfolio.holdings[0].averagePrice).toBe(105.4);
      expect(portfolio.holdings[0].direction).toBe(HoldingDirection.Long);
      expect(portfolio.holdings[0].exposure).toBe(100);
      expect(portfolio.holdings[0].marketValue).toBe(123.09);
      expect(portfolio.holdings[0].profitLossPercent).toMatchInlineSnapshot(
        `16.78368121442125`
      );
      expect(portfolio.holdings[0].profitLossUsd).toMatchInlineSnapshot(
        `17.689999999999998`
      );
      expect(portfolio.holdings[0].dailyProfitLossUsd).toBe(-4.47);

      // Add the same security / direction / type again to check its merged
      await User1Sdk().portfoliosAddHolding({
        _id,
        input: {
          direction: HoldingDirection.Long,
          security: A._id,
          quantity: 4,
          averagePrice: 130.34,
          securityType: SecurityType.Equity,
          currency: 'USD',
        },
      });

      portfolio = await getPortfolio();

      // Should still be 1
      expect(portfolio.holdings.length).toBe(1);
      expect(portfolio.holdings[0].quantity).toBe(5);
      expect(portfolio.holdings[0].averagePrice).toBe(125.35);
      expect(portfolio.holdings[0].direction).toBe(HoldingDirection.Long);
      expect(portfolio.holdings[0].exposure).toBe(100);
      expect(portfolio.holdings[0].marketValue).toBe(615.45);
      expect(portfolio.holdings[0].profitLossPercent).toMatchInlineSnapshot(
        `-1.8045184759716553`
      );
      expect(portfolio.holdings[0].profitLossUsd).toMatchInlineSnapshot(
        `-11.309999999999945`
      );
      expect(portfolio.holdings[0].dailyProfitLossUsd).toMatchInlineSnapshot(
        `-22.349999999999998`
      );

      // Lets add TSLA
      await User1Sdk().portfoliosAddHolding({
        _id,
        input: {
          security: TSLA._id,
          averagePrice: 100,
          quantity: 3,
          direction: HoldingDirection.Long,
          securityType: SecurityType.Equity,
          currency: 'USD',
        },
      });

      portfolio = await getPortfolio();

      expect(portfolio.holdings.length).toBe(2);
      // Exposure should go down on the first holding now
      expect(portfolio.holdings[0].exposure).toMatchInlineSnapshot(
        `78.30294441154074`
      );
    });

    it('should only allow the portfolio owner to add holdings', async () => {
      try {
        await User2Sdk().portfoliosAddHolding({
          _id: Portfolio1._id,
          input: {
            security: TSLA._id,
            averagePrice: 200,
            direction: HoldingDirection.Short,
            securityType: SecurityType.Equity,
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
                  "message": "Could not find a portfolio to add a holding to",
                  "statusCode": 404,
                },
              },
              "message": "Could not find a portfolio to add a holding to",
            },
          ]
        `);
      }
    });

    it.todo('should support adding a holding purchased with other currencies');
  });
