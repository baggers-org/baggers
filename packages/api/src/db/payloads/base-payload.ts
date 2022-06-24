import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { ObjectIdScalar } from '../object-id.scalar';

@ObjectType()
export class BasePayload<T> implements Payload<T> {
  @Field(() => ObjectIdScalar)
  recordId: ObjectId | string;

  record: T;
}

@ObjectType()
export class BaseDeleteMultiplePayload {
  @Field()
  deletedCount: number;

  @Field()
  acknowledged: boolean;
}

interface Payload<T> {
  recordId: ObjectId | string;
  record: T;
}
