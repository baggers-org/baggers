import { Module } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { ChartsResolver } from './charts.resolver';
import { IexModule } from '~/iex/iex.module';
import { SecuritiesModule } from '~/securities';

@Module({
  imports: [IexModule, SecuritiesModule],
  providers: [ChartsResolver, ChartsService],
})
export class ChartsModule {}
