import { Auth0AccessTokenPayload } from '@baggers/api-auth';
import { PlaidClientService } from '@baggers/plaid-client';
import { Query } from '@nestjs/graphql';

export class PlaidLinkResolver {
  constructor(private plaid: PlaidClientService) {}

  @Query(() => String)
  plaidLinkToken(currentUser: Auth0AccessTokenPayload) {
    return this.plaid.createLinkToken(currentUser);
  }
}
