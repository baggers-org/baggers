import { Module } from '@nestjs/common';
import { SecuritiesService } from './securities.service';
import { SecuritiesResolver } from './securities.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Security, SecuritySchema } from './entities/security.entity';
import { OpenFigiModule } from '~/open-figi';
import { SecuritiesUtilService } from './securities-util.service';

@Module({
  imports: [
    OpenFigiModule,
    MongooseModule.forFeature([
      {
        name: Security.name,
        schema: SecuritySchema,
      },
    ]),
  ],
  providers: [SecuritiesResolver, SecuritiesService, SecuritiesUtilService],
  exports: [SecuritiesUtilService],
})
export class SecuritiesModule {}
