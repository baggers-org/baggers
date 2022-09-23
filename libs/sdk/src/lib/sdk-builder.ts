import { getSdk } from '../generated';
import { GraphQLClient } from 'graphql-request';
import { PatchedRequestInit } from 'graphql-request/dist/types';

export { getSdk } from '../generated';

export class SdkBuilder {
  private options: PatchedRequestInit;
  private baseUrl?: string;

  constructor() {
    const { API_URL } = process.env;
    if (!API_URL) this.baseUrl = undefined;

    this.baseUrl = `${API_URL}/graphql`;
    this.options = {};
  }

  setUrl(url: string) {
    this.baseUrl = `${url}/graphql`;
    return this;
  }

  setAuthHeader(authHeader: string) {
    this.options = {
      headers: {
        authorization: authHeader,
      },
    };

    return this;
  }

  build() {
    if (!this.baseUrl) throw new Error(`SDK Base Url is undefiend`);

    const client = new GraphQLClient(this.baseUrl, this.options);
    return getSdk(client);
  }
}
