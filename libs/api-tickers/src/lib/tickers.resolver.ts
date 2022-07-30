import { Resolver, Query, Args } from '@nestjs/graphql';
import { TickersService } from './tickers.service';
import { Ticker } from './entities/ticker.entity';
import { Public } from '@baggers/api-auth';

@Resolver(() => Ticker)
export class TickersResolver {
  constructor(private readonly tickersService: TickersService) {}

  @Public()
  @Query(() => Ticker, { name: 'ticker' })
  findById(@Args('_id') _id: string) {
    return this.tickersService.findById(_id);
  }

  @Public()
  @Query(() => [Ticker], { name: 'tickersSearch' })
  search(@Args('searchTerm') searchTerm: string) {
    return this.tickersService.search(searchTerm);
  }
}
