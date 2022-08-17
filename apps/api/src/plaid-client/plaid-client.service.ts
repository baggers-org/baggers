import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import {
  Configuration,
  CountryCode,
  Institution,
  PlaidApi,
  PlaidEnvironments,
  Products,
  SandboxPublicTokenCreateRequestOptions,
} from 'plaid';
import { Auth0AccessTokenPayload } from '~/auth';
import { EnvService } from '~/env';

@Injectable()
export class PlaidClientService {
  client: PlaidApi;

  constructor(private envService: EnvService) {
    const env = envService.get('PLAID_ENV');
    const clientId = envService.get('PLAID_CLIENT_ID');

    const clientSecret = envService.get('PLAID_CLIENT_SECRET');
    const config = new Configuration({
      basePath: PlaidEnvironments[env],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': clientId,
          'PLAID-SECRET': clientSecret,
        },
      },
    });

    this.client = new PlaidApi(config);
  }

  private logError(e: any) {
    console.error(e.response?.data || e.response || e);
  }

  async createLinkToken(currentUser: Auth0AccessTokenPayload) {
    const response = await this.client.linkTokenCreate({
      user: {
        client_user_id: currentUser.sub,
      },
      client_name: `Baggers`,
      products: [Products.Investments],
      language: `en`,
      webhook: `${this.envService.get('API_URI')}/webhooks/plaid`,
      country_codes: [CountryCode.Us, CountryCode.Gb],
    });

    return response.data.link_token;
  }

  async getItem(accessToken: string) {
    try {
      const { data } = await this.client.itemGet({
        access_token: accessToken,
      });

      return data.item;
    } catch (e) {
      this.logError(e);
    }
  }

  async institutionSearch(query: string): Promise<Institution[]> {
    try {
      const { data } = await this.client.institutionsSearch({
        query,
        products: [Products.Investments],
        country_codes: [CountryCode.Us],
      });

      return data.institutions;
    } catch (e) {
      this.logError(e);
    }
  }

  async sandbox_publicTokenCreate(
    options?: SandboxPublicTokenCreateRequestOptions
  ): Promise<string> {
    try {
      const { data } = await this.client.sandboxPublicTokenCreate({
        initial_products: [Products.Investments],
        institution_id: 'ins_115616',
        options,
      });

      return data.public_token;
    } catch (e) {
      this.logError(e);
    }
  }

  async publicTokenExchange(publicToken: string) {
    try {
      const { data } = await this.client.itemPublicTokenExchange({
        public_token: publicToken,
      });
      return data;
    } catch (e) {
      this.logError(e);
    }
  }

  async getHoldings(accessToken: string) {
    try {
      const { data } = await this.client.investmentsHoldingsGet({
        access_token: accessToken,
      });
      return data;
    } catch (e) {
      this.logError(e);
    }
  }
  async getTransactions(from: Date, accessToken: string) {
    try {
      const { data } = await this.client.investmentsTransactionsGet({
        access_token: accessToken,
        start_date: format(from, 'yyyy-MM-dd'),
        end_date: format(new Date(), 'yyyy-MM-dd'),
      });
      return data;
    } catch (e) {
      this.logError(e);
    }
  }
}
