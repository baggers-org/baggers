import { PipelineStage } from 'mongoose';

export const withPortfolioPerformance: PipelineStage[] = [
  {
    $addFields: {
      performance: {
        ytdReturnPercent: 12.5,
        ytdReturnDollars: 23923.12,
        dailyReturnPercent: 123,
        dailyReturnDollars: 1832.3,
      },
    },
  },
];
