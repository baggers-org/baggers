import { Module } from '@nestjs/common';
import { EnvModule } from '~/env';
import { OpenFigiService } from './open-figi.service';

@Module({
  imports: [EnvModule],
  providers: [OpenFigiService],
  exports: [OpenFigiService],
})
export class OpenFigiModule {}
