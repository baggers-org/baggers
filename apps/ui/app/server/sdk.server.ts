import { SdkBuilder, SubscriptionsClientBuilder } from '@baggers/sdk';
import { authenticate, isAuthenticated } from './policy.server';

const { API_URL } = process.env;

if (!API_URL) throw new Error('API_URL is not defined');

const sdkBuilder = new SdkBuilder().setUrl(API_URL);
let subscriptionsSdkBuilder: SubscriptionsClientBuilder;
export const authenticatedSdk = async (
  request: Request,
  headers?: Headers
) => {
  const { accessToken } = await authenticate(request, headers);
  return sdkBuilder.setAuthHeader(`Bearer ${accessToken}`).build();
};

export const unauthenticatedSdk = async (
  request: Request,
  headers?: Headers
) => {
  const user = await isAuthenticated(request, headers);
  const accessToken = user?.accessToken;

  if (user) {
    sdkBuilder.setAuthHeader(`Bearer ${accessToken}`);
  }

  return sdkBuilder.build();
};

export const unauthSubscriptionsClient = async (
  request: Request,
  headers?: Headers
) => {
  const user = await isAuthenticated(request, headers);
  const accessToken = user?.accessToken;

  if (!subscriptionsSdkBuilder) {
    subscriptionsSdkBuilder = new SubscriptionsClientBuilder();
  }

  if (user) {
    subscriptionsSdkBuilder.setAuthHeader(`Bearer ${accessToken}`);
  }

  return subscriptionsSdkBuilder.build();
};
