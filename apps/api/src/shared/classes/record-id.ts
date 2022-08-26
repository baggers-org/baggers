import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RecordId {
  @Field()
  _id: string;
}
