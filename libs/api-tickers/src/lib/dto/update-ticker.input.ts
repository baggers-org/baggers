import { CreateTickerInput } from './create-ticker.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTickerInput extends PartialType(CreateTickerInput) {
  @Field(() => Int)
  id: number;
}
