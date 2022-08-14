import { Module } from '@nestjs/common';
import { PortfoliosModule } from '@baggers/api-portfolios';
import { PortfolioImportService } from './portfolio-import.service';
import { PlaidItemsModule } from '@baggers/api-plaid-items';
import { PlaidClientModule } from '@baggers/plaid-client';
import { PortfolioImportResolver } from './portfolio-import.resolver';

@Module({
  imports: [PortfoliosModule, PlaidItemsModule, PlaidClientModule],
  controllers: [],
  providers: [PortfolioImportService, PortfolioImportResolver],
  exports: [],
})
export class PortfolioImportModule {}
