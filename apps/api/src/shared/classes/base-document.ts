import { Field, ObjectType } from '@nestjs/graphql';
import mongoose from 'mongoose';
import { ObjectIdScalar } from '../scalars/ObjectIdScalar';
import { Timestamps } from './timestamps.entity';

@ObjectType()
export class BaseDocument extends Timestamps {
  @Field(() => ObjectIdScalar)
  _id: mongoose.Types.ObjectId;
}
