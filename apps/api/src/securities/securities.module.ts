import { Module } from '@nestjs/common';
import { TickersService } from './securities.service';
import { TickersResolver } from './securities.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Security, SecuritySchema } from './entities/security.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Security.name,
        schema: SecuritySchema,
      },
    ]),
  ],
  providers: [TickersResolver, TickersService],
})
export class TickersModule {}
