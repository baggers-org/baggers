import type { CreateUserInput } from '@baggers/graphql-types';
import { SdkBuilder } from '@baggers/sdk';

/**
 * Function is used in several places to create / find the initial user
 * when they log in
 * @returns
 */
export const findOrCreateUser = async (
  token: string,
  user: CreateUserInput
) => {
  const { usersFindOrCreate } = await new SdkBuilder()
    .setAuthHeader(`Bearer ${token}`)
    .build();
  return usersFindOrCreate({
    input: {
      _id: user._id,
      displayName: user.displayName,
      emails: user.emails,
      photos: user.photos,
    },
  });
};
