import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePortfolioInput {
  name: string;

  description: string;
}
