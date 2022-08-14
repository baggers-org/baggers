import { ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@ObjectType()
export class PlaidItemError {
  @Prop()
  errorType: string;

  @Prop()
  errorCode: number;

  @Prop()
  errorMessage: string;

  @Prop()
  displayMessage: string;

  @Prop()
  documentationUrl: string;

  @Prop()
  suggestedAction: string;
}
