import { EnvModule } from '@baggers/api-env';
import { Module } from '@nestjs/common';
import { PlaidClientService } from './plaid-client.service';

@Module({
  imports: [EnvModule],
  providers: [PlaidClientService],
  exports: [PlaidClientService],
})
export class PlaidClientModule {}
