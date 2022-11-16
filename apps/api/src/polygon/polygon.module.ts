import { Module } from '@nestjs/common';
import { PolygonService } from './polygon.service';

@Module({
  imports: [],
  providers: [PolygonService],
  exports: [PolygonService],
})
export class PolygonModule {}
