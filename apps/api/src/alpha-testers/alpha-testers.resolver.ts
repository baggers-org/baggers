import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Public } from '~/auth';
import { RecordId } from '~/shared';
import { AlphaTestersService } from './alpha-testers.service';

@Resolver()
export class AlphaTestersResolver {
  constructor(private alphaTesterService: AlphaTestersService) {}
  @Mutation(() => RecordId)
  @Public()
  async addAlphaTesterEmail(@Args('email') email: string) {
    const { _id } = await this.alphaTesterService.addAlphaTesterEmail(
      email
    );

    return {
      _id,
    };
  }
}
