import { Module } from '@nestjs/common';
import { OpenFigiService } from './open-figi.service';

@Module({
  imports: [],
  providers: [OpenFigiService],
  exports: [OpenFigiService],
})
export class OpenFigiModule {}
