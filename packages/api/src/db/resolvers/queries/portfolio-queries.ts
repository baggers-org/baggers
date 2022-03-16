import { ObjectId } from 'mongodb';
import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Portfolio, PortfolioModel } from '../../entities';
import { ObjectIdScalar } from '../../object-id.scalar';
import { CurrentUser } from '@/decorators/CurrentUser';
import { plaidClient } from '@/plaid/plaid';
import { Products, CountryCode, LinkTokenCreateResponse } from 'plaid';
import { AccessClaim } from '@/types/AccessClaim';
import { NotFoundError } from '@/db/errors/NotFoundError';
import {
  calculatePortfolioValue,
  calculateHoldingMetrics,
  matchPortfolioById,
  populateOwner,
  populateHoldingData,
} from '@/db/helpers';
import { calculateHoldingExposure } from '@/db/helpers/aggregation/portfolios/calculateHoldingExposure';
import { PlaidCreateLinkTokenResponse } from '@/db/payloads/plaid-payloads';

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
      // Populate holdings with market data
      ...populateHoldingData(),
      // Work out the various holding metrics using the latest market data
      ...calculateHoldingMetrics(),
      // Now we have market value etc. work out the total portfolio value
      calculatePortfolioValue(),
      // Finally work out the exposure of every holding
      calculateHoldingExposure(),
      // Add owner data
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
    return PortfolioModel.find({ owner: user?.sub }).populate(`owner`);
  }

}
