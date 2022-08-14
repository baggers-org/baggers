import { EnvService } from '@baggers/api-env';
import { Auth0AccessTokenPayload } from '@baggers/api-auth';
import { Injectable } from '@nestjs/common';
import {
  Configuration,
  CountryCode,
  PlaidApi,
  PlaidEnvironments,
  Products,
} from 'plaid';

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
    const { data } = await this.client.itemGet({
      access_token: accessToken,
    });

    return data.item;
  }

  async publicTokenExchange(publicToken: string) {
    const { data } = await this.client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    return data;
  }

  async getTransactions(from: Date, accessToken: string) {
    const { data } = await this.client.investmentsTransactionsGet({
      access_token: accessToken,
      start_date: from.toISOString(),
      end_date: new Date().toISOString(),
    });
    return data;
  }
}
