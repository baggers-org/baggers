import { Module } from '@nestjs/common';
import { EnvModule } from '~/env';
import { IexService } from './iex.service';

@Module({
  imports: [EnvModule],
  providers: [IexService],
  exports: [IexService],
})
export class IexModule {}
