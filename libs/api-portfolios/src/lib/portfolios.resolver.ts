import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PortfoliosService } from './portfolios.service';
import {
  PopulatedPortfolioWithMetrics,
  PortfolioFromDb,
  PortfolioSummary,
} from './entities/portfolio.entity';

import mongoose from 'mongoose';
import { UpdatePortfolioInput } from './dto/update-portfolio.input';
import { Auth0AccessTokenPayload, CurrentUser } from '@baggers/api-auth';
import {
  RecordId,
  ObjectIdScalar,
  RemoveMultipleResponse,
  ObjectId,
} from '@baggers/api-shared';
import { AddHoldingInput } from './dto/add-holding';
import { HoldingsService } from './services/holdings.service';

@Resolver(() => PortfolioFromDb)
export class PortfoliosResolver {
  constructor(
    private readonly portfoliosService: PortfoliosService,
    private holdingsService: HoldingsService
  ) {}

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

  @Query(() => PopulatedPortfolioWithMetrics, { name: 'portfoliosFindById' })
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

  @Mutation(() => RemoveMultipleResponse, { name: 'portfoliosRemoveMultiple' })
  removeMultiple(
    @Args('_ids', { type: () => [ObjectIdScalar] })
    _ids: mongoose.Types.ObjectId[],
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ) {
    return this.portfoliosService.removeMultiple(_ids, currentUser);
  }

  @Mutation(() => PortfolioFromDb, { name: 'portfoliosUpdateOne' })
  update(
    @Args('_id', { type: () => ObjectIdScalar }) _id: ObjectId,
    @Args('input') input: UpdatePortfolioInput,
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ) {
    return this.portfoliosService.updateOne(_id, input, currentUser);
  }

  @Mutation(() => PortfolioFromDb, { name: 'portfoliosAddHolding' })
  addHolding(
    @Args('_id', { type: () => ObjectIdScalar }) _id: ObjectId,
    @Args('input') input: AddHoldingInput,
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ) {
    return this.holdingsService.addHolding(_id, input, currentUser);
  }
}
