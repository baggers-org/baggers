import { Module } from '@nestjs/common';
import { TickersService } from './tickers.service';
import { TickersResolver } from './tickers.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticker, TickerSchema } from './entities/ticker.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ticker.name,
        schema: TickerSchema,
      },
    ]),
  ],
  providers: [TickersResolver, TickersService],
})
export class TickersModule {}
