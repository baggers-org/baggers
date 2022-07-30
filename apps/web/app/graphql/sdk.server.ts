import { authenticate, isAuthenticated } from '~/policy.server';
import { SdkBuilder } from '@baggers/sdk';

export const authenticatedSdk = async (request: Request, headers?: Headers) => {
  const { accessToken } = await authenticate(request, headers);

  return new SdkBuilder().setAuthHeader(`Bearer ${accessToken}`).build();
};

export const unauthenticatedSdk = async (
  request: Request,
  headers?: Headers
) => {
  const user = await isAuthenticated(request, headers);
  const accessToken = user?.accessToken;

  const builder = new SdkBuilder();

  if (user) {
    builder.setAuthHeader(`Bearer ${accessToken}`);
  }

  return builder.build();
};
