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
import { SecuritiesModule } from '~/securities';

@Module({
  imports: [
    SecuritiesModule,
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
    PortfolioMetricsService,
    PortfoliosResolver,
    PortfoliosService,
    HoldingsService,
    HoldingsUtilService,
    TransactionsUtilService,
    HoldingMetricsService,
  ],
  exports: [PortfoliosService, TransactionsUtilService],
})
export class PortfoliosModule {}
