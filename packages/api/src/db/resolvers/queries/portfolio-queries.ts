import { ObjectId } from 'mongodb';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { NotFoundError } from '@/db/errors/NotFoundError';
import { GraphQLContext } from '@/db/types/GraphQLContext';
import { Portfolio, PortfolioModel } from '../../entities';
import { ObjectIdScalar } from '../../object-id.scalar';

@Resolver(() => Portfolio)
export class PortfolioQueries {
  @Query(() => Portfolio)
  async portfolio(
    @Arg(`portfolioId`, () => ObjectIdScalar) portfolioId: ObjectId,
  ) {
    const res = await PortfolioModel.findById(portfolioId).populate(
      `positions.symbol`,
    );

    if (!res) {
      throw new NotFoundError(
        `Could not find portfolio with id ${portfolioId}`,
      );
    }

    return res;
  }

  @Query(() => [Portfolio])
  async myPortfolios(@Ctx() { identity }: GraphQLContext) {
    return PortfolioModel.find({ 'owner.sub': identity.sub }).populate(
      `positions.symbol`,
    );
  }
}
