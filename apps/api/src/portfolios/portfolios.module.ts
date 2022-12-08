import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Portfolio,
  PortfolioSchema,
} from './entities/portfolio.entity';
import { PortfoliosResolver } from './portfolios.resolver';
import {
  HoldingMetricsService,
  PortfolioMetricsService,
} from './services';
import { HoldingsService } from './services/holdings.service';
import { PlaidClientModule } from '~/plaid-client';
import { PlaidItemsModule } from '~/plaid-items';
import { TransactionsUtilService } from './services/transactions-util.service';
import { HoldingsUtilService } from './services/holdings-util.service';
import { SecuritiesModule } from '~/securities';
import { TransactionsService } from './services/transactions.service';
import { MarketDataSocketModule } from '~/market-data-socket/market-data-socket.module';

@Module({
  imports: [
    MarketDataSocketModule,
    SecuritiesModule,
    MongooseModule.forFeature([
      {
        name: Portfolio.name,
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
    TransactionsService,
    HoldingMetricsService,
  ],
  exports: [PortfoliosService, TransactionsUtilService],
})
export class PortfoliosModule {}
