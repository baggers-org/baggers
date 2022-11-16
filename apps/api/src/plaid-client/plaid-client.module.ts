import { Module } from '@nestjs/common';
import { PlaidClientService } from './plaid-client.service';

@Module({
  imports: [],
  providers: [PlaidClientService],
  exports: [PlaidClientService],
})
export class PlaidClientModule {}
