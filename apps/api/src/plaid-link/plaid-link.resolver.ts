import { Auth0AccessTokenPayload, CurrentUser } from '@api/auth';
import { PlaidClientService } from '@api/plaid-client';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class PlaidLinkResolver {
  constructor(private plaid: PlaidClientService) {}

  @Query(() => String)
  plaidLinkToken(
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ) {
    return this.plaid.createLinkToken(currentUser);
  }
}
