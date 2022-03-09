import { Portfolio, PortfolioModel, Quote } from '@/db/entities';
import { Position } from '@/db/entities/position';
import { SymbolModel } from '@/db/entities/symbol';
import { AddPositionInput } from '@/db/inputs/portfolio-inputs';
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
import { fetchQuote } from '@/iex';
import { GraphQLContext } from '@/db/types/GraphQLContext';
import { AccessClaim } from '@/db/types/JWT';
import { AuthenticationError } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

@Resolver(() => Portfolio)
export class PortfolioMutations {
  /**
   * Authenticate the user and ensure the portfolio exists, will be used by every method
   * @param portfolio_id The ID of the portfolio we are mutatin
   * @param access Users Access claim obtained from decoding the JWT, should come from GraphQL context
   */
  async authenticate(portfolio_id: ObjectId, access: AccessClaim) {
    const portfolio = await PortfolioModel.findById(portfolio_id);

    if (!portfolio) {
      throw new AuthenticationError(`This portfolio does not exist`);
    }

    if (portfolio?.owner.sub !== access.sub) {
      throw new AuthenticationError(
        `You do not have permission to add a position to this portfolio`,
      );
    }

    return portfolio;
  }

  @Mutation(() => CreatePortfolioPayload, {
    description: `Create a portfolio under your username`,
  })
  async createPortfolio(
    @Ctx() { identity }: GraphQLContext,
  ): Promise<CreatePortfolioPayload> {
    const portfolio = await PortfolioModel.create({
      owner: {
        sub: identity.sub,
        username: identity.preferred_username,
      },
    });
    return {
      record: portfolio,
      recordId: portfolio._id,
    };
  }

  @Mutation(() => CreatePortfolioPayload, {
    description: `Delete the specified portfolio if you have permission to do so`,
  })
  async deletePortfolio(
    @Arg(`_id`, () => ObjectIdScalar) portfolioId: ObjectId,
    @Ctx() { access }: GraphQLContext,
  ): Promise<CreatePortfolioPayload> {
    const portfolioToDelete = await this.authenticate(portfolioId, access);
    const deletedPortfolio = await portfolioToDelete?.delete();
    return {
      record: deletedPortfolio,
      recordId: deletedPortfolio._id,
    };
  }

  @Mutation(() => UpdatePortfolioPayload, { description: `Set portfolio name` })
  async portfolioSetName(
    @Arg(`_id`, () => ObjectIdScalar) id: ObjectId,
    @Arg(`name`) name: string,
    @Ctx() { access }: GraphQLContext,
  ): Promise<UpdatePortfolioPayload> {
    const portfolio = await this.authenticate(id, access);
    portfolio.name = name;
    portfolio.save();

    return {
      record: portfolio,
      recordId: portfolio?._id,
    };
  }

  @Mutation(() => AddPositionPayload)
  async addPosition(
    @Arg(`record`)
    positionInput: AddPositionInput,
    @Ctx() { access }: GraphQLContext,
  ) {
    const {
      portfolio_id,
      symbol_id,
      costBasis,
      positionSize,
      brokerFees,
      openDate,
      closeDate,
      isShort,
    } = positionInput;
    const portfolio = await this.authenticate(portfolio_id, access);

    // Check if if the symbol has quote data
    const symbol = await SymbolModel.findById(symbol_id);

    if (!symbol) {
      throw Error(`The symbol does not exist`);
    }

    let quote: Quote = symbol?.quote;

    if (!quote) {
      quote = await fetchQuote(symbol.symbol);
      // Update the symbol
      symbol.quote = quote;
      symbol?.save();
    }

    const newPosition: Partial<Position> = {
      symbol,
      costBasis,
      positionSize,
      brokerFees,
      openDate,
      closeDate,
      isShort,
      ...calculatePositionMetrics(portfolio, positionInput, quote),
    };

    const res = await PortfolioModel.findByIdAndUpdate(
      portfolio_id,
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
    ).populate(`positions.symbol`);

    return {
      record: res,
      recordId: portfolio?._id,
    };
  }

  @Mutation(() => RemovePositionPayload)
  async removePosition(
    @Arg(`portfolio_id`) portfolio_id: ObjectId,
    @Arg(`position_id`) position_id: ObjectId,
    @Ctx() { access }: GraphQLContext,
  ) {
    const portfolio = await PortfolioModel.findById(portfolio_id);
    if (access.sub !== portfolio?.owner.sub) {
      throw new AuthenticationError(
        `You do not have permission to remove this position`,
      );
    }

    const positionsWithout = portfolio?.positions.filter(
      (p) => !p._id.equals(position_id),
    );

    const res = await PortfolioModel.findByIdAndUpdate(portfolio_id, {
      $pull: { positions: { _id: position_id } },
      $set: {
        totalValue: getTotalPositionValue(positionsWithout),
      },
    }).populate(`positions.symbol`);

    return {
      record: res,
    };
  }
}
