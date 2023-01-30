import { InputType } from '@nestjs/graphql';

@InputType()
export class CreatePortfolioInput {
  name?: string;

  description?: string;

  private?: boolean;

  imageUrl?: string;
}
