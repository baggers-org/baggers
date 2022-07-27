import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  _id: string;

  displayName: string;

  emails: string[];

  photos: string[];
}
