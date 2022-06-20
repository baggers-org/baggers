import { NotFoundError } from '@/db/errors/NotFoundError';
import { ObjectIdScalar } from '@/db/object-id.scalar';
import { ObjectId } from 'mongodb';
import { Arg, Query, Resolver } from 'type-graphql';
import { Symbol, SymbolModel } from '../../entities/symbol';

@Resolver(() => Symbol)
export class SymbolQueries {
  @Query(() => Symbol)
  async symbol(
    @Arg('id', () => ObjectIdScalar) _id: ObjectId,
  ): Promise<Symbol> {
    return SymbolModel.findById(_id).orFail(
      () => new NotFoundError(`Could not find a symbol with id ${_id}`),
    );
  }
  @Query(() => [Symbol])
  async searchSymbols(@Arg(`search`) search: string) {
    return SymbolModel?.aggregate([
      {
        $search: {
          index: `searchSymbols`,
          text: {
            query: search,
            path: `symbol`,
          },
        },
      },
    ]).limit(5);
  }
}
