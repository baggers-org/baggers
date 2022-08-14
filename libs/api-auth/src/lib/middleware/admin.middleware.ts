import { FieldMiddleware } from '@nestjs/graphql';
import { Auth0AccessTokenPayload } from '../types';

export const checkAdminMiddleware: FieldMiddleware = (ctx, next) => {
  const { context } = ctx;

  const { req } = context;

  const user = (req as any).user as Auth0AccessTokenPayload;

  const isAdmin = user['https://baggers.app/role']?.includes('admin');

  if (isAdmin) {
    return next();
  }

  return null;
};
