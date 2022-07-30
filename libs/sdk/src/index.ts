import { GraphQLClient } from 'graphql-request';
import { PatchedRequestInit } from 'graphql-request/dist/types';
import { getSdk } from './generated';

const { API_URL } = process.env;

if (!API_URL) throw new Error(`API_URL not set`);
export const apiBaseUrl = `${API_URL}/graphql`;
export class SdkBuilder {
  private client: GraphQLClient;
  private options: PatchedRequestInit;

  setAuthHeader(authHeader: string) {
    this.options.headers = {
      authorisation: authHeader,
    };

    return this;
  }

  build() {
    this.client = new GraphQLClient(apiBaseUrl, this.options);
    return getSdk(this.client);
  }
}

export * from './generated';
