import { Module } from '@nestjs/common';
import { PlaidLinkResolver } from './plaid-link.resolver';

@Module({
  controllers: [],
  providers: [PlaidLinkResolver],
  exports: [],
})
export class PlaidLinkModule {}
