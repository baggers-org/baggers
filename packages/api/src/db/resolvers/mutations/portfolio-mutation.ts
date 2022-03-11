import { Portfolio, PortfolioModel, Quote } from '@/db/entities';
import { Position } from '@/db/entities/position';
import { SymbolModel } from '@/db/entities/symbol';
import { NotFoundError } from '@/db/errors/NotFoundError';
import {
  AddPositionInput,
  UpdatePortfolioInput,
} from '@/db/inputs/portfolio-inputs';
import { ObjectIdScalar } from '@/db/object-id.scalar';
import {
  CreatePortfolioPayload,
  UpdatePortfolioPayload,
  AddPositionPayload,
  RemovePositionPayload,
} from '@/db/payloads/portfolio-payloads';
import {
  calculatePositionMetrics,
  getTotalPositionValue,
} from '@/db/util/math';
import { CurrentUser } from '@/decorators/CurrentUser';
import { fetchQuote } from '@/iex';
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
    });
    return {
      record: await portfolio.populate(`owner`),
      recordId: portfolio._id,
    };
  }

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
      { $set: input },
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

  @Mutation(() => AddPositionPayload)
  async addPosition(
    @Arg(`id`) id: ObjectId,
    @Arg(`record`)
    input: AddPositionInput,
    @CurrentUser() user: AccessClaim,
  ) {
    const portfolio = await PortfolioModel.findOneAndUpdate({
      _id: id,
      owner: user.sub,
    }).orFail(
      () =>
        new NotFoundError(
          `Could not find a portfolio to add a position to with id ${id}`,
        ),
    );
    const {
      symbol_id,
    } = input;
    // Check if if the symbol has quote data
    const symbol = await SymbolModel.findById(symbol_id).orFail(() => new NotFoundError(`Could not find a symbol with id ${symbol_id}`))

    let quote: Quote = symbol?.quote;

    if (!quote) {
      quote = await fetchQuote(symbol.symbol);
      // Update the symbol
      symbol.quote = quote;
      symbol?.save();
    }

    const newPosition: Partial<Position> = {
      symbol,
      ...input,
      ...calculatePositionMetrics(portfolio, input, quote),
    };

    const res = await PortfolioModel.findByIdAndUpdate(
      id,
      {
        $push: { positions: newPosition },
        $set: {
          totalValue: getTotalPositionValue([
            ...portfolio?.positions,
            newPosition,
          ]),
        },
      },
      { new: true },
    ).populate([`owner`, `positions.symbol`]);

    return {
      record: res,
      recordId: portfolio?._id,
    };
  }

  @Mutation(() => RemovePositionPayload)
  async removePosition(
    @Arg(`portfolio_id`) portfolio_id: ObjectId,
    @Arg(`position_id`) position_id: ObjectId,
    @CurrentUser() user: AccessClaim,
  ) {
    const portfolio = await PortfolioModelHelpers.findByIdIfOwner(
      portfolio_id,
      user.sub,
    );

    const positionsWithout = portfolio?.positions.filter(
      (p) => !p._id.equals(position_id),
    );

    const res = await PortfolioModel.findByIdAndUpdate(portfolio_id, {
      $
      $pull: { positions: { _id: position_id } },
      $set: {
        totalValue: getTotalPositionValue(positionsWithout as any),
      },
    }).populate(`positions.symbol`);

    return {
      record: res,
    };
  }
}
