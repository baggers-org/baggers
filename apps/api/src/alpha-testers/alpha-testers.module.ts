import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlphaTestersResolver } from './alpha-testers.resolver';
import { AlphaTestersService } from './alpha-testers.service';
import {
  AlphaTester,
  AlphaTesterSchema,
} from './entities/alpha-tester.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AlphaTester.name,
        schema: AlphaTesterSchema,
      },
    ]),
  ],
  providers: [AlphaTestersResolver, AlphaTestersService],
})
export class AlphaTestersModule {}
