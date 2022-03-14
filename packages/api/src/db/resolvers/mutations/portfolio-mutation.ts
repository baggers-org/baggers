import { Portfolio, PortfolioModel } from '@/db/entities';
import { NotFoundError } from '@/db/errors/NotFoundError';
import {
  AddPositionInput,
  LinkBrokerInput,
  UpdatePortfolioInput,
} from '@/db/inputs/portfolio-inputs';
import { ObjectIdScalar } from '@/db/object-id.scalar';
import { PlaidCreateLinkTokenResponse } from '@/db/payloads/plaid-payloads';
import {
  CreatePortfolioPayload,
  UpdatePortfolioPayload,
  AddPositionPayload,
  RemovePositionPayload,
  PortfolioLinkBrokerPayload,
} from '@/db/payloads/portfolio-payloads';
import { CurrentUser } from '@/decorators/CurrentUser';
import { plaidClient } from '@/plaid/plaid';
import { AccessClaim } from '@/types/AccessClaim';
import { GraphQLContext } from '@/types/GraphQLContext';
import { ObjectId } from 'mongodb';
import { Products, CountryCode } from 'plaid';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';

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

  @Authorized()
  @Mutation(() => PlaidCreateLinkTokenResponse)
  async portfolioCreateLinkToken(
    @Arg(`portfolio_id`, () => ObjectIdScalar) portfolioId: ObjectId,
    @CurrentUser() user: AccessClaim,
  ): Promise<PlaidCreateLinkTokenResponse> {
    PortfolioModel.find({ _id: portfolioId, owner: user.sub }).orFail(
      () =>
        new NotFoundError(
          `Could not find a portfolio that you own with the id ${portfolioId}`,
        ),
    );
    const plaidRequest = {
      user: {
        client_user_id: user.sub,
      },
      client_name: `Baggers`,
      products: [Products.Investments],
      language: `en`,
      country_codes: [CountryCode.Us],
    };

    const { data } = await plaidClient.linkTokenCreate(plaidRequest);

    return data;
  }

  @Authorized()
  @Mutation(() => PortfolioLinkBrokerPayload)
  async portfolioLinkBroker(
    @Arg(`portfolio_id`, () => ObjectIdScalar) portfolioId: ObjectId,
    @Arg(`input`) input: LinkBrokerInput,
    @CurrentUser() user: AccessClaim,
  ): Promise<PortfolioLinkBrokerPayload> {
    const { data } = await plaidClient.itemPublicTokenExchange({
      public_token: input.public_token,
    });
    const { access_token, item_id } = data;

    const portfolio = await PortfolioModel.findOneAndUpdate(
      {
        _id: portfolioId,
        owner: user.sub,
      },
      {
        $set: {
          plaid: {
            access_token,
            item_id,
            isLinked: true,
          },
        },
      },
    ).orFail(
      () =>
        new NotFoundError(`Could not find a portfolio with id ${portfolioId}`),
    );

    return {
      record: portfolio,
      recordId: portfolio._id,
    };
  }

  @Mutation(() => AddPositionPayload)
  async addPosition(
    @Arg(`id`) id: ObjectId,
    @Arg(`record`)
    input: AddPositionInput,
    @CurrentUser() user: AccessClaim,
  ) {
    const portfolio = await PortfolioModel.findOneAndUpdate(
      {
        _id: id,
        owner: user.sub,
      },
      {
        $push: {
          positions: {
            ...input,
            costBasis: input.averagePrice * input.positionSize,
          },
        },
      },
    ).orFail(
      () =>
        new NotFoundError(
          `Could not find a portfolio to add a position to with id ${id}`,
        ),
    );

    return {
      recordId: portfolio?._id,
    };
  }

  @Mutation(() => RemovePositionPayload)
  async removePosition(
    @Arg(`portfolio_id`) portfolio_id: ObjectId,
    @Arg(`position_id`) position_id: ObjectId,
    @CurrentUser() user: AccessClaim,
  ) {
    const res = await PortfolioModel.findOneAndUpdate(
      {
        _id: portfolio_id,
        owner: user.sub,
      },
      {
        $pull: { positions: { _id: position_id } },
      },
    ).orFail(() => new NotFoundError(`Could not remove the position`));

    return {
      recordId: res._id,
    };
  }
}
