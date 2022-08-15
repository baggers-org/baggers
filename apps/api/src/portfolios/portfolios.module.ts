import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioFromDb, PortfolioSchema } from './entities/portfolio.entity';
import { PortfoliosResolver } from './portfolios.resolver';
import { HoldingMetricsService, PortfolioMetricsService } from './services';
import { HoldingsService } from './services/holdings.service';
import { PlaidClientModule } from '~/plaid-client';
import { PlaidItemsModule } from '~/plaid-items';
import { TransactionsUtilService } from './services/transactions-util.service';
import { HoldingsUtilService } from './services/holdings-util.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PortfolioFromDb.name,
        schema: PortfolioSchema,
      },
    ]),
    PlaidClientModule,
    PlaidItemsModule,
  ],
  providers: [
    PortfoliosResolver,
    PortfoliosService,
    HoldingsService,
    HoldingsUtilService,
    TransactionsUtilService,
    HoldingMetricsService,
    PortfolioMetricsService,
  ],
  exports: [TransactionsUtilService],
})
export class PortfoliosModule {}
