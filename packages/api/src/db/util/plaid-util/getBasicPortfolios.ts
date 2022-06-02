import { plaidClient } from '@/plaid/plaid';
import { CountryCode, InvestmentsHoldingsGetResponse } from 'plaid';
import { BasicPortfolio } from './types';

/**
 * Creates a list of basic portfolios, this only includes account info, name etc.
 * No holdings or transactions
 */
export const getBasicPortfolios = async (
  holdings: InvestmentsHoldingsGetResponse,
): Promise<BasicPortfolio[]> => {
  const accounts = holdings.accounts.filter(
    (account) => account.type === `investment`,
  );

  const { institution_id } = holdings.item;
  const country_codes = [CountryCode.Us];

  let data;
  if (institution_id) {
    ({ data } = await plaidClient.institutionsGetById({
      institution_id,
      country_codes,
    }));
  }

  const { name, logo, url } = data.institution;

  const portfolios: BasicPortfolio[] = accounts.map((account) => ({
    plaid: {
      linkedAccountId: account.account_id,
      isLinked: true,
      institution: {
        name,
        logo,
        url,
      },
    },
    cash: account?.balances.available || 0,
    name: `${name} - ${account.official_name}`,

    private: true,
  }));

  return portfolios;
};
