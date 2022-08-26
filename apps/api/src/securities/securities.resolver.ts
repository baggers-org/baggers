import { Resolver, Query, Args } from '@nestjs/graphql';
import { SecuritiesService } from './securities.service';
import { Security } from './entities/security.entity';
import { Public } from '~/auth';
import { ObjectId, ObjectIdScalar } from '~/shared';

@Resolver(() => Security)
export class SecuritiesResolver {
  constructor(private readonly securitiesService: SecuritiesService) {}

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
