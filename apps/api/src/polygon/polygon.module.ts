import { Module } from '@nestjs/common';
import { EnvModule } from '~/env';
import { PolygonService } from './polygon.service';

@Module({
  imports: [EnvModule],
  providers: [PolygonService],
  exports: [PolygonService],
})
export class PolygonModule {}
