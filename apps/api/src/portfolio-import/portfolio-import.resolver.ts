import { Auth0AccessTokenPayload, CurrentUser } from '@api/auth';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ImportResponse } from './dto/import-response';
import { PortfolioImportService } from './portfolio-import.service';

@Resolver()
export class PortfolioImportResolver {
  constructor(private importService: PortfolioImportService) {}

  @Mutation(() => ImportResponse)
  portfoliosBeginImport(
    @Args('publicToken') publicToken: string,
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ) {
    return this.importService.beginImport(publicToken, currentUser);
  }
}
