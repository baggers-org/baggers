import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { Document } from './document';
import { Position } from './position';
import { User } from './user';

@ObjectType()
@index({ owner: 1, private: 1 })
export class Portfolio extends Document {
  @Field(() => User)
  @prop({ ref: () => User, type: () => String })
  owner: User | string;

  @Field()
  @prop({ default: true })
  private: boolean;

  @Field()
  @prop({ default: `` })
  name: string;

  @Field()
  @prop({ default: `` })
  description: string;

  @Field()
  @prop({ default: 0 })
  cash: number;

  @Field()
  @prop({ default: 0 })
  totalValue: number;

  @Field(() => [Position])
  @prop({ type: Position, default: [] })
  positions: Position[];
}

export const PortfolioModel = getModelForClass(Portfolio);
