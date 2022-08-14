import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Institution, InstitutionSchema } from './entities/institution.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Institution.name,
        schema: InstitutionSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class InstitutionsModule {}
