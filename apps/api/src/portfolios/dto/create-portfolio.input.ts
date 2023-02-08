import { InputType } from '@nestjs/graphql';
import { PortfolioType } from '../enums/portfolio-type.enum';

@InputType()
export class CreatePortfolioInput {
  name?: string;

  description?: string;

  private?: boolean;

  portfolioType: PortfolioType;
}
