import { PortfolioModel } from '@/db/entities';
import { PlaidImportPortfoliosInput } from '@/db/inputs/plaid-inputs';
import {
  PlaidCreateLinkTokenResponse,
  PlaidImportPortfolioPayload,
} from '@/db/payloads/plaid-payloads';
import { mapPlaidDataToPortfolios } from '@/db/util/plaid-util';
import { CurrentUser } from '@/decorators/CurrentUser';
import { plaidClient } from '@/plaid/plaid';
import { AccessClaim } from '@/types/AccessClaim';
import { format } from 'date-fns';
import { writeFileSync } from 'fs';
import { Products, CountryCode } from 'plaid';
import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class PlaidMutations {
  @Authorized()
  @Mutation(() => PlaidCreateLinkTokenResponse)
  async plaidCreateLinkToken(
    @CurrentUser() user: AccessClaim,
  ): Promise<PlaidCreateLinkTokenResponse> {
    const plaidRequest = {
      user: {
        client_user_id: user.sub,
      },
      client_name: `Baggers`,
      products: [Products.Investments],
      language: `en`,
      country_codes: [CountryCode.Us],
    };

    const { data } = await plaidClient.linkTokenCreate(plaidRequest);

    return data;
  }

  @Authorized()
  @Mutation(() => PlaidImportPortfolioPayload, {
    description: `Uses the public_token from the link process to import portfolios`,
  })
  async plaidImportPortfolios(
    @Arg(`input`) input: PlaidImportPortfoliosInput,
    @CurrentUser() user: AccessClaim,
  ): Promise<PlaidImportPortfolioPayload> {
    const { data } = await plaidClient.itemPublicTokenExchange({
      public_token: input.public_token,
    });
    const { access_token } = data;

    const { data: holdings } = await plaidClient.investmentsHoldingsGet({
      access_token,
    });
    const { data: transactions } = await plaidClient.investmentsTransactionsGet(
      {
        access_token,
        start_date: `1990-01-01`,
        end_date: format(new Date(), `yyyy-MM-dd`),
      },
    );

    const portfolios = (await mapPlaidDataToPortfolios(holdings, transactions))
      .filter((p) => p.holdings.length && p.transactions.length)
      .map((p) => ({ ...p, owner: user.sub }));

    console.log(portfolios);

    await PortfolioModel.insertMany(portfolios);

    return {
      ok: true,
    };
  }
}
