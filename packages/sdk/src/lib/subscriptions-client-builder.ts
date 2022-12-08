import { WebSocket } from 'ws';
import { createClient } from 'graphql-ws';
import { setupEnv } from '@baggers/env';

const env = setupEnv(['API_URL']);

const getAuthenticatedWs = (authHeader: string) => {
  return class NodeWebsocketWithAuth extends WebSocket {
    constructor(address, protocols) {
      super(address, protocols, {
        headers: {
          // your custom headers go here
          authorization: `${authHeader}`,
        },
      });
    }
  };
};
export class SubscriptionsClientBuilder {
  private authHeader: string;

  setAuthHeader(authHeader: string) {
    this.authHeader = authHeader;
  }

  build() {
    const wsUrl = `${env.API_URL.replace('http', 'ws')}/graphql`;
    return createClient({
      url: wsUrl,
      webSocketImpl: getAuthenticatedWs(this.authHeader),
    });
  }
}
