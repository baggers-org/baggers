import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { ObjectIdScalar } from '../object-id.scalar';

@ObjectType()
export class BasePayload<T> implements Payload<T> {
  @Field(() => ObjectIdScalar)
  recordId: ObjectId;

  record: T;
}

interface Payload<T> {
  recordId: ObjectId;
  record: T;
}
