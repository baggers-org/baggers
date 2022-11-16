import { InputType } from '@nestjs/graphql';

@InputType()
export class CreatePlaidItemInput {
  _id: string;

  accessToken: string;

  institution?: string | null;
}
