import { PortfoliosCreatedQuery } from '@baggers/graphql-types';
import { Test } from '@nestjs/testing';
import { PlaidClientService } from '~/plaid-client';
import { User1Sdk } from '~test-sdk';

jest.setTimeout(30000);
// TODO: mock up plaid responses here
export const portfoliosBeginImportTests = () =>
  describe.skip('portfoliosBeginImport', () => {
    let publicToken: string;
    let plaidClient: PlaidClientService;
    beforeAll(async () => {
      const mod = await Test.createTestingModule({
        imports: [],
        providers: [PlaidClientService],
      }).compile();

      plaidClient = mod.get<PlaidClientService>(PlaidClientService);
    });

    describe.skip('Plaid Default Sandbox Accounts', () => {
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

      describe.skip('Non investment portfolios', () => {
        test('Plaid Money Market portfolio', () => {
          const moneyMarket = created.find(
            (c) => c.name === 'Plaid Money Market'
          );
          if (!moneyMarket)
            throw Error('Could not find find money markey');
          expect(moneyMarket.totalValue).toEqual(43200);
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
          expect(checking.description).toMatchInlineSnapshot(
            `"Plaid Gold Standard 0% Interest Checking"`
          );
          expect(checking.cash).toEqual(100);
        });
      });

      describe.skip('Investment portfolios', () => {
        test('Plaid IRA', () => {
          const ira = created.find((c) => c.name === 'Plaid IRA');
          if (!ira) throw Error('Could not find find ira ');
          expect(ira.totalValue).toEqual(320.76);
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
          expect(_401k.totalValue).toBe(23695.62);
        });
      });
    });
  });
