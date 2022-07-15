import { Holding, Portfolio, PortfolioModel } from '@/db/entities';
import { NotFoundError } from '@/db/errors/NotFoundError';
import {
  AddHoldingInput,
  UpdatePortfolioInput,
} from '@/db/inputs/portfolio-inputs';
import { ObjectIdScalar } from '@/db/object-id.scalar';
import { BaseDeleteMultiplePayload } from '@/db/payloads/base-payload';
import {
  CreatePortfolioPayload,
  UpdatePortfolioPayload,
  AddHoldingPayload,
  RemoveHoldingPayload,
  ClearImportError,
} from '@/db/payloads/portfolio-payloads';
import { mergeHoldings } from '@/db/util/portfolio-util/mergeHoldings';
import { CurrentUser } from '@/decorators/CurrentUser';
import { AccessClaim } from '@/types/AccessClaim';
import { GraphQLContext } from '@/types/GraphQLContext';
import { ObjectId } from 'mongodb';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';

@Resolver(() => Portfolio)
export class PortfolioMutations {
  @Authorized()
  @Mutation(() => CreatePortfolioPayload, {
    description: `Create a portfolio under your username`,
  })
  async createPortfolio(
    @Ctx() { user }: GraphQLContext,
  ): Promise<CreatePortfolioPayload> {
    const portfolio = await PortfolioModel.create({
      owner: {
        _id: user.sub,
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return {
      record: await portfolio.populate(`owner`),
      recordId: portfolio._id,
    };
  }

  @Authorized()
  @Mutation(() => CreatePortfolioPayload, {
    description: `Delete the specified portfolio if you have permission to do so`,
  })
  async deletePortfolio(
    @Arg(`_id`, () => ObjectIdScalar) id: ObjectId,
    @CurrentUser() user: AccessClaim,
  ): Promise<CreatePortfolioPayload> {
    const portfolio = await PortfolioModel.findOneAndDelete({
      _id: id,
      owner: user.sub,
    }).orFail(
      () =>
        new NotFoundError(`Could not find a portfolio to delete with id ${id}`),
    );
    return {
      record: portfolio,
      recordId: portfolio._id,
    };
  }

  @Authorized()
  @Mutation(() => BaseDeleteMultiplePayload, {
    description: `Delete the specified portfolios if you have permission to do so`,
  })
  async deletePortfolios(
    @Arg(`_ids`, () => [ObjectIdScalar]) ids: ObjectId[],
    @CurrentUser() user: AccessClaim,
  ): Promise<boolean> {
    return await PortfolioModel.remove({
      owner: user.sub,
      _id: {
        $in: ids,
      },
    }).orFail(() => new NotFoundError('Could not remove portfolios'));
  }

  @Authorized()
  @Mutation(() => BaseDeleteMultiplePayload)
  async deleteMyPortfolios(@CurrentUser() user: AccessClaim): Promise<boolean> {
    return await PortfolioModel.remove({
      owner: user.sub,
    }).orFail(() => new NotFoundError('Could not remove portfolios'));
  }

  @Authorized()
  @Mutation(() => UpdatePortfolioPayload, {
    description: `Update portfolio details`,
  })
  async updatePortfolio(
    @Arg(`_id`, () => ObjectIdScalar) id: ObjectId,
    @Arg(`input`) input: UpdatePortfolioInput,
    @CurrentUser() user: AccessClaim,
  ): Promise<UpdatePortfolioPayload> {
    const portfolio = await PortfolioModel.findOneAndUpdate(
      { _id: id, owner: user.sub },
      { $set: { ...input, updatedAt: Date.now() } },
    ).orFail(
      () =>
        new NotFoundError(
          `Could not find a portfolio to update with id ${id} `,
        ),
    );

    return {
      record: portfolio,
      recordId: portfolio?._id,
    };
  }

  @Authorized()
  @Mutation(() => AddHoldingPayload)
  async addHolding(
    @Arg(`id`) id: ObjectId,
    @Arg(`record`)
    input: AddHoldingInput,
    @CurrentUser() user: AccessClaim,
  ) {
    const portfolio = await PortfolioModel.findOneAndUpdate(
      {
        _id: id,
        owner: user.sub,
      },
      {
        $push: {
          holdings: {
            ...input,
            costBasis: input.averagePrice * input.quantity,
            source: 'direct',
          },
        },
        $set: {
          updatedAt: Date.now(),
        },
      },
      {
        new: true,
      },
    ).orFail(
      () =>
        new NotFoundError(
          `Could not find a portfolio to add a holding to with id ${id}`,
        ),
    );

    const mergedHoldings = mergeHoldings(
      portfolio.toJSON().holdings as Holding[],
    );

    if (mergedHoldings.length !== portfolio.holdings.length) {
      await PortfolioModel.findOneAndUpdate(
        { _id: id, owner: user.sub },
        {
          $set: {
            holdings: mergedHoldings,
          },
        },
      );
    }

    return {
      recordId: portfolio?._id,
    };
  }

  @Authorized()
  @Mutation(() => RemoveHoldingPayload)
  async removeHolding(
    @Arg(`portfolio_id`) portfolio_id: ObjectId,
    @Arg(`holding_id`) holding_id: ObjectId,
    @CurrentUser() user: AccessClaim,
  ) {
    const res = await PortfolioModel.findOneAndUpdate(
      {
        _id: portfolio_id,
        owner: user.sub,
      },
      {
        $pull: { holdings: { _id: holding_id } },
        $set: {
          updatedAt: Date.now(),
        },
      },
    ).orFail(() => new NotFoundError(`Could not remove the holding`));

    return {
      recordId: res._id,
    };
  }

  @Authorized()
  @Mutation(() => ClearImportError)
  async clearImportError(
    @Arg(`portfolio_id`) portfolio_id: ObjectId,
    @CurrentUser() user: AccessClaim,
  ) {
    const res = await PortfolioModel.findOneAndUpdate(
      {
        _id: portfolio_id,
        owner: user.sub,
      },
      {
        $set: { 'plaid.missingSecuritiesError': null },
      },
    ).orFail(() => new NotFoundError(`Could not remove the holding`));

    return {
      record: res,
    };
  }
}
