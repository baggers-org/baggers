import { authenticate, isAuthenticated } from '~/policy.server';
import { SdkBuilder } from '@baggers/sdk';

const { API_SERVICE_HOST } = process.env;

if (!API_SERVICE_HOST) throw new Error('API_SERVICE_HOST is not defined');

const sdkBuilder = new SdkBuilder().setUrl(API_SERVICE_HOST);

export const authenticatedSdk = async (request: Request, headers?: Headers) => {
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
