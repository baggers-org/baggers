import { User, UserModel } from '@/db/entities';
import { FindOrCreateUserInput } from '@/db/inputs/user-inputs';
import { FindOrCreateUserPayload } from '@/db/payloads/user-payloads';
import { Arg, Mutation, Resolver } from 'type-graphql';

@Resolver(() => User)
export class UserMutations {
  @Mutation(() => FindOrCreateUserPayload)
  async findOrCreateUser(
    @Arg(`record`) record: FindOrCreateUserInput,
  ): Promise<FindOrCreateUserPayload> {
    const user = await UserModel.findOneAndUpdate(
      { _id: record._id },
      {
        $set: record,
      },
      { upsert: true, new: true },
    );

    return {
      record: user,
      recordId: user._id,
    };
  }
}
