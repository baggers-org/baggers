import { Test } from '@nestjs/testing';
import { PortfolioWithTransactions } from '~/portfolios/data';
import { SecuritiesUtilServiceMock } from '~/securities';
import { SecuritiesUtilService } from '~/securities/securities-util.service';
import { HoldingsUtilService } from '../holdings-util.service';
import { TransactionsUtilService } from '../transactions-util.service';

describe('TransactionsUtilService', () => {
  let service: TransactionsUtilService;
  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      providers: [
        SecuritiesUtilService,
        TransactionsUtilService,
        HoldingsUtilService,
      ],
    })
      .overrideProvider(SecuritiesUtilService)
      .useClass(SecuritiesUtilServiceMock)
      .compile();

    service = mod.get<TransactionsUtilService>(TransactionsUtilService);
  });
  describe('applyTransactions', () => {
    it('should apply basic buy/sell and cash transactions to a given portfolio', () => {
      const resultingPortfolio = service.applyTransactions(
        PortfolioWithTransactions
      );

      expect(resultingPortfolio.holdings).toHaveLength(3);
      expect(resultingPortfolio.holdings).toMatchInlineSnapshot(`
        Array [
          Object {
            "_id": "61e4b180fd38cb916acdf8b8",
            "currency": "USD",
            "direction": "long",
            "quantity": 2095,
            "securityType": "cash",
            "source": "transactions",
          },
          Object {
            "_id": "61e4b180fd38cb916acdf8b9",
            "averagePrice": 1,
            "brokerFees": undefined,
            "costBasis": 5,
            "currency": "USD",
            "direction": "long",
            "importedSecurity": undefined,
            "plaidAccountId": undefined,
            "quantity": 5,
            "security": "62989022d38076b6353967c3",
            "securityType": "equity",
            "source": "broker",
          },
          Object {
            "_id": "61e4b180fd38cb916acdf8bc",
            "averagePrice": 91.82,
            "brokerFees": undefined,
            "costBasis": 1010,
            "currency": "USD",
            "direction": "long",
            "importedSecurity": undefined,
            "plaidAccountId": undefined,
            "quantity": 11,
            "security": "62a23958e5a9e9b88f853a67",
            "securityType": "equity",
            "source": "broker",
          },
        ]
      `);
    });

    it.todo(
      'should apply advanced sell short/ buy to cover transactions to a given portfolio'
    );
  });
});
