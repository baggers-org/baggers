import { authenticate, isAuthenticated } from 'apps/ui/app/policy.server';
import { SdkBuilder } from '@baggers/sdk';

const { API_URI } = process.env;

if (!API_URI) throw new Error('API_URI is not defined');

const sdkBuilder = new SdkBuilder().setUrl(API_URI);

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
