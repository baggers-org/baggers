import { Module } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { ChartsResolver } from './charts.resolver';
import { PolygonModule } from '~/polygon/polygon.module';
import { SecuritiesModule } from '~/securities';

@Module({
  imports: [PolygonModule, SecuritiesModule],
  providers: [ChartsResolver, ChartsService],
})
export class ChartsModule {}
