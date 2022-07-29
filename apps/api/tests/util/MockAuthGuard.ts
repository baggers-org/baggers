import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { PartialTokenPayload } from '~/auth/types';
import { User1 } from 'tests/data/user.test-data';

const DEFAULT_USER: PartialTokenPayload = {
  sub: User1._id,
  'https://baggers.app/role': [],
};
export class MockAuthGuard implements CanActivate {
  private user: PartialTokenPayload;
  constructor(user: PartialTokenPayload = DEFAULT_USER) {
    this.user = user;
  }

  canActivate(
    context: ExecutionContextHost
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { req } = context.getArgs()[2];
    req.user = this.user;
    return true;
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
