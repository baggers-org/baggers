import { ObjectId } from 'mongodb';
import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Portfolio, PortfolioModel } from '../../entities';
import { ObjectIdScalar } from '../../object-id.scalar';
import { CurrentUser } from '@/decorators/CurrentUser';
import { AccessClaim } from '@/types/AccessClaim';
import { NotFoundError } from '@/db/errors/NotFoundError';
import { withHoldingData, withPerformance } from '@/db/helpers';
import {
  matchPortfolioById,
  populateOwner,
} from '@/db/helpers/aggregation/portfolios';
import { sortHoldingsByMarketValue } from '@/db/helpers/aggregation/portfolios/sortHoldingsByMarketValue';

@Resolver(() => Portfolio)
export class PortfolioQueries {
  @Query(() => Portfolio, { description: 'Find an individual portfolio by ID' })
  async portfolio(
    @Arg(`portfolioId`, () => ObjectIdScalar) portfolioId: ObjectId,
    @CurrentUser() user: AccessClaim,
  ) {
    const res = await PortfolioModel.aggregate([
      // Find the specific portfolio, based on user and portfolio privacy
      matchPortfolioById(portfolioId, user?.sub),
      ...withHoldingData,
      ...withPerformance,
      ...populateOwner(),
    ]);

    if (res.length === 0) {
      return new NotFoundError(
        `Could not find a portfolio with id ${portfolioId}`,
      );
    }

    return res.pop();
  }

  @Query(() => [Portfolio])
  @Authorized()
  async myPortfolios(@CurrentUser() user: AccessClaim) {
    console.log('In my portfolios query');
    const res = await PortfolioModel.aggregate([
      {
        $match: { owner: user.sub },
      },
      ...withHoldingData,
      ...withPerformance,
      ...populateOwner(),
      ...sortHoldingsByMarketValue,
    ]).sort({ updatedAt: -1 });

    console.log('Returning from my portfolios query');

    return res;
  }
}
