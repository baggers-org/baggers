import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
} from '@nestjs/graphql';
import { PortfoliosService } from './portfolios.service';
import {
  PopulatedPortfolioWithMetrics,
  Portfolio,
  PortfolioSummary,
} from './entities/portfolio.entity';

import mongoose from 'mongoose';
import { UpdatePortfolioInput } from './dto/update-portfolio.input';
import { Auth0AccessTokenPayload, CurrentUser, Public } from '~/auth';
import {
  RecordId,
  ObjectIdScalar,
  RemoveMultipleResponse,
  ObjectId,
} from '~/shared';
import { observableToAsyncIterable } from '~/market-data-socket/observableToAsyncITerable';
import { map } from 'rxjs';
import { TransactionsService } from './services/transactions.service';
import { AddTransactionInput } from './dto/add-transaction.input';
import { CreatePortfolioInput } from './dto/create-portfolio.input';

@Resolver(() => Portfolio)
export class PortfoliosResolver {
  constructor(
    private readonly portfoliosService: PortfoliosService,
    private transactionsService: TransactionsService
  ) {}

  /**
   * Inits an empty portfolio belonging to the currently logged in user
   */
  @Mutation(() => RecordId, { name: 'portfoliosInitEmpty' })
  async initEmpty(
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ) {
    const { _id } = await this.portfoliosService.initEmpty(
      currentUser
    );

    return {
      _id,
    };
  }
  @Mutation(() => RecordId, { name: 'portfoliosCreateOne' })
  async create(
    @Args('input') input: CreatePortfolioInput,
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ) {
    const { _id } = await this.portfoliosService.create(
      input,
      currentUser
    );

    return {
      _id,
    };
  }

  @Public()
  @Query(() => PopulatedPortfolioWithMetrics, {
    name: 'portfoliosFindById',
  })
  findById(
    @Args('_id', { type: () => ObjectIdScalar })
    _id: mongoose.Types.ObjectId,
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ) {
    return this.portfoliosService.findById(_id, currentUser);
  }

  @Public()
  @Subscription(() => PopulatedPortfolioWithMetrics, {
    name: 'portfoliosSubscribeToMarketData',
    nullable: true,
  })
  async subscribeById(
    @Args('_id', { type: () => ObjectIdScalar })
    _id: mongoose.Types.ObjectId,
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ) {
    const obs = await this.portfoliosService.subscribeById(
      _id,
      currentUser
    );

    return observableToAsyncIterable(
      obs.pipe(
        map((portfolio) => {
          return {
            portfoliosSubscribeToMarketData: portfolio,
          };
        })
      )
    );
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

  @Mutation(() => RemoveMultipleResponse, {
    name: 'portfoliosRemoveMultiple',
  })
  removeMultiple(
    @Args('_ids', { type: () => [ObjectIdScalar] })
    _ids: mongoose.Types.ObjectId[],
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ) {
    return this.portfoliosService.removeMultiple(_ids, currentUser);
  }

  @Mutation(() => Portfolio, { name: 'portfoliosUpdateOne' })
  async update(
    @Args('_id', { type: () => ObjectIdScalar }) _id: ObjectId,
    @Args('input') input: UpdatePortfolioInput,
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ): Promise<Portfolio> {
    return this.portfoliosService.updateOne(_id, input, currentUser);
  }

  @Mutation(() => Portfolio, { name: 'portfoliosAddTransaction' })
  async addTransaction(
    @Args('input') input: AddTransactionInput,
    @CurrentUser() currentUser: Auth0AccessTokenPayload
  ): Promise<Portfolio> {
    return this.transactionsService.addTransaction(
      input,
      currentUser
    );
  }
}
