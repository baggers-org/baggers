import { Module } from '@nestjs/common';
import { PortfoliosModule } from '~/portfolios';
import { PortfolioImportService } from './portfolio-import.service';
import { PlaidItemsModule } from '~/plaid-items';
import { PlaidClientModule } from '~/plaid-client';
import { PortfolioImportResolver } from './portfolio-import.resolver';
import { SecuritiesModule } from '~/securities';

@Module({
  imports: [
    PortfoliosModule,
    PlaidItemsModule,
    PlaidClientModule,
    SecuritiesModule,
  ],
  controllers: [],
  providers: [PortfolioImportService, PortfolioImportResolver],
  exports: [],
})
export class PortfolioImportModule {}
