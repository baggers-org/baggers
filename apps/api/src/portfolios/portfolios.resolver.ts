import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PortfoliosService } from './portfolios.service';
import {
  PopulatedPortfolioWithMetrics,
  PortfolioFromDb,
  PortfolioSummary,
} from './entities/portfolio.entity';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { Auth0AccessTokenPayload } from 'src/auth/types';
import { RecordId } from 'src/shared/classes/record-id';
import { ObjectIdScalar } from 'src/shared/scalars/ObjectIdScalar';

import mongoose from 'mongoose';

@Resolver(() => PortfolioFromDb)
export class PortfoliosResolver {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  /**
   * Inits an empty portfolio belonging to the currently logged in user
   */
  @Mutation(() => RecordId, { name: 'portfoliosInitEmpty' })
  async initEmpty(@CurrentUser() currentUser: Auth0AccessTokenPayload) {
    const { _id } = await this.portfoliosService.initEmpty(currentUser);

    return {
      _id,
    };
  }

  @Query(() => PopulatedPortfolioWithMetrics, { name: 'portfolio' })
  findById(
    @Args('_id', { type: () => ObjectIdScalar })
    _id: mongoose.Types.ObjectId,
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ) {
    return this.portfoliosService.findById(_id, currentUser);
  }

  @Query(() => [PortfolioSummary], {
    name: 'portfoliosCreated',
  })
  created(@CurrentUser() currentUser: Auth0AccessTokenPayload) {
    return this.portfoliosService.findCreated(currentUser);
  }

  @Mutation(() => RecordId, { name: 'portfoliosRemoveOne' })
  removeOne(
    @Args('_id', { type: () => ObjectIdScalar })
    _id: mongoose.Types.ObjectId,
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ) {
    return this.portfoliosService.removeOne(_id, currentUser);
  }
}
