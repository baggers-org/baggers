import { Test } from '@nestjs/testing';
import { PortfolioWithTransactions } from '../../../../data/portfolio.test-data';
import { HoldingsUtilService } from '../holdings-util.service';
import { TransactionsUtilService } from '../transactions-util.service';

describe('TransactionsService', () => {
  let service: TransactionsUtilService;
  beforeAll(async () => {
    const mod = await Test.createTestingModule({
      providers: [TransactionsUtilService, HoldingsUtilService],
    }).compile();

    service = mod.get<TransactionsUtilService>(TransactionsUtilService);
  });
  describe('applyTransactions', () => {
    it('should apply basic buy/sell and cash transactions to a given portfolio', () => {
      const resultingPortfolio = service.applyTransactions(
        PortfolioWithTransactions
      );

      expect(resultingPortfolio.holdings).toHaveLength(2);
      expect(resultingPortfolio.holdings).toMatchInlineSnapshot(`
        Array [
          Object {
            "averagePrice": 1,
            "costBasis": 5,
            "direction": "long",
            "quantity": 5,
            "security": "62989022d38076b6353967c3",
            "source": "broker",
          },
          Object {
            "averagePrice": 91.82,
            "costBasis": 1010,
            "direction": "long",
            "quantity": 11,
            "security": "62a23958e5a9e9b88f853a67",
            "source": "broker",
          },
        ]
      `);
      expect(resultingPortfolio.cash).toEqual(2095);
    });

    it.todo(
      'should apply advanced sell short/ buy to cover transactions to a given portfolio'
    );
  });
});
