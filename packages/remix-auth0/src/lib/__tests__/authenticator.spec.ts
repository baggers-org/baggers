import { Auth0Authenticator } from '../authenticator';

jest.mock('env-schema', () => ({
  envSchema: () => ({}),
}));

describe('Auth0Authenticator', () => {
  it('should be defined', () => {
    const authenticator = new Auth0Authenticator();
    expect(authenticator).toBeDefined();
  });
});
