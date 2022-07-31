import { PartialTokenPayload } from '@baggers/api-auth';
import { AdminUser, User1, User2 } from '@baggers/api-users';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';

const payloads: PartialTokenPayload[] = [
  {
    sub: User1._id,
  },
  {
    sub: User2._id,
  },
  {
    sub: AdminUser._id,
    'https://baggers.app/role': ['admin'],
  },
];
export class MockAuthGuard implements CanActivate {
  private user: PartialTokenPayload;

  canActivate(context: ExecutionContextHost): boolean | Promise<boolean> {
    const { req } = context.getArgs()[2];

    // We can switch user by passing the user id as the auth token
    const authHeader = req.headers.authorisation;
    if (authHeader) {
      req.user = payloads.find((u) => u.sub === authHeader) || {
        sub: authHeader,
      };
    }
    // TODO: fix for unauth access tests
    return true;
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
