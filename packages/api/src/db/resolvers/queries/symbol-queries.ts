import { Arg, Query, Resolver } from 'type-graphql';
import { Symbol, SymbolModel } from '../../entities/symbol';

@Resolver(() => Symbol)
export class SymbolQueries {
  @Query(() => [Symbol])
  async searchSymbols(@Arg(`search`) search: string) {
    console.log(search);

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
