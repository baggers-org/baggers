import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';
import { Portfolio } from '../entities';
import { Broker, BrokerInput } from '../entities/broker';
import { PlaidItem } from '../entities/plaid';
import {
  Position,
  PositionDirection,
  PositionType,
} from '../entities/position';
import { ObjectIdScalar } from '../object-id.scalar';

@InputType()
export class AddPositionInput implements Partial<Position> {
  @Field(() => ObjectIdScalar)
  symbol: ObjectId;

  @Field()
  positionSize: number;

  @Field()
  averagePrice: number;

  @Field({ nullable: true })
  brokerFees?: number;

  @Field(() => PositionType)
  positionType?: PositionType;

  @Field(() => PositionDirection)
  direction?: PositionDirection;

  @Field({ nullable: true })
  openDate?: Date;

  @Field({ nullable: true })
  closeDate?: Date;

  @Field({ nullable: true })
  currency?: string;
}

@InputType()
export class UpdatePortfolioInput implements Partial<Portfolio> {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  cash?: number;

  @Field({ nullable: true })
  private?: boolean;
}

