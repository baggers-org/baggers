import { Module } from '@nestjs/common';
import { ChartsService } from './charts.service';
import { ChartsResolver } from './charts.resolver';
import { PolygonModule } from '~/polygon/polygon.module';
import { SecuritiesModule } from '~/securities';
import { MarketDataSocketModule } from '~/market-data-socket/market-data-socket.module';

@Module({
  imports: [PolygonModule, SecuritiesModule, MarketDataSocketModule],
  providers: [ChartsResolver, ChartsService],
})
export class ChartsModule {}
