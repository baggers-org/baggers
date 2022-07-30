import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTickerInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
