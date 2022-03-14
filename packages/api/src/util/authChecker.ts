import { GraphQLContext } from '@/types/GraphQLContext';
import { AuthChecker } from 'type-graphql';

import { AuthenticationError } from 'apollo-server-express';

export const authChecker: AuthChecker<GraphQLContext> = (
  { context },
  roles,
) => {
  if (!context.user) {
    throw new AuthenticationError(
      `You are not authenticated to perform this action`,
    );
  }

  if (roles) {
    const userRoles = context.user[`https://baggers.app/role`];
    if (!roles.every((role) => userRoles.includes(role))) {
      return false;
    }
  }

  return true;
};
