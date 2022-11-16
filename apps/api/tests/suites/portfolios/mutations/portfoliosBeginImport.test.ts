import { PortfoliosCreatedQuery } from '@baggers/graphql-types';
import { Test } from '@nestjs/testing';
import { EnvModule } from '~/env';
import { PlaidClientService } from '~/plaid-client';
import { User1Sdk } from '~test-sdk';

jest.setTimeout(30000);
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
        const { portfoliosCreated } =
          await User1Sdk().portfoliosCreated();

        created = portfoliosCreated
          .filter((created) => ids.includes(created._id))
          .map((c) => ({
            ...c,
            _id: 'dummy',
            plaidAccountId: 'dummy',
          }));

        expect(created).toHaveLength(9);
      });

      describe('Non investment portfolios', () => {
        test('Plaid Money Market portfolio', () => {
          const moneyMarket = created.find(
            (c) => c.name === 'Plaid Money Market'
          );
          if (!moneyMarket)
            throw Error('Could not find find money markey');
          expect(moneyMarket.totalValue).toEqual(43200);
          expect(moneyMarket.top5Holdings).toHaveLength(0);
          expect(moneyMarket.description).toMatchInlineSnapshot(
            `"Plaid Platinum Standard 1.85% Interest Money Market"`
          );
          expect(moneyMarket.cash).toEqual(43200);
        });
        test('Plaid Checking', () => {
          const checking = created.find(
            (c) => c.name === 'Plaid Checking'
          );
          if (!checking) throw Error('Could not find find checking ');
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
          if (!ira) throw Error('Could not find find ira ');
          expect(ira.totalValue).toEqual(320.76);
          expect(ira.top5Holdings).toHaveLength(3);
          expect(ira.top5Holdings).toMatchInlineSnapshot(`
            [
              {
                "assetClass": "stock",
                "costBasis": 200,
                "exposure": 65.70332959221848,
                "importedSecurity": {
                  "assetClass": "stock",
                  "currency": "USD",
                  "latestPrice": 42.15,
                  "name": "iShares Inc MSCI Brazil",
                  "ticker_symbol": "EWZ",
                },
                "marketValue": 210.75,
                "security": null,
              },
              {
                "assetClass": "derivative",
                "costBasis": 100,
                "exposure": 34.29355281207133,
                "importedSecurity": {
                  "assetClass": "derivative",
                  "currency": "USD",
                  "latestPrice": 0.011,
                  "name": "Nflx Feb 01'18 $355 Call",
                  "ticker_symbol": "NFLX180201C00355000",
                },
                "marketValue": 110,
                "security": null,
              },
              {
                "assetClass": "cash",
                "costBasis": 0.01,
                "exposure": 0.003117595710188303,
                "importedSecurity": {
                  "assetClass": "cash",
                  "currency": "USD",
                  "latestPrice": 1,
                  "name": "U S Dollar",
                  "ticker_symbol": null,
                },
                "marketValue": 0.01,
                "security": null,
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

          if (!_401k) throw Error('Could not find find 401k ');
          expect(_401k.description).toMatchInlineSnapshot(
            `"This portfolio has been imported from your broker"`
          );
          // expect(_401k.cash).toBe(12461.24268);
          expect(_401k.top5Holdings).toHaveLength(5);
          expect(_401k.top5Holdings).toMatchInlineSnapshot(`
            [
              {
                "assetClass": "cash",
                "costBasis": 12345.67,
                "exposure": 52.101063403278744,
                "importedSecurity": {
                  "assetClass": "cash",
                  "currency": "USD",
                  "latestPrice": 1,
                  "name": "U S Dollar",
                  "ticker_symbol": null,
                },
                "marketValue": 12345.67,
                "security": null,
              },
              {
                "assetClass": "stock",
                "costBasis": 6390,
                "exposure": 29.672699005132593,
                "importedSecurity": {
                  "assetClass": "stock",
                  "currency": "USD",
                  "latestPrice": 34.73,
                  "name": "Southside Bancshares Inc.",
                  "ticker_symbol": "SBSI",
                },
                "marketValue": 7031.129999999999,
                "security": {
                  "_id": "SBSI",
                  "latestPrice": 33.01,
                  "name": "Southside Bancshares Inc",
                  "region": "US",
                },
              },
              {
                "assetClass": "stock",
                "costBasis": 1666.5,
                "exposure": 7.832143661993229,
                "importedSecurity": {
                  "assetClass": "stock",
                  "currency": "USD",
                  "latestPrice": 24.5,
                  "name": "Cambiar International Equity Institutional",
                  "ticker_symbol": "CAMYX",
                },
                "marketValue": 1855.875,
                "security": null,
              },
              {
                "assetClass": "stock",
                "costBasis": 1500.75,
                "exposure": 5.79721695401935,
                "importedSecurity": {
                  "assetClass": "stock",
                  "currency": "USD",
                  "latestPrice": 13.73,
                  "name": "NH PORTFOLIO 1055 (FIDELITY INDEX)",
                  "ticker_symbol": "NHX105509",
                },
                "marketValue": 1373.6865,
                "security": null,
              },
              {
                "assetClass": "stock",
                "costBasis": 542.041,
                "exposure": 2.6853443801006263,
                "importedSecurity": {
                  "assetClass": "stock",
                  "currency": "USD",
                  "latestPrice": 27,
                  "name": "Matthews Pacific Tiger Fund Insti Class",
                  "ticker_symbol": "MIPTX",
                },
                "marketValue": 636.309,
                "security": null,
              },
            ]
          `);
          expect(_401k.totalValue).toBe(23695.62);
        });
      });
    });
  });
