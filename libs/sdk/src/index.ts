import { GraphQLClient } from 'graphql-request';
import { PatchedRequestInit } from 'graphql-request/dist/types';
import { getSdk } from './generated';
export class SdkBuilder {
  private client: GraphQLClient;
  private options: PatchedRequestInit;
  private baseUrl: string;

  constructor() {
    const { API_URL } = process.env;
    if (!API_URL) this.baseUrl = undefined;

    this.baseUrl = `${API_URL}/graphql`;
  }

  setUrl(url: string) {
    this.baseUrl = `${url}/graphql`;
    return this;
  }

  setAuthHeader(authHeader: string) {
    this.options = {
      headers: {
        authorisation: authHeader,
      },
    };

    return this;
  }

  build() {
    if (!this.baseUrl) throw new Error(`SDK Base Url is undefiend`);

    this.client = new GraphQLClient(this.baseUrl, this.options);
    return getSdk(this.client);
  }
}

export * from './generated';
