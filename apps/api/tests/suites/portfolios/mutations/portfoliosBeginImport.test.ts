import { PortfoliosCreatedQuery } from '@baggers/sdk';
import { Test } from '@nestjs/testing';
import { EnvModule } from '~/env';
import { PlaidClientService } from '~/plaid-client';
import { User1Sdk } from '~test-sdk';

jest.setTimeout(20000);
export const portfoliosBeginImportTests = () =>
  describe('portfoliosBeginImport', () => {
    let publicToken: string;
    let plaidClient: PlaidClientService;
    beforeAll(async () => {
      const mod = await Test.createTestingModule({
        imports: [EnvModule],
        providers: [PlaidClientService],
      }).compile();

      plaidClient = mod.get<PlaidClientService>(PlaidClientService);
    });

    describe('Plaid Default Sandbox Accounts', () => {
      let created: PortfoliosCreatedQuery['portfoliosCreated'];
      beforeAll(async () => {
        // Most of the tickers are obscure or missing here, so we will just import them into the portfolios anyway
        // And display data from the institution only
        publicToken = await plaidClient.sandbox_publicTokenCreate();
        const { portfoliosBeginImport } =
          await User1Sdk().portfoliosBeginImport({
            publicToken,
          });

        const ids = portfoliosBeginImport.importedIds;

        // Default sandbox accounts produces 9 accounts, mostly weird non-investment accounts
        expect(ids).toHaveLength(9);

        // Grab the portfolios
        const { portfoliosCreated } = await User1Sdk().portfoliosCreated();

        created = portfoliosCreated
          .filter((created) => ids.includes(created._id))
          .map((c) => ({ ...c, _id: 'dummy', plaidAccountId: 'dummy' }));

        expect(created).toHaveLength(9);
      });

      describe('Non investment portfolios', () => {
        test('Plaid Money Market portfolio', () => {
          const moneyMarket = created.find(
            (c) => c.name === 'Plaid Money Market'
          );
          expect(moneyMarket.totalValue).toEqual(43200);
          expect(moneyMarket.top5Holdings).toHaveLength(0);
          expect(moneyMarket.description).toMatchInlineSnapshot(
            `"Plaid Platinum Standard 1.85% Interest Money Market"`
          );
          expect(moneyMarket.cash).toEqual(43200);
        });
        test('Plaid Checking', () => {
          const checking = created.find((c) => c.name === 'Plaid Checking');
          expect(checking.totalValue).toEqual(110);
          expect(checking.top5Holdings).toHaveLength(0);
          expect(checking.description).toMatchInlineSnapshot(
            `"Plaid Gold Standard 0% Interest Checking"`
          );
          expect(checking.cash).toEqual(100);
        });
      });

      describe('Investment portfolios', () => {
        test('Plaid IRA', () => {
          const ira = created.find((c) => c.name === 'Plaid IRA');
          expect(ira.totalValue).toEqual(320.76);
          expect(ira.top5Holdings).toHaveLength(3);
          expect(ira.top5Holdings).toMatchInlineSnapshot(`
            Array [
              Object {
                "costBasis": 40,
                "exposure": 65.70332959221848,
                "importedSecurity": Object {
                  "close_price": 42.15,
                  "name": "iShares Inc MSCI Brazil",
                  "ticker_symbol": "EWZ",
                  "type": "etf",
                },
                "marketValue": 210.75,
                "security": null,
                "securityType": "etf",
              },
              Object {
                "costBasis": 0.01,
                "exposure": 34.29355281207133,
                "importedSecurity": Object {
                  "close_price": 0.011,
                  "name": "Nflx Feb 01'18 $355 Call",
                  "ticker_symbol": "NFLX180201C00355000",
                  "type": "derivative",
                },
                "marketValue": 110,
                "security": null,
                "securityType": "derivative",
              },
              Object {
                "costBasis": 1,
                "exposure": 0.003117595710188303,
                "importedSecurity": Object {
                  "close_price": 1,
                  "name": "U S Dollar",
                  "ticker_symbol": null,
                  "type": "cash",
                },
                "marketValue": 0.01,
                "security": null,
                "securityType": "cash",
              },
            ]
          `);
          expect(ira.description).toMatchInlineSnapshot(
            `"This portfolio has been imported from your broker"`
          );
          expect(ira.cash).toEqual(0.01);
        });
        test('Plaid 401k', () => {
          const _401k = created.find((c) => c.name === 'Plaid 401k');

          expect(_401k.description).toMatchInlineSnapshot(
            `"This portfolio has been imported from your broker"`
          );
          // expect(_401k.cash).toBe(12461.24268);
          expect(_401k.totalValue).toBe(25141.38);
          expect(_401k.top5Holdings).toHaveLength(5);
          expect(_401k.top5Holdings).toMatchInlineSnapshot(`
            Array [
              Object {
                "costBasis": 1,
                "exposure": 49.10498150857272,
                "importedSecurity": Object {
                  "close_price": 1,
                  "name": "U S Dollar",
                  "ticker_symbol": null,
                  "type": "cash",
                },
                "marketValue": 12345.67,
                "security": null,
                "securityType": "cash",
              },
              Object {
                "costBasis": 30,
                "exposure": 33.257183973194785,
                "importedSecurity": Object {
                  "close_price": 34.73,
                  "name": "Southside Bancshares Inc.",
                  "ticker_symbol": "SBSI",
                  "type": "equity",
                },
                "marketValue": 8361.315,
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
                "costBasis": 22,
                "exposure": 7.381754700815946,
                "importedSecurity": Object {
                  "close_price": 24.5,
                  "name": "Cambiar International Equity Institutional",
                  "ticker_symbol": "CAMYX",
                  "type": "mutual_fund",
                },
                "marketValue": 1855.875,
                "security": null,
                "securityType": "mutual_fund",
              },
              Object {
                "costBasis": 15,
                "exposure": 5.463846853275357,
                "importedSecurity": Object {
                  "close_price": 13.73,
                  "name": "NH PORTFOLIO 1055 (FIDELITY INDEX)",
                  "ticker_symbol": "NHX105509",
                  "type": "etf",
                },
                "marketValue": 1373.6865,
                "security": null,
                "securityType": "etf",
              },
              Object {
                "costBasis": 23,
                "exposure": 2.5309231235516902,
                "importedSecurity": Object {
                  "close_price": 27,
                  "name": "Matthews Pacific Tiger Fund Insti Class",
                  "ticker_symbol": "MIPTX",
                  "type": "mutual_fund",
                },
                "marketValue": 636.309,
                "security": null,
                "securityType": "mutual_fund",
              },
            ]
          `);
        });
      });
    });
  });
