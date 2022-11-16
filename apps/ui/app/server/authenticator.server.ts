import type { CreateUserInput, User } from '@baggers/graphql-types';
import { Auth0Authenticator } from '@baggers/remix-auth0';
import { findOrCreateUser } from '~/util/findOrCreateUser.server';

export const auth0Authenticator = new Auth0Authenticator<User>(
  async (accessToken, profile) => {
    const user: CreateUserInput = {
      _id: profile.id,
      displayName: profile.displayName,
      emails: profile.emails.map((e) => e.value),
      photos: profile.photos.map((e) => e.value),
    };
    const { usersFindOrCreate } = await findOrCreateUser(
      accessToken,
      user
    );

    return usersFindOrCreate;
  }
);
