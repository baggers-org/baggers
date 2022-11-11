import { Module } from '@nestjs/common';
import { PortfoliosModule } from '@api/portfolios';
import { PortfolioImportService } from './portfolio-import.service';
import { PlaidItemsModule } from '@api/plaid-items';
import { PlaidClientModule } from '@api/plaid-client';
import { PortfolioImportResolver } from './portfolio-import.resolver';
import { SecuritiesModule } from '@api/securities';

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
