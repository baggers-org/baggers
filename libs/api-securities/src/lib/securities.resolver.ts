import { Resolver, Query, Args } from '@nestjs/graphql';
import { TickersService } from './securities.service';
import { Security } from './entities/security.entity';
import { Public } from '@baggers/api-auth';
import { ObjectId, ObjectIdScalar } from '@baggers/api-shared';

@Resolver(() => Security)
export class TickersResolver {
  constructor(private readonly securitiesService: TickersService) {}

  @Public()
  @Query(() => Security, { name: 'securitiesFindById' })
  findById(@Args('_id', { type: () => ObjectIdScalar }) _id: ObjectId) {
    return this.securitiesService.findById(_id);
  }

  @Public()
  @Query(() => [Security], { name: 'securitiesSearch' })
  search(@Args('searchTerm') searchTerm: string) {
    return this.securitiesService.search(searchTerm);
  }
}
