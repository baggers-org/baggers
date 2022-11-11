import { Module } from '@nestjs/common';
import { EnvModule } from '@api/env';
import { OpenFigiService } from './open-figi.service';

@Module({
  imports: [EnvModule],
  providers: [OpenFigiService],
  exports: [OpenFigiService],
})
export class OpenFigiModule {}
