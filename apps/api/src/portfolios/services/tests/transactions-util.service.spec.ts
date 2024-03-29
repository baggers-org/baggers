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

    service = mod.get<TransactionsUtilService>(
      TransactionsUtilService
    );
  });
  describe('applyTransactions', () => {
    it('should apply basic buy/sell and cash transactions to a given portfolio', () => {
      const resultingPortfolio = service.applyTransactions(
        PortfolioWithTransactions
      );

      expect(resultingPortfolio.holdings).toHaveLength(3);
      expect(
        resultingPortfolio.holdings.map((h) => ({ ...h, _id: null }))
      ).toMatchInlineSnapshot(`
        [
          {
            "_id": null,
            "assetClass": "cash",
            "averagePrice": 1,
            "costBasis": 100,
            "currency": "USD",
            "direction": "long",
            "quantity": 2095,
            "source": "transactions",
          },
          {
            "_id": null,
            "assetClass": "stock",
            "averagePrice": 1,
            "costBasis": 5,
            "currency": "USD",
            "direction": "long",
            "importedSecurity": undefined,
            "plaidAccountId": undefined,
            "quantity": 5,
            "security": "TSLA",
            "source": "broker",
          },
          {
            "_id": null,
            "assetClass": "stock",
            "averagePrice": 91.82,
            "costBasis": 1010,
            "currency": "USD",
            "direction": "long",
            "importedSecurity": undefined,
            "plaidAccountId": undefined,
            "quantity": 11,
            "security": "NET",
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
