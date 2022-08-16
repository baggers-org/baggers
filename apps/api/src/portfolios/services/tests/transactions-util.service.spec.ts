import { Test } from '@nestjs/testing';
import { PlaidExampleResponse } from '~/plaid-client';
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

  describe('fromPlaidResponse', () => {
    it('should return the correct list of transactions given a basic example response', async () => {
      const transactions = await service.fromPlaidResponse(
        PlaidExampleResponse
      );

      // Should not return anything for this as we only deal with investment accounts
      const checkingAccountTransactions = transactions.get(
        PlaidExampleResponse.accounts[0]
      );
      expect(checkingAccountTransactions).toBeUndefined();

      const investmentAccount1Transactions = transactions.get(
        PlaidExampleResponse.accounts[1]
      );

      expect(investmentAccount1Transactions).toMatchInlineSnapshot(`
        Array [
          Object {
            "amount": 100,
            "baggersSecurity": Security {},
            "currency": "USD",
            "date": 2020-05-28T00:00:00.000Z,
            "importedSecurity": Object {
              "close_price": 10.42,
              "close_price_as_of": null,
              "cusip": "258620103",
              "institution_id": null,
              "institution_security_id": null,
              "is_cash_equivalent": false,
              "isin": "US2586201038",
              "iso_currency_code": "USD",
              "name": "DoubleLine Total Return Bond Fund",
              "proxy_security_id": null,
              "security_id": "NDVQrXQoqzt5v3bAe8qRt4A7mK7wvZCLEBBJk",
              "sedol": null,
              "ticker_symbol": "DBLTX",
              "type": "mutual fund",
              "unofficial_currency_code": null,
              "update_datetime": null,
            },
            "name": "BUY DoubleLine Total Return Bond Fund",
            "plaidAccountId": "KqZZMoZmBWHJlz7yKaZjHZb78VNpaxfVa7e5z",
            "plaidTransactionId": "LKoo1ko93wtreBwM7yQnuQ3P5DNKbKSPRzBNv",
            "price": 10.42,
            "quantity": 1.5,
            "subType": "buy",
            "type": "buy",
          },
        ]
      `);

      expect(transactions.get(PlaidExampleResponse.accounts[2]))
        .toMatchInlineSnapshot(`
        Array [
          Object {
            "amount": -8.72,
            "baggersSecurity": Security {},
            "currency": "USD",
            "date": 2020-05-29T00:00:00.000Z,
            "importedSecurity": Object {
              "close_price": 34.73,
              "close_price_as_of": null,
              "cusip": "84470P109",
              "institution_id": null,
              "institution_security_id": null,
              "is_cash_equivalent": false,
              "isin": "US84470P1093",
              "iso_currency_code": "USD",
              "name": "Southside Bancshares Inc.",
              "proxy_security_id": null,
              "security_id": "eW4jmnjd6AtjxXVrjmj6SX1dNEdZp3Cy8RnRQ",
              "sedol": null,
              "ticker_symbol": "SBSI",
              "type": "equity",
              "unofficial_currency_code": null,
              "update_datetime": null,
            },
            "name": "INCOME DIV DIVIDEND RECEIVED",
            "plaidAccountId": "rz99ex9ZQotvnjXdgQLEsR81e3ArPgulVWjGj",
            "plaidTransactionId": "oq99Pz97joHQem4BNjXECev1E4B6L6sRzwANW",
            "price": 0,
            "quantity": 0,
            "subType": "dividend",
            "type": "cash",
          },
          Object {
            "amount": -1289.01,
            "baggersSecurity": Security {},
            "currency": "USD",
            "date": 2020-05-28T00:00:00.000Z,
            "importedSecurity": Object {
              "close_price": 27,
              "close_price_as_of": null,
              "cusip": "577130834",
              "institution_id": null,
              "institution_security_id": null,
              "is_cash_equivalent": false,
              "isin": "US5771308344",
              "iso_currency_code": "USD",
              "name": "Matthews Pacific Tiger Fund Insti Class",
              "proxy_security_id": null,
              "security_id": "JDdP7XPMklt5vwPmDN45t3KAoWAPmjtpaW7DP",
              "sedol": null,
              "ticker_symbol": "MIPTX",
              "type": "mutual fund",
              "unofficial_currency_code": null,
              "update_datetime": null,
            },
            "name": "SELL Matthews Pacific Tiger Fund Insti Class",
            "plaidAccountId": "rz99ex9ZQotvnjXdgQLEsR81e3ArPgulVWjGj",
            "plaidTransactionId": "pK99jB9e7mtwjA435GpVuMvmWQKVbVFLWme57",
            "price": 27.53,
            "quantity": -47.74104242992852,
            "subType": "sell",
            "type": "sell",
          },
          Object {
            "amount": 7.7,
            "baggersSecurity": Security {},
            "currency": "USD",
            "date": 2020-05-27T00:00:00.000Z,
            "importedSecurity": Object {
              "close_price": 10.42,
              "close_price_as_of": null,
              "cusip": "258620103",
              "institution_id": null,
              "institution_security_id": null,
              "is_cash_equivalent": false,
              "isin": "US2586201038",
              "iso_currency_code": "USD",
              "name": "DoubleLine Total Return Bond Fund",
              "proxy_security_id": null,
              "security_id": "NDVQrXQoqzt5v3bAe8qRt4A7mK7wvZCLEBBJk",
              "sedol": null,
              "ticker_symbol": "DBLTX",
              "type": "mutual fund",
              "unofficial_currency_code": null,
              "update_datetime": null,
            },
            "name": "BUY DoubleLine Total Return Bond Fund",
            "plaidAccountId": "rz99ex9ZQotvnjXdgQLEsR81e3ArPgulVWjGj",
            "plaidTransactionId": "LKoo1ko93wtreBwM7yQnuQ3P5DNKbKSPRzBNv",
            "price": 10.42,
            "quantity": 0.7388014749727547,
            "subType": "buy",
            "type": "buy",
          },
          Object {
            "amount": 51.2,
            "baggersSecurity": Security {},
            "currency": "USD",
            "date": 2020-05-28T00:00:00.000Z,
            "importedSecurity": Object {
              "close_price": 10.42,
              "close_price_as_of": null,
              "cusip": "258620103",
              "institution_id": null,
              "institution_security_id": null,
              "is_cash_equivalent": false,
              "isin": "US2586201038",
              "iso_currency_code": "USD",
              "name": "DoubleLine Total Return Bond Fund",
              "proxy_security_id": null,
              "security_id": "NDVQrXQoqzt5v3bAe8qRt4A7mK7wvZCLEBBJk",
              "sedol": null,
              "ticker_symbol": "DBLTX",
              "type": "mutual fund",
              "unofficial_currency_code": null,
              "update_datetime": null,
            },
            "name": "BUY DoubleLine Total Return Bond Fund",
            "plaidAccountId": "rz99ex9ZQotvnjXdgQLEsR81e3ArPgulVWjGj",
            "plaidTransactionId": "LKoo1ko93wtreBwM7yQnuQ3P5DNKbKSPRzBNv",
            "price": 10.42,
            "quantity": 1.5,
            "subType": "buy",
            "type": "buy",
          },
          Object {
            "amount": 100,
            "baggersSecurity": Security {},
            "currency": "USD",
            "date": 2020-05-28T00:00:00.000Z,
            "importedSecurity": Object {
              "close_price": 10.42,
              "close_price_as_of": null,
              "cusip": "258620103",
              "institution_id": null,
              "institution_security_id": null,
              "is_cash_equivalent": false,
              "isin": "US2586201038",
              "iso_currency_code": "USD",
              "name": "DoubleLine Total Return Bond Fund",
              "proxy_security_id": null,
              "security_id": "NDVQrXQoqzt5v3bAe8qRt4A7mK7wvZCLEBBJk",
              "sedol": null,
              "ticker_symbol": "DBLTX",
              "type": "mutual fund",
              "unofficial_currency_code": null,
              "update_datetime": null,
            },
            "name": "BUY DoubleLine Total Return Bond Fund",
            "plaidAccountId": "rz99ex9ZQotvnjXdgQLEsR81e3ArPgulVWjGj",
            "plaidTransactionId": "LKoo1ko93wtreBwM7yQnuQ3P5DNKbKSPRzBNv",
            "price": 10.42,
            "quantity": 1.5,
            "subType": "buy",
            "type": "buy",
          },
        ]
      `);
    });
  });
});
