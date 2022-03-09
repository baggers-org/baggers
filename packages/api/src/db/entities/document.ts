import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { ObjectIdScalar } from '../object-id.scalar';

@ObjectType()
export class Document {
  @Field(() => ObjectIdScalar)
  _id: ObjectId;
}
