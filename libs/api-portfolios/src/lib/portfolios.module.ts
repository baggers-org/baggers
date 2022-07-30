import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioFromDb, PortfolioSchema } from './entities/portfolio.entity';
import { PortfoliosResolver } from './portfolios.resolver';
import { HoldingMetricsService, PortfolioMetricsService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PortfolioFromDb.name,
        schema: PortfolioSchema,
      },
    ]),
  ],
  providers: [
    PortfoliosResolver,
    PortfoliosService,
    HoldingMetricsService,
    PortfolioMetricsService,
  ],
})
export class PortfoliosModule {}
