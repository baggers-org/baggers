import { Injectable } from '@nestjs/common';

@Injectable()
export class PlaidClientService {
  async createLinkToken() {
    return 'test-link-token';
  }

  // async getItem(accessToken: string) {
  //   const { data } = await this.client.itemGet({
  //     access_token: accessToken,
  //   });

  //   return data.item;
  // }

  // async publicTokenExchange(publicToken: string) {
  //   const { data } = await this.client.itemPublicTokenExchange({
  //     public_token: publicToken,
  //   });
  //   return data;
  // }
}
