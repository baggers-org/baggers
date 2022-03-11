import { ObjectId } from 'mongodb';
import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Portfolio, PortfolioModel } from '../../entities';
import { ObjectIdScalar } from '../../object-id.scalar';
import { CurrentUser } from '@/decorators/CurrentUser';
import { AccessClaim } from '@/types/AccessClaim';
import { NotFoundError } from '@/db/errors/NotFoundError';

@Resolver(() => Portfolio)
export class PortfolioQueries {
  @Query(() => Portfolio)
  async portfolio(
    @Arg(`portfolioId`, () => ObjectIdScalar) portfolioId: ObjectId,
    @CurrentUser() user: AccessClaim,
  ) {
    return PortfolioModel.findOne({
      _id: portfolioId,
      $or: [
        {
          private: false,
        },
        {
          private: true,
          owner: user.sub,
        },
      ],
    })
      .orFail(
        () =>
          new NotFoundError(`Could not find a portfolio with ${portfolioId}`),
      )
      .populate([`owner`, `positions.symbol`]);
  }

  @Query(() => [Portfolio])
  @Authorized()
  async myPortfolios(@CurrentUser() user: AccessClaim) {
    return PortfolioModel.find({ owner: user.sub }).populate(`owner`);
  }
}
