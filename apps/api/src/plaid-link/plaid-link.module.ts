import { Module } from '@nestjs/common';
import { PlaidClientModule } from '~/plaid-client';
import { PlaidLinkResolver } from './plaid-link.resolver';

@Module({
  imports: [PlaidClientModule],
  controllers: [],
  providers: [PlaidLinkResolver],
  exports: [],
})
export class PlaidLinkModule {}
