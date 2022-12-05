import { Module } from '@nestjs/common';
import { MarketDataSocketService } from './market-data-socket.service';

@Module({
  providers: [MarketDataSocketService],
  exports: [MarketDataSocketService],
})
export class MarketDataSocketModule {}
