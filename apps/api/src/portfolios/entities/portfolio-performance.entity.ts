import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PortfolioPerformance {
  returnPercent: number;
  returnDollars: number;
  ytdReturnPercent: number;
  ytdReturnDollars: number;
  dailyReturnPercent: number;
  dailyReturnDollars: number;
}
