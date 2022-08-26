import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PortfolioPerformance {
  ytdReturnPercent: number;
  ytdReturnDollars: number;
  dailyReturnPercent: number;
  dailyReturnDollars: number;
}
