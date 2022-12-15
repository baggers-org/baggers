import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AlphaTesterDocument = Document & AlphaTester;

@Schema()
export class AlphaTester {
  @Prop({ required: true })
  _id: string;
}

export const AlphaTesterSchema =
  SchemaFactory.createForClass(AlphaTester);
