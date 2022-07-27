import { FieldMiddleware } from '@nestjs/graphql';
import { Auth0AccessTokenPayload } from 'src/auth/types';

export const checkOwnerMiddleware: FieldMiddleware = (ctx, next) => {
  const { source, info, context } = ctx;

  const { req } = context;

  const user = (req as any).user as Auth0AccessTokenPayload;

  const { extensions } = info.parentType.getFields()[info.fieldName];

  const isOwner =
    (extensions?.ownerFn as any)?.(source, user) ||
    ctx.source.owner === user.sub;

  const isAdmin = user['https://baggers.app/role']?.includes('admin');

  if (isOwner || isAdmin) {
    return next();
  }

  return null;
};
