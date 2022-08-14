import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type InstitutionDocument = Institution & Document;

@Schema()
@ObjectType()
export class Institution {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  logo?: string;

  @Prop()
  url?: string;
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);
