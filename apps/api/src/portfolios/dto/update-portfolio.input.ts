import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePortfolioInput {
  _id: string;
}
