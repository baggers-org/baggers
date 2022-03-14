import { Field, InputType } from 'type-graphql';
import { User } from '../entities';

@InputType()
export class FindOrCreateUserInput implements Partial<User> {
  @Field()
  declare _id: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field(() => [String], { nullable: true })
  emails?: [string];

  @Field(() => [String], { nullable: true })
  photos?: [string];
}
