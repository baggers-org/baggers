import { Field, InputType } from '@nestjs/graphql';
import { HoldingDirection } from '../enums';
import { AssetClass } from '~/securities/enums/asset-class.enum';

@InputType()
export class AddHoldingInput {
  @Field()
  security: string;

  @Field(() => AssetClass)
  assetClass: AssetClass;

  @Field()
  quantity: number;

  @Field()
  averagePrice: number;

  @Field(() => HoldingDirection)
  direction?: HoldingDirection;

  @Field()
  currency: string;

  @Field(() => Date, { nullable: true })
  transactionDate?: Date;
}
