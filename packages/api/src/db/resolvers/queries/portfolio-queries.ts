import { ObjectId } from 'mongodb';
import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Portfolio, PortfolioModel } from '../../entities';
import { ObjectIdScalar } from '../../object-id.scalar';
import { CurrentUser } from '@/decorators/CurrentUser';
import { AccessClaim } from '@/types/AccessClaim';
import { NotFoundError } from '@/db/errors/NotFoundError';
import { withHoldingData, withPerformance } from '@/db/helpers';
import { analysePortfolio } from '@/db/helpers/aggregation/portfolios/analysePortfolio';
import {
  matchPortfolioById,
  populateOwner,
} from '@/db/helpers/aggregation/portfolios';

@Resolver(() => Portfolio)
export class PortfolioQueries {
  @Query(() => Portfolio)
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
    const res = await PortfolioModel.aggregate([
      {
        $match: { owner: user.sub },
      },
      ...withHoldingData,
      ...analysePortfolio,
      ...withPerformance,
      ...populateOwner(),
    ]);

    return res;
  }
}
